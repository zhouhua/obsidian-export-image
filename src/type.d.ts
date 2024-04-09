declare type FileFormat = "jpg" | "png" | "pdf";

declare interface ISettings {
  width?: number;
  showFilename: boolean;
  "2x": boolean;
  format: FileFormat;
  showMetadata: boolean;
  recursive: boolean;
  authorInfo: {
    show: boolean;
    name?: string;
    remark?: string;
    avatar?: string;
    align?: "left" | "center" | "right";
    position?: "top" | "bottom";
  };
  watermark: {
    enable: boolean;
    type?: "text" | "image";
    text: {
      content?: string;
      fontSize?: number;
      color?: string;
    };
    image: {
      src?: string;
    };
    opacity?: number;
    rotate?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
}

type ConditionType<T> = { flag: any; path: string } | ((data: T) => boolean);

interface BaseFieldSchema<T> {
  label: string;
  path: string;
  type: "number" | "string" | "boolean" | "file";
  when?: ConditionType<T>;
  desc?: string;
}
interface SelectFieldSchema<T> {
  label: string;
  path: string;
  type: "select";
  options: { text: string; value: string }[];
  when?: ConditionType<T>;
  desc?: string;
}
declare type FieldSchema<T> = BaseFieldSchema<T> | SelectFieldSchema<T>;
declare type FormSchema<T> = FieldSchema<T>[];

declare type MetadataType =
  | "text"
  | "date"
  | "datetime"
  | "checkbox"
  | "multitext"
  | "number"
  | "tags"
  | "aliases";
