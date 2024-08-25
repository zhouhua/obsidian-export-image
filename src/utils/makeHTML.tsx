/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  type App,
  MarkdownRenderChild,
  MarkdownRenderer,
  MarkdownView,
  type TFile,
} from 'obsidian';
import React from 'react';
import { type Root, createRoot } from 'react-dom/client';
import Target from 'src/components/common/Target';
import { delay, getMetadata } from '.';

let root: Root | undefined;

// eslint-disable-next-line @typescript-eslint/naming-convention
export default async function makeHTML(
  file: TFile,
  settings: ISettings,
  app: App,
  container: HTMLElement,
) {
  if (root) {
    root.unmount();
    await delay(20);
    container.empty();
  }

  const markdown = await app.vault.cachedRead(file);
  const element = document.createElement('div');
  await MarkdownRenderer.render(
    app,
    markdown,
    element.createDiv(),
    file.path,
    app.workspace.getActiveViewOfType(MarkdownView)
    || app.workspace.activeLeaf?.view
    || new MarkdownRenderChild(element),
  );

  /* @ts-ignore */
  const metadataMap: Record<string, { type: MetadataType }> = app.metadataCache.getAllPropertyInfos();

  const frontmatter = getMetadata(file, app);

  root = createRoot(container);
  root.render(
    <Target
      frontmatter={frontmatter}
      setting={settings}
      title={file.basename}
      markdownEl={element}
      app={app}
      metadataMap={metadataMap}
    />,
  );
  await delay(100);
  return (element).closest('.export-image-root') || element;
}
