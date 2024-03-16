import {
  Plugin,
  MarkdownRenderer,
  MarkdownRenderChild,
  Modal,
  Notice,
} from "obsidian";
import React from "react";
import { createRoot } from "react-dom/client";
import ModalContent from "./ModalContent";
import { copy, save } from "./capture";
import i18n from "./i18n";

export default class ExportImagePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "export-image",
      name: "Export as a image",
      checkCallback: (checking: boolean) => {
        // If checking is true, we're simply "checking" if the command can be run.
        // If checking is false, then we want to actually perform the operation.
        if (!checking) {
          (async () => {
            const activeFile = this.app.workspace.getActiveFile();
            if (!activeFile) {
              new Notice(i18n("noActiveFile"));
              return;
            }
            const markdown = await this.app.vault.cachedRead(activeFile);
            const el = document.createElement("div");
            el.createEl("h1", {
              text: activeFile.basename,
              cls: "export-image-preview-filename",
            });
            el.addClasses([
              "markdown-preview-view",
              "markdown-rendered",
              "export-image-preview-container",
            ]);
            el.style.backgroundColor = "var(--background-primary)";
            MarkdownRenderer.render(
              this.app,
              markdown,
              el,
              activeFile.path,
              new MarkdownRenderChild(el)
            );
            const modal = new Modal(this.app);
            modal.setTitle(i18n("imageExportPreview"));
            modal.open();
            const root = createRoot(modal.contentEl);
            root.render(
              <ModalContent
                markdownEl={el}
                save={() => save(el, activeFile.basename)}
                copy={() => copy(el)}
              />
            );
            modal.onClose = () => {
              root?.unmount();
            };
          })();
        }

        // This command will only show up in Command Palette when the check function returns true
        return true;
      },
    });
  }

  onunload() {}
}
