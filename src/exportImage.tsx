import React from "react";
import { MarkdownRenderChild, MarkdownRenderer, Modal, TFile } from "obsidian";
import { createRoot } from "react-dom/client";
import ModalContent from "./ModalContent";
import { copy, save } from "./capture";
import L from "./L";
import { ISettings } from "./type";

export default async function (
  settings: ISettings,
  markdown: string,
  file: TFile
) {
  const el = document.createElement("div");
  el.createEl("h1", {
    text: file.basename,
    cls: "export-image-preview-filename",
  });
  el.addClasses([
    "markdown-preview-view",
    "markdown-rendered",
    "export-image-preview-container",
  ]);
  if (settings.format !== "png") {
    el.style.backgroundColor = "var(--background-primary)";
  }
  MarkdownRenderer.render(
    this.app,
    markdown,
    el,
    file.path,
    this.app.workspace.activeLeaf?.view || new MarkdownRenderChild(el)
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
      save={() => save(el, file.basename, settings["2x"], settings.format)}
      copy={() => copy(el, settings["2x"], settings.format)}
      settings={settings}
      app={this.app}
    />
  );
  modal.onClose = () => {
    root?.unmount();
  };
}
