import { Editor, MarkdownView, MarkdownPreviewView, MarkdownRenderer, Notice, Plugin } from 'obsidian';
import dom2Image from 'dom-to-image';
import { saveAs } from 'file-saver';
import { ExportImageSettingTab } from './ExportImageSettingTab';
import { DEFAULT_SETTINGS } from "./constents";
import { cloneNode, delay } from 'dom';


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

              const scrollCache = el.scrollTop;
              el.scrollTo(0, 0);
              await delay(40);
              const totalHeight = el.scrollHeight;
              const screenHeight = el.clientHeight;
              let scrollIndex = 0;
              let height = 0;
              for (let i = 0; i < el.children.length; i++) {
                height += el.children[i].clientHeight;
              }
              const clone = await cloneNode(el);
              const observer = new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(node => {
                node
              })));
              observer.observe(el, {
                childList: true
              });


              el.scrollTo(0, scrollCache);
            })();


            // dom2Image.toBlob(el, {
            //     // width: el.clientWidth * 2,
            //     // height: el.clientHeight * 2,
            //     style: {
            //         // transform: 'scale(2)',
            //         // transformOrigin: 'top left',
            //         width: (el.clientWidth) + 'px',
            //         height: (el.clientHeight) + 'px'
            //     }
            // }).then(blob => {
            //     saveAs(blob, 'export.jpg')
            // })
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
      }
    });

    // this.registerEvent(
    //     this.app.workspace.on("editor-menu", (menu, editor, view) => {
    //         debugger;
    //         console.log(editor, view);
    //       menu.addItem((item) => {
    //         item
    //           .setTitle("Print file path 👈")
    //           .setIcon("document")
    //           .onClick(async () => {
    //             new Notice(view.file.path);
    //           });
    //       });
    //     })
    //   );


    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new ExportImageSettingTab(this.app, this));
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
