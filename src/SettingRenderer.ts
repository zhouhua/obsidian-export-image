import {
  App,
  Setting,
  setIcon,
  Modal,
} from 'obsidian';
import type { SettingItem } from './formConfig';
import L from './L';
import { delay, fileToBase64 } from './utils';
import ImageSelectModal from './components/common/imageSelectModal';
import { renderPreview } from './settingPreview';
import type ExportImagePlugin from './ExportImagePlugin';

export class SettingRenderer {
  private app: App;
  private plugin: ExportImagePlugin;
  private containerEl: HTMLElement;
  private settingItems: SettingItem[];
  constructor(app: App, plugin: ExportImagePlugin, containerEl: HTMLElement) {
    this.app = app;
    this.plugin = plugin;
    this.containerEl = containerEl;
  }

  private getSettingValue(path: string): any {
    return path.split('.').reduce((obj: any, key: string) => {
      return obj && typeof obj === 'object' ? obj[key] : undefined;
    }, this.plugin.settings);
  }

  private async updateSetting(path: string, value: any) {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((obj: any, key: string) => {
      if (!(key in obj)) {
        obj[key] = {};
      }
      return obj[key];
    }, this.plugin.settings as any);

    target[lastKey] = value;
    await this.plugin.saveSettings();
    await this.render(undefined);
  }

  async render(settingItems: SettingItem[] | undefined): Promise<void> {
    if (settingItems && settingItems.length > 0) {
      this.settingItems = settingItems;
    }
    this.containerEl.empty();
    this.containerEl.createEl('h3', { text: L.setting.title() });
    this.containerEl.createEl('p', { text: 'Github: ' }).createEl('a', {
      text: 'zhouhua/obsidian-export-image',
      attr: {
        href: 'https://github.com/zhouhua/obsidian-export-image',
        target: '_blank',
      },
    });

    // 使用配置渲染设置项
    this.settingItems.forEach(item => {
      if (item.show && !item.show(this.plugin.settings)) {
        return;
      }

      const setting = new Setting(this.containerEl)
        .setName(item.label);

      if (item.description) {
        setting.setDesc(item.description);
      }

      switch (item.type) {
        case 'text':
          setting.addText(text => {
            text.setValue(this.getSettingValue(item.id) ?? '')
              .onChange(async value => {
                await this.updateSetting(item.id, value);
              });
          });
          break;

        case 'number':
          setting.addText(text => {
            text.inputEl.type = 'number';
            text.setValue(String(this.getSettingValue(item.id) ?? ''))
              .setPlaceholder(item.placeholder ?? '')
              .onChange(async value => {
                await this.updateSetting(item.id, value ? Number(value) : undefined);
              });
          });
          break;

        case 'toggle':
          setting.addToggle(toggle => {
            toggle.setValue(this.getSettingValue(item.id) ?? false)
              .onChange(async value => {
                await this.updateSetting(item.id, value);
              });
          });
          break;

        case 'dropdown':
          if (item.options) {
            setting.addDropdown(dropdown => {
              dropdown.addOptions(
                Object.fromEntries(
                  item.options!.map(opt => [opt.value, opt.text])
                )
              )
                .setValue(this.getSettingValue(item.id))
                .onChange(async value => {
                  await this.updateSetting(item.id, value);
                });
            });
          }
          break;

        case 'color':
          setting.addColorPicker(picker => {
            picker.setValue(this.getSettingValue(item.id) ?? item.defaultValue)
              .onChange(async value => {
                await this.updateSetting(item.id, value);
              });
          });
          break;

        case 'file': {
          const containerDiv = createDiv({
            cls: 'setting-item-control',
            attr: {
              style: 'display: flex; flex-direction: column; align-items: flex-end; gap: 8px',
            },
          });

          const buttonContainer = containerDiv.createDiv({
            attr: { style: 'display: flex; gap: 8px' },
          });

          // 创建预览区域
          const previewDiv = buttonContainer.createDiv({
            cls: 'user-info-avatar',
            attr: {
              style: `position: relative; display: ${this.getSettingValue(item.id) ? 'block' : 'none'}`,
            },
          });

          if (this.getSettingValue(item.id)) {
            previewDiv.createEl('img', {
              attr: {
                src: this.getSettingValue(item.id),
                alt: 'preview',
                style: 'width: 100%; height: 100%; object-fit: cover',
              },
            });
          }

          // 添加删除按钮
          const deleteButton = previewDiv.createDiv({
            attr: {
              style: `
                position: absolute;
                top: -10px;
                right: -10px;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: black;
                border-radius: 50%;
                cursor: pointer;
                --icon-size: 12px;
                --icon-color: var(--color-red);
                color: white;
              `,
            },
          });

          setIcon(deleteButton, 'x');
          deleteButton.onclick = async () => {
            await this.updateSetting(item.id, undefined);
          };

          // 添加上传按钮
          const fileInput = createEl('input', {
            attr: {
              type: 'file',
              style: 'display: none',
            },
          });

          const uploadButton = buttonContainer.createEl('button', {
            text: L.setting.watermark.image.src.upload(),
          });

          uploadButton.onclick = () => fileInput.click();

          fileInput.onchange = async () => {
            const file = fileInput.files?.[0];
            if (file) {
              const base64 = await fileToBase64(file);
              await this.updateSetting(item.id, base64);
              fileInput.value = '';
            }
          };

          // 添加选择按钮
          const selectButton = buttonContainer.createEl('button', {
            text: L.setting.watermark.image.src.select(),
          });

          selectButton.onclick = () => {
            const modal = new ImageSelectModal(this.app, async (img) => {
              await this.updateSetting(item.id, img);
              modal.close();
            });
            modal.open();
          };

          // 添加 URL 输入按钮
          const urlButton = buttonContainer.createEl('button', {
            text: L.imageUrl(),
          });

          urlButton.onclick = async () => {
            const currentValue = this.getSettingValue(item.id) || '';
            const modal = new Modal(this.app);
            modal.titleEl.setText(L.imageUrl());

            const inputContainer = modal.contentEl.createDiv({
              attr: {
                style: 'margin: 1em 0;'
              }
            });
            const input = inputContainer.createEl('input', {
              attr: {
                type: 'text',
                placeholder: L.imageUrl(),
                style: 'width: 100%'
              }
            });

            input.onkeydown = async (e) => {
              if (e.key === 'Enter') {
                await this.updateSetting(item.id, input.value);
                modal.close();
              } else if (e.key === 'Escape') {
                modal.close();
              }
            };

            const buttonDiv = modal.contentEl.createDiv({
              cls: 'modal-button-container',
              attr: {
                style: 'display: flex; justify-content: flex-end; gap: 8px; margin-top: 1em;'
              }
            });

            const confirmButton = buttonDiv.createEl('button', {
              text: L.confirm(),
              cls: 'mod-cta'
            });
            confirmButton.onclick = async () => {
              await this.updateSetting(item.id, input.value);
              modal.close();
            };

            buttonDiv.createEl('button', { text: L.cancel() }).onclick = () => {
              modal.close();
            };

            modal.open();
            setTimeout(() => input.focus(), 0);
          };

          setting.settingEl.appendChild(containerDiv);
          break;
        }
      }
    });

    // 添加预览区域
    const previewEl = this.containerEl.createDiv();
    const render = await renderPreview(previewEl, this.app);
    render(this.plugin.settings);
  }
} 