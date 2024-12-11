import React, { type FC, type JSX } from 'react';

type PropType = { name: string } & (
  | {
    type: 'text' | 'date' | 'datetime';
    value: string | undefined;
  }
  | {
    type: 'number';
    value: number | undefined;
  }
  | {
    type: 'checkbox';
    value: boolean;
  }
  | {
    type: 'tags' | 'multitext' | 'aliases';
    value: string[] | undefined;
  }
);

const iconMap: Record<MetadataType, JSX.Element> = {
  text: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='svg-icon'
    >
      <path d='M17 6.1H3'></path>
      <path d='M21 12.1H3'></path>
      <path d='M15.1 18H3'></path>
    </svg>
  ),
  number: (
    <svg
      className='svg-icon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <rect x='14' y='14' width='4' height='6' rx='2' />
      <rect x='6' y='4' width='4' height='6' rx='2' />
      <path d='M6 20h4' />
      <path d='M14 10h4' />
      <path d='M6 14h2v6' />
      <path d='M14 4h2v6' />
    </svg>
  ),
  multitext: (
    <svg
      className='svg-icon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <line x1='8' x2='21' y1='6' y2='6' />
      <line x1='8' x2='21' y1='12' y2='12' />
      <line x1='8' x2='21' y1='18' y2='18' />
      <line x1='3' x2='3.01' y1='6' y2='6' />
      <line x1='3' x2='3.01' y1='12' y2='12' />
      <line x1='3' x2='3.01' y1='18' y2='18' />
    </svg>
  ),
  tags: (
    <svg
      className='svg-icon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path d='m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19' />
      <path d='M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z' />
      <circle cx='6.5' cy='9.5' r='.5' fill='currentColor' />
    </svg>
  ),
  date: (
    <svg
      className='svg-icon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
    </svg>
  ),
  datetime: (
    <svg
      className='svg-icon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path d='M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5' />
      <path d='M16 2v4' />
      <path d='M8 2v4' />
      <path d='M3 10h5' />
      <path d='M17.5 17.5 16 16.3V14' />
      <circle cx='16' cy='16' r='6' />
    </svg>
  ),
  checkbox: (
    <svg
      className='svg-icon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path d='m9 11 3 3L22 4' />
      <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
    </svg>
  ),
  aliases: (
    <svg
      className='svg-icon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <polyline points='15 17 20 12 15 7' />
      <path d='M4 18v-2a4 4 0 0 1 4-4h12' />
    </svg>
  ),
};

const Metadata: FC<PropType> = ({ type, name, value }) => {
  if (['cssclasses'].contains(name)) {
    return null;
  }

  if (value === null) {
    return null;
  }

  const iconSvg = iconMap[type] || iconMap.text;
  let valueElement: string | number | JSX.Element;
  switch (type) {
    case 'text': {
      if (!value) {
        return null;
      }

      let content = value;
      if (typeof value === 'string') {
        const match = /^\[\[(.+)]]$/.exec(value);
        if (match) {
          content = match[1];
        }
      } else {
        content = JSON.stringify(value);
      }

      valueElement = (
        <div className='metadata-input-longtext mod-truncate'>{content}</div>
      );
      break;
    }

    case 'number': {
      valueElement = (
        <input
          className='metadata-input metadata-input-number'
          type='number'
          value={value}
        />
      );
      break;
    }

    case 'checkbox': {
      valueElement = (
        <input
          className='metadata-input-checkbox'
          type='checkbox'
          checked={value}
        />
      );
      break;
    }

    case 'date': {
      valueElement = (
        <div className='metadata-input-longtext mod-truncate'>{value}</div>
      );
      break;
    }

    case 'datetime': {
      valueElement = (
        <div className='metadata-input-longtext mod-truncate'>{value}</div>
      );
      break;
    }

    case 'multitext':
    case 'tags':
    case 'aliases': {
      const valueArray = Array.isArray(value) ? value : [value];
      valueElement = (
        <div className='multi-select-container'>
          {valueArray.map(str => (
            <div className='multi-select-pill' style={{ border: 'none' }}>
              <div className='multi-select-pill-content'>
                <span>{str}</span>
              </div>
            </div>
          ))}
        </div>
      );
      break;
    }

    default: {
      return null;
    }
  }

  return (
    <div
      className='metadata-property'
      data-property-type={type}
      data-property-key={name}
      style={{ border: 0 }}
    >
      <div className='metadata-property-key'>
        <span className='metadata-property-icon'>{iconSvg}</span>
        <span className='metadata-property-name'>{name}</span>
      </div>
      <div className='metadata-property-value'>{valueElement}</div>
    </div>
  );
};

export default Metadata;
