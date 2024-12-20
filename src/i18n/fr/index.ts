/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const fr = {
  // TODO: Insérez vos traductions ici
  command: 'Exporter en image',
  noActiveFile: 'Veuillez d\'abord ouvrir un article !',
  imageExportPreview: 'Aperçu de l\'exportation d\'image',
  copiedSuccess: 'Copié dans le presse-papiers',
  copy: 'Copier dans le presse-papiers',
  copyFail: 'Échec de la copie',
  notAllowCopy: 'Impossible de copier directement le format {format}',
  save: 'Enregistrer l\'image',
  saveSuccess: 'L\'image a été exportée et enregistrée sous {filePath: string}.',
  saveFail: 'Échec de l\'enregistrement de l\'image',
  saveVault: 'Enregistrer dans le coffre',
  includingFilename: 'Incluant le nom du fichier comme titre',
  imageWidth: 'Largeur de l\'image',
  exportImage: 'Exporter en image',
  exportSelectionImage: 'Exporter la sélection en image',
  exportFolder: 'Exporter toutes les notes en image',
  invalidWidth: 'Veuillez définir une largeur avec un nombre raisonnable.',
  '2x': 'Activer l\'image en résolution 2x',
  moreSetting:
    'Des paramètres plus détaillés peuvent être trouvés dans les réglages du plugin `Exporter en image`.',
  guide: 'Faites glisser pour déplacer, faites défiler ou pincez pour zoomer, double-cliquez pour réinitialiser.',
  copyNotAllowed: 'Le format pdf n\'est pas pris en charge pour la copie',
  exportAll: 'Exporter les notes sélectionnées',
  noMarkdownFile: 'Aucun fichier markdown dans le répertoire actuel',
  selectAll: 'Tout sélectionner',
  setting: {
    title: 'Exporter en image',
    imageWidth: {
      label: 'Largeur d\'image exportée par défaut',
      description:
        'Définissez la largeur de l\'image exportée en pixels. La valeur par défaut est 640px.',
    },
    filename: {
      label: 'Inclure le nom du fichier comme titre',
      description:
        'Définissez si le nom du fichier doit être inclus comme titre. Lorsqu\'Obsidian affiche le document, il affiche le nom du fichier comme un titre h1. Parfois, ce n\'est pas ce que vous souhaitez, et vous obtiendrez des titres en double.',
    },
    '2x': {
      label: 'Activer l\'image en résolution 2x',
      description:
        'Définissez si l\'image en résolution 2x doit être activée. Les images en résolution 2x apparaîtront plus nettes et offriront une meilleure expérience sur les écrans à haute PPI, tels que ceux des smartphones. Cependant, l\'inconvénient est que la taille du fichier des images est plus grande.',
    },
    metadata: {
      label: 'Afficher les métadonnées',
    },
    format: {
      title: 'Format de fichier de sortie',
      description:
        'Les images au format PNG par défaut devraient satisfaire la majorité des besoins, mais pour mieux soutenir les scénarios utilisateurs : 1. Support pour l\'exportation d\'images avec des arrière-plans normaux et transparents ; 2. Support pour l\'exportation d\'images JPG pour obtenir des tailles de fichier plus petites, bien qu\'il ne soit peut-être pas possible de copier directement dans le presse-papiers ; 3. Support pour l\'exportation au format PDF d\'une seule page, ce qui diffère des formats de papier PDF habituels, veillez à ne pas faire d\'erreur.',
      png0: '.png - par défaut',
      png1: '.png - image avec fond transparent',
      jpg: '.jpg - image au format jpg',
      pdf: '.pdf - PDF d\'une seule page',
    },
    quickExportSelection: {
      label: 'Exporter la sélection rapidement',
      description: 'Si activé, le processus de configuration est ignoré lors de l\'exportation de notes sélectionnées, et l\'image exportée est directement copiée dans le presse-papiers.',
    },
    userInfo: {
      title: 'Info auteur',
      show: 'Afficher les infos de l\'auteur',
      avatar: {
        title: 'Avatar',
        description: 'L\'utilisation d\'images carrées est recommandée',
      },
      name: 'Nom de l\'auteur',
      position: 'Où afficher',
      remark: 'Texte supplémentaire',
      align: 'Aligner',
      removeAvatar: 'Supprimer l\'avatar',
    },
    watermark: {
      title: 'Filigrane',
      enable: {
        label: 'Activer le filigrane',
        description:
          'Activer le filigrane, supporte le filigrane texte et image.',
      },
      type: {
        label: 'Type de filigrane',
        description: 'Définissez le type de filigrane, texte ou image.',
        text: 'Texte',
        image: 'Image',
      },
      text: {
        content: 'Contenu du texte',
        fontSize: 'Taille de la police du filigrane',
        color: 'Couleur du texte du filigrane',
      },
      image: {
        src: {
          label: 'URL de l\'image',
          upload: 'Télécharger l\'image',
          select: 'Sélectionner depuis le coffre',
        },
      },
      opacity: 'Opacité du filigrane (0 est transparent, 1 n\'est pas transparent)',
      rotate: 'Rotation du filigrane (en degrés)',
      width: 'Largeur du filigrane',
      height: 'Hauteur du filigrane',
      x: 'Espacement horizontal du filigrane',
      y: 'Espacement vertical du filigrane',
    },
    preview: 'Aperçu du filigrane',
    reset: 'Réinitialiser par défaut',
    recursive: 'Inclure les notes des sous-répertoires',
  },
  imageSelect: {
    search: 'Rechercher',
    select: 'Sélectionner',
    cancel: 'Annuler',
    empty: 'Aucune image trouvée',
  },
  confirm: 'Confirmer',
  cancel: 'Annuler',
  imageUrl: 'URL de l\'image',
} satisfies BaseTranslation;

export default fr;
