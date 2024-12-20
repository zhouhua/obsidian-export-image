/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const nl = {
  // TODO: Voeg hier je vertalingen toe
  command: 'Exporteren als afbeelding',
  noActiveFile: 'Open eerst een artikel!',
  imageExportPreview: 'Voorbeeld van afbeeldingsexport',
  copiedSuccess: 'Gekopieerd naar klembord',
  copy: 'Kopieer naar klembord',
  copyFail: 'Kopiëren mislukt',
  notAllowCopy: 'Kan {format} formaat niet direct kopiëren',
  save: 'Afbeelding Opslaan',
  saveSuccess: 'Afbeelding geëxporteerd en opgeslagen als {filePath: string}.',
  saveFail: 'Afbeelding opslaan mislukt',
  saveVault: 'Opslaan in kluis',
  includingFilename: 'Inclusief bestandsnaam als titel',
  imageWidth: 'Afbeelding breedte',
  exportImage: 'Exporteren als afbeelding',
  exportSelectionImage: 'Selectie exporteren als afbeelding',
  exportFolder: 'Alle notities exporteren als afbeelding',
  invalidWidth: 'Stel de breedte in met een redelijk nummer.',
  '2x': 'Activeer afbeelding met 2x resolutie',
  moreSetting:
    'Meer gedetailleerde instellingen zijn te vinden in de `Exporteer afbeelding` plugin-instellingen.',
  guide: 'Sleep om te bewegen, scroll of knijp om in/uit te zoomen, dubbelklik om te resetten.',
  copyNotAllowed: 'pdf formaat wordt niet ondersteund voor kopiëren',
  exportAll: 'Geselecteerde notities exporteren',
  noMarkdownFile: 'Geen markdown bestanden in de huidige map',
  selectAll: 'Alles selecteren',
  setting: {
    title: 'Afbeelding exporteren',
    imageWidth: {
      label: 'Standaard geëxporteerde afbeeldingsbreedte',
      description:
        'Stel de breedte van de geëxporteerde afbeelding in pixels in. De standaard is 640px.',
    },
    filename: {
      label: 'Bestandsnaam als titel opnemen',
      description:
        'Stel in of de bestandsnaam moet worden opgenomen als titel. Wanneer Obsidian het document weergeeft, wordt de bestandsnaam weergegeven als een h1 titel. Soms is dit niet wat je wilt, en krijg je dubbele titels.',
    },
    '2x': {
      label: 'Activeer afbeelding met 2x resolutie',
      description:
        'Stel in of de afbeelding met 2x resolutie moet worden ingeschakeld. Afbeeldingen met 2x resolutie zien er scherper uit en bieden een betere ervaring op schermen met hoge PPI, zoals die van smartphones. Het nadeel is echter dat de bestandsgrootte van de afbeeldingen groter is.',
    },
    metadata: {
      label: 'Metadata weergeven',
    },
    format: {
      title: 'Uitvoerbestandsformaat',
      description:
        'Standaard PNG-formaatafbeeldingen zouden aan de meeste behoeften moeten voldoen, maar om beter gebruikersscenario\'s te ondersteunen: 1. Ondersteuning voor het exporteren van afbeeldingen met zowel normale als transparante achtergronden; 2. Ondersteuning voor het exporteren van JPG-afbeeldingen om kleinere bestandsgroottes te bereiken, hoewel het misschien niet mogelijk is om direct naar het klembord te kopiëren; 3. Ondersteuning voor het exporteren naar PDF-formaat met één pagina, wat verschilt van de gebruikelijke PDF-papierformaten, let op dat u het niet verkeerd gebruikt.',
      png0: '.png - standaard',
      png1: '.png - afbeelding met transparante achtergrond',
      jpg: '.jpg - JPG-formaat afbeelding',
      pdf: '.pdf - enkele pagina PDF',
    },
    quickExportSelection: {
      label: 'Selectie snel exporteren',
      description: 'Als ingeschakeld, wordt de configuratieproces overgeslagen bij het exporteren van geselecteerde notities, en het geëxporteerde beeld wordt direct naar het klembord gekopieerd.',
    },
    userInfo: {
      title: 'Auteursinformatie',
      show: 'Auteursinformatie weergeven',
      avatar: {
        title: 'Avatar',
        description: 'Het gebruik van vierkante afbeeldingen wordt aanbevolen',
      },
      name: 'Auteursnaam',
      position: 'Waar te tonen',
      remark: 'Extra tekst',
      align: 'Uitlijnen',
      removeAvatar: 'Avatar verwijderen',
    },
    watermark: {
      title: 'Watermerk',
      enable: {
        label: 'Watermerk inschakelen',
        description:
          'Schakel watermerk in, ondersteunt tekst- en afbeeldingwatermerken.',
      },
      type: {
        label: 'Type watermerk',
        description: 'Stel het type watermerk in, tekst of afbeelding.',
        text: 'Tekst',
        image: 'Afbeelding',
      },
      text: {
        content: 'Tekstinhoud',
        fontSize: 'Lettergrootte van watermerk',
        color: 'Tekstkleur van watermerk',
      },
      image: {
        src: {
          label: 'Afbeeldings-URL',
          upload: 'Afbeelding uploaden',
          select: 'Selecteer uit kluis',
        },
      },
      opacity: 'Doorzichtigheid van watermerk (0 is transparant, 1 is niet transparant)',
      rotate: 'Rotatie van watermerk (in graden)',
      width: 'Breedte van watermerk',
      height: 'Hoogte van watermerk',
      x: 'Horizontale afstand van watermerk',
      y: 'Verticale afstand van watermerk',
    },
    preview: 'Voorbeeld van watermerk',
    reset: 'Reset naar standaard',
    recursive: 'Notities uit submappen insluiten',
  },
  imageSelect: {
    search: 'Zoeken',
    select: 'Selecteren',
    cancel: 'Annuleren',
    empty: 'Geen afbeeldingen gevonden',
  },
  confirm: 'Bevestigen',
  cancel: 'Annuleren',
  imageUrl: 'URL van de afbeelding',
} satisfies BaseTranslation;

export default nl;
