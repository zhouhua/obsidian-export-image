import ExportImagePlugin from 'ExportImagePlugin';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class ExportImageSettingTab extends PluginSettingTab {
    plugin: ExportImagePlugin;

    constructor(app: App, plugin: ExportImagePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Export Image Settings' });

        new Setting(containerEl)
            .setName('Image Width')
            .setDesc('Set width of exported image')
            .addText(text => text
                .setPlaceholder('Enter your secret')
                .setValue(this.plugin.settings.width)
                .onChange(async (value) => {
                    this.plugin.settings.width = value;
                    await this.plugin.saveSettings();
                }));
    }
}
