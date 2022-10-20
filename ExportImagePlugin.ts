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
              const totalHeight = el.clientHeight;
              console.log('scollHeight:', totalHeight);
              const screenHeight = markdownView.contentEl.clientHeight;
              let scrollIndex = 0;
              let height = el.clientHeight - parseFloat(el.style.paddingBottom) + 40;
              el.addClass('epxort-image-force-no-margin');
              const clone = await cloneNode(el);
              const observer = new MutationObserver(async records => {
                for (let r of records) {
                  for (let node of Array.from(r.addedNodes)) {
                    clone.append(await cloneNode(node as HTMLElement));
                    const img = (node as HTMLElement).find('img');
                    if (img) {
                      height += img.clientHeight / 2;
                    } else {
                      const math = (node as HTMLElement).find('.math-block');
                      if (math) {
                        height += (node as HTMLElement).clientHeight;
                      }
                    }
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

              el.removeClass('epxort-image-force-no-margin');
              console.log(el.clientWidth, height);
              const blob = await toBlobWithClonedDom(el, clone, {
                width: el.clientWidth * 2,
                height: height * 2,
                bgcolor: window.getComputedStyle(el.closest('.view-content')!).backgroundColor,
                quality: 0.9,
                style: {
                  transform: 'scale(2)',
                  transformOrigin: 'top left'
                }
              });
              saveAs(blob, `${markdownView.getDisplayText().replace(/\s+/g, '_')}.jpg`);
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
