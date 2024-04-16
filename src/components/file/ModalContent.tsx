import {type App, type FrontMatterCache, Notice} from 'obsidian';
import React, {
  useState, useRef, type FC, useEffect, useCallback,
} from 'react';
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import {isCopiable} from 'src/imageFormatTester';
import {copy, save} from '../../utils/capture';
import L from '../../L';
import Target from '../common/Target';
import FormItems from '../common/form/FormItems';

const formSchema: FormSchema<ISettings> = [
  {
    label: L.includingFilename(),
    path: 'showFilename',
    type: 'boolean',
  },
  {
    label: L.imageWidth(),
    path: 'width',
    type: 'number',
  },
  {
    label: L.setting.userInfo.show(),
    path: 'authorInfo.show',
    type: 'boolean',
  },
  {
    label: L.setting.userInfo.name(),
    path: 'authorInfo.name',
    type: 'string',
    when: {flag: true, path: 'authorInfo.show'},
  },
  {
    label: L.setting.userInfo.remark(),
    path: 'authorInfo.remark',
    type: 'string',
    when: {flag: true, path: 'authorInfo.show'},
  },
  {
    label: L.setting.userInfo.avatar.title(),
    desc: L.setting.userInfo.avatar.description(),
    path: 'authorInfo.avatar',
    type: 'file',
    when: {flag: true, path: 'authorInfo.show'},
  },
  {
    label: L.setting.userInfo.align(),
    path: 'authorInfo.align',
    type: 'select',
    options: [
      {text: 'Left', value: 'left'},
      {text: 'Center', value: 'center'},
      {text: 'Right', value: 'right'},
    ],
    when: {flag: true, path: 'authorInfo.show'},
  },
  {
    label: L.setting.userInfo.position(),
    path: 'authorInfo.position',
    type: 'select',
    options: [
      {text: 'Top', value: 'top'},
      {text: 'Bottom', value: 'bottom'},
    ],
    when: {flag: true, path: 'authorInfo.show'},
  },
  {
    label: L.setting.watermark.enable.label(),
    path: 'watermark.enable',
    type: 'boolean',
  },
  {
    label: L.setting.watermark.type.label(),
    path: 'watermark.type',
    type: 'select',
    options: [
      {text: L.setting.watermark.type.text(), value: 'text'},
      {text: L.setting.watermark.type.image(), value: 'image'},
    ],
    when: {flag: true, path: 'watermark.enable'},
  },
  {
    label: L.setting.watermark.text.content(),
    path: 'watermark.text.content',
    type: 'string',
    when: settings =>
      settings.watermark.enable && settings.watermark.type === 'text',
  },
  {
    label: L.setting.watermark.image.src.label(),
    path: 'watermark.image.src',
    type: 'file',
    when: settings =>
      settings.watermark.enable && settings.watermark.type === 'image',
  },
  {
    label: L.setting.watermark.opacity(),
    path: 'watermark.opacity',
    type: 'number',
    when: {flag: true, path: 'watermark.enable'},
  },
  {
    label: L.setting.watermark.rotate(),
    path: 'watermark.rotate',
    type: 'number',
    when: {flag: true, path: 'watermark.enable'},
  },
  {
    label: L.setting.watermark.width(),
    path: 'watermark.width',
    type: 'number',
    when: {flag: true, path: 'watermark.enable'},
  },
  {
    label: L.setting.watermark.height(),
    path: 'watermark.height',
    type: 'number',
    when: {flag: true, path: 'watermark.enable'},
  },
];

const ModalContent: FC<{
  markdownEl: Node;
  settings: ISettings;
  frontmatter: FrontMatterCache | undefined;
  title: string;
  app: App;
  metadataMap: Record<string, {type: MetadataType}>;
}> = ({markdownEl, settings, app, frontmatter, title, metadataMap}) => {
  const [formData, setFormData] = useState<ISettings>(settings);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const previewOutRef = useRef<HTMLDivElement>(null);
  const mainHeight = Math.min(764, (window.innerHeight * 0.85) - 225);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFormData(settings);
  }, [settings]);
  const [processing, setProcessing] = useState(false);
  const [allowCopy, setAllowCopy] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    isCopiable(formData.format).then(result => {
      setAllowCopy(Boolean(result));
    });
  }, [formData.format]);

  const handleSave = useCallback(async () => {
    if ((formData.width || 640) <= 20) {
      new Notice(L.invalidWidth());
      return;
    }

    setProcessing(true);
    try {
      await save(
        app,
        root.current!,
        title,
        formData['2x'],
        formData.format,
        // @ts-ignore
        app.isMobile as boolean,
      );
    } catch {
      new Notice(L.saveFail());
    }

    setProcessing(false);
  }, [root, formData['2x'], formData.format, title, formData.width]);
  const handleCopy = useCallback(async () => {
    if ((formData.width || 640) <= 20) {
      new Notice(L.invalidWidth());
      return;
    }

    setProcessing(true);
    try {
      await copy(root.current!, formData['2x'], formData.format);
    } catch {
      new Notice(L.copyFail());
    }

    setProcessing(false);
  }, [root, formData['2x'], formData.format, title, formData.width]);

  return (
    <div className='export-image-preview-root'>
      <div className='export-image-preview-main'>
        <div className='export-image-preview-left'>
          <FormItems
            formSchema={formSchema}
            update={setFormData}
            settings={formData}
            app={app}
          />
          <div className='info-text'>{L.moreSetting()}</div>
        </div>
        <div className='export-image-preview-right'>
          <div
            className='export-image-preview-out'
            ref={previewOutRef}
            style={{
              height: mainHeight,
              cursor: isGrabbing ? 'grabbing' : 'grab',
            }}
          >
            <TransformWrapper
              minScale={
                Math.min(
                  1,
                  mainHeight / (root.current?.clientHeight || 100),
                  (previewOutRef.current?.clientWidth || 400)
                    / ((root.current?.clientWidth || 0) + 2),
                ) / 2
              }
              maxScale={4}
              pinch={{step: 20}}
              doubleClick={{mode: 'reset'}}
              centerZoomedOut={false}
              onPanning={() => {
                setIsGrabbing(true);
              }}
              onPanningStop={() => {
                setIsGrabbing(false);
              }}
            >
              <TransformComponent
                wrapperStyle={{
                  width: '100%',
                  height: mainHeight,
                }}
                contentStyle={{
                  border: '1px var(--divider-color) solid',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 0 10px 10px rgba(0,0,0,0.15)',
                }}
              >
                <Target
                  ref={root}
                  frontmatter={frontmatter}
                  markdownEl={markdownEl}
                  setting={formData}
                  metadataMap={metadataMap}
                  app={app}
                  title={title}
                ></Target>
              </TransformComponent>
            </TransformWrapper>
          </div>
          <div className='info-text'>{L.guide()}</div>
        </div>
      </div>
      <div className='export-image-preview-actions'>
        <div>
          <button onClick={handleCopy} disabled={processing || !allowCopy}>
            {L.copy()}
          </button>
          {allowCopy || <p>{L.notAllowCopy({format: formData.format.replace(/\d$/, '').toUpperCase()})}</p>}
        </div>
        <button onClick={handleSave} disabled={processing}>
          {/* @ts-ignore */}
          {app.isMobile ? L.saveVault() : L.save()}
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
