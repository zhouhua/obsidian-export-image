import {
  App,
  MarkdownRenderChild,
  MarkdownRenderer,
  MarkdownView,
  TFile,
} from "obsidian";
import React from "react";
import { Root, createRoot } from "react-dom/client";
import Target from "src/components/common/Target";
import { delay, getMetadata } from ".";

let root: Root | undefined;

export default async function makeHTML(
  file: TFile,
  settings: ISettings,
  app: App,
  container: HTMLElement
) {
  if (root) {
    root.unmount();
    await delay(20);
    container.empty();
  }
  const markdown = await app.vault.cachedRead(file);
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

  // @ts-ignore
  const metadataMap: Record<string, { type: MetadataType }> =
    // @ts-ignore
    app.metadataCache.getAllPropertyInfos();
  const frontmatter = getMetadata(file as TFile, this.app);

  root = createRoot(container);
  root.render(
    <Target
      frontmatter={frontmatter}
      setting={settings}
      title={file.basename}
      markdownEl={el}
      app={app}
      metadataMap={metadataMap}
    />
  );
  await delay(100);
  return (el as HTMLDivElement).closest(".export-image-root") || el;
}
