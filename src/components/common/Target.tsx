import { App, FrontMatterCache } from "obsidian";
import React, { FC, useEffect, useRef, useState } from "react";
import Watermark, { WatermarkProps } from "@pansy/react-watermark";
import Metadata from "./Metadata";

const alignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const Target: FC<{
  frontmatter: FrontMatterCache | undefined;
  setting: ISettings;
  title: string;
  metadataMap: Record<string, { type: MetadataType }>;
  markdownEl: Node;
  app: App;
}> = ({ frontmatter, setting, title, metadataMap, markdownEl, app }) => {
  const [watermarkProps, setWatermarkProps] = useState<WatermarkProps>({});
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    contentRef.current?.appendChild(markdownEl);
  }, []);
  useEffect(() => {
    const props: WatermarkProps = {
      monitor: false,
      mode: "interval",
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
    setWatermarkProps(props);
  }, [setting]);

  return (
    <div
      className={`export-image-root ${(frontmatter?.cssclasses || []).join(
        " "
      )}`}
      style={{
        display: "flex",
        flexDirection:
          setting.authorInfo.position === "bottom"
            ? "column"
            : "column-reverse",
        backgroundColor:
          setting.format === "png" ? "unset" : "var(--background-primary)",
      }}
    >
      <Watermark {...watermarkProps}>
        <div
          className="markdown-preview-view markdown-rendered export-image-preview-container"
          style={{
            width: `${setting.width}px`,
            transition: "width 0.25s",
          }}
        >
          {setting.showFilename && (
            <div className="inline-title" autoCapitalize="on">
              {title}
            </div>
          )}
          {setting.showMetadata &&
            frontmatter &&
            Object.keys(frontmatter).length > 0 && (
              <div className="metadata-container" style={{ display: "block" }}>
                <div className="metadata-content">
                  {Object.keys(frontmatter).map((name) => (
                    <Metadata
                      name={name}
                      key={name}
                      value={frontmatter[name]}
                      type={metadataMap[name]?.type || "text"}
                    ></Metadata>
                  ))}
                </div>
              </div>
            )}
          <div ref={contentRef}></div>
        </div>
      </Watermark>
      {setting.authorInfo.show &&
        (setting.authorInfo.avatar || setting.authorInfo.name) && (
          <div
            className="user-info-container"
            style={{
              [setting.authorInfo.position === "top"
                ? "borderBottom"
                : "borderTop"]: "1px solid var(--background-modifier-border)",

              justifyContent: alignMap[setting.authorInfo.align || "right"],
              background:
                setting.format === "png"
                  ? "unset"
                  : "var(--background-primary)",
            }}
          >
            {setting.authorInfo.avatar && (
              <div
                className="user-info-avatar"
                style={{
                  backgroundImage: `url(${setting.authorInfo.avatar})`,
                }}
              ></div>
            )}
            {setting.authorInfo.name && (
              <div>
                <div className="user-info-name">{setting.authorInfo.name}</div>
                {setting.authorInfo.remark && (
                  <div className="user-info-remark">
                    {setting.authorInfo.remark}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default Target;