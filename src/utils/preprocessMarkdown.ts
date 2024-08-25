import { FrontMatterCache } from "obsidian";

export function preprocessMarkdown(
  markdown: string,
  frontmatter: FrontMatterCache | undefined,
) {
  if (frontmatter?.["excalidraw-plugin"]) {
    return markdown.replace(/[ ]*excalidraw-plugin:.+[\n\r]*/, "");
  }
  return markdown;
}
