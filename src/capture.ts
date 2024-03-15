import { Notice, requestUrl } from "obsidian";
import domtoimage from "./dom-to-image-more";
import saveAs from "file-saver";

async function getBlob(el: HTMLElement) {
  return await domtoimage.toJpeg(el, {
    width: el.clientWidth,
    height: el.clientHeight,
    quality: 0.85,
    scale: 2,
    requestUrl,
  });
}

export async function save(el: HTMLElement, title: string) {
  const blob = await getBlob(el);
  saveAs(blob, `${title.replace(/\s+/g, "_")}.jpg`);
}

export async function copy(el: HTMLElement) {
  const blob = await getBlob(el);
  const data = [
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ];
  await navigator.clipboard.write(data);
  new Notice("Copied to clipboard");
}
