/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const no = {
  command: 'Eksporter som bilde',
  noActiveFile: 'Vennligst åpne en artikkel først!',
  imageExportPreview: 'Forhåndsvisning av bildeeksport',
  copiedSuccess: 'Kopiert til utklippstavlen',
  copy: 'Kopier til utklippstavlen',
  copyFail: 'Klarte ikke å kopiere',
  notAllowCopy: 'Kan ikke kopiere {format} formatet direkte',
  save: 'Lagre bilde',
  saveSuccess: 'Bildet er eksportert og lagret som {filePath: string}.',
  saveFail: 'Kunne ikke lagre bildet',
  saveVault: 'Lagre i hvelv',
  includingFilename: 'Inkluderer filnavn som tittel',
  imageWidth: 'Bildebredde',
  exportImage: 'Eksporter til bilde',
  exportSelectionImage: 'Eksporter utvalg til bilde',
  exportFolder: 'Eksporter alle notater til bilde',
  invalidWidth: 'Vennligst sett bredden til et rimelig tall.',
  '2x': 'Aktiver bilde med 2x oppløsning',
  moreSetting:
    'Mer detaljerte innstillinger finnes i `Eksporter bilde` plugin-innstillinger.',
  guide: 'Dra for å flytte, rull eller knip for å zoome inn/ut, dobbeltklikk for å tilbakestille.',
  copyNotAllowed: 'pdf formatet støttes ikke for kopiering',
  exportAll: 'Eksporter valgte notater',
  noMarkdownFile: 'Ingen markdown-filer i gjeldende katalog',
  selectAll: 'Velg alle',
  setting: {
    title: 'Eksporter bilde',
    imageWidth: {
      label: 'Standard eksportbredde for bilde',
      description:
        'Angi bredden på det eksporterte bildet i piksler. Standarden er 640px.',
    },
    filename: {
      label: 'Inkluder filnavn som tittel',
      description:
        'Angi om filnavnet skal inkluderes som tittel. Når Obsidian viser dokumentet, vises filnavnet som en h1 tittel. Noen ganger er dette ikke ønsket, og du vil få dupliserte titler.',
    },
    '2x': {
      label: 'Aktiver bilde med 2x oppløsning',
      description:
        'Angi om bildet med 2x oppløsning skal aktiveres. Bilder med 2x oppløsning vil se skarpere ut og gi en bedre opplevelse på høy PPI-skjermer, som de på smarttelefoner. Ulempen er imidlertid at filstørrelsen på bildene er større.',
    },
    metadata: {
      label: 'Vis metadata',
    },
    format: {
      title: 'Utgående filformat',
      description:
        'Standard PNG-formatbilder bør tilfredsstille de fleste behov, men for bedre å støtte brukerscenarier: 1. Støtte for å eksportere bilder med både normal og gjennomsiktig bakgrunn; 2. Støtte for å eksportere JPG-bilder for å oppnå mindre filstørrelser, selv om det kanskje ikke er mulig å kopiere direkte til utklippstavlen; 3. Støtte for eksport til enkelt-side PDF-format, som er forskjellig fra de vanlige PDF-papirformatene, vær forsiktig så du ikke misbruker.',
      png0: '.png - standard',
      png1: '.png - bilde med gjennomsiktig bakgrunn',
      jpg: '.jpg - JPG-formatbilde',
      pdf: '.pdf - enkeltside PDF',
    },
    quickExportSelection: {
      label: 'Eksportere valgt',
      description: 'Hvis aktiv, springes konfigurasjonsprosessen over, når du eksporterer valgte noter, og eksporteret bilde kopieres direkte til utklippstavlen.',
    },
    userInfo: {
      title: 'Forfatterinformasjon',
      show: 'Vis forfatterinformasjon',
      avatar: {
        title: 'Avatar',
        description: 'Det anbefales å bruke kvadratiske bilder',
      },
      name: 'Forfatternavn',
      position: 'Hvor det skal vises',
      remark: 'Ekstra tekst',
      align: 'Justering',
      removeAvatar: 'Fjern avatar',
    },
    watermark: {
      title: 'Vannmerke',
      enable: {
        label: 'Aktiver vannmerke',
        description:
          'Aktiver vannmerke, støtter tekst- og bildevannmerker.',
      },
      type: {
        label: 'Type vannmerke',
        description: 'Sett typen av vannmerke, tekst eller bilde.',
        text: 'Tekst',
        image: 'Bilde',
      },
      text: {
        content: 'Tekstinnhold',
        fontSize: 'Vannmerke fontstørrelse',
        color: 'Vannmerketekstfarge',
      },
      image: {
        src: {
          label: 'Bilde URL',
          upload: 'Last opp bilde',
          select: 'Velg fra hvelv',
        },
      },
      opacity: 'Vannmerkets opasitet (0 er gjennomsiktig, 1 er ikke gjennomsiktig)',
      rotate: 'Vannmerkerotasjon (i grader)',
      width: 'Vannmerkebredde',
      height: 'Vannmerkehøyde',
      x: 'Vannmerkets horisontale avstand',
      y: 'Vannmerkets vertikale avstand',
    },
    preview: 'Forhåndsvisning av vannmerke',
    reset: 'Tilbakestill til standard',
    recursive: 'Inkluder notater fra undermapper',
  },
  imageSelect: {
    search: 'Søk',
    select: 'Velg',
    cancel: 'Avbryt',
    empty: 'Ingen bilder funnet',
  },
  confirm: 'Bekreft',
  cancel: 'Avbryt',
  imageUrl: 'Bilde-URL',
} satisfies BaseTranslation;

export default no;
