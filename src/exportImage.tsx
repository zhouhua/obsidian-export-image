import React from "react";
import { MarkdownRenderChild, MarkdownRenderer, Modal, Notice } from "obsidian";
import { createRoot } from "react-dom/client";
import ModalContent from "./ModalContent";
import { copy, save } from "./capture";
import L from "./L";
import { ISettings } from "./type";

export default async function (settings: ISettings) {
  const activeFile = this.app.workspace.getActiveFile();
  if (!activeFile || !["md", "markdown"].includes(activeFile.extension)) {
    new Notice(L.noActiveFile());
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
  modal.setTitle(L.imageExportPreview());
  modal.modalEl.style.width = "85vw";
  modal.modalEl.style.maxWidth = "1500px";
  modal.open();
  const root = createRoot(modal.contentEl);
  root.render(
    <ModalContent
      markdownEl={el}
      save={() => save(el, activeFile.basename, settings["2x"])}
      copy={() => copy(el, settings["2x"])}
      settings={settings}
      app={this.app}
    />
  );
  modal.onClose = () => {
    root?.unmount();
  };
}
