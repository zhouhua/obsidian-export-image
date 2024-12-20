import {
  Plugin,
  PluginSettingTab,
  type App,
  TFile,
  Notice,
  TFolder,
  Editor,
  MarkdownView,
} from 'obsidian';
import exportImage from './components/file/exportImage';
import L from './L';
import { isMarkdownFile, getMetadata } from './utils';
import { DEFAULT_SETTINGS } from './settings';
import exportFolder from './components/folder/exportFolder';
import { createSettingConfig } from './formConfig';
import { SettingRenderer } from './SettingRenderer';

export default class ExportImagePlugin extends Plugin {
  settings: ISettings;

  async epxortFile(file: TFile) {
    const frontmatter = getMetadata(file, this.app);
    const markdown = await this.app.vault.cachedRead(file);
    await exportImage(this.app, this.settings, markdown, file, frontmatter, 'file');
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
          // @ts-ignore: Obsidian ts defined incomplete.
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
                  'selection',
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
                'file',
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
              'file',
            );
          })();
        }
        // This command will only show up in Command Palette when the check function returns true
        return true;
      },
    });

    this.addCommand({
      id: 'export-image-selection',
      name: L.exportSelectionImage(),
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const file = view.file;
        if (!file || !['md', 'markdown'].includes(file.extension)) {
          return false;
        }
        const frontmatter = getMetadata(file, this.app);
        const selection = editor.getSelection();
        if (!selection) {
          return false;
        }
        if (!checking) {
          exportImage(
            this.app,
            this.settings,
            selection,
            file,
            frontmatter,
            'selection',
          );
        }
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
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData() as ISettings) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class ImageSettingTab extends PluginSettingTab {
  plugin: ExportImagePlugin;
  settingRenderer: SettingRenderer;

  constructor(app: App, plugin: ExportImagePlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.settingRenderer = new SettingRenderer(app, plugin, this.containerEl);
  }

  async display(): Promise<void> {
    await this.settingRenderer.render(await createSettingConfig(this.app));
  }
}
