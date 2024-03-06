import { MarkdownView, requestUrl, Notice, Plugin } from "obsidian";
import { saveAs } from "file-saver";
import { DEFAULT_SETTINGS } from "./constents";
import domtoimage from "./dom-to-image-more";

function delay(ms: number): Promise<undefined> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(undefined);
    }, ms);
  });
}

const copyStyle = (origin: HTMLElement, clone: HTMLElement) => {
  if (origin.nodeType === 1) {
    const styles = getComputedStyle(origin);
    Array.from(styles).forEach((property) =>
      clone.style.setProperty(property, styles.getPropertyValue(property))
    );
  }
};

function cloneNode(el: HTMLElement): HTMLElement {
  const clone = el.cloneNode(false) as HTMLElement;
  copyStyle(el, clone);
  if (el.hasChildNodes()) {
    for (let node of Array.from(el.childNodes)) {
      clone.appendChild(cloneNode(node as HTMLElement));
    }
  }
  return clone;
}

async function cloneDom(
  el: HTMLElement,
  markdownView: MarkdownView
): Promise<Element> {
  const container = el.parentElement!;
  const scrollCache = container.scrollTop;
  container.scrollTo(0, 0);
  el.addClass("export-image-force-no-margin");
  await delay(40);
  const screenHeight = markdownView.contentEl.clientHeight;
  let scrollIndex = 0;
  const clone = cloneNode(el);
  const observer = new MutationObserver(async (records) => {
    for (let r of records) {
      for (let node of Array.from(r.addedNodes)) {
        const child = cloneNode(node as HTMLElement);
        clone.appendChild(child);
      }
    }
  });
  observer.observe(el, {
    childList: true,
  });
  while (scrollIndex <= el.clientHeight - screenHeight) {
    scrollIndex += screenHeight;
    container.scrollTo(0, scrollIndex);
    await delay(60);
  }
  observer.disconnect();
  container.scrollTo(0, scrollCache);
  clone.addClass("export-image-clone");
  document.body.appendChild(clone);
  el.removeClass("export-image-force-no-margin");
  return clone;
}
export default class ExportImagePlugin extends Plugin {
  settings: ExportImageSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "export-to-image-zh",
      name: "Export to image",
      checkCallback: (checking: boolean) => {
        // Conditions to check
        const markdownView =
          this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView?.getMode() === "preview") {
          // If checking is true, we're simply "checking" if the command can be run.
          // If checking is false, then we want to actually perform the operation.
          if (!checking) {
            (async () => {
              const el = markdownView.contentEl.find(
                ".markdown-reading-view>.markdown-preview-view>.markdown-preview-section"
              );
              const clone = await cloneDom(el, markdownView);
              const blob = await domtoimage.toBlob(clone, {
                // width: width * 2,
                // height: height * 2,
                width: clone.clientWidth,
                height: clone.clientHeight,
                bgcolor: window.getComputedStyle(el.closest(".view-content")!)
                  .backgroundColor,
                quality: 0.85,
                scale: 2,
                requestUrl,
              });
              document.body.removeChild(clone);
              saveAs(
                blob,
                `${markdownView.getDisplayText().replace(/\s+/g, "_")}.jpg`
              );
            })();
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
      },
    });

    this.addCommand({
      id: "copy-as-image-zh",
      name: "Copy as image",
      checkCallback: (checking: boolean) => {
        // Conditions to check
        const markdownView =
          this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView?.getMode() === "preview") {
          // If checking is true, we're simply "checking" if the command can be run.
          // If checking is false, then we want to actually perform the operation.
          if (!checking) {
            (async () => {
              const el = markdownView.contentEl.find(
                ".markdown-reading-view>.markdown-preview-view>.markdown-preview-section"
              );
              const clone = await cloneDom(el, markdownView);
              const blob = await domtoimage.toBlob(clone, {
                // width: width * 2,
                // height: height * 2,
                width: clone.clientWidth,
                height: clone.clientHeight,
                bgcolor: window.getComputedStyle(el.closest(".view-content")!)
                  .backgroundColor,
                quality: 0.85,
                scale: 2,
                requestUrl,
              });
              document.body.removeChild(clone);
              const data = [
                new ClipboardItem({
                  [blob.type]: blob,
                }),
              ];
              await navigator.clipboard.write(data);
              new Notice("Copied!");
            })();
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
      },
    });
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
