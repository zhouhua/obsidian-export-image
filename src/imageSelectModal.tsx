import { App, Modal, TFile } from "obsidian";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Root, createRoot } from "react-dom/client";
import { createHtml, fileToBase64 } from "./utils";
import L from "./L";

const ImageSelect: FC<{
  imageList: TFile[];
  app: App;
  onSelect: (img: string) => void;
  onClose: () => void;
}> = ({ imageList, app, onSelect, onClose }) => {
  const [list, setList] = useState<TFile[]>(imageList);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<TFile | null>(
    imageList?.[0] || null
  );
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!keyword) {
      setList(imageList);
    } else {
      const regExp = new RegExp(keyword.split("").join(".*"), "i");
      setList(imageList.filter((file) => regExp.test(file.path)));
    }
  }, [keyword, imageList]);
  useEffect(() => {
    if (!list.length) {
      setSelected(null);
    } else if (!selected || !list.find((file) => file.path === selected.path)) {
      setSelected(list?.[0] || null);
    }
  }, [selected, list]);
  useEffect(() => {
    previewRef.current?.empty();
    if (selected) {
      createHtml(selected.path, app).then((html) =>
        previewRef.current?.appendChild(html)
      );
    }
  }, [selected]);
  const submit = useCallback(async () => {
    if (selected) {
      const file = await selected.vault.adapter.readBinary(selected.path);
      const blob = new Blob([file], { type: "image/" + selected.extension });
      const url = await fileToBase64(blob);
      onSelect(url);
    }
  }, [onSelect, selected]);
  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
      <div className="search-input-container">
        <input
          enterKeyHint="search"
          type="search"
          spellCheck="false"
          value={keyword}
          placeholder={L.imageSelect.search()}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="search-input-clear-button"></div>
      </div>
      <div
        style={{
          marginTop: 20,
          borderRadius: 8,
          border: "1px solid var(--background-modifier-border)",
          display: "flex",
        }}
      >
        <div
          style={{
            borderRight: "1px solid var(--background-modifier-border)",
            height: 300,
            overflowY: "auto",
            flex: 1,
            fontSize: "14px",
            lineHeight: "28px",
            padding: 8,
            wordBreak: "keep-all",
            overflowX: "hidden",
          }}
        >
          {list.length ? (
            list.map((file) => (
              <div
                key={file.path}
                title={file.path}
                onClick={() => setSelected(file)}
                style={{
                  background:
                    selected?.path === file.path
                      ? "var(--background-modifier-hover)"
                      : "transparent",
                  cursor: "pointer",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflowX: "hidden",
                }}
              >
                {file.path}
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "16",
                marginTop: 50,
                opacity: 0.8,
              }}
            >
              {L.imageSelect.empty()}
            </div>
          )}
        </div>
        <div
          ref={previewRef}
          style={{
            padding: 20,
            height: 300,
            width: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>
      <div style={{ fontSize: "12px", marginTop: 8, opacity: 0.7 }}>
        {selected?.path || " "}
      </div>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
        <button
          className="mod-cta"
          disabled={!selected}
          onClick={submit}
          style={{ marginRight: 40 }}
        >
          {L.imageSelect.select()}
        </button>
        <button onClick={onClose}>{L.imageSelect.cancel()}</button>
      </div>
    </div>
  );
};

export default class ImageSelectModal extends Modal {
  select: (img: string) => void;
  root: Root;
  constructor(app: App, select: (img: string) => void) {
    super(app);
    this.select = select;
  }

  onOpen() {
    let { contentEl, select } = this;
    const imageList = this.app.vault
      .getFiles()
      .filter((file) => /^jpe?g|png$/i.test(file.extension || ""));
    this.root = createRoot(contentEl);

    this.root.render(
      <ImageSelect
        imageList={imageList}
        app={this.app}
        onSelect={select}
        onClose={() => this.close()}
      ></ImageSelect>
    );
  }

  onClose() {
    let { contentEl, root } = this;
    root?.unmount();
    contentEl.empty();
  }
}
