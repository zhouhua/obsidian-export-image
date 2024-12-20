import type { App } from 'obsidian';
import L from 'src/L';
import { formatAvailable } from 'src/settings';
import { delay } from './utils';

// 从 type.d.ts 中引入类型
type FileFormat = 'png0' | 'png1' | 'jpg' | 'webp' | 'pdf';

export interface SettingItem<T = any> {
  id: string;
  label: string;
  description?: string;
  type: 'text' | 'number' | 'toggle' | 'dropdown' | 'color' | 'file';
  defaultValue?: T;
  placeholder?: string;
  options?: Array<{ value: string; text: string }>;
  validate?: (value: T) => boolean;
  onChange?: (value: T, app: App) => void | Promise<void>;
  show?: (settings: ISettings) => boolean;
}

export const createSettingConfig = async (app: App): Promise<SettingItem[]> => {
  await delay(50);
  return [
    {
      id: 'width',
      label: L.setting.imageWidth.label(),
      description: L.setting.imageWidth.description(),
      type: 'number',
      placeholder: '640',
    },
    {
      id: 'showFilename',
      label: L.setting.filename.label(),
      description: L.setting.filename.desscription(),
      type: 'toggle',
    },
    {
      id: 'showMetadata',
      label: L.setting.metadata.label(),
      type: 'toggle',
    },
    {
      id: '2x',
      label: L.setting['2x'].label(),
      description: L.setting['2x'].description(),
      type: 'toggle',
    },
    {
      id: 'format',
      label: L.setting.format.title(),
      description: L.setting.format.description(),
      type: 'dropdown',
      options: [
        { value: 'png0', text: L.setting.format.png0() },
        { value: 'png1', text: L.setting.format.png1() },
        { value: 'jpg', text: L.setting.format.jpg() },
        { value: 'webp', text: '.webp' },
        { value: 'pdf', text: L.setting.format.pdf() },
      ].filter(({ value }) => formatAvailable.contains(value as FileFormat)),
    },
    {
      id: 'quickExportSelection',
      label: L.setting.quickExportSelection.label(),
      description: L.setting.quickExportSelection.description(),
      type: 'toggle',
    },
    {
      id: 'authorInfo.show',
      label: L.setting.userInfo.show(),
      type: 'toggle',
    },
    {
      id: 'authorInfo.name',
      label: L.setting.userInfo.name(),
      type: 'text',
      show: (settings) => settings.authorInfo.show,
    },
    {
      id: 'authorInfo.remark',
      label: L.setting.userInfo.remark(),
      type: 'text',
      show: (settings) => settings.authorInfo.show,
    },
    {
      id: 'authorInfo.avatar',
      label: L.setting.userInfo.avatar.title(),
      description: L.setting.userInfo.avatar.description(),
      type: 'file',
      show: (settings) => settings.authorInfo.show,
    },
    {
      id: 'authorInfo.position',
      label: L.setting.userInfo.position(),
      type: 'dropdown',
      options: [
        { value: 'top', text: 'Top' },
        { value: 'bottom', text: 'Bottom' },
      ],
      show: (settings) => settings.authorInfo.show,
    },
    {
      id: 'authorInfo.align',
      label: L.setting.userInfo.align(),
      type: 'dropdown',
      options: [
        { value: 'left', text: 'Left' },
        { value: 'center', text: 'Center' },
        { value: 'right', text: 'Right' },
      ],
      show: (settings) => settings.authorInfo.show,
    },
    {
      id: 'watermark.enable',
      label: L.setting.watermark.enable.label(),
      description: L.setting.watermark.enable.description(),
      type: 'toggle',
    },
    {
      id: 'watermark.type',
      label: L.setting.watermark.type.label(),
      description: L.setting.watermark.type.description(),
      type: 'dropdown',
      options: [
        { value: 'text', text: L.setting.watermark.type.text() },
        { value: 'image', text: L.setting.watermark.type.image() },
      ],
      show: (settings) => settings.watermark.enable,
    },
    {
      id: 'watermark.text.content',
      label: L.setting.watermark.text.content(),
      type: 'text',
      show: (settings) => settings.watermark.enable && settings.watermark.type === 'text',
    },
    {
      id: 'watermark.text.color',
      label: L.setting.watermark.text.color(),
      type: 'color',
      defaultValue: '#cccccc',
      show: (settings) => settings.watermark.enable && settings.watermark.type === 'text',
    },
    {
      id: 'watermark.text.fontSize',
      label: L.setting.watermark.text.fontSize(),
      type: 'number',
      placeholder: '16',
      show: (settings) => settings.watermark.enable && settings.watermark.type === 'text',
    },
    {
      id: 'watermark.image.src',
      label: L.setting.watermark.image.src.label(),
      type: 'file',
      show: (settings) => settings.watermark.enable && settings.watermark.type === 'image',
    },
    {
      id: 'watermark.opacity',
      label: L.setting.watermark.opacity(),
      type: 'number',
      placeholder: '0.2',
      show: (settings) => settings.watermark.enable,
    },
    {
      id: 'watermark.rotate',
      label: L.setting.watermark.rotate(),
      type: 'number',
      placeholder: '-30',
      show: (settings) => settings.watermark.enable,
    },
    {
      id: 'watermark.width',
      label: L.setting.watermark.width(),
      type: 'number',
      placeholder: '120',
      show: (settings) => settings.watermark.enable,
    },
    {
      id: 'watermark.height',
      label: L.setting.watermark.height(),
      type: 'number',
      placeholder: '64',
      show: (settings) => settings.watermark.enable,
    },
    {
      id: 'watermark.x',
      label: L.setting.watermark.x(),
      type: 'number',
      placeholder: '100',
      show: (settings) => settings.watermark.enable,
    },
    {
      id: 'watermark.y',
      label: L.setting.watermark.y(),
      type: 'number',
      placeholder: '100',
      show: (settings) => settings.watermark.enable,
    },
  ];
};
