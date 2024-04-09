import {
  App,
  MarkdownRenderChild,
  MarkdownRenderer,
  TAbstractFile,
  TFile,
  normalizePath,
} from "obsidian";

export function isMarkdownFile(file: TFile | TAbstractFile) {
  return ["md", "markdown"].includes((file as TFile)?.extension ?? "");
}

export async function fileToBase64(file: Blob): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export function fileToUrl(file: File) {
  return URL.createObjectURL(file);
}

export async function getSizeOfImage(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve({
        width: Math.round(image.width / 2),
        height: Math.round(image.height / 2),
      });
      URL.revokeObjectURL(url);
      image.remove();
    };
    image.onerror = (error) => {
      reject(error);
      URL.revokeObjectURL(url);
      image.remove();
    };
    image.src = url;
  });
}

export async function createHtml(
  path: string,
  app: App
): Promise<HTMLDivElement> {
  const div = createDiv();
  await MarkdownRenderer.render(
    app,
    `![](${normalizePath(path).replace(/ /g, "%20")})`,
    div,
    "",
    new MarkdownRenderChild(div)
  );
  return div;
}

export function getMetadata(file: TFile, app: App) {
  return app.metadataCache.getFileCache(file)?.frontmatter;
}

export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
