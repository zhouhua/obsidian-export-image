import { type App, type FrontMatterCache } from 'obsidian';
import React, {
  forwardRef, useEffect, useRef, useState, useImperativeHandle, useMemo,
} from 'react';
import { type WatermarkProps, Watermark } from '@pansy/react-watermark';
import Metadata from './Metadata';
import { lowerCase } from 'lodash';
import clsx from 'clsx';
import { getRemoteImageUrl } from 'src/utils/capture';
import { calculateSplitLines, getElementMeasures } from 'src/utils/split';

const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export interface TargetRef {
  element: HTMLElement;
  contentElement: HTMLElement;
  setClip: (startY: number, height: number) => void;
  resetClip: () => void;
}

const Target = forwardRef<
  TargetRef,
  {
    frontmatter: FrontMatterCache | undefined;
    setting: ISettings;
    title: string;
    metadataMap: Record<string, { type: MetadataType }>;
    markdownEl: Node;
    app: App;
    scale?: number;
    isProcessing: boolean;
    onSplitChange?: (positions: number[]) => void;
  }
>(({ frontmatter, setting, title, metadataMap, markdownEl, scale = 1, isProcessing, onSplitChange }, ref) => {
  const [watermarkProps, setWatermarkProps] = useState<WatermarkProps>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const [rootHeight, setRootHeight] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new ResizeObserver(() => {
      if (rootRef.current) {
        setRootHeight(rootRef.current.clientHeight);
      }
    });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  const splitLines = useMemo(() => {
    if (!rootHeight || setting.split.mode === 'none') return [];

    let elements;
    if (rootRef.current) {
      elements = getElementMeasures(rootRef.current, setting.split.mode);
    }

    const lines = calculateSplitLines({
      mode: setting.split.mode,
      height: setting.split.height,
      overlap: setting.split.overlap,
      totalHeight: rootHeight,
    }, elements);

    // 通知父组件分页变化
    onSplitChange?.(lines);
    return lines;
  }, [setting.split.height, setting.split.overlap, setting.split.mode, rootHeight, onSplitChange]);

  const splitLineStyle = useMemo(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    height: `${2 / scale}px`,
    borderTop: `${2 / scale}px dashed var(--interactive-accent)`,
    opacity: 0.7,
    pointerEvents: 'none',
  } as const), [scale]);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }
    contentRef.current.innerHTML = '';
    Array.from(markdownEl.childNodes).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent) {
          contentRef.current?.append(child.textContent);
        }
      } else {
        contentRef.current?.append(child.cloneNode(true));
      }
    });
  }, [markdownEl]);

  useImperativeHandle(ref, () => ({
    element: clipRef.current!,
    contentElement: rootRef.current!,
    setClip: (startY: number, height: number) => {
      if (!clipRef.current || !rootRef.current) return;
      clipRef.current.style.height = `${height}px`;
      clipRef.current.style.overflow = 'hidden';
      rootRef.current.style.transform = `translateY(-${startY}px)`;
    },
    resetClip: () => {
      if (!clipRef.current || !rootRef.current) return;
      clipRef.current.style.height = '';
      clipRef.current.style.overflow = '';
      rootRef.current.style.transform = '';
    }
  }), [clipRef.current, rootRef.current]);

  useEffect(() => {
    (async () => {
      const props: WatermarkProps = {
        monitor: false,
        mode: 'interval',
        visible: setting.watermark.enable,
        rotate: setting.watermark.rotate ?? -30,
        opacity: setting.watermark.opacity ?? 0.2,
        height: setting.watermark.height ?? 64,
        width: setting.watermark.width ?? 120,
        gapX: setting.watermark.x ?? 100,
        gapY: setting.watermark.y ?? 100,
      };

      if (setting.watermark.type === 'text') {
        props.text = setting.watermark.text.content;
        props.fontSize = setting.watermark.text.fontSize || 16;
        props.fontColor = setting.watermark.text.color || '#cccccc';
        props.image = undefined;
      } else {
        props.image = await getRemoteImageUrl(setting.watermark.image.src);
      }

      setWatermarkProps(props);
    })();
  }, [setting]);

  return (
    <div ref={clipRef}>
      <div
        className={clsx('export-image-root markdown-reading-view', frontmatter?.cssclasses || frontmatter?.cssclass)}
        ref={rootRef}
        style={{
          display: 'flex',
          flexDirection:
            setting.authorInfo.position === 'bottom'
              ? 'column'
              : 'column-reverse',
          backgroundColor:
            setting.format === 'png1' ? 'unset' : 'var(--background-primary)',
          position: 'relative',
        }}
      >
        <Watermark {...watermarkProps}>
          <div
            className='markdown-preview-view markdown-rendered export-image-preview-container'
            style={{
              width: `${setting.width}px`,
              transition: 'width 0.25s',
            }}
          >
            {setting.showFilename && (
              <div className='inline-title' autoCapitalize='on'>
                {title}
              </div>
            )}
            {setting.showMetadata
              && frontmatter
              && Object.keys(frontmatter).length > 0 && (
                <div className='metadata-container' style={{ display: 'block' }}>
                  <div className='metadata-content'>
                    {Object.keys(frontmatter).map(name => (
                      <Metadata
                        name={name}
                        key={name}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        value={frontmatter[name]}
                        type={metadataMap[lowerCase(name)]?.type || 'text'}
                      ></Metadata>
                    ))}
                  </div>
                </div>
              )}
            <div ref={contentRef} className={`export-image-split-${setting.split.mode} export-image-markdown`}></div>
          </div>
        </Watermark>
        {setting.authorInfo.show
          && (setting.authorInfo.avatar || setting.authorInfo.name) && (
            <div
              className='user-info-container'
              style={{
                [setting.authorInfo.position === 'top'
                  ? 'borderBottom'
                  : 'borderTop']: '1px solid var(--background-modifier-border)',

                justifyContent: alignMap[setting.authorInfo.align || 'right'],
                background:
                  setting.format === 'png1'
                    ? 'unset'
                    : 'var(--background-primary)',
              }}
            >
              {setting.authorInfo.avatar && (
                <div
                  className='user-info-avatar'
                  style={{
                    backgroundImage: `url(${setting.authorInfo.avatar})`,
                  }}
                ></div>
              )}
              {setting.authorInfo.name && (
                <div>
                  <div className='user-info-name'>{setting.authorInfo.name}</div>
                  {setting.authorInfo.remark && (
                    <div className='user-info-remark'>
                      {setting.authorInfo.remark}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        }
        {!isProcessing && splitLines.map((y, index) => (
          <div
            key={index}
            style={{
              ...splitLineStyle,
              top: y,
              zIndex: 10,
            }}
          />
        ))}
      </div>
    </div>
  );
});

export default Target;

