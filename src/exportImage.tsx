import React from "react";
import { MarkdownRenderChild, MarkdownRenderer, Modal, Notice } from "obsidian";
import i18n from "./i18n";
import { createRoot } from "react-dom/client";
import ModalContent from "./ModalContent";
import { copy, save } from "./capture";

export default async function () {
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
}
