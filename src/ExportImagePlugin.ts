import {
  Plugin,
  PluginSettingTab,
  type App,
  Setting,
  TFile,
  Notice,
  TFolder,
} from 'obsidian';
import {renderPreview} from './settingPreview';
import exportImage from './components/file/exportImage';
import L from './L';
import {
  fileToBase64,
  fileToUrl,
  getMetadata,
  getSizeOfImage,
  isMarkdownFile,
} from './utils';
import ImageSelectModal from './components/common/imageSelectModal';
import {DEFAULT_SETTINGS} from './settings';
import exportFolder from './components/folder/exportFolder';

export default class ExportImagePlugin extends Plugin {
  settings: ISettings;

  async epxortFile(file: TFile) {
    const frontmatter = getMetadata(file, this.app);
    const markdown = await this.app.vault.cachedRead(file);
    await exportImage(this.app, this.settings, markdown, file, frontmatter);
  }

  async onload() {
    await this.loadSettings();

    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        if (file instanceof TFile && isMarkdownFile(file)) {
          menu.addItem(item => {
            item
              .setTitle(L.exportImage())
              .setIcon('image-down')
              .onClick(async () => {
                await this.epxortFile(file);
              });
          });
        } else if (file instanceof TFolder) {
          menu.addItem(item => {
            item
              .setTitle(L.exportFolder())
              .setIcon('image-down')
              .onClick(async () => {
                await exportFolder(this.app, this.settings, file);
              });
          });
        }
      }),
    );

    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, editor) => {
        const file: TFile
        // @ts-expect-error: Obsidian ts defined incomplete.
          = editor.editorComponent.file as (TFile | undefined) ?? this.app.workspace.getActiveFile()!;
        const frontmatter = getMetadata(file, this.app);
        if (!file) {
          return;
        }

        if (editor.somethingSelected()) {
          menu.addItem(item => {
            item
              .setTitle(L.exportSelectionImage())
              .setIcon('text-select')
              .onClick(async () =>
                exportImage(
                  this.app,
                  this.settings,
                  editor.getSelection(),
                  file,
                  frontmatter,
                ),
              );
          });
        }

        menu.addItem(item => {
          item
            .setTitle(L.exportImage())
            .setIcon('image-down')
            .onClick(async () =>
              exportImage(
                this.app,
                this.settings,
                editor.getValue(),
                file,
                frontmatter,
              ),
            );
        });
      }),
    );

    this.addCommand({
      id: 'export-image',
      name: L.command(),
      checkCallback: (checking: boolean) => {
        // If checking is true, we're simply "checking" if the command can be run.
        // If checking is false, then we want to actually perform the operation.
        if (!checking) {
          (async () => {
            const activeFile = this.app.workspace.getActiveFile();
            if (
              !activeFile
              || !['md', 'markdown'].includes(activeFile.extension)
            ) {
              new Notice(L.noActiveFile());
              return;
            }

            const frontmatter = getMetadata(activeFile, this.app);
            const markdown = await this.app.vault.cachedRead(activeFile);
            await exportImage(
              this.app,
              this.settings,
              markdown,
              activeFile,
              frontmatter,
            );
          })();
        }

        // This command will only show up in Command Palette when the check function returns true
        return true;
      },
    });

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new ImageSettingTab(this.app, this));
  }

  onunload() {
    // Empty
  }

  async loadSettings() {
    this.settings = {...DEFAULT_SETTINGS, ...(await this.loadData() as ISettings)};
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
// FIXME: need refactor
class ImageSettingTab extends PluginSettingTab {
  plugin: ExportImagePlugin;
  render: (settings: ISettings) => void;

  constructor(app: App, plugin: ExportImagePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  async update() {
    await this.plugin.saveSettings();
    this.render(this.plugin.settings);
  }

  async display(): Promise<void> {
    const {containerEl} = this;
    containerEl.empty();

    containerEl.createEl('h3', {text: L.setting.title()});
    containerEl.createEl('p', {text: 'Github: '}).createEl('a', {
      text: 'zhouhua/obsidian-export-image',
      attr: {
        href: 'https://github.com/zhouhua/obsidian-export-image',
        target: '_blank',
      },
    });
    new Setting(containerEl)
      .setName(L.setting.imageWidth.label())
      .setDesc(L.setting.imageWidth.description())
      .addText(text => {
        text.inputEl.type = 'number';
        text
          .setValue(String(this.plugin.settings.width))
          .setPlaceholder('640')
          .onChange(async value => {
            this.plugin.settings.width = value ? Number.parseInt(value, 10) : undefined;
            await this.update();
          });
      });

    new Setting(containerEl)
      .setName(L.setting.filename.label())
      .setDesc(L.setting.filename.desscription())
      .addToggle(toggle => {
        toggle
          .setValue(this.plugin.settings.showFilename)
          .onChange(async value => {
            this.plugin.settings.showFilename = value;
            await this.update();
          });
      });

    new Setting(containerEl)
      .setName(L.setting.metadata.label())
      .addToggle(toggle => {
        toggle
          .setValue(this.plugin.settings.showMetadata)
          .onChange(async value => {
            this.plugin.settings.showMetadata = value;
            await this.update();
          });
      });

    new Setting(containerEl)
      .setName(L.setting['2x'].label())
      .setDesc(L.setting['2x'].description())
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings['2x']).onChange(async value => {
          this.plugin.settings['2x'] = value;
          await this.update();
        });
      });
    new Setting(containerEl)
      .setName(L.setting.format.title())
      .setDesc(L.setting.format.description())
      .addDropdown(dropdown => {
        dropdown
          .addOptions({
            png0: L.setting.format.png0(),
            png1: L.setting.format.png1(),
            jpg: L.setting.format.jpg(),
            pdf: L.setting.format.pdf(),
          })
          .setValue(this.plugin.settings.format)
          .onChange(async (value: FileFormat) => {
            this.plugin.settings.format = value;
            await this.update();
          });
      });
    new Setting(containerEl).setHeading().setName(L.setting.userInfo.title());
    let userInfoElement: HTMLDivElement;
    let avatarElement: HTMLDivElement;
    function setAvatar(source: string) {
      if (source) {
        avatarElement.style.backgroundImage = `url(${source})`;
        avatarElement.style.backgroundSize = 'cover';
      } else {
        avatarElement.style.backgroundImage = '';
      }
    }

    new Setting(containerEl)
      .setName(L.setting.userInfo.show())
      .addToggle(toggle => {
        toggle
          .setValue(this.plugin.settings.authorInfo.show)
          .onChange(async value => {
            this.plugin.settings.authorInfo.show = value;
            userInfoElement.style.display = value ? 'block' : 'none';
            await this.update();
          });
      });
    userInfoElement = containerEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.authorInfo.show ? 'block' : 'none'
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(userInfoElement)
      .setName(L.setting.userInfo.name())
      .addText(text => {
        text
          .setValue(this.plugin.settings.authorInfo.name ?? '')
          .onChange(async value => {
            this.plugin.settings.authorInfo.name = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(userInfoElement)
      .setName(L.setting.userInfo.remark())
      .addText(text => {
        text
          .setValue(this.plugin.settings.authorInfo.remark ?? '')
          .onChange(async value => {
            this.plugin.settings.authorInfo.remark = value;
            await this.plugin.saveSettings();
          });
      });
    new Setting(userInfoElement)
      .setName(L.setting.userInfo.avatar.title())
      .setDesc(L.setting.userInfo.avatar.description())
      .addButton(button => {
        avatarElement = createDiv({
          attr: {
            style:
              'width: 32px;height: 32px;border-radius: 50%;border:1px solid var(--background-modifier-border)',
          },
        });
        const input = createEl('input', {
          attr: {
            type: 'file',
            accept: 'image/*',
            multiple: false,
            style: 'display: none;',
          },
        });
        input.addEventListener('change', async () => {
          const file = input.files?.[0];
          if (file) {
            this.plugin.settings.authorInfo.avatar = await fileToBase64(file);
            setAvatar(this.plugin.settings.authorInfo.avatar);
            await this.plugin.saveSettings();
          }
        });

        button.buttonEl.append(input);
        button.buttonEl.parentElement?.prepend(avatarElement);
        button
          .setButtonText(L.setting.watermark.image.src.upload())
          .onClick(() => {
            input.click();
          });
      })
      .addButton(button => {
        button.setButtonText(L.setting.watermark.image.src.select());
        button.onClick(async () => {
          const modal = new ImageSelectModal(this.plugin.app, async img => {
            this.plugin.settings.authorInfo.avatar = img;
            await this.plugin.saveSettings();
            setAvatar(img);
            modal.close();
          });
          modal.open();
        });
      });

    new Setting(containerEl).setHeading().setName(L.setting.watermark.title());
    let watermarkElement: HTMLDivElement;
    let textWatermarkElement: HTMLDivElement;
    let imageWatermarkElement: HTMLDivElement;
    let previewElement: HTMLDivElement;
    new Setting(containerEl)
      .setName(L.setting.watermark.enable.label())
      .setDesc(L.setting.watermark.enable.description())
      .addToggle(toggle => {
        toggle
          .setValue(this.plugin.settings.watermark.enable)
          .onChange(async value => {
            this.plugin.settings.watermark.enable = value;
            watermarkElement.style.display = value ? 'block' : 'none';
            previewElement.style.display = value ? 'block' : 'none';
            await this.update();
          });
      });
    watermarkElement = containerEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.enable ? 'block' : 'none'
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(watermarkElement)
      .setName(L.setting.watermark.type.label())
      .setDesc(L.setting.watermark.type.description())
      .addDropdown(dropdown => {
        dropdown
          .addOption('text', L.setting.watermark.type.text())
          .addOption('image', L.setting.watermark.type.image())
          .setValue(this.plugin.settings.watermark.type ?? 'text')
          .onChange(async value => {
            this.plugin.settings.watermark.type = value as 'text' | 'image';
            if (value === 'text') {
              textWatermarkElement.style.display = 'block';
              imageWatermarkElement.style.display = 'none';
            } else {
              textWatermarkElement.style.display = 'none';
              imageWatermarkElement.style.display = 'block';
            }

            await this.update();
          });
      });
    textWatermarkElement = watermarkElement.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.type === 'text' ? 'block' : 'none'
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(textWatermarkElement)
      .setName(L.setting.watermark.text.content())
      .addText(text => {
        text
          .setValue(this.plugin.settings.watermark.text.content ?? '')
          .onChange(async value => {
            this.plugin.settings.watermark.text.content = value;
            await this.update();
          });
      });

    new Setting(textWatermarkElement)
      .setName(L.setting.watermark.text.color())
      .addColorPicker(picker => {
        picker
          .setValue(this.plugin.settings.watermark.text.color ?? '#cccccc')
          .onChange(async value => {
            this.plugin.settings.watermark.text.color = value;
            await this.update();
          });
      })
      .addExtraButton(button => {
        button
          .setIcon('rotate-ccw')
          .setTooltip(L.setting.reset())
          .onClick(async () => {
            this.plugin.settings.watermark.text.color = '#cccccc';
            await this.update();
          });
      });

    new Setting(textWatermarkElement)
      .setName(L.setting.watermark.text.fontSize())
      .addText(text => {
        text.inputEl.type = 'number';
        text
          .setValue(`${this.plugin.settings.watermark.text.fontSize ?? '16'}`)
          .setPlaceholder('16')
          .onChange(async value => {
            this.plugin.settings.watermark.text.fontSize = value
              ? Number.parseInt(value, 10)
              : undefined;
            await this.update();
          });
      });
    imageWatermarkElement = watermarkElement.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.type === 'image' ? 'block' : 'none'
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    const setImage = async (source: string) => {
      const {width, height} = await getSizeOfImage(source);
      this.plugin.settings.watermark.width = width;
      this.plugin.settings.watermark.height = height;
      containerEl.querySelector<HTMLInputElement>(
        '.watermark-width-setting',
      )!.value = `${width}`;
      containerEl.querySelector<HTMLInputElement>(
        '.watermark-height-setting',
      )!.value = `${height}`;
      await this.update();
    };

    new Setting(imageWatermarkElement)
      .setName(L.setting.watermark.image.src.label())
      .addButton(button => {
        const input = createEl('input', {
          attr: {
            type: 'file',
            accept: 'image/*',
            multiple: false,
            style: 'display: none;',
          },
        });
        input.addEventListener('change', async () => {
          const file = input.files?.[0];
          if (file) {
            this.plugin.settings.watermark.image.src = await fileToBase64(file);
            await setImage(fileToUrl(file));
          }
        });

        button.buttonEl.append(input);
        button
          .setButtonText(L.setting.watermark.image.src.upload())
          .onClick(() => {
            input.click();
          });
      })
      .addButton(button => {
        button.setButtonText(L.setting.watermark.image.src.select());
        button.onClick(async () => {
          const modal = new ImageSelectModal(this.plugin.app, async img => {
            this.plugin.settings.watermark.image.src = img;
            await setImage(img);
            await this.plugin.saveSettings();
            modal.close();
          });
          modal.open();
        });
      })
      .addExtraButton(button => {
        button
          .setIcon('transh-2')
          .setTooltip(L.setting.userInfo.removeAvatar())
          .onClick(async () => {
            this.plugin.settings.watermark.image.src = '';
            await setImage('');
            await this.plugin.saveSettings();
          });
      });

    new Setting(userInfoElement)
      .setName(L.setting.userInfo.position())
      .addDropdown(dropdown => {
        dropdown
          .setValue(this.plugin.settings.authorInfo.position ?? 'bottom')
          .addOptions({top: 'Top', bottom: 'Bottom'})
          .onChange(async (value: 'top' | 'bottom') => {
            this.plugin.settings.authorInfo.position = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(userInfoElement)
      .setName(L.setting.userInfo.align())
      .addDropdown(dropdown => {
        dropdown
          .setValue(this.plugin.settings.authorInfo.align ?? 'right')
          .addOptions({left: 'Left', center: 'Center', right: 'Right'})
          .onChange(async (value: 'left' | 'center' | 'right') => {
            this.plugin.settings.authorInfo.align = value;
            await this.plugin.saveSettings();
          });
      });
    new Setting(watermarkElement)
      .setName(L.setting.watermark.opacity())
      .addText(text => {
        text.inputEl.type = 'number';
        text
          .setPlaceholder('0.2')
          .setValue(`${this.plugin.settings.watermark.opacity ?? 0.2}`)
          .onChange(async value => {
            this.plugin.settings.watermark.opacity = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });
    new Setting(watermarkElement)
      .setName(L.setting.watermark.rotate())
      .addText(text => {
        text.inputEl.type = 'number';
        text
          .setPlaceholder('-30')
          .setValue(`${this.plugin.settings.watermark.rotate ?? -30}`)
          .onChange(async value => {
            this.plugin.settings.watermark.rotate = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });
    new Setting(watermarkElement)
      .setName(L.setting.watermark.width())
      .addText(text => {
        text.inputEl.type = 'number';
        text.inputEl.addClass('watermark-width-setting');
        text
          .setPlaceholder('120')
          .setValue(`${this.plugin.settings.watermark.width ?? 120}`)
          .onChange(async value => {
            this.plugin.settings.watermark.width = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });
    new Setting(watermarkElement)
      .setName(L.setting.watermark.height())
      .addText(text => {
        text.inputEl.type = 'number';
        text.inputEl.addClass('watermark-height-setting');
        text
          .setPlaceholder('64')
          .setValue(`${this.plugin.settings.watermark.height ?? 64}`)
          .onChange(async value => {
            this.plugin.settings.watermark.height = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });

    new Setting(watermarkElement)
      .setName(L.setting.watermark.x())
      .addText(text => {
        text.inputEl.type = 'number';
        text
          .setPlaceholder('100')
          .setValue(`${this.plugin.settings.watermark.x ?? 100}`)
          .onChange(async value => {
            this.plugin.settings.watermark.x = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });

    new Setting(watermarkElement)
      .setName(L.setting.watermark.y())
      .addText(text => {
        text.inputEl.type = 'number';
        text
          .setPlaceholder('100')
          .setValue(`${this.plugin.settings.watermark.y ?? 100}`)
          .onChange(async value => {
            this.plugin.settings.watermark.y = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });

    previewElement = containerEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.enable ? 'block' : 'none'
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(previewElement).setHeading().setName(L.setting.preview());
    this.render = await renderPreview(previewElement.createDiv(), this.app);
    this.render(this.plugin.settings);
  }
}
