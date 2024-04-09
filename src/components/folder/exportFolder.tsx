import React from "react";
import { App, Modal, TFolder } from "obsidian";
import { createRoot } from "react-dom/client";
import ModalContent from "./ModalContent";
import L from "../../L";

export default async function (app: App, settings: ISettings, folder: TFolder) {
  const modal = new Modal(app);
  modal.setTitle(L.exportFolder());
  modal.modalEl.style.width = "640px";
  modal.open();
  const root = createRoot(modal.contentEl);
  root.render(
    <ModalContent
      settings={settings}
      app={app}
      folder={folder}
      close={() => modal.close()}
    />
  );
  modal.onClose = () => {
    root?.unmount();
  };
}
