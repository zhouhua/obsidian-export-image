/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const de = {
  // TODO: Ihre Übersetzungen hier eingeben
  command: 'Als Bild exportieren',
  noActiveFile: 'Bitte öffnen Sie zuerst einen Artikel!',
  imageExportPreview: 'Bildexport-Vorschau',
  copiedSuccess: 'In die Zwischenablage kopiert',
  copy: 'In Zwischenablage kopieren',
  copyFail: 'Kopieren fehlgeschlagen',
  notAllowCopy: 'Direktes Kopieren des {format} Formats nicht möglich',
  save: 'Bild speichern',
  saveSuccess: 'Das Bild wurde erfolgreich als {filePath: string} gespeichert.',
  saveFail: 'Das Bild konnte nicht gespeichert werden',
  saveVault: 'Im Tresor speichern',
  includingFilename: 'Mit Dateinamen als Titel einschließen',
  imageWidth: 'Bildbreite',
  exportImage: 'Zu Bild exportieren',
  exportSelectionImage: 'Auswahl als Bild exportieren',
  exportFolder: 'Alle Notizen als Bilder exportieren',
  invalidWidth: 'Bitte geben Sie eine vernünftige Nummer für die Breite an.',
  '2x': 'Bild mit 2x Auflösung aktivieren',
  moreSetting:
    'Detailliertere Einstellungen finden Sie in den `Bild exportieren` Plugin-Einstellungen.',
  guide: 'Ziehen zum Bewegen, scrollen oder kneifen zum Zoomen, Doppelklick zum Zurücksetzen.',
  copyNotAllowed: 'Das pdf-Format wird für das Kopieren nicht unterstützt',
  exportAll: 'Ausgewählte Notizen exportieren',
  noMarkdownFile: 'Keine Markdown-Dateien im aktuellen Verzeichnis',
  selectAll: 'Alles auswählen',
  setting: {
    title: 'Bild exportieren',
    imageWidth: {
      label: 'Standardmäßige exportierte Bildbreite',
      description:
        'Setzen Sie die Breite des exportierten Bildes in Pixel. Standardmäßig ist 640px.',
    },
    filename: {
      label: 'Dateinamen als Titel einbeziehen',
      description:
        'Stellen Sie ein, ob der Dateiname als Titel einbezogen werden soll. Wenn Obsidian das Dokument anzeigt, wird der Dateiname als h1 Titel angezeigt. Manchmal ist das nicht erwünscht, und Sie erhalten doppelte Titel.',
    },
    '2x': {
      label: 'Bild mit 2x Auflösung aktivieren',
      description:
        'Stellen Sie ein, ob Bilder mit 2x Auflösung aktiviert werden sollen. Bilder mit 2x Auflösung erscheinen schärfer und bieten eine bessere Erfahrung auf Bildschirmen mit hoher PPI, wie z.B. auf Smartphones. Der Nachteil ist jedoch, dass die Dateigröße der Bilder größer ist.',
    },
    metadata: {
      label: 'Metadaten anzeigen',
    },
    format: {
      title: 'Ausgabeformat der Datei',
      description:
        'Standardmäßige PNG-Formatbilder sollten die Mehrheit der Bedürfnisse erfüllen, aber um Benutzerszenarien besser zu unterstützen: 1. Unterstützung für den Export von Bildern mit normalem und transparentem Hintergrund; 2. Unterstützung für den Export von JPG-Bildern zur Erreichung kleinerer Dateigrößen, obwohl es möglicherweise nicht möglich ist, direkt in die Zwischenablage zu kopieren; 3. Unterstützung für den Export in das Einzelseiten-PDF-Format, das sich von den üblichen PDF-Papierformaten unterscheidet, bitte Vorsicht, um keine Verwechslung zu verursachen.',
      png0: '.png - Standard',
      png1: '.png - Bild mit transparentem Hintergrund',
      jpg: '.jpg - jpg-Format Bild',
      pdf: '.pdf - Einzelseiten-PDF',
    },
    quickExportSelection: {
      label: 'Schnellauswahl exportieren',
      description: 'Wenn aktiviert, wird der Konfigurationsprozess übersprungen, wenn Sie ausgewählte Notizen exportieren, und das exportierte Bild wird direkt in die Zwischenablage kopiert.',
    },
    userInfo: {
      title: 'Autoreninfo',
      show: 'Autoreninfo anzeigen',
      avatar: {
        title: 'Avatar',
        description: 'Es wird empfohlen, quadratische Bilder zu verwenden',
      },
      name: 'Autorenname',
      position: 'Anzeigeposition',
      remark: 'Zusätzlicher Text',
      align: 'Ausrichten',
      removeAvatar: 'Avatar entfernen',
    },
    watermark: {
      title: 'Wasserzeichen',
      enable: {
        label: 'Wasserzeichen aktivieren',
        description:
          'Wasserzeichen aktivieren, unterstützt Text- und Bildwasserzeichen.',
      },
      type: {
        label: 'Wasserzeichentyp',
        description: 'Legen Sie den Typ des Wasserzeichens fest, Text oder Bild.',
        text: 'Text',
        image: 'Bild',
      },
      text: {
        content: 'Textinhalt',
        fontSize: 'Schriftgröße des Wasserzeichens',
        color: 'Wasserzeichentextfarbe',
      },
      image: {
        src: {
          label: 'Bild-URL',
          upload: 'Bild hochladen',
          select: 'Aus Tresor wählen',
        },
      },
      opacity: 'Wasserzeichen-Durchsichtigkeit (0 ist transparent, 1 ist nicht transparent)',
      rotate: 'Wasserzeichen-Drehung (in Grad)',
      width: 'Wasserzeichenbreite',
      height: 'Wasserzeichenhöhe',
      x: 'Horizontaler Abstand des Wasserzeichens',
      y: 'Vertikaler Abstand des Wasserzeichens',
    },
    preview: 'Wasserzeichen-Vorschau',
    reset: 'Auf Standard zurücksetzen',
    recursive: 'Notizen aus Unterordnern einbeziehen',
  },
  imageSelect: {
    search: 'Suchen',
    select: 'Auswählen',
    cancel: 'Abbrechen',
    empty: 'Kein Bild gefunden',
  },
  confirm: 'Bestätigen',
  cancel: 'Abbrechen',
  imageUrl: 'URL eingeben',
} satisfies BaseTranslation;

export default de;
