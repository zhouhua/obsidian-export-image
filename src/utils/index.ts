import {
  type App,
  MarkdownRenderChild,
  MarkdownRenderer,
  type TAbstractFile,
  type TFile,
  normalizePath,
} from 'obsidian';

export function isMarkdownFile(file: TFile | TAbstractFile) {
  return ['md', 'markdown'].includes((file as TFile)?.extension ?? '');
}

export async function fileToBase64(file: Blob): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });

    reader.onerror = error => {
      reject(error);
    };
  });
}

export function fileToUrl(file: File) {
  return URL.createObjectURL(file);
}

export async function getSizeOfImage(
  url: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.addEventListener('load', () => {
      resolve({
        width: Math.round(image.width / 2),
        height: Math.round(image.height / 2),
      });
      URL.revokeObjectURL(url);
      image.remove();
    });

    image.onerror = error => {
      reject(error);
      URL.revokeObjectURL(url);
      image.remove();
    };

    image.src = url;
  });
}

export async function createHtml(
  path: string,
  app: App,
): Promise<HTMLDivElement> {
  const div = createDiv();
  await MarkdownRenderer.render(
    app,
    `![](${normalizePath(path).replaceAll(' ', '%20')})`,
    div,
    '',
    new MarkdownRenderChild(div),
  );
  return div;
}

export function getMetadata(file: TFile, app: App) {
  return app.metadataCache.getFileCache(file)?.frontmatter;
}

export async function delay(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function getMime(format: FileFormat) {
  return `image/${format.includes('png') ? 'png' : (format === 'jpg' ? 'jpeg' : format)}`;
}
