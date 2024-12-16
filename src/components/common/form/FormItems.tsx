import get from 'lodash/get';
import React, {
  type FC,
} from 'react';
import { type App } from 'obsidian';
import Control from './Control';

function isShow(field: FieldSchema<ISettings>, settings: ISettings) {
  if (!field.when) {
    return true;
  }

  if (typeof field.when === 'function') {
    return field.when(settings);
  }

  return get(settings, field.when.path) === field.when.flag;
}

const FormItems: FC<{
  formSchema: FormSchema<ISettings>;
  settings: ISettings;
  update: (data: ISettings) => void;
  app: App;
}> = ({ formSchema, settings, update, app }) => (
  <>
    {formSchema.map(
      fieldSchema =>
        isShow(fieldSchema, settings) && (
          <div
            className='setting-item'
            key={fieldSchema.path}
            style={{ padding: '10px 0' }}
          >
            <div className='setting-item-info'>
              <div className='setting-item-name'>{fieldSchema.label}</div>
              {fieldSchema.desc && (
                <div className='setting-item-description'>
                  {fieldSchema.desc}
                </div>
              )}
            </div>
            <div className='setting-item-control'>
              <Control
                fieldSchema={fieldSchema}
                setting={settings}
                update={update}
                app={app}
              ></Control>
            </div>

          </div>
        ),
    )}
  </>
);

export default FormItems;
