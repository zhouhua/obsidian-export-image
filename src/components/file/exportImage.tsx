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
import { createRoot } from 'react-dom/client';
import L from '../../L';
import ModalContent from './ModalContent';
import { preprocessMarkdown } from 'src/utils/preprocessMarkdown';
import Target from '../common/Target';
import { delay } from 'src/utils';
import { copy } from 'src/utils/capture';

export default async function (
  app: App,
  settings: ISettings,
  markdown: string,
  file: TFile,
  frontmatter: FrontMatterCache | undefined,
  type: 'file' | 'selection',
) {
  const el = document.createElement('div');
  await MarkdownRenderer.render(
    app,
    preprocessMarkdown(markdown, frontmatter),
    el.createDiv(),
    file.path,
    app.workspace.getActiveViewOfType(MarkdownView)
    || app.workspace.activeLeaf?.view
    || new MarkdownRenderChild(el),
  );
  const skipConfig = type === 'selection' && settings.quickExportSelection;
  if (skipConfig) {
    const div = createDiv();
    div.style.width = (settings.width || 400) + 'px';
    div.style.position = 'fixed';
    div.style.top = '9999px';
    div.style.left = '9999px';
    document.body.appendChild(div);
    const root = createRoot(div);
    root.render(
      <Target
        markdownEl={el}
        setting={{ ...settings, showMetadata: false, showFilename: false }}
        frontmatter={{}}
        title={file.basename}
        metadataMap={{}}
        app={app}
      />,
    );
    await delay(20);
    try {
      await copy(div.querySelector('.export-image-root')!, settings['2x'], settings.format);
    } catch (e) {
      console.error(e);
      new Notice(L.copyFail());
    } finally {
      root.unmount();
      div.remove();
    }
  }
  else {
    const modal = new Modal(app);
    modal.setTitle(L.imageExportPreview());
    modal.modalEl.style.width = '85vw';
    modal.modalEl.style.maxWidth = '1500px';
    modal.open();
    const root = createRoot(modal.contentEl);
    /* @ts-ignore */
    const metadataMap: Record<string, { type: MetadataType }> = app.metadataCache.getAllPropertyInfos();
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
}
