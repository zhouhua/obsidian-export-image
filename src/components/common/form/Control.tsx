import React, {type FC, useRef} from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import {type App} from 'obsidian';
import {fileToBase64} from '../../../utils';
import L from '../../../L';
import ImageSelectModal from '../imageSelectModal';

const Control: FC<{
  fieldSchema: FieldSchema<ISettings>;
  setting: ISettings;
  update: (settings: ISettings) => void;
  app: App;
}> = ({fieldSchema, setting, update, app}) => {
  const value: ValueType = get(setting, fieldSchema.path) as ValueType;
  const inputReference = useRef<HTMLInputElement>(null);
  const onChange = (value: any) => {
    const newSetting = {...setting};
    set(newSetting, fieldSchema.path, value);
    update(newSetting);
  };

  const upload = async () => {
    const file = inputReference.current?.files?.[0];
    if (file) {
      onChange(await fileToBase64(file));
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
        <>
          <div
            className='user-info-avatar'
            style={{
              backgroundImage: value ? `url(${value})` : 'none',
              display: value ? 'block' : 'none',
            }}
          ></div>
          <button onClick={() => inputReference.current?.click()}>
            {L.setting.watermark.image.src.upload()}
            <input
              style={{display: 'none'}}
              type='file'
              ref={inputReference}
              onChange={upload}
            />
          </button>
          <button onClick={select}>
            {L.setting.watermark.image.src.select()}
          </button>
        </>
      );
    }
  }
};

export default Control;
