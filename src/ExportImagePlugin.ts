import { Plugin, Notice } from "obsidian";
import exportImage from "./exportImage";
import i18n from "./i18n";

export default class ExportImagePlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu) => {
        menu.addItem((item) => {
          item
            .setTitle(i18n("exportImage"))
            .setIcon("image-down")
            .onClick(exportImage);
        });
      })
    );

    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu) => {
        menu.addItem((item) => {
          item
            .setTitle(i18n("exportImage"))
            .setIcon("image-down")
            .onClick(exportImage);
        });
      })
    );

    this.addCommand({
      id: "export-image",
      name: "Export as a image",
      checkCallback: (checking: boolean) => {
        // If checking is true, we're simply "checking" if the command can be run.
        // If checking is false, then we want to actually perform the operation.
        if (!checking) {
          exportImage();
        }

        // This command will only show up in Command Palette when the check function returns true
        return true;
      },
    });
  }

  onunload() {}
}
