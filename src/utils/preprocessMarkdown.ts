import { FrontMatterCache } from "obsidian";

export function preprocessMarkdown(
  markdown: string,
  frontmatter: FrontMatterCache | undefined,
) {
  if (frontmatter?.["excalidraw-plugin"]) {
    return markdown.replace(/\s*excalidraw-plugin:.+[\n\r]*/, "");
  }
  return markdown;
}
