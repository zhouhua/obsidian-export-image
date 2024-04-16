import React from 'react';
import {type App, Modal, type TFolder} from 'obsidian';
import {createRoot} from 'react-dom/client';
import L from '../../L';
import ModalContent from './ModalContent';

export default async function (app: App, settings: ISettings, folder: TFolder) {
  const modal = new Modal(app);
  modal.setTitle(L.exportFolder());
  modal.modalEl.style.width = '800px';
  modal.open();
  const root = createRoot(modal.contentEl);
  root.render(
    <ModalContent
      settings={settings}
      app={app}
      folder={folder}
      close={() => {
        modal.close();
      }}
    />,
  );
  modal.onClose = () => {
    root?.unmount();
  };
}
