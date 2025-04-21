/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const cs = {
  command: 'Exportovat jako obrázek',
  noActiveFile: 'Nejdříve prosím otevřete článek!',
  imageExportPreview: 'Náhled exportu obrázku',
  copiedSuccess: 'Zkopírováno do schránky',
  copy: 'Kopírovat do schránky',
  copyFail: 'Kopírování selhalo',
  notAllowCopy: 'Není možné přímo kopírovat formát {format}',
  save: 'Uložit obrázek',
  saveSuccess: 'Obrázek byl exportován a uložen jako {filePath: string}.',
  saveFail: 'Uložení obrázku selhalo',
  saveVault: 'Uložit do trezoru',
  includingFilename: 'Včetně názvu souboru jako titulku',
  imageWidth: 'Šířka obrázku',
  exportImage: 'Exportovat jako obrázek',
  exportSelectionImage: 'Exportovat výběr jako obrázek',
  exportFolder: 'Exportovat všechny poznámky jako obrázek',
  loading: 'Načítání obsahu dokumentu...',
  invalidWidth: 'Nastavte prosím rozumnou šířku.',
  resolutionMode: 'Povolit obrázek s dvojnásobným rozlišením',
  moreSetting:
    'Podrobnější nastavení naleznete v nastavení pluginu `Exportovat obrázek`.',
  guide: 'Tažením přesuňte, posouváním nebo špetkou zvětšte/zmenšte, dvojím kliknutím resetujte.',
  copyNotAllowed: 'Formát pdf není podporován pro kopírování',
  exportAll: 'Exportovat vybrané poznámky',
  noMarkdownFile: 'V aktuálním adresáři nejsou žádné soubory markdown',
  selectAll: 'Vybrat vše',
  setting: {
    title: 'Exportovat obrázek',
    imageWidth: {
      label: 'Výchozí šířka exportovaného obrázku',
      description:
        'Nastavte šířku exportovaného obrázku v pixelech. Výchozí je 640px.',
    },
    split: {
      title: 'Rozdělit obrázek',
      mode: {
        label: 'Režim rozdělení',
        description: 'Vyberte, zda rozdělit obrázek, a jak rozdělit. Pevná výška znamená, že každá rozdělená stránka má pevnou výšku, což může text přerušit v místě rozdělení. Rozdělit podle vodorovné čáry znamená rozdělit obrázek podle vodorovné čáry v dokumentu. Rozdělit podle odstavce znamená rozdělit obrázek podle odstavce, aby se zabránilo rozdělení odstavce do dvou obrázků a výška byla co nejbližší rozdělení výšky.',
        none: 'Žádné rozdělení',
        fixed: 'Pevná výška',
        hr: 'Vodorovná čára',
        auto: 'Odstavec',
      },
      height: {
        label: 'Výška stránky',
        description: 'Nastaví výšku každé rozdělené stránky v pixelech. Výchozí je 1000px.',
      },
      overlap: {
        label: 'Překrytí',
        description: 'Nastaví překrytí mezi stránkami, aby se zabránilo náhlému přerušení obsahu. Výchozí je 40px.',
      },
    },
    filename: {
      label: 'Zahrnout název souboru jako titulek',
      description:
        'Nastavte, zda zahrnout název souboru jako titulek. Když Obsidian zobrazuje dokument, zobrazí název souboru jako nadpis h1. Někdy to není žádoucí a může dojít ke zdvojení titulků.',
    },
    '2x': {
      label: 'Povolit obrázek s dvojnásobným rozlišením',
      description:
        'Nastavte, zda povolit obrázek s dvojnásobným rozlišením. Obrázky s dvojnásobným rozlišením budou vypadat ostřeji a poskytnou lepší zážitek na obrazovkách s vysokým PPI, jako jsou smartphony. Nevýhodou je však větší velikost souboru obrázků.',
    },
    metadata: {
      label: 'Zobrazit metadata',
    },
    format: {
      title: 'Formát výstupního souboru',
      description:
        'Obrázky ve formátu PNG by měly vyhovovat většině potřeb, ale pro lepší podporu scénářů uživatelů: 1. Podpora pro export obrázků s normálním i průhledným pozadím; 2. Podpora pro export obrázků ve formátu JPG pro dosažení menších velikostí souborů, i když nemusí být možné je přímo kopírovat do schránky; 3. Podpora pro export do formátu jednostránkového PDF, který se liší od běžných formátů papíru PDF, dávejte pozor, abyste jej nesprávně nepoužili.',
      png0: '.png - výchozí',
      png1: '.png - obrázek s průhledným pozadím',
      jpg: '.jpg - obrázek ve formátu jpg',
      pdf: '.pdf - jednostránkový PDF',
    },
    quickExportSelection: {
      label: 'Rychlý export výběru',
      description: 'Pokud je povoleno, při exportu výběru se přeskočí konfigurační proces a exportovaný obrázek se přímo zkopíruje do schránky.',
    },
    userInfo: {
      title: 'Informace o autorovi',
      show: 'Zobrazit informace o autorovi',
      avatar: {
        title: 'Avatar',
        description: 'Doporučuje se použití čtvercových obrázků',
      },
      name: 'Jméno autora',
      position: 'Kde zobrazit',
      remark: 'Dodatečný text',
      align: 'Zarovnat',
      removeAvatar: 'Odstranit avatar',
    },
    watermark: {
      title: 'Vodoznak',
      enable: {
        label: 'Povolit vodoznak',
        description:
          'Povolit vodoznak, podporuje textový a obrazový vodoznak.',
      },
      type: {
        label: 'Typ vodoznaku',
        description: 'Nastavte typ vodoznaku, text nebo obrázek.',
        text: 'Text',
        image: 'Obrázek',
      },
      text: {
        content: 'Obsah textu',
        fontSize: 'Velikost písma vodoznaku',
        color: 'Barva textu vodoznaku',
      },
      image: {
        src: {
          label: 'URL obrázku',
          upload: 'Nahrát obrázek',
          select: 'Vybrat ze trezoru',
        },
      },
      opacity: 'Průhlednost vodoznaku (0 je průhledný, 1 je neprůhledný)',
      rotate: 'Rotace vodoznaku (ve stupních)',
      width: 'Šířka vodoznaku',
      height: 'Výška vodoznaku',
      x: 'Horizontální mezera vodoznaku',
      y: 'Vertikální mezera vodoznaku',
    },
    preview: 'Náhled vodoznaku',
    reset: 'Obnovit výchozí',
    recursive: 'Zahrnout poznámky z podadresářů',
  },
  imageSelect: {
    search: 'Hledat',
    select: 'Vybrat',
    cancel: 'Zrušit',
    empty: 'Nenalezeny žádné obrázky',
  },
  confirm: 'Potvrdit',
  cancel: 'Zrušit',
  imageUrl: 'Zadejte URL',
  splitInfo: 'Celková výška obrázku je {rootHeight}px, a výška dělení je {splitHeight}px, takže se vygeneruje {pages} obrázků',
  splitInfoHr: 'Celková výška obrázku je {rootHeight}px, a výška dělení je {splitHeight}px, takže se vygeneruje {pages} obrázků',
} satisfies BaseTranslation;

export default cs;
