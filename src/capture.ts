import { Notice, requestUrl } from "obsidian";
import domtoimage from "./dom-to-image-more";
import saveAs from "file-saver";
import L from "./L";

async function getBlob(el: HTMLElement, higtResolution: boolean) {
  const root = el.closest(".export-image-root") || el;
  return await domtoimage.toBlob(root, {
    width: root.clientWidth,
    height: root.clientHeight,
    quality: 0.85,
    scale: higtResolution ? 2 : 1,
    requestUrl,
  });
}

export async function save(
  el: HTMLElement,
  title: string,
  higtResolution: boolean
) {
  const blob = await getBlob(el, higtResolution);
  saveAs(blob, `${title.replace(/\s+/g, "_")}.jpg`);
}

export async function copy(el: HTMLElement, higtResolution: boolean) {
  const blob = await getBlob(el, higtResolution);
  const data = [
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ];
  await navigator.clipboard.write(data);
  new Notice(L.copiedSuccess());
}
