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

export default class ExportImagePlugin extends Plugin {
  settings: ExportImageSettings;

  async onload() {
    await this.loadSettings();

    // This adds a complex command that can check whether the current state of the app allows execution of the command
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
              const container = el.parentElement!;

              const scrollCache = container.scrollTop;
              container.scrollTo(0, 0);
              await delay(40);
              const totalHeight = el.scrollHeight;
              console.log('scollHeight:', totalHeight);
              const screenHeight = markdownView.contentEl.clientHeight;
              let scrollIndex = 0;
              let height = el.clientHeight - parseFloat(el.style.paddingBottom);
              for (let i = 0; i < el.children.length; i++) {
                // height += el.children[i].clientHeight;
              }
              const clone = await cloneNode(el);
              const observer = new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(async node => {
                clone.append(await cloneNode(node as HTMLElement));
                // height += (node as HTMLElement).clientHeight;
              })));
              observer.observe(el, {
                childList: true
              });
              while (scrollIndex <= totalHeight - screenHeight) {
                scrollIndex += screenHeight;
                container.scrollTo(0, scrollIndex);
                await delay(40);
              }
              container.scrollTo(0, scrollCache);
              console.log(el.clientWidth, height);
              const blob = await toBlobWithClonedDom(el, clone, {
                width: (el.clientWidth + 200) * 2,
                height: (height + 100) * 2,
                bgcolor: window.getComputedStyle(el.closest('.view-content')!).backgroundColor,
                quality: 0.9,
                style: {
                  transform: 'scale(2)',
                  transformOrigin: 'top left',
                  paddingTop: '50px',
                }
              });
              saveAs(blob, `${markdownView.getDisplayText().replace(/\s+/g, '_')}.jpg`);
              observer.disconnect();
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
