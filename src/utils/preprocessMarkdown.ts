import { FrontMatterCache } from "obsidian";

export function preprocessMarkdown(
  markdown: string,
  frontmatter: FrontMatterCache | undefined,
) {
  if (frontmatter?.["excalidraw-plugin"]) {
    markdown.replace(/\s*excalidraw-plugin:.+[\n\r]*/, "");
  }
  return markdown;
}
