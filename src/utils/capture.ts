import { Notice, requestUrl, App } from "obsidian";
import domtoimage from "../dom-to-image-more";
import saveAs from "file-saver";
import L from "../L";
import { fileToBase64 } from ".";
import jsPdf from "jspdf";
import { FileFormat } from "../type";

async function getBlob(el: HTMLElement, higtResolution: boolean, type: string) {
  return await domtoimage.toBlob(el, {
    width: el.clientWidth,
    height: el.clientHeight,
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
  app: App,
  el: HTMLElement,
  title: string,
  higtResolution: boolean,
  format: FileFormat,
  isMobile: boolean
) {
  const blob: Blob = await getBlob(
    el,
    higtResolution,
    `image/${format === "png" ? "png" : "jpeg"}`
  );
  const filename = `${title.replace(/\s+/g, "_")}.${format}`;
  switch (format) {
    case "jpg":
    case "png":
      if (isMobile) {
        const filePath = await app.fileManager.getAvailablePathForAttachment(
          filename
        );
        await app.vault.createBinary(filePath, await blob.arrayBuffer());
        new Notice(L.saveSuccess({ filePath }));
      } else {
        saveAs(blob, filename);
      }
      break;
    case "pdf":
      const pdf = await makePdf(blob, el);
      if (isMobile) {
        const filePath = await app.fileManager.getAvailablePathForAttachment(
          filename
        );
        await app.vault.createBinary(filePath, await blob.arrayBuffer());
        new Notice(L.saveSuccess({ filePath }));
      } else {
        pdf.save(filename);
      }
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
