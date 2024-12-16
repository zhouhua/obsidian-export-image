import React, { type FC, useEffect, useRef, useState } from 'react';
import { type App, MarkdownRenderChild, MarkdownRenderer } from 'obsidian';
import { createRoot } from 'react-dom/client';
import { Watermark, type WatermarkProps } from '@pansy/react-watermark';
import { getRemoteImageUrl } from './utils/capture';

const defaultConfig: WatermarkProps = {
  monitor: false,
  mode: 'interval',
};

const Preview: FC<{ setting: ISettings; el: HTMLDivElement }> = ({
  setting,
  el,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<WatermarkProps>(defaultConfig);
  useEffect(() => {
    container.current?.append(el);
  });

  useEffect(() => {
    (async () => {
      const properties: WatermarkProps = {
        ...defaultConfig,
        visible: setting.watermark.enable,
        rotate: setting.watermark.rotate ?? -30,
        opacity: setting.watermark.opacity ?? 0.2,
        height: setting.watermark.height ?? 64,
        width: setting.watermark.width ?? 120,
        gapX: setting.watermark.x ?? 100,
        gapY: setting.watermark.y ?? 100,
      };

      if (setting.watermark.type === 'text') {
        properties.text = setting.watermark.text.content;
        properties.fontSize = setting.watermark.text.fontSize ?? 16;
        properties.fontColor = setting.watermark.text.color ?? '#cccccc';
        properties.image = undefined;
      } else {
        properties.image = await getRemoteImageUrl(setting.watermark.image.src);
      }
      setProperties(properties);
    })();
  }, [setting.watermark]);

  return (
    <Watermark {...properties}>
      <div
        className='markdown-preview-view markdown-rendered export-image-setting-preview-mock'
        ref={container}
      ></div>
    </Watermark>
  );
};

export const renderPreview = async (root: HTMLElement, app: App) => {
  const element = createDiv();
  await MarkdownRenderer.render(
    app,
    [
      '# test markdown',
      'some content...\n',
      'some content...\n',
      'some content...\n',
      'some content...\n',
    ].join('\n'),
    element,
    '/',
    new MarkdownRenderChild(element),
  );
  const r = createRoot(root);
  return (setting: ISettings) => {
    r.render(<Preview setting={setting} el={element}></Preview>);
  };
};
