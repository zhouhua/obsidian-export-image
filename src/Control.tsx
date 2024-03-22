import React, { FC, useEffect, useRef } from "react";
import { FieldSchema, ISettings } from "./type";
import get from "lodash/get";
import set from "lodash/set";
import { fileToBase64 } from "./utils";
import L from "./L";
import ImageSelectModal from "./imageSelectModal";
import { App } from "obsidian";

const Control: FC<{
  fieldSchema: FieldSchema;
  setting: ISettings;
  updata: (settings: ISettings) => void;
  app: App;
}> = ({ fieldSchema, setting, updata, app }) => {
  const value = get(setting, fieldSchema.path);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (value: any) => {
    const newSetting = { ...setting };
    set(newSetting, fieldSchema.path, value);
    updata(newSetting);
  };
  const upload = async () => {
    const file = inputRef.current?.files?.[0];
    if (file) {
      onChange(await fileToBase64(file));
    }
  };
  const select = () => {
    const modal = new ImageSelectModal(app, (img) => {
      onChange(img);
      modal.close();
    });
    modal.open();
  };

  switch (fieldSchema.type) {
    case "number": {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(e.target.value ? Number(e.target.value) : undefined)
          }
        />
      );
    }
    case "string": {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    case "boolean": {
      return (
        <div
          className={`checkbox-container${value ? " is-enabled" : ""}`}
          onClick={() => onChange(!get(setting, fieldSchema.path))}
        >
          <input type="checkbox" checked={value} />
        </div>
      );
    }
    case "select": {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="dropdown"
        >
          {fieldSchema.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      );
    }
    case "file": {
      return (
        <>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid var(--background-modifier-border)",
              backgroundImage: value ? `url(${value})` : "none",
              backgroundSize: "cover",
              display: value ? "block" : "none",
            }}
          ></div>
          <button onClick={() => inputRef.current?.click()}>
            {L.setting.watermark.image.src.upload()}
            <input
              style={{ display: "none" }}
              ref={inputRef}
              onChange={upload}
            />
          </button>
          <button onClick={select}>
            {L.setting.watermark.image.src.select()}
          </button>
        </>
      );
    }
    default:
      return null;
  }
};

export default Control;
