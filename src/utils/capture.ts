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
import { calculateSplitPositions, getElementMeasures } from './split';

async function getBlob(el: HTMLElement, resolutionMode: ResolutionMode, type: string): Promise<Blob> {
  const scale = resolutionMode === '2x' ? 2 : resolutionMode === '3x' ? 3 : resolutionMode === '4x' ? 4 : 1;
  return domtoimage.toBlob(el, {
    width: el.clientWidth,
    height: el.clientHeight,
    quality: 0.85,
    scale: scale,
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
  resolutionMode: ResolutionMode,
  format: FileFormat,
  isMobile: boolean,
) {
  const blob: Blob = await getBlob(
    el,
    resolutionMode,
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
  resolutionMode: ResolutionMode,
  format: FileFormat,
) {
  if (format === 'pdf') {
    new Notice(L.copyNotAllowed());
    return;
  }

  const blob = await getBlob(
    el,
    resolutionMode,
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
  let finished = 0;
  const { format, resolutionMode, split } = settings;
  const blobs: { blob: Blob; filename: string }[] = [];

  for (const file of files) {
    const el = await makeHTML(file, settings, app, containner) as HTMLElement;
    await delay(20);

    const target = {
      element: el,
      contentElement: el,
      setClip: (startY: number, height: number) => {
        el.style.height = `${height}px`;
        el.style.overflow = 'hidden';
        el.style.transform = `translateY(-${startY}px)`;
      },
      resetClip: () => {
        el.style.height = '';
        el.style.overflow = '';
        el.style.transform = '';
      },
    };

    await saveAll(
      target,
      format,
      resolutionMode,
      split.height,
      split.overlap,
      split.mode,
      app,
      file.basename,
    );

    finished++;
    onProgress(finished);
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
  resolutionMode: ResolutionMode,
  splitHeight: number,
  splitOverlap: number,
  splitMode: SplitMode,
  app: App,
  title: string,
) {
  try {
    // 计算需要分割的页数和位置
    const totalHeight = target.contentElement.clientHeight;
    const elements = getElementMeasures(target.contentElement, splitMode);

    const splitPositions = calculateSplitPositions({
      mode: splitMode,
      height: splitHeight,
      overlap: splitOverlap,
      totalHeight,
    }, elements);

    if (format === 'pdf') {
      // PDF 格式：创建多页 PDF
      let pdf: JsPdf | undefined;

      for (const { startY, height } of splitPositions) {
        // 设置裁剪区域
        target.setClip(startY, height);
        await delay(20); // 等待渲染

        const blob = await getBlob(
          target.element,
          resolutionMode,
          'image/jpeg'
        );
        const dataUrl = await fileToBase64(blob);

        if (!pdf) {
          pdf = new JsPdf({
            unit: 'in',
            format: [target.element.clientWidth / 96, height / 96],
            orientation: target.element.clientWidth > height ? 'l' : 'p',
            compress: true,
          });
        } else {
          pdf.addPage([target.element.clientWidth / 96, height / 96], target.element.clientWidth > height ? 'l' : 'p');
        }

        pdf.addImage(dataUrl, 'JPEG', 0, 0, target.element.clientWidth / 96, height / 96);
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

      for (let i = 0; i < splitPositions.length; i++) {
        const { startY, height } = splitPositions[i];
        // 设置裁剪区域
        target.setClip(startY, height);
        await delay(20); // 等待渲染

        const blob = await getBlob(target.element, resolutionMode, getMime(format));
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
