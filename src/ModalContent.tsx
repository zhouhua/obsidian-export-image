import { App, ButtonComponent, FrontMatterCache, Notice } from "obsidian";
import {
  useState,
  useRef,
  FC,
  useEffect,
  useCallback,
  MouseEventHandler,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React from "react";
import get from "lodash/get";
import L from "./L";
import { FieldSchema, FormSchema, ISettings, MetadataType } from "./type";
import Control from "./Control";
import Watermark, { WatermarkProps } from "@pansy/react-watermark";
import Metadata from "./Metadata";

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
  copy: () => void;
  save: () => void;
  settings: ISettings;
  frontmatter: FrontMatterCache | undefined;
  title: string;
  app: App;
  metadataMap: Record<string, { type: MetadataType }>;
}> = ({
  markdownEl,
  copy,
  save,
  settings,
  app,
  frontmatter,
  title,
  metadataMap,
}) => {
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
    markdownEl.childNodes.forEach((child) =>
      contentRef.current?.appendChild?.(child)
    );
  }, []);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

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

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (
        (e.target as HTMLElement).closest("button") &&
        (formData.width || 640) <= 20
      ) {
        new Notice(L.invalidWidth());
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [formData.width]
  );

  useEffect(() => {
    if (actionsRef.current) {
      const copyButton = new ButtonComponent(actionsRef.current);
      copyButton.setIcon("clipboard-copy").buttonEl.createSpan({
        text: L.copy(),
        attr: { style: "padding-left: 10px" },
      });
      copyButton.buttonEl.style.marginRight = "40px";
      copyButton.onClick(copy);
      const saveButton = new ButtonComponent(actionsRef.current);
      saveButton.setIcon("image-down").buttonEl.createSpan({
        text: L.save(),
        attr: { style: "padding-left: 10px" },
      });
      saveButton.onClick(save);
    }
    return () => {
      actionsRef.current?.childNodes.forEach((c) => c.remove());
    };
  }, [copy, save]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "20px 0",
          ["--line-height-tight" as any]: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            fontSize: "14px",
            lineHeight: "28px",
          }}
        >
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
                      updata={setFormData}
                      app={app}
                    ></Control>
                  </div>
                </div>
              )
          )}
          <div style={{ lineHeight: "20px", opacity: 0.6, fontSize: "12px" }}>
            {L.moreSetting()}
          </div>
        </div>
        <div style={{ width: "50%", padding: 20 }}>
          <div
            ref={previewOutRef}
            style={{
              height: mainHeight,
              width: "100%",
              transition: "width 0.25s",
              cursor: isGrabbing ? "grabbing" : "grab",
            }}
          >
            <TransformWrapper
              minScale={Math.min(
                1,
                mainHeight / (root as HTMLDivElement).clientHeight,
                (previewOutRef.current?.clientWidth || 400) /
                  ((root as HTMLDivElement).clientWidth + 2)
              )}
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
                            className="metadata-content"
                            style={{
                              color: "var(--metadata-label-text-color)",
                              fontSize: "var(--metadata-label-font-size)",
                              fontWeight: "var(--metadata-label-font-weight)",
                              padding: "20px 0",
                            }}
                          >
                            {Object.keys(frontmatter).map((name) => (
                              <Metadata
                                name={name}
                                key={name}
                                value={frontmatter[name]}
                                type={metadataMap[name]?.type || "text"}
                              ></Metadata>
                            ))}
                          </div>
                        )}
                      <div ref={contentRef}></div>
                    </div>
                  </Watermark>
                  {formData.authorInfo.show &&
                    (formData.authorInfo.avatar ||
                      formData.authorInfo.name) && (
                      <div
                        style={{
                          display: "flex",
                          [formData.authorInfo.position === "top"
                            ? "borderBottom"
                            : "borderTop"]:
                            "1px solid var(--background-modifier-border)",
                          padding: "16px 32px",
                          justifyContent:
                            alignMap[formData.authorInfo.align || "right"],
                          alignItems: "center",
                          background:
                            formData.format === "png"
                              ? "unset"
                              : "var(--background-primary)",
                        }}
                      >
                        {formData.authorInfo.avatar && (
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              border:
                                "1px solid var(--background-modifier-border)",
                              backgroundImage: `url(${formData.authorInfo.avatar})`,
                              backgroundSize: "cover",
                              margin: "0 20px",
                            }}
                          ></div>
                        )}
                        {formData.authorInfo.name && (
                          <div>
                            <div
                              style={{
                                fontSize: "16px",
                                paddingBottom: "6",
                              }}
                            >
                              {formData.authorInfo.name}
                            </div>
                            {formData.authorInfo.remark && (
                              <div
                                style={{
                                  opacity: 0.5,
                                  fontSize: "12px",
                                }}
                              >
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
          <div style={{ lineHeight: "20px", opacity: 0.6, fontSize: "12px" }}>
            {L.guide()}
          </div>
        </div>
      </div>
      <div
        ref={actionsRef}
        onClickCapture={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      ></div>
    </div>
  );
};

export default ModalContent;
