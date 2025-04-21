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
  Notice,
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
  // 创建元素和模态框先
  const el = document.createElement('div');
  const skipConfig = type === 'selection' && settings.quickExportSelection;
  
  // 如果是快速导出，创建隐藏的div元素进行处理
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
        isProcessing={true}
        markdownEl={el}
        setting={{ ...settings, showMetadata: false, showFilename: false, split: { overlap: 0, height: 0, mode: 'none' } }}
        frontmatter={{}}
        title={file.basename}
        metadataMap={{}}
        app={app}
      />,
    );
    
    // 先打开模态框，再加载内容
    await loadDocumentContent(app, el);
    
    try {
      await copy(div.querySelector('.export-image-root')!, settings.resolutionMode, settings.format);
    } catch (e) {
      console.error(e);
      new Notice(L.copyFail());
    } finally {
      root.unmount();
      div.remove();
    }
  }
  else {
    // 先创建模态框并显示加载状态
    const modal = new Modal(app);
    modal.setTitle(L.imageExportPreview());
    modal.modalEl.style.width = '85vw';
    modal.modalEl.style.maxWidth = '1500px';
    modal.open();
    const root = createRoot(modal.contentEl);
    
    /* @ts-ignore */
    const metadataMap: Record<string, { type: MetadataType }> = app.metadataCache.getAllPropertyInfos();
    
    // 先渲染带有加载状态的组件
    root.render(
      <ModalContent
        markdownEl={el}
        settings={settings}
        frontmatter={frontmatter}
        title={file.basename}
        metadataMap={metadataMap}
        app={app}
        isLoading={true}
      />,
    );
    
    // 然后异步加载文档内容
    await loadDocumentContent(app, el);
    
    // 重新渲染组件，这次不带加载状态
    root.render(
      <ModalContent
        markdownEl={el}
        settings={settings}
        frontmatter={frontmatter}
        title={file.basename}
        metadataMap={metadataMap}
        app={app}
        isLoading={false}
      />,
    );
    
    modal.onClose = () => {
      root?.unmount();
    };
  }
}

// 提取加载文档内容的函数
async function loadDocumentContent(app: App, el: HTMLElement) {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  let html = "";
  if (view) {
    const codeMirror = view.editor.cm;
    codeMirror.viewState.printing = true;
    codeMirror.measure();
    // 等待滚动操作完成
    view.editor.scrollTo(0, 0);
    await delay(100);
    view.editor.scrollTo(0, Number.MAX_SAFE_INTEGER);
    await delay(500);
    view.editor.scrollTo(0, 0);

    const contentDiv = view.contentEl.querySelector('.cm-content.cm-lineWrapping');
    const tempDiv = document.createElement('div');
    tempDiv.className = "markdown-source-view mod-cm6 is-live-preview";
    
    // 首先添加内容
    tempDiv.innerHTML = contentDiv ? contentDiv.innerHTML : "";
    
    // 删除所有 edit-block-button 和 callout-fold 元素
    tempDiv.querySelectorAll('.edit-block-button, .callout-fold, .cm-widgetBuffer, .table-col-drag-handle, .cm-fold-indicator, .table-row-btn, .table-row-drag-handle, .table-col-btn, .table-row-drag-handle').forEach(el => el.remove());
    
    // 构建完整的HTML，包括样式
    const cssStyles = `
      <style>
        /* 可以在这里添加更多自定义样式 */
        /* 修复列表缩进在渲染时的问题 */
        .export-image-root .list-bullet {
            margin-left: -24px !important;
        }
        .export-image-root .cm-formatting.cm-formatting-list.cm-formatting-list-ul.cm-list-1 {
            margin-left: 12px !important;
        }
        .export-image-root .list-bullet:after {
            left: 10px !important;
        }
      </style>
    `;
    
    // 将div的HTML和样式组合起来
    html = `<div class="export-image-root markdown-source-view mod-cm6 is-live-preview">
      ${cssStyles}
      ${tempDiv.innerHTML}
    </div>`;
    
    codeMirror.viewState.printing = false;
    codeMirror.measure();
  }
  el.innerHTML = html;
  // 增加一个短暂延迟，确保页面渲染完成
  await delay(50);
  
  return el;
}
