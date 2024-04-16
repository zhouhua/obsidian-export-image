import {type App, Modal, type TFile} from 'obsidian';
import React, {
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {type Root, createRoot} from 'react-dom/client';
import {createHtml, fileToBase64} from '../../utils';
import L from '../../L';

const ImageSelect: FC<{
  imageList: TFile[];
  app: App;
  onSelect: (img: string) => void;
  onClose: () => void;
}> = ({imageList, app, onSelect, onClose}) => {
  const [list, setList] = useState<TFile[]>(imageList);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<TFile | undefined>(
    imageList?.[0] || null,
  );
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (keyword) {
      const regExp = new RegExp(keyword.split('').join('.*'), 'i');
      setList(imageList.filter(file => regExp.test(file.path)));
    } else {
      setList(imageList);
    }
  }, [keyword, imageList]);
  useEffect(() => {
    if (list.length === 0) {
      setSelected(undefined);
    } else if (!selected || !list.find(file => file.path === selected.path)) {
      setSelected(list?.[0] || null);
    }
  }, [selected, list]);
  useEffect(() => {
    previewRef.current?.empty();
    if (selected) {
      createHtml(selected.path, app).then(html =>
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        previewRef.current?.appendChild(html),
      ).catch(() => {
        // empty
      });
    }
  }, [selected]);
  const submit = useCallback(async () => {
    if (selected) {
      const file = await selected.vault.adapter.readBinary(selected.path);
      const blob = new Blob([file], {type: 'image/' + selected.extension});
      const url = await fileToBase64(blob);
      onSelect(url);
    }
  }, [onSelect, selected]);
  return (
    <div className='export-image-select-photo'>
      <div className='search-input-container'>
        <input
          enterKeyHint='search'
          type='search'
          spellCheck='false'
          value={keyword}
          placeholder={L.imageSelect.search()}
          onChange={e => {
            setKeyword(e.target.value);
          }}
        />
        <div className='search-input-clear-button'></div>
      </div>
      <div className='export-image-select-photo-main'>
        <div className='export-image-select-photo-left'>
          {list.length > 0 ? (
            list.map(file => (
              <div
                key={file.path}
                title={file.path}
                onClick={() => {
                  setSelected(file);
                }}
                style={{
                  background:
                    selected?.path === file.path
                      ? 'var(--background-modifier-hover)'
                      : 'transparent',
                }}
              >
                {file.path}
              </div>
            ))
          ) : (
            <div className='export-image-select-empty'>
              {L.imageSelect.empty()}
            </div>
          )}
        </div>
        <div className='export-image-select-preview' ref={previewRef}></div>
      </div>
      <div className='export-image-select-selected'>
        {selected?.path || ' '}
      </div>
      <div className='export-image-select-actions'>
        <button
          className='mod-cta'
          disabled={!selected}
          onClick={submit}
          style={{marginRight: 40}}
        >
          {L.imageSelect.select()}
        </button>
        <button onClick={onClose}>{L.imageSelect.cancel()}</button>
      </div>
    </div>
  );
};

export default class ImageSelectModal extends Modal {
  select: (img: string) => void;
  root: Root;
  constructor(app: App, select: (img: string) => void) {
    super(app);
    this.select = select;
  }

  onOpen() {
    const {contentEl, select} = this;
    const imageList = this.app.vault
      .getFiles()
      .filter(file => /^jpe?g|png$/i.test(file.extension || ''));
    this.root = createRoot(contentEl);

    this.root.render(
      <ImageSelect
        imageList={imageList}
        app={this.app}
        onSelect={select}
        onClose={() => {
          this.close();
        }}
      ></ImageSelect>,
    );
  }

  onClose() {
    const {contentEl, root} = this;
    root?.unmount();
    contentEl.empty();
  }
}
