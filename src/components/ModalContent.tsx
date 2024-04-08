import { App, FrontMatterCache, Notice } from "obsidian";
import { useState, useRef, FC, useEffect, useCallback } from "react";
import { copy, save } from "../utils/capture";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React from "react";
import get from "lodash/get";
import L from "../L";
import { FieldSchema, FormSchema, ISettings, MetadataType } from "../type";
import Control from "./common/Control";
import Watermark, { WatermarkProps } from "@pansy/react-watermark";
import Metadata from "./common/Metadata";

const alignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const formSchema: FormSchema = [
  {
    label: L.includingFilename(),
    path: "showFilename",
    type: "boolean",
  },
  {
    label: L.imageWidth(),
    path: "width",
    type: "number",
  },
  {
    label: L.setting.userInfo.show(),
    path: "authorInfo.show",
    type: "boolean",
  },
  {
    label: L.setting.userInfo.name(),
    path: "authorInfo.name",
    type: "string",
    when: { flag: true, path: "authorInfo.show" },
  },
  {
    label: L.setting.userInfo.remark(),
    path: "authorInfo.remark",
    type: "string",
    when: { flag: true, path: "authorInfo.show" },
  },
  {
    label: L.setting.userInfo.avatar.title(),
    desc: L.setting.userInfo.avatar.description(),
    path: "authorInfo.avatar",
    type: "file",
    when: { flag: true, path: "authorInfo.show" },
  },
  {
    label: L.setting.userInfo.align(),
    path: "authorInfo.align",
    type: "select",
    options: [
      { text: "Left", value: "left" },
      { text: "Center", value: "center" },
      { text: "Right", value: "right" },
    ],
    when: { flag: true, path: "authorInfo.show" },
  },
  {
    label: L.setting.userInfo.position(),
    path: "authorInfo.position",
    type: "select",
    options: [
      { text: "Top", value: "top" },
      { text: "Bottom", value: "bottom" },
    ],
    when: { flag: true, path: "authorInfo.show" },
  },
  {
    label: L.setting.watermark.enable.label(),
    path: "watermark.enable",
    type: "boolean",
  },
  {
    label: L.setting.watermark.type.label(),
    path: "watermark.type",
    type: "select",
    options: [
      { text: L.setting.watermark.type.text(), value: "text" },
      { text: L.setting.watermark.type.image(), value: "image" },
    ],
    when: { flag: true, path: "watermark.enable" },
  },
  {
    label: L.setting.watermark.text.content(),
    path: "watermark.text.content",
    type: "string",
    when: (settings) =>
      settings.watermark.enable && settings.watermark.type === "text",
  },
  {
    label: L.setting.watermark.image.src.label(),
    path: "watermark.image.src",
    type: "file",
    when: (settings) =>
      settings.watermark.enable && settings.watermark.type === "image",
  },
  {
    label: L.setting.watermark.opacity(),
    path: "watermark.opacity",
    type: "number",
    when: { flag: true, path: "watermark.enable" },
  },
  {
    label: L.setting.watermark.rotate(),
    path: "watermark.rotate",
    type: "number",
    when: { flag: true, path: "watermark.enable" },
  },
  {
    label: L.setting.watermark.width(),
    path: "watermark.width",
    type: "number",
    when: { flag: true, path: "watermark.enable" },
  },
  {
    label: L.setting.watermark.height(),
    path: "watermark.height",
    type: "number",
    when: { flag: true, path: "watermark.enable" },
  },
];

function isShow(field: FieldSchema, settings: ISettings) {
  if (!field.when) {
    return true;
  }
  if (typeof field.when === "function") {
    return field.when(settings);
  }
  return get(settings, field.when.path) === field.when.flag;
}

const ModalContent: FC<{
  markdownEl: Node;
  settings: ISettings;
  frontmatter: FrontMatterCache | undefined;
  title: string;
  app: App;
  metadataMap: Record<string, { type: MetadataType }>;
}> = ({ markdownEl, settings, app, frontmatter, title, metadataMap }) => {
  const [formData, setFormData] = useState<ISettings>(settings);
  const [watermarkProps, setWatermarkProps] = useState<WatermarkProps>({});
  const [isGrabbing, setIsGrabbing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const previewOutRef = useRef<HTMLDivElement>(null);
  const mainHeight = Math.min(764, window.innerHeight * 0.85 - 225);
  const root =
    (markdownEl as HTMLDivElement).closest(".export-image-root") || markdownEl;

  useEffect(() => {
    contentRef.current?.appendChild(markdownEl);
  }, []);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const [processing, setProcessing] = useState(false);

  const handleSave = useCallback(async () => {
    if ((formData.width || 640) <= 20) {
      new Notice(L.invalidWidth());
      return;
    }
    setProcessing(true);
    await save(
      app,
      root as HTMLDivElement,
      title,
      formData["2x"],
      formData.format,
      // @ts-ignore
      app.isMobile
    );
    setProcessing(false);
  }, [root, formData["2x"], formData.format, title, formData.width]);
  const handleCopy = useCallback(async () => {
    if ((formData.width || 640) <= 20) {
      new Notice(L.invalidWidth());
      return;
    }
    setProcessing(true);
    await copy(root as HTMLDivElement, formData["2x"], formData.format);
    setProcessing(false);
  }, [root, formData["2x"], formData.format, title, formData.width]);

  useEffect(() => {
    const props: WatermarkProps = {
      monitor: false,
      mode: "interval",
      visible: formData.watermark.enable,
      rotate: formData.watermark.rotate ?? -30,
      opacity: formData.watermark.opacity ?? 0.2,
      height: formData.watermark.height ?? 64,
      width: formData.watermark.width ?? 120,
      gapX: formData.watermark.x ?? 100,
      gapY: formData.watermark.y ?? 100,
    };

    if (formData.watermark.type === "text") {
      props.text = formData.watermark.text.content;
      props.fontSize = formData.watermark.text.fontSize || 16;
      props.fontColor = formData.watermark.text.color || "#cccccc";
      props.image = undefined;
    } else {
      props.image = formData.watermark.image.src;
    }
    setWatermarkProps(props);
  }, [formData]);

  return (
    <div className="export-image-preview-root">
      <div className="export-image-preview-main">
        <div className="export-image-preview-left">
          {formSchema.map(
            (fieldSchema) =>
              isShow(fieldSchema, formData) && (
                <div
                  className="setting-item"
                  key={fieldSchema.path}
                  style={{ padding: "10px 0" }}
                >
                  <div className="setting-item-info">
                    <div className="setting-item-name">{fieldSchema.label}</div>
                    {fieldSchema.desc && (
                      <div className="setting-item-description">
                        {fieldSchema.desc}
                      </div>
                    )}
                  </div>
                  <div className="setting-item-control">
                    <Control
                      fieldSchema={fieldSchema}
                      setting={formData}
                      update={setFormData}
                      app={app}
                    ></Control>
                  </div>
                </div>
              )
          )}
          <div className="info-text">{L.moreSetting()}</div>
        </div>
        <div className="export-image-preview-right">
          <div
            className="export-image-preview-out"
            ref={previewOutRef}
            style={{
              height: mainHeight,
              cursor: isGrabbing ? "grabbing" : "grab",
            }}
          >
            <TransformWrapper
              minScale={
                Math.min(
                  1,
                  mainHeight / (root as HTMLDivElement).clientHeight,
                  (previewOutRef.current?.clientWidth || 400) /
                    ((root as HTMLDivElement).clientWidth + 2)
                ) / 2
              }
              maxScale={4}
              pinch={{ step: 20 }}
              doubleClick={{ mode: "reset" }}
              centerZoomedOut={false}
              onPanning={() => setIsGrabbing(true)}
              onPanningStop={() => setIsGrabbing(false)}
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: mainHeight,
                }}
                contentStyle={{
                  border: "1px var(--divider-color) solid",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 0 10px 10px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  className={`export-image-root ${(
                    frontmatter?.cssclasses || []
                  ).join(" ")}`}
                  style={{
                    display: "flex",
                    flexDirection:
                      formData.authorInfo.position === "bottom"
                        ? "column"
                        : "column-reverse",
                    backgroundColor:
                      formData.format === "png"
                        ? "unset"
                        : "var(--background-primary)",
                  }}
                >
                  <Watermark {...watermarkProps}>
                    <div
                      className="markdown-preview-view markdown-rendered export-image-preview-container"
                      style={{
                        width: `${formData.width}px`,
                        transition: "width 0.25s",
                      }}
                    >
                      {formData.showFilename && (
                        <div className="inline-title" autoCapitalize="on">
                          {title}
                        </div>
                      )}
                      {formData.showMetadata &&
                        frontmatter &&
                        Object.keys(frontmatter).length > 0 && (
                          <div
                            className="metadata-container"
                            style={{ display: "block" }}
                          >
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
                  {formData.authorInfo.show &&
                    (formData.authorInfo.avatar ||
                      formData.authorInfo.name) && (
                      <div
                        className="user-info-container"
                        style={{
                          [formData.authorInfo.position === "top"
                            ? "borderBottom"
                            : "borderTop"]:
                            "1px solid var(--background-modifier-border)",

                          justifyContent:
                            alignMap[formData.authorInfo.align || "right"],
                          background:
                            formData.format === "png"
                              ? "unset"
                              : "var(--background-primary)",
                        }}
                      >
                        {formData.authorInfo.avatar && (
                          <div
                            className="user-info-avatar"
                            style={{
                              backgroundImage: `url(${formData.authorInfo.avatar})`,
                            }}
                          ></div>
                        )}
                        {formData.authorInfo.name && (
                          <div>
                            <div className="user-info-name">
                              {formData.authorInfo.name}
                            </div>
                            {formData.authorInfo.remark && (
                              <div className="user-info-remark">
                                {formData.authorInfo.remark}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>
          <div className="info-text">{L.guide()}</div>
        </div>
      </div>
      <div ref={actionsRef} className="export-image-preview-actions">
        <button onClick={handleCopy} disabled={processing}>
          {L.copy()}
        </button>
        <button onClick={handleSave} disabled={processing}>
          {/* @ts-ignore */}
          {app.isMobile ? L.saveVault() : L.save()}
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
