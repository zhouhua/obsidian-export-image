declare type FileFormat = 'png0' | 'png1' | 'jpg' | 'pdf' | 'webp';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare type ISettings = {
  width?: number;
  showFilename: boolean;
  '2x': boolean;
  format: FileFormat;
  showMetadata: boolean;
  recursive: boolean;
  quickExportSelection: boolean;
  authorInfo: {
    show: boolean;
    name?: string;
    remark?: string;
    avatar?: string;
    align?: 'left' | 'center' | 'right';
    position?: 'top' | 'bottom';
  };
  watermark: {
    enable: boolean;
    type?: 'text' | 'image';
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
};

type ConditionType<T> = { flag: any; path: string } | ((data: T) => boolean);

type ValueType = 'number' | 'string' | 'boolean' | 'file';

type BaseFieldSchema<T> = {
  label: string;
  path: string;
  type: ValueType;
  when?: ConditionType<T>;
  desc?: string;
};
type SelectFieldSchema<T> = {
  label: string;
  path: string;
  type: 'select';
  options: Array<{ text: string; value: string }>;
  when?: ConditionType<T>;
  desc?: string;
};
declare type FieldSchema<T> = BaseFieldSchema<T> | SelectFieldSchema<T>;
declare type FormSchema<T> = Array<FieldSchema<T>>;

declare type MetadataType =
  | 'text'
  | 'date'
  | 'datetime'
  | 'checkbox'
  | 'multitext'
  | 'number'
  | 'tags'
  | 'aliases';
