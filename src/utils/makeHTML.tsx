import {
  type App,
  MarkdownRenderChild,
  MarkdownRenderer,
  MarkdownView,
  type TFile,
} from 'obsidian';
import React from 'react';
import {type Root, createRoot} from 'react-dom/client';
import Target from 'src/components/common/Target';
import {delay, getMetadata} from '.';

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const metadataMap: Record<string, {type: MetadataType}>
    /* @ts-expect-error */
    = app.metadataCache.getAllPropertyInfos(); // eslint-disable-line @typescript-eslint/no-unsafe-call
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
