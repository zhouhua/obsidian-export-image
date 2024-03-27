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
  if (settings.format !== "png") {
    el.style.backgroundColor = "var(--background-primary)";
  }
  MarkdownRenderer.render(
    app,
    markdown,
    el.createDiv(),
    file.path,
    app.workspace.getActiveViewOfType(MarkdownView) ||
      app.workspace.activeLeaf?.view ||
      new MarkdownRenderChild(el)
  );
  console.log(app.workspace.getActiveViewOfType(MarkdownView));
  const modal = new Modal(this.app);
  modal.setTitle(L.imageExportPreview());
  modal.modalEl.style.width = "85vw";
  modal.modalEl.style.maxWidth = "1500px";
  modal.open();
  const root = createRoot(modal.contentEl);
  const metadataMap: Record<string, { type: MetadataType }> =
    // @ts-ignore
    app.metadataCache.getAllPropertyInfos();

  const aaa = {
    "22": { name: "22", count: 1, type: "text" },
    date: { name: "Date", count: 1, type: "date" },
    test: { name: "test", count: 2, type: "text" },
    test1: { name: "test1", count: 1, type: "checkbox" },
    test2: { name: "test2", count: 1, type: "multitext" },
    test3: { name: "test3", count: 1, type: "number" },
    test4: { name: "test4", count: 1, type: "date" },
    test5: { name: "test5", count: 1, type: "datetime" },
    empty: { name: "empty", count: 1 },
    cssclasses: { name: "cssclasses", count: 1, type: "multitext" },
    tags: { name: "tags", count: 1, type: "tags" },
    aliases: { name: "aliases", type: "aliases", count: 0 },
  };
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
