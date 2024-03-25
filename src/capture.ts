import { Notice, requestUrl } from "obsidian";
import domtoimage from "./dom-to-image-more";
import saveAs from "file-saver";
import L from "./L";
import { fileToBase64 } from "./utils";
import jsPdf from "jspdf";
import { FileFormat } from "./type";

async function getBlob(el: HTMLElement, higtResolution: boolean, type: string) {
  const root = el.closest(".export-image-root") || el;
  return await domtoimage.toBlob(root, {
    width: root.clientWidth,
    height: root.clientHeight,
    quality: 0.85,
    scale: higtResolution ? 2 : 1,
    requestUrl,
    type,
  });
}

async function makePdf(blob: any, el: HTMLElement) {
  const dataUrl = await fileToBase64(blob);
  const pdf = new jsPdf({
    unit: "in",
    format: [el.clientWidth / 96, el.clientHeight / 96],
    compress: true,
  });
  pdf.addImage(
    dataUrl,
    "JPEG",
    0,
    0,
    el.clientWidth / 96,
    el.clientHeight / 96
  );
  return pdf;
}

export async function save(
  el: HTMLElement,
  title: string,
  higtResolution: boolean,
  format: FileFormat
) {
  const blob = await getBlob(
    el,
    higtResolution,
    `image/${format === "png" ? "png" : "jpeg"}`
  );
  switch (format) {
    case "jpg":
    case "png":
      saveAs(blob, `${title.replace(/\s+/g, "_")}.${format}`);
      break;
    case "pdf":
      const pdf = await makePdf(blob, el);
      pdf.save(`${title.replace(/\s+/g, "_")}.${format}`);
      break;
    default:
      break;
  }
}

export async function copy(
  el: HTMLElement,
  higtResolution: boolean,
  format: FileFormat
) {
  if (format === "pdf") {
    new Notice("pdf 格式不支持复制");
    return;
  }
  const blob = await getBlob(
    el,
    higtResolution,
    `image/${format === "png" ? "png" : "jpeg"}`
  );
  const data: ClipboardItem[] = [];
  data.push(
    new ClipboardItem({
      [blob.type]: blob,
    })
  );
  await navigator.clipboard.write(data);
  new Notice(L.copiedSuccess());
}
