import { ButtonComponent, Notice } from "obsidian";
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
import i18n from "./i18n";

const ModalContent: FC<{
  markdownEl: Node;
  copy: () => void;
  save: () => void;
}> = ({ markdownEl, copy, save }) => {
  const [showTitle, setShowTitle] = useState(true);
  const [width, setWidth] = useState(640);
  const [inputWidth, setInputWidth] = useState("640");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(Number(inputWidth));
  }, [inputWidth]);

  useEffect(() => {
    contentRef.current?.appendChild?.(markdownEl);
  }, []);

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if ((e.target as HTMLElement).closest("button") && width <= 20) {
        new Notice(i18n("invalidWidth"));
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [width]
  );

  useEffect(() => {
    if (actionsRef.current) {
      const copyButton = new ButtonComponent(actionsRef.current);
      copyButton.setIcon("clipboard-copy").buttonEl.createSpan({
        text: i18n("copy"),
        attr: { style: "padding-left: 10px" },
      });
      copyButton.buttonEl.style.marginRight = "40px";
      copyButton.onClick(copy);
      const saveButton = new ButtonComponent(actionsRef.current);
      saveButton.setIcon("image-down").buttonEl.createSpan({
        text: i18n("save"),
        attr: { style: "padding-left: 10px" },
      });
      saveButton.onClick(save);
    }
    return () => {
      actionsRef.current?.childNodes.forEach((c) => c.remove());
    };
  }, [copy, save]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px 0",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>{i18n("includingFilename")}</span>
          <div className="checkbox-container is-enabled">
            <input
              checked={showTitle}
              style={{ verticalAlign: "middle" }}
              onChange={(e) => setShowTitle(e.target.checked)}
              type="checkbox"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <span>{i18n("imageWidth")}</span>
          <div>
            <input
              step="10"
              value={inputWidth}
              type="number"
              style={{ width: 100, margin: "0 10px" }}
              onChange={(e) => setInputWidth(e.target.value)}
            />
            px
          </div>
        </div>
      </div>
      <div
        style={{
          overflow: "hidden",
          border: "1px var(--divider-color) solid",
          borderRadius: "4px",
          margin: "40px auto 10px",
          maxHeight: "calc(80vh - 300px)",
          height: "auto",
          width: width + "px",
          maxWidth: "100%",
          transition: "width 0.25s",
          cursor: isGrabbing ? "grabbing" : "grab",
        }}
      >
        <TransformWrapper
          minScale={Math.min(
            1,
            (window.innerHeight * 0.8 - 300) /
              (markdownEl as HTMLElement).clientHeight,
            524 / (markdownEl as HTMLElement).clientWidth
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
              maxWidth: "100%",
              maxHeight: "calc(80vh - 300px)",
            }}
          >
            <div
              className={showTitle ? "" : "hide-filename"}
              ref={contentRef}
              style={{
                width: `${width}px`,
                transition: "width 0.25s",
              }}
            ></div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div style={{ marginBottom: 20, opacity: 0.6, fontSize: "12px" }}>
        Drag to Move, scroll or pinch to zoom in/out, double click to reset.
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
    </>
  );
};

export default ModalContent;
