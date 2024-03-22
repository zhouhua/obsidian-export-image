import React, { FC, useEffect, useRef } from "react";
import { App, MarkdownRenderChild, MarkdownRenderer } from "obsidian";
import { createRoot } from "react-dom/client";
import { Watermark, WatermarkProps } from "@pansy/react-watermark";

import type { ISettings } from "./type";

const defaultConfig: WatermarkProps = {
  monitor: false,
  mode: "interval",
};

const Preview: FC<{ setting: ISettings; el: HTMLDivElement }> = ({
  setting,
  el,
}) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    container.current?.appendChild(el);
  });
  const props: WatermarkProps = {
    ...defaultConfig,
    visible: setting.watermark.enable,
    rotate: setting.watermark.rotate ?? -30,
    opacity: setting.watermark.opacity ?? 0.2,
    height: setting.watermark.height ?? 64,
    width: setting.watermark.width ?? 120,
    gapX: setting.watermark.x ?? 100,
    gapY: setting.watermark.y ?? 100,
  };

  if (setting.watermark.type === "text") {
    props.text = setting.watermark.text.content;
    props.fontSize = setting.watermark.text.fontSize || 16;
    props.fontColor = setting.watermark.text.color || "#cccccc";
    props.image = undefined;
  } else {
    props.image = setting.watermark.image.src;
  }

  return (
    <Watermark {...props}>
      <div
        className="markdown-preview-view markdown-rendered"
        ref={container}
        style={{
          border: "1px solid var(--background-modifier-border)",
          borderRadius: 8,
        }}
      ></div>
    </Watermark>
  );
};

export const renderPreview = (root: HTMLElement, app: App) => {
  const el = createDiv();
  MarkdownRenderer.render(
    app,
    [
      "# test markdown",
      "some content...\n",
      "some content...\n",
      "some content...\n",
      "some content...\n",
    ].join("\n"),
    el,
    "/",
    new MarkdownRenderChild(el)
  );
  const r = createRoot(root);
  return (setting: ISettings) =>
    r.render(<Preview setting={setting} el={el}></Preview>);
};
