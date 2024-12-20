/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const ro = {
  // TODO: Introduceți traducerile dvs. aici
  command: 'Exportă ca imagine',
  noActiveFile: 'Vă rugăm să deschideți mai întâi un articol!',
  imageExportPreview: 'Previzualizare export imagine',
  copiedSuccess: 'Copiat în clipboard',
  copy: 'Copiază în clipboard',
  copyFail: 'Copiere eșuată',
  notAllowCopy: 'Nu se poate copia direct formatul {format}',
  save: 'Salvează imaginea',
  saveSuccess: 'Imaginea a fost exportată și salvată ca {filePath: string}.',
  saveFail: 'Salvare imagine eșuată',
  saveVault: 'Salvează în Vault',
  includingFilename: 'Includere nume fișier ca titlu',
  imageWidth: 'Lățime imagine',
  exportImage: 'Exportă ca imagine',
  exportSelectionImage: 'Exportă selecția ca imagine',
  exportFolder: 'Exportă toate notele ca imagine',
  invalidWidth: 'Vă rugăm să setați lățimea la un număr rezonabil.',
  '2x': 'Activează imaginea cu rezoluție 2x',
  moreSetting:
    'Setări mai detaliate pot fi găsite în setările pluginului `Exportă imagine`.',
  guide: 'Trageți pentru a muta, derulați sau ciupiți pentru zoom, faceți dublu clic pentru a reseta.',
  copyNotAllowed: 'formatul pdf nu este suportat pentru copiere',
  exportAll: 'Exportă notele selectate',
  noMarkdownFile: 'Niciun fișier markdown în directorul curent',
  selectAll: 'Selectează tot',
  setting: {
    title: 'Exportă imagine',
    imageWidth: {
      label: 'Lățimea implicită a imaginii exportate',
      description:
        'Setează lățimea imaginii exportate în pixeli. Implicit este 640px.',
    },
    filename: {
      label: 'Include numele de fișier ca titlu',
      description:
        'Setează dacă numele fișierului trebuie inclus ca titlu. Când Obsidian afișează documentul, afișează numele fișierului ca un titlu h1. Uneori acest lucru nu este dorit și veți obține titluri duplicate.',
    },
    '2x': {
      label: 'Activează imaginea cu rezoluție 2x',
      description:
        'Setează dacă imaginea cu rezoluție 2x trebuie activată. Imaginile cu rezoluție 2x vor apărea mai clare și oferă o experiență mai bună pe ecranele cu PPI ridicat, cum ar fi cele de pe smartphone-uri. Cu toate acestea, dezavantajul este că mărimea fișierului de imagine este mai mare.',
    },
    metadata: {
      label: 'Afișează metadatele',
    },
    format: {
      title: 'Formatul fișierului de ieșire',
      description:
        'Imaginile în format PNG implicit ar trebui să satisfacă majoritatea nevoilor, dar pentru a susține mai bine scenariile utilizatorilor: 1. Suport pentru exportul imaginilor cu fundaluri normale și transparente; 2. Suport pentru exportul imaginilor JPG pentru a obține dimensiuni mai mici ale fișierului, deși s-ar putea să nu fie posibilă copierea directă în clipboard; 3. Suport pentru exportul în format PDF de o singură pagină, care diferă de formatele de hârtie PDF obișnuite, vă rugăm să fiți atenți să nu-l utilizați incorect.',
      png0: '.png - implicit',
      png1: '.png - imagine cu fundal transparent',
      jpg: '.jpg - imagine în format jpg',
      pdf: '.pdf - PDF de o singură pagină',
    },
    quickExportSelection: {
      label: 'Exportă selecție rapidă',
      description: 'Dacă este activat, se va omite procesul de configurare atunci când se exportă notele selectate, iar imaginea exportată se va copia direct în clipboard.',
    },
    userInfo: {
      title: 'Informații autor',
      show: 'Arată informațiile autorului',
      avatar: {
        title: 'Avatar',
        description: 'Se recomandă utilizarea imaginilor pătrate',
      },
      name: 'Numele autorului',
      position: 'Unde să afișeze',
      remark: 'Text suplimentar',
      align: 'Aliniați',
      removeAvatar: 'Elimină avatarul',
    },
    watermark: {
      title: 'Filigran',
      enable: {
        label: 'Activează filigranul',
        description:
          'Activează filigranul, suportă filigrane text și imagine.',
      },
      type: {
        label: 'Tipul de filigran',
        description: 'Setează tipul de filigran, text sau imagine.',
        text: 'Text',
        image: 'Imagine',
      },
      text: {
        content: 'Conținutul textului',
        fontSize: 'Dimensiunea fontului filigranului',
        color: 'Culoarea textului filigranului',
      },
      image: {
        src: {
          label: 'URL imagine',
          upload: 'Încarcă imagine',
          select: 'Selectează din Vault',
        },
      },
      opacity: 'Opacitatea filigranului (0 este transparent, 1 nu este transparent)',
      rotate: 'Rotația filigranului (în grade)',
      width: 'Lățimea filigranului',
      height: 'Înălțimea filigranului',
      x: 'Distanța orizontală a filigranului',
      y: 'Distanța verticală a filigranului',
    },
    preview: 'Previzualizare filigran',
    reset: 'Resetare la implicit',
    recursive: 'Include note din subdirectoare',
  },
  imageSelect: {
    search: 'Caută',
    select: 'Selectează',
    cancel: 'Anulează',
    empty: 'Nicio imagine găsită',
  },
  confirm: 'Confirmați',
  cancel: 'Anulează',
  imageUrl: 'URL imagine',
} satisfies BaseTranslation;

export default ro;
