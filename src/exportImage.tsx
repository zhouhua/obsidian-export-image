import React from "react";
import {
  App,
  FrontMatterCache,
  MarkdownRenderChild,
  MarkdownRenderer,
  MarkdownView,
  Modal,
  TFile,
  getFrontMatterInfo,
} from "obsidian";
import { createRoot } from "react-dom/client";
import ModalContent from "./ModalContent";
import { copy, save } from "./capture";
import L from "./L";
import { ISettings, MetadataType } from "./type";

export default async function (
  app: App,
  settings: ISettings,
  markdown: string,
  file: TFile,
  frontmatter: FrontMatterCache | undefined
) {
  const el = document.createElement("div");
  MarkdownRenderer.render(
    app,
    markdown,
    el.createDiv(),
    file.path,
    app.workspace.getActiveViewOfType(MarkdownView) ||
      app.workspace.activeLeaf?.view ||
      new MarkdownRenderChild(el)
  );
  const modal = new Modal(this.app);
  modal.setTitle(L.imageExportPreview());
  modal.modalEl.style.width = "85vw";
  modal.modalEl.style.maxWidth = "1500px";
  modal.open();
  const root = createRoot(modal.contentEl);
  const metadataMap: Record<string, { type: MetadataType }> =
    // @ts-ignore
    app.metadataCache.getAllPropertyInfos();
  root.render(
    <ModalContent
      markdownEl={el}
      save={() => save(el, file.basename, settings["2x"], settings.format)}
      copy={() => copy(el, settings["2x"], settings.format)}
      settings={settings}
      frontmatter={frontmatter}
      title={file.basename}
      metadataMap={metadataMap}
      app={app}
    />
  );
  modal.onClose = () => {
    root?.unmount();
  };
}
