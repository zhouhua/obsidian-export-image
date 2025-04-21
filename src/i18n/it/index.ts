/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const it = {
  command: 'Esporta come immagine',
  noActiveFile: 'Aprire prima un articolo!',
  imageExportPreview: 'Anteprima esportazione immagine',
  copiedSuccess: 'Copiato negli appunti',
  copy: 'Copia negli appunti',
  copyFail: 'Impossibile copiare',
  notAllowCopy: 'Impossibile copiare direttamente il formato {format}',
  save: 'Salva immagine',
  saveSuccess: 'Esporta e salva l\'immagine come {filePath}.',
  saveFail: 'Impossibile salvare l\'immagine',
  saveVault: 'Salva in Vault',
  includingFilename: 'Includi nome file come titolo',
  imageWidth: 'Larghezza immagine',
  exportImage: 'Esporta come immagine',
  exportSelectionImage: 'Esporta selezione come immagine',
  exportFolder: 'Esporta tutte le note come immagine',
  loading: 'Caricamento del contenuto del documento...',
  invalidWidth: 'Imposta una larghezza ragionevole.',
  resolutionMode: 'Usa immagine in alta risoluzione',
  moreSetting: 'Ulteriori impostazioni si trovano nelle impostazioni del plugin `Export Image`.',
  guide: 'Trascina per muovere, scorri o pizzica per ingrandire/rimpicciolire, doppio clic per ripristinare.',
  copyNotAllowed: 'Il formato pdf non è supportato per la copia',
  exportAll: 'Esporta note selezionate',
  noMarkdownFile: 'Nessun file markdown nella directory corrente',
  selectAll: 'Seleziona tutto',
  confirm: 'Conferma',
  cancel: 'Annulla',
  imageUrl: 'Inserisci URL',
  splitInfo: 'L\'altezza totale dell\'immagine è {rootHeight}px, e l\'altezza di divisione è {splitHeight}px, quindi verranno generate {pages} immagini',
  splitInfoHr: 'L\'altezza totale dell\'immagine è {rootHeight}px, e l\'immagine verrà divisa dalla linea orizzontale, quindi verranno generate {pages} immagini',
} satisfies BaseTranslation;

export default it; 