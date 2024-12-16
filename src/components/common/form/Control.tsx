import React, { type FC, useEffect, useRef, useCallback, useState } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import debounce from 'lodash/debounce';
import { requestUrl, setIcon, type App, Modal } from 'obsidian';
import { fileToBase64 } from '../../../utils';
import L from '../../../L';
import ImageSelectModal from '../imageSelectModal';
import { getRemoteImageUrl } from 'src/utils/capture';

const Control: FC<{
  fieldSchema: FieldSchema<ISettings>;
  setting: ISettings;
  update: (settings: ISettings) => void;
  app: App;
}> = ({ fieldSchema, setting, update, app }) => {
  const value: ValueType = get(setting, fieldSchema.path) as ValueType;
  const [processedImageUrl, setProcessedImageUrl] = useState<string | undefined>(undefined);
  const inputReference = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const onChange = (value: any) => {
    const newSetting = { ...setting };
    set(newSetting, fieldSchema.path, value);
    update(newSetting);
  };

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value);
    }, 500),
    [onChange]
  );

  useEffect(() => {
    if (iconRef.current) {
      setIcon(iconRef.current, 'x');
    }
  }, [iconRef.current]);

  useEffect(() => {
    const processImage = async () => {
      if (fieldSchema.type === 'file' && typeof value === 'string') {
        const url = await getRemoteImageUrl(value);
        setProcessedImageUrl(url);
      } else {
        setProcessedImageUrl(value);
      }
    };
    processImage();
  }, [value, fieldSchema.type]);

  const upload = async () => {
    const file = inputReference.current?.files?.[0];
    if (file) {
      onChange(await fileToBase64(file));
      inputReference.current!.value = '';
    }
  };

  const select = () => {
    const modal = new ImageSelectModal(app, img => {
      onChange(img);
      modal.close();
    });
    modal.open();
  };

  switch (fieldSchema.type) {
    case 'number': {
      return (
        <input
          type='number'
          value={value}
          onChange={e => {
            onChange(e.target.value ? Number(e.target.value) : undefined);
          }
          }
        />
      );
    }

    case 'string': {
      return (
        <input
          type='text'
          value={value}
          onChange={e => {
            onChange(e.target.value);
          }}
        />
      );
    }

    case 'boolean': {
      return (
        <div
          className={`checkbox-container${value ? ' is-enabled' : ''}`}
          onClick={() => {
            onChange(!get(setting, fieldSchema.path));
          }}
        >
          <input type='checkbox' checked={value as unknown as boolean} />
        </div>
      );
    }

    case 'select': {
      return (
        <select
          value={value}
          onChange={e => {
            onChange(e.target.value);
          }}
          className='dropdown'
        >
          {fieldSchema.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      );
    }

    case 'file': {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              className='user-info-avatar'
              style={{
                position: 'relative',
                display: value ? 'block' : 'none',
              }}
            >
              {processedImageUrl && (
                <img
                  src={processedImageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
              <div
                ref={iconRef}
                onClick={() => (onChange(undefined))}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'black',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  ['--icon-size' as string]: '12px',
                  ['--icon-color' as string]: 'var(--color-red)',
                } as React.CSSProperties}
              ></div>
            </div>
            <button onClick={() => inputReference.current?.click()}>
              {L.setting.watermark.image.src.upload()}
              <input
                style={{ display: 'none' }}
                type='file'
                ref={inputReference}
                onChange={upload}
              />
            </button>
            <button onClick={select}>
              {L.setting.watermark.image.src.select()}
            </button>
            <button onClick={() => {
              const currentValue = value || '';
              const modal = new Modal(app);
              modal.titleEl.setText(L.imageUrl());

              const inputContainer = modal.contentEl.createDiv({
                attr: {
                  style: 'margin: 1em 0;'
                }
              });
              const input = inputContainer.createEl('input', {
                attr: {
                  type: 'text',
                  placeholder: '请输入图片URL',
                  style: 'width: 100%'
                }
              });

              input.onkeydown = (e) => {
                if (e.key === 'Enter') {
                  onChange(input.value);
                  modal.close();
                } else if (e.key === 'Escape') {
                  modal.close();
                }
              };

              const buttonDiv = modal.contentEl.createDiv({
                cls: 'modal-button-container',
                attr: {
                  style: 'display: flex; justify-content: flex-end; gap: 8px; margin-top: 1em;'
                }
              });

              const confirmButton = buttonDiv.createEl('button', {
                text: L.confirm(),
                cls: 'mod-cta'
              });
              confirmButton.onclick = () => {
                onChange(input.value);
                modal.close();
              };

              buttonDiv.createEl('button', { text: L.cancel() }).onclick = () => {
                modal.close();
              };

              modal.open();
              setTimeout(() => input.focus(), 0);
            }}>
              {L.imageUrl()}
            </button>
          </div>
        </div>
      );
    }
  }
};

export default Control;
