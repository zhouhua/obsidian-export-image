/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const hu = {
  command: 'Exportálás képként',
  noActiveFile: 'Kérlek, először nyiss meg egy cikket!',
  imageExportPreview: 'Kép export előnézet',
  copiedSuccess: 'Vágólapra másolva',
  copy: 'Másolás vágólapra',
  copyFail: 'A másolás sikertelen',
  notAllowCopy: 'A {format} formátum közvetlen másolása nem engedélyezett',
  save: 'Kép mentése',
  saveSuccess: 'A kép exportálva és mentve mint {filePath: string}.',
  saveFail: 'A kép mentése sikertelen',
  saveVault: 'Mentés a Vaultba',
  includingFilename: 'Fájlnév hozzáadása címként',
  imageWidth: 'Képszélesség',
  exportImage: 'Exportálás képként',
  exportSelectionImage: 'Kijelölés exportálása képként',
  exportFolder: 'Az összes jegyzet exportálása képként',
  invalidWidth: 'Kérlek, adj meg egy ésszerű szélességi értéket.',
  '2x': '2x felbontású kép engedélyezése',
  moreSetting:
    'További részletes beállítások a `Képként exportálás` bővítmény beállításaiban találhatóak.',
  guide: 'Húzással mozgatható, görgetéssel vagy csipetmozdulattal zoomolható, dupla kattintással visszaállítható.',
  copyNotAllowed: 'A pdf formátum másolása nem támogatott',
  exportAll: 'Kiválasztott jegyzetek exportálása',
  noMarkdownFile: 'Nincsenek markdown fájlok az aktuális könyvtárban',
  selectAll: 'Összes kiválasztása',
  setting: {
    title: 'Képként exportálás',
    imageWidth: {
      label: 'Alapértelmezett exportált képszelesség',
      description:
        'Állítsd be az exportált kép szélességét pixelben. Az alapértelmezett érték 640px.',
    },
    filename: {
      label: 'Fájlnév hozzáadása címként',
      description:
        'Állítsd be, hogy a fájlnév hozzá legyen-e adva címként. Amikor az Obsidian megjeleníti a dokumentumot, a fájlnév h1 címként jelenik meg. Néha ez nem kívánatos, és így dupla címeket kaphatsz.',
    },
    '2x': {
      label: '2x felbontású kép engedélyezése',
      description:
        'Állítsd be, hogy engedélyezve legyen-e a 2x felbontású kép. A 2x felbontású képek élesebbnek tűnnek, és jobb felhasználói élményt nyújtanak magas PPI-jű kijelzőkön, mint amilyenek a smartphone-ok. Azonban a hátránya, hogy a képfájlok mérete nagyobb lesz.',
    },
    metadata: {
      label: 'Metaadatok megjelenítése',
    },
    format: {
      title: 'Kimeneti fájl formátum',
      description:
        'Az alapértelmezett PNG formátumú képeknek meg kell felelniük a legtöbb igénynek, de a felhasználói forgatókönyvek jobb támogatása érdekében: 1. Támogatás normál és átlátszó háttérrel rendelkező képek exportálására; 2. JPG képek exportálásának támogatása a kisebb fájlméret elérése érdekében, bár lehet, hogy közvetlenül nem másolható a vágólapra; 3. Egyoldalas PDF formátumra való exportálás támogatása, amely eltér a szokásos PDF papírformátumoktól, kérlek, légy óvatos a használatakor.',
      png0: '.png - alapértelmezett',
      png1: '.png - átlátszó háttérrel',
      jpg: '.jpg - JPG formátumú kép',
      pdf: '.pdf - egyoldalas PDF',
    },
    quickExportSelection: {
      label: 'Gyors exportálás kiválasztásra',
      description: 'Ha engedélyezve van, a konfigurációs folyamat figyelmen kívül lesz hagyva, amikor kiválasztott jegyzetek exportálásra kerülnek, és az exportált kép közvetlenül a vágólapra másolódik.',
    },
    userInfo: {
      title: 'Szerzői információ',
      show: 'Szerzői információ megjelenítése',
      avatar: {
        title: 'Avatar',
        description: 'Négyzetes képek használata ajánlott',
      },
      name: 'Szerző neve',
      position: 'Megjelenítés helye',
      remark: 'További szöveg',
      align: 'Igazítás',
      removeAvatar: 'Avatar eltávolítása',
    },
    watermark: {
      title: 'Vízjel',
      enable: {
        label: 'Vízjel engedélyezése',
        description:
          'Vízjel engedélyezése, támogat szöveges és képes vízjeleket.',
      },
      type: {
        label: 'Vízjel típusa',
        description: 'Állítsd be a vízjel típusát, szöveg vagy kép.',
        text: 'Szöveg',
        image: 'Kép',
      },
      text: {
        content: 'Szöveg tartalma',
        fontSize: 'Vízjel betűmérete',
        color: 'Vízjel szövegének színe',
      },
      image: {
        src: {
          label: 'Kép URL',
          upload: 'Kép feltöltése',
          select: 'Kiválasztás a Vaultból',
        },
      },
      opacity: 'Vízjel átlátszósága (0 átlátszó, 1 nem átlátszó)',
      rotate: 'Vízjel forgatása (fokban)',
      width: 'Vízjel szélessége',
      height: 'Vízjel magassága',
      x: 'Vízjel vízszintes távolsága',
      y: 'Vízjel függőleges távolsága',
    },
    preview: 'Vízjel előnézet',
    reset: 'Alapértelmezettek visszaállítása',
    recursive: 'Jegyzetek bevonása az almappákból',
  },
  imageSelect: {
    search: 'Keresés',
    select: 'Kiválasztás',
    cancel: 'Mégse',
    empty: 'Nem található kép',
  },
  confirm: 'Megfelelő',
  cancel: 'Mégse',
  imageUrl: 'Kép URL',
} satisfies BaseTranslation;

export default hu;
