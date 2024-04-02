import {
  Plugin,
  PluginSettingTab,
  App,
  Setting,
  TFile,
  Notice,
} from "obsidian";
import { renderPreview } from "./settingPreview";
import exportImage from "./exportImage";
import type { FileFormat, ISettings } from "./type";
import L from "./L";
import {
  fileToBase64,
  fileToUrl,
  getMetadata,
  getSizeOfImage,
  isMarkdownFile,
} from "./utils";
import ImageSelectModal from "./components/common/imageSelectModal";

const DEFAULT_SETTINGS: ISettings = {
  width: 640,
  showFilename: true,
  "2x": true,
  format: "jpg",
  showMetadata: false,
  authorInfo: {
    show: false,
    align: "right",
    position: "bottom",
  },
  watermark: {
    enable: false,
    type: "text",
    text: {
      content: "",
      fontSize: 28,
      color: "#cccccc",
    },
    image: {
      src: "",
    },
    opacity: 0.2,
    rotate: 30,
    height: 64,
    width: 120,
    x: 100,
    y: 100,
  },
};

export default class ExportImagePlugin extends Plugin {
  settings: ISettings;

  async onload() {
    await this.loadSettings();

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (isMarkdownFile(file)) {
          const frontmatter = getMetadata(file as TFile, this.app);
          menu.addItem((item) => {
            item
              .setTitle(L.exportImage())
              .setIcon("image-down")
              .onClick(async () => {
                const markdown = await this.app.vault.cachedRead(file as TFile);
                exportImage(
                  this.app,
                  this.settings,
                  markdown,
                  file as TFile,
                  frontmatter
                );
              });
          });
        }
      })
    );

    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        const file: TFile =
          // @ts-ignore
          editor.editorComponent.file || this.app.workspace.getActiveFile();
        const frontmatter = getMetadata(file, this.app);
        if (!file) return;
        if (editor.somethingSelected()) {
          menu.addItem((item) => {
            item
              .setTitle(L.exportSelectionImage())
              .setIcon("text-select")
              .onClick(() =>
                exportImage(
                  this.app,
                  this.settings,
                  editor.getSelection(),
                  file,
                  frontmatter
                )
              );
          });
        }
        menu.addItem((item) => {
          item
            .setTitle(L.exportImage())
            .setIcon("image-down")
            .onClick(() =>
              exportImage(
                this.app,
                this.settings,
                editor.getValue(),
                file,
                frontmatter
              )
            );
        });
      })
    );

    this.addCommand({
      id: "export-image",
      name: L.command(),
      checkCallback: (checking: boolean) => {
        // If checking is true, we're simply "checking" if the command can be run.
        // If checking is false, then we want to actually perform the operation.
        if (!checking) {
          (async () => {
            const activeFile = this.app.workspace.getActiveFile();
            if (
              !activeFile ||
              !["md", "markdown"].includes(activeFile.extension)
            ) {
              new Notice(L.noActiveFile());
              return;
            }
            const frontmatter = getMetadata(activeFile, this.app);
            const markdown = await this.app.vault.cachedRead(activeFile);
            exportImage(
              this.app,
              this.settings,
              markdown,
              activeFile,
              frontmatter
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

  onunload() {}

  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
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
    this.plugin.saveSettings();
    this.render(this.plugin.settings);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h3", { text: L.setting.title() });
    containerEl.createEl("p", { text: "Github: " }).createEl("a", {
      text: "zhouhua/obsidian-export-image",
      attr: {
        href: "https://github.com/zhouhua/obsidian-export-image",
        target: "_blank",
      },
    });

    new Setting(containerEl)
      .setName(L.setting.imageWidth.label())
      .setDesc(L.setting.imageWidth.description())
      .addText((text) => {
        text.inputEl.type = "number";
        text
          .setValue(String(this.plugin.settings.width))
          .setPlaceholder("640")
          .onChange(async (value) => {
            this.plugin.settings.width = value ? parseInt(value) : undefined;
            await this.update();
          });
      });

    new Setting(containerEl)
      .setName(L.setting.filename.label())
      .setDesc(L.setting.filename.desscription())
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.showFilename)
          .onChange(async (value) => {
            this.plugin.settings.showFilename = value;
            await this.update();
          });
      });

    new Setting(containerEl)
      .setName(L.setting.metadata.label())
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.showMetadata)
          .onChange(async (value) => {
            this.plugin.settings.showMetadata = value;
            await this.update();
          });
      });

    new Setting(containerEl)
      .setName(L.setting["2x"].label())
      .setDesc(L.setting["2x"].description())
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings["2x"]).onChange(async (value) => {
          this.plugin.settings["2x"] = value;
          await this.update();
        });
      });
    new Setting(containerEl)
      .setName(L.setting.format.title())
      .setDesc(L.setting.format.description())
      .addDropdown((dropdown) => {
        dropdown
          .addOptions({
            jpg: L.setting.format.jpg(),
            png: L.setting.format.png(),
            pdf: L.setting.format.pdf(),
          })
          .setValue(this.plugin.settings.format)
          .onChange(async (value: FileFormat) => {
            this.plugin.settings.format = value;
            await this.update();
          });
      });
    new Setting(containerEl).setHeading().setName(L.setting.userInfo.title());
    let userInfoEl: HTMLDivElement, avatarEl: HTMLDivElement;
    function setAvatar(src: string) {
      if (src) {
        avatarEl.style.backgroundImage = `url(${src})`;
        avatarEl.style.backgroundSize = "cover";
      } else {
        avatarEl.style.backgroundImage = "";
      }
    }
    new Setting(containerEl)
      .setName(L.setting.userInfo.show())
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.authorInfo.show)
          .onChange(async (value) => {
            this.plugin.settings.authorInfo.show = value;
            userInfoEl.style.display = value ? "block" : "none";
            await this.update();
          });
      });
    userInfoEl = containerEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.authorInfo.show ? "block" : "none"
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(userInfoEl)
      .setName(L.setting.userInfo.name())
      .addText((text) => {
        text
          .setValue(this.plugin.settings.authorInfo.name || "")
          .onChange(async (value) => {
            this.plugin.settings.authorInfo.name = value;
            this.plugin.saveSettings();
          });
      });

    new Setting(userInfoEl)
      .setName(L.setting.userInfo.remark())
      .addText((text) => {
        text
          .setValue(this.plugin.settings.authorInfo.remark || "")
          .onChange(async (value) => {
            this.plugin.settings.authorInfo.remark = value;
            this.plugin.saveSettings();
          });
      });
    new Setting(userInfoEl)
      .setName(L.setting.userInfo.avatar.title())
      .setDesc(L.setting.userInfo.avatar.description())
      .addButton((button) => {
        avatarEl = createDiv({
          attr: {
            style:
              "width: 32px;height: 32px;border-radius: 50%;border:1px solid var(--background-modifier-border)",
          },
        });
        const input = createEl("input", {
          attr: {
            type: "file",
            accept: "image/*",
            multiple: false,
            style: "display: none;",
          },
        });
        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            this.plugin.settings.authorInfo.avatar = await fileToBase64(file);
            setAvatar(this.plugin.settings.authorInfo.avatar);
            this.plugin.saveSettings();
          }
        };
        button.buttonEl.appendChild(input);
        button.buttonEl.parentElement?.prepend(avatarEl);
        button
          .setButtonText(L.setting.watermark.image.src.upload())
          .onClick(() => input.click());
      })
      .addButton((button) => {
        button.setButtonText(L.setting.watermark.image.src.select());
        button.onClick(async () => {
          const modal = new ImageSelectModal(this.plugin.app, (img) => {
            this.plugin.settings.authorInfo.avatar = img;
            this.plugin.saveSettings();
            setAvatar(img);
            modal.close();
          });
          modal.open();
        });
      });

    new Setting(containerEl).setHeading().setName(L.setting.watermark.title());
    let watermarkEl: HTMLDivElement,
      textWatermarkEl: HTMLDivElement,
      imageWatermarkEl: HTMLDivElement,
      previewEl: HTMLDivElement;
    new Setting(containerEl)
      .setName(L.setting.watermark.enable.label())
      .setDesc(L.setting.watermark.enable.description())
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.watermark.enable)
          .onChange(async (value) => {
            this.plugin.settings.watermark.enable = value;
            watermarkEl.style.display = value ? "block" : "none";
            previewEl.style.display = value ? "block" : "none";
            await this.update();
          });
      });
    watermarkEl = containerEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.enable ? "block" : "none"
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(watermarkEl)
      .setName(L.setting.watermark.type.label())
      .setDesc(L.setting.watermark.type.description())
      .addDropdown((dropdown) => {
        dropdown
          .addOption("text", L.setting.watermark.type.text())
          .addOption("image", L.setting.watermark.type.image())
          .setValue(this.plugin.settings.watermark.type ?? "text")
          .onChange(async (value) => {
            this.plugin.settings.watermark.type = value as "text" | "image";
            if (value === "text") {
              textWatermarkEl.style.display = "block";
              imageWatermarkEl.style.display = "none";
            } else {
              textWatermarkEl.style.display = "none";
              imageWatermarkEl.style.display = "block";
            }
            await this.update();
          });
      });
    textWatermarkEl = watermarkEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.type === "text" ? "block" : "none"
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(textWatermarkEl)
      .setName(L.setting.watermark.text.content())
      .addText((text) => {
        text
          .setValue(this.plugin.settings.watermark.text.content ?? "")
          .onChange(async (value) => {
            this.plugin.settings.watermark.text.content = value;
            await this.update();
          });
      });

    new Setting(textWatermarkEl)
      .setName(L.setting.watermark.text.color())
      .addColorPicker((picker) => {
        picker
          .setValue(this.plugin.settings.watermark.text.color ?? "#cccccc")
          .onChange(async (value) => {
            this.plugin.settings.watermark.text.color = value;
            await this.update();
          });
      })
      .addExtraButton((button) => {
        button
          .setIcon("rotate-ccw")
          .setTooltip(L.setting.reset())
          .onClick(async () => {
            this.plugin.settings.watermark.text.color = "#cccccc";
            await this.update();
          });
      });

    new Setting(textWatermarkEl)
      .setName(L.setting.watermark.text.fontSize())
      .addText((text) => {
        text.inputEl.type = "number";
        text
          .setValue(`${this.plugin.settings.watermark.text.fontSize ?? "16"}`)
          .setPlaceholder("16")
          .onChange(async (value) => {
            this.plugin.settings.watermark.text.fontSize = value
              ? parseInt(value)
              : undefined;
            await this.update();
          });
      });
    imageWatermarkEl = watermarkEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.type === "image" ? "block" : "none"
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    const setImage = async (src: string) => {
      const { width, height } = await getSizeOfImage(src);
      this.plugin.settings.watermark.width = width;
      this.plugin.settings.watermark.height = height;
      containerEl.querySelector<HTMLInputElement>(
        ".watermark-width-setting"
      )!.value = `${width}`;
      containerEl.querySelector<HTMLInputElement>(
        ".watermark-height-setting"
      )!.value = `${height}`;
      await this.update();
    };
    new Setting(imageWatermarkEl)
      .setName(L.setting.watermark.image.src.label())
      .addButton((button) => {
        const input = createEl("input", {
          attr: {
            type: "file",
            accept: "image/*",
            multiple: false,
            style: "display: none;",
          },
        });
        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            this.plugin.settings.watermark.image.src = await fileToBase64(file);
            setImage(fileToUrl(file));
          }
        };
        button.buttonEl.appendChild(input);
        button
          .setButtonText(L.setting.watermark.image.src.upload())
          .onClick(() => input.click());
      })
      .addButton((button) => {
        button.setButtonText(L.setting.watermark.image.src.select());
        button.onClick(async () => {
          const modal = new ImageSelectModal(this.plugin.app, (img) => {
            this.plugin.settings.watermark.image.src = img;
            setImage(img);
            this.plugin.saveSettings();
            modal.close();
          });
          modal.open();
        });
      })
      .addExtraButton((button) => {
        button
          .setIcon("transh-2")
          .setTooltip(L.setting.userInfo.removeAvatar())
          .onClick(() => {
            this.plugin.settings.watermark.image.src = "";
            setImage("");
            this.plugin.saveSettings();
          });
      });

    new Setting(userInfoEl)
      .setName(L.setting.userInfo.position())
      .addDropdown((dropdown) => {
        dropdown
          .setValue(this.plugin.settings.authorInfo.position ?? "bottom")
          .addOptions({ top: "Top", bottom: "Bottom" })
          .onChange((value: "top" | "bottom") => {
            this.plugin.settings.authorInfo.position = value;
            this.plugin.saveSettings();
          });
      });

    new Setting(userInfoEl)
      .setName(L.setting.userInfo.align())
      .addDropdown((dropdown) => {
        dropdown
          .setValue(this.plugin.settings.authorInfo.align ?? "right")
          .addOptions({ left: "Left", center: "Center", right: "Right" })
          .onChange((value: "left" | "center" | "right") => {
            this.plugin.settings.authorInfo.align = value;
            this.plugin.saveSettings();
          });
      });
    new Setting(watermarkEl)
      .setName(L.setting.watermark.opacity())
      .addText((text) => {
        text.inputEl.type = "number";
        text
          .setPlaceholder("0.2")
          .setValue(`${this.plugin.settings.watermark.opacity ?? 0.2}`)
          .onChange(async (value) => {
            this.plugin.settings.watermark.opacity = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });
    new Setting(watermarkEl)
      .setName(L.setting.watermark.rotate())
      .addText((text) => {
        text.inputEl.type = "number";
        text
          .setPlaceholder("-30")
          .setValue(`${this.plugin.settings.watermark.rotate ?? -30}`)
          .onChange(async (value) => {
            this.plugin.settings.watermark.rotate = value
              ? Number(value)
              : undefined;
            await this.update();
          });
      });
    new Setting(watermarkEl)
      .setName(L.setting.watermark.width())
      .addText((text) => {
        text.inputEl.type = "number";
        text.inputEl.addClass("watermark-width-setting");
        text
          .setPlaceholder("120")
          .setValue(`${this.plugin.settings.watermark.width ?? 120}`)
          .onChange((value) => {
            this.plugin.settings.watermark.width = value
              ? Number(value)
              : undefined;
            this.update();
          });
      });
    new Setting(watermarkEl)
      .setName(L.setting.watermark.height())
      .addText((text) => {
        text.inputEl.type = "number";
        text.inputEl.addClass("watermark-height-setting");
        text
          .setPlaceholder("64")
          .setValue(`${this.plugin.settings.watermark.height ?? 64}`)
          .onChange((value) => {
            this.plugin.settings.watermark.height = value
              ? Number(value)
              : undefined;
            this.update();
          });
      });

    new Setting(watermarkEl)
      .setName(L.setting.watermark.x())
      .addText((text) => {
        text.inputEl.type = "number";
        text
          .setPlaceholder("100")
          .setValue(`${this.plugin.settings.watermark.x ?? 100}`)
          .onChange((value) => {
            this.plugin.settings.watermark.x = value
              ? Number(value)
              : undefined;
            this.update();
          });
      });

    new Setting(watermarkEl)
      .setName(L.setting.watermark.y())
      .addText((text) => {
        text.inputEl.type = "number";
        text
          .setPlaceholder("100")
          .setValue(`${this.plugin.settings.watermark.y ?? 100}`)
          .onChange((value) => {
            this.plugin.settings.watermark.y = value
              ? Number(value)
              : undefined;
            this.update();
          });
      });

    previewEl = containerEl.createDiv({
      attr: {
        style: `display: ${
          this.plugin.settings.watermark.enable ? "block" : "none"
        };border-top:1px solid var(--background-modifier-border);padding-top:0.75em`,
      },
    });
    new Setting(previewEl).setHeading().setName(L.setting.preview());
    this.render = renderPreview(previewEl.createDiv(), this.app);
    this.render(this.plugin.settings);
  }
}
