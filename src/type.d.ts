export interface ISettings {
  width?: number;
  showFilename: boolean;
  "2x": boolean;
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

type ConditionType =
  | { flag: any; path: string }
  | ((data: ISettings) => boolean);

interface BaseFieldSchema {
  label: string;
  path: string;
  type: "number" | "string" | "boolean" | "file";
  when?: ConditionType;
  desc?: string;
}
interface SelectFieldSchema {
  label: string;
  path: string;
  type: "select";
  options: { text: string; value: string }[];
  when?: ConditionType;
  desc?: string;
}
export type FieldSchema = BaseFieldSchema | SelectFieldSchema;
export type FormSchema = FieldSchema[];
