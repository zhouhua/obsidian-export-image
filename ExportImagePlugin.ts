import { Editor, MarkdownView, MarkdownPreviewView, MarkdownRenderer, Notice, Plugin } from 'obsidian';
import { saveAs } from 'file-saver';
import { ExportImageSettingTab } from './ExportImageSettingTab';
import { DEFAULT_SETTINGS } from "./constents";
import { cloneNode, toBlobWithClonedDom } from 'dom-to-image';

function delay(ms: number): Promise<undefined> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(undefined);
    }, ms);
  });
}


async function cloneDom(el:HTMLElement, markdownView:MarkdownView): Promise<HTMLElement> {
  const container = el.parentElement!;
  const scrollCache = container.scrollTop;
  container.scrollTo(0, 0);
  el.addClass('epxort-image-force-no-margin');
  await delay(40);
  const totalHeight = el.clientHeight;
  const screenHeight = markdownView.contentEl.clientHeight;
  let scrollIndex = 0;
  let height = el.clientHeight - parseFloat(el.style.paddingBottom) + 40;
  console.log('scollHeight:', height);
  const clone = await cloneNode(el);
  const observer = new MutationObserver(async records => {
    for (let r of records) {
      for (let node of Array.from(r.addedNodes)) {
        clone.append(await cloneNode(node as HTMLElement));
      }
    }
  });
  observer.observe(el, {
    childList: true
  });
  while (scrollIndex <= totalHeight - screenHeight) {
    scrollIndex += screenHeight;
    container.scrollTo(0, scrollIndex);
    await delay(40);
  }
  observer.disconnect();
  container.scrollTo(0, scrollCache);
  clone.addClass('export-image-clone');
  document.body.appendChild(clone);
  console.log(clone.clientWidth, clone.clientHeight);
  el.removeClass('epxort-image-force-no-margin');
  return clone;
}
export default class ExportImagePlugin extends Plugin {
  settings: ExportImageSettings;

  async onload() {
    await this.loadSettings();


    this.addCommand({
      id: 'export-to-image-zh',
      name: 'Export to image',
      checkCallback: (checking: boolean) => {
        // Conditions to check
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView?.getMode() === 'preview') {
          // If checking is true, we're simply "checking" if the command can be run.
          // If checking is false, then we want to actually perform the operation.
          if (!checking) {
            (async () => {
              const el = markdownView.contentEl.find('.markdown-preview-section');
              const clone = await cloneDom(el, markdownView);
              const blob = await toBlobWithClonedDom(el, clone, {
                // width: width * 2,
                // height: height * 2,
                width: clone.clientWidth * 2,
                height: clone.clientHeight * 2,
                bgcolor: window.getComputedStyle(el.closest('.view-content')!).backgroundColor,
                quality: 0.9,
                style: {
                  transform: 'scale(2)',
                  transformOrigin: 'top left'
                }
              });
              document.body.removeChild(clone);
              saveAs(blob, `${markdownView.getDisplayText().replace(/\s+/g, '_')}.jpg`);
            })();
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
      }
    });


    this.addCommand({
      id: 'copy-as-image-zh',
      name: 'Copy as image',
      checkCallback: (checking: boolean) => {
        // Conditions to check
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView?.getMode() === 'preview') {
          // If checking is true, we're simply "checking" if the command can be run.
          // If checking is false, then we want to actually perform the operation.
          if (!checking) {
            (async () => {
              const el = markdownView.contentEl.find('.markdown-preview-section');
              const clone = await cloneDom(el, markdownView);
              const blob = await toBlobWithClonedDom(el, clone, {
                // width: width * 2,
                // height: height * 2,
                width: clone.clientWidth * 2,
                height: clone.clientHeight * 2,
                bgcolor: window.getComputedStyle(el.closest('.view-content')!).backgroundColor,
                quality: 0.9,
                style: {
                  transform: 'scale(2)',
                  transformOrigin: 'top left'
                }
              });
              document.body.removeChild(clone);
              const data = [
                new ClipboardItem({
                  [blob.type]: blob,
                }),
              ];
              await navigator.clipboard.write(data)
              new Notice('Copied!');
            })();
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
      }
    });

  }

  onunload() {
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
