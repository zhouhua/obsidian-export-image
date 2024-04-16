/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  type App,
  type FrontMatterCache,
  MarkdownRenderChild,
  MarkdownRenderer,
  MarkdownView,
  Modal,
  type TFile,
} from 'obsidian';
import {createRoot} from 'react-dom/client';
import L from '../../L';
import ModalContent from './ModalContent';

export default async function (
  app: App,
  settings: ISettings,
  markdown: string,
  file: TFile,
  frontmatter: FrontMatterCache | undefined,
) {
  const el = document.createElement('div');
  await MarkdownRenderer.render(
    app,
    markdown,
    el.createDiv(),
    file.path,
    app.workspace.getActiveViewOfType(MarkdownView)
      || app.workspace.activeLeaf?.view
      || new MarkdownRenderChild(el),
  );
  const modal = new Modal(app);
  modal.setTitle(L.imageExportPreview());
  modal.modalEl.style.width = '85vw';
  modal.modalEl.style.maxWidth = '1500px';
  modal.open();
  const root = createRoot(modal.contentEl);
  /* @ts-ignore */
  const metadataMap: Record<string, {type: MetadataType}> = app.metadataCache.getAllPropertyInfos();
  root.render(
    <ModalContent
      markdownEl={el}
      settings={settings}
      frontmatter={frontmatter}
      title={file.basename}
      metadataMap={metadataMap}
      app={app}
    />,
  );
  modal.onClose = () => {
    root?.unmount();
  };
}
