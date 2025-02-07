import {
  Notice, Platform, requestUrl, type App, type TFile,
} from 'obsidian';
import saveAs from 'file-saver';
import JsPdf from 'jspdf';
import JSZip from 'jszip';
import domtoimage from '../dom-to-image-more';
import L from '../L';
import makeHTML from './makeHTML';
import { fileToBase64, delay, getMime } from '.';

async function getBlob(el: HTMLElement, higtResolution: boolean, type: string): Promise<Blob> {
  return domtoimage.toBlob(el, {
    width: el.clientWidth,
    height: el.clientHeight,
    quality: 0.85,
    scale: higtResolution ? 2 : 1,
    requestUrl,
    type,
  }) as Promise<Blob>;
}

async function makePdf(blob: Blob, el: HTMLElement) {
  const dataUrl = await fileToBase64(blob);
  const pdf = new JsPdf({
    unit: 'in',
    format: [el.clientWidth / 96, el.clientHeight / 96],
    orientation: el.clientWidth > el.clientHeight ? 'l' : 'p',
    compress: true,
  });
  pdf.addImage(
    dataUrl,
    'JPEG',
    0,
    0,
    el.clientWidth / 96,
    el.clientHeight / 96,
  );
  return pdf;
}

async function saveToVault(app: App, blob: Blob, filename: string) {
  const filePath = await app.fileManager.getAvailablePathForAttachment(filename);
  await app.vault.createBinary(filePath, await blob.arrayBuffer());
  return filePath;
}

export async function save(
  app: App,
  el: HTMLElement,
  title: string,
  higtResolution: boolean,
  format: FileFormat,
  isMobile: boolean,
) {
  const blob: Blob = await getBlob(
    el,
    higtResolution,
    getMime(format),
  );
  const filename = `${title.replaceAll(/\s+/g, '_')}.${format.replace(/\d$/, '')}`;
  switch (format) {
    case 'jpg':
    case 'webp':
    case 'png0':
    case 'png1': {
      if (isMobile) {
        const filePath = await app.fileManager.getAvailablePathForAttachment(
          filename,
        );
        await app.vault.createBinary(filePath, await blob.arrayBuffer());
        new Notice(L.saveSuccess({ filePath }));
      } else {
        saveAs(blob, filename);
      }

      break;
    }

    case 'pdf': {
      const pdf = await makePdf(blob, el);
      if (isMobile) {
        const filePath = await app.fileManager.getAvailablePathForAttachment(
          filename,
        );
        await app.vault.createBinary(filePath, pdf.output('arraybuffer'));
        new Notice(L.saveSuccess({ filePath }));
      } else {
        pdf.save(filename);
      }

      break;
    }
  }
}

export async function copy(
  el: HTMLElement,
  higtResolution: boolean,
  format: FileFormat,
) {
  if (format === 'pdf') {
    new Notice(L.copyNotAllowed());
    return;
  }

  const blob = await getBlob(
    el,
    higtResolution,
    getMime(format),
  );
  const data: ClipboardItem[] = [];
  data.push(
    new ClipboardItem({
      [blob.type]: blob,
    }),
  );
  await navigator.clipboard.write(data);
  new Notice(L.copiedSuccess());
}

export async function saveMultipleFiles(
  files: TFile[],
  settings: ISettings,
  onProgress: (finished: number) => void,
  app: App,
  folderName: string,
  containner: HTMLDivElement,
) {
  const { format, '2x': higtResolution } = settings;
  let finished = 0;
  if (format === 'pdf') {
    let pdf: JsPdf | undefined;
    for (const file of files) {
      const el = await makeHTML(file, settings, app, containner);
      await delay(20);
      const width = el.clientWidth;
      const height = el.clientHeight;
      const blob = await getBlob(
        el as HTMLElement,
        higtResolution,
        'image/jpeg',
      );
      const dataUrl = await fileToBase64(blob);
      if (pdf) {
        pdf.addPage([width / 96, height / 96], width > height ? 'l' : 'p');
      } else {
        pdf = new JsPdf({
          unit: 'in',
          format: [width / 96, height / 96],
          orientation: width > height ? 'l' : 'p',
          compress: true,
        });
      }

      pdf.addImage(dataUrl, 'JPEG', 0, 0, width / 96, height / 96);
      finished++;
      onProgress(finished);
    }

    if (!pdf) {
      return;
    }

    const fileName = `${folderName.replaceAll(/\s+/g, '_')}.pdf`;
    if (Platform.isMobile) {
      const filePath = await saveToVault(app, new Blob([pdf.output('arraybuffer')]), fileName);
      new Notice(L.saveSuccess({ filePath }));
    } else {
      pdf?.save(fileName);
    }
  } else {
    const ext = format.replace(/\d$/, '');
    const zip = new JSZip();
    const blobs: { blob: Blob; filename: string }[] = [];

    for (const file of files) {
      const el = await makeHTML(file, settings, app, containner);
      const blob = await getBlob(
        el as HTMLElement,
        higtResolution,
        getMime(format),
      );
      const filename = `${file.basename.replaceAll(/\s+/g, '_')}.${ext}`;
      blobs.push({ blob, filename });
      finished++;
      onProgress(finished);
    }

    if (Platform.isMobile) {
      // 在移动端直接保存到 vault
      for (const { blob, filename } of blobs) {
        const filePath = await saveToVault(app, blob, filename);
        new Notice(L.saveSuccess({ filePath }));
      }
    } else {
      // 在桌面端创建 zip
      for (const { blob, filename } of blobs) {
        zip.file(filename, blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, `${folderName.replaceAll(/\s+/g, '_')}.zip`);
    }
  }
}

export async function getRemoteImageUrl(url?: string) {
  if (!url || !url.startsWith('http')) {
    return url;
  }
  try {
    const response = await requestUrl({
      url,
      method: 'GET',
    });
    const blob = new Blob([response.arrayBuffer], { type: response.headers['content-type'] || 'application/octet-stream' });
    const res = URL.createObjectURL(blob);
    return res;
  } catch (error) {
    console.error('Failed to load image:', error);
    return url;
  }
}

export async function saveAll(
  target: { element: HTMLElement; contentElement: HTMLElement; setClip: (startY: number, height: number) => void; resetClip: () => void },
  format: FileFormat,
  higtResolution: boolean,
  splitHeight: number,
  splitOverlap: number,
  app: App,
  title: string,
  hiddenRef: HTMLDivElement,
) {
  try {
    // 计算需要分割的页数
    const totalHeight = target.contentElement.clientHeight;
    // 计算最小分割高度：重叠高度 + 50px
    const minSplitHeight = splitOverlap + 50;
    // 使用设置的高度和最小高度中的较大值
    const effectiveHeight = Math.max(splitHeight, minSplitHeight);
    const firstPageHeight = effectiveHeight;
    const remainingHeight = totalHeight - firstPageHeight;
    const additionalPages = Math.max(0, Math.ceil(remainingHeight / (effectiveHeight - splitOverlap)));
    const totalPages = 1 + additionalPages;

    if (format === 'pdf') {
      // PDF 格式：创建多页 PDF
      let pdf: JsPdf | undefined;

      for (let i = 0; i < totalPages; i++) {
        const startY = i === 0 ? 0 : firstPageHeight + (i - 1) * (effectiveHeight - splitOverlap);
        let currentHeight: number;

        if (i === totalPages - 1) {
          // 最后一页：使用实际剩余高度
          currentHeight = totalHeight - startY;
        } else {
          // 其他页：使用设定的分割高度
          currentHeight = i === 0 ? firstPageHeight : effectiveHeight;
        }

        // 设置裁剪区域
        target.setClip(startY, currentHeight);
        await delay(20); // 等待渲染

        const blob = await getBlob(
          target.element,
          higtResolution,
          'image/jpeg'
        );
        const dataUrl = await fileToBase64(blob);

        if (!pdf) {
          pdf = new JsPdf({
            unit: 'in',
            format: [target.element.clientWidth / 96, currentHeight / 96],
            orientation: target.element.clientWidth > currentHeight ? 'l' : 'p',
            compress: true,
          });
        } else {
          pdf.addPage([target.element.clientWidth / 96, currentHeight / 96], target.element.clientWidth > currentHeight ? 'l' : 'p');
        }

        pdf.addImage(dataUrl, 'JPEG', 0, 0, target.element.clientWidth / 96, currentHeight / 96);
      }

      const filename = `${title.replaceAll(/\s+/g, '_')}.pdf`;
      if (Platform.isMobile) {
        const filePath = await saveToVault(app, new Blob([pdf!.output('arraybuffer')]), filename);
        new Notice(L.saveSuccess({ filePath }));
      } else {
        pdf?.save(filename);
      }
    } else {
      // 其他图片格式：分别保存每个部分
      const ext = format.replace(/\d$/, '');
      const zip = new JSZip();
      const blobs: { blob: Blob; filename: string }[] = [];

      for (let i = 0; i < totalPages; i++) {
        const startY = i === 0 ? 0 : firstPageHeight + (i - 1) * (effectiveHeight - splitOverlap);
        let currentHeight: number;

        if (i === totalPages - 1) {
          // 最后一页：使用实际剩余高度
          currentHeight = totalHeight - startY;
        } else {
          // 其他页：使用设定的分割高度
          currentHeight = i === 0 ? firstPageHeight : effectiveHeight;
        }

        // 设置裁剪区域
        target.setClip(startY, currentHeight);
        await delay(20); // 等待渲染

        const blob = await getBlob(target.element, higtResolution, getMime(format));
        const filename = `${title.replaceAll(/\s+/g, '_')}_${i + 1}.${ext}`;
        blobs.push({ blob, filename });
      }

      if (Platform.isMobile) {
        // 在移动端直接保存到 vault
        for (const { blob, filename } of blobs) {
          const filePath = await saveToVault(app, blob, filename);
          new Notice(L.saveSuccess({ filePath }));
        }
      } else {
        // 在桌面端创建 zip
        for (const { blob, filename } of blobs) {
          zip.file(filename, blob);
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `${title.replaceAll(/\s+/g, '_')}.zip`);
      }
    }
  } finally {
    // 确保无论成功还是失败都恢复原始状态
    target.resetClip();
  }
}
