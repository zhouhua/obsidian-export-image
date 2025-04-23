/* eslint-disable @typescript-eslint/naming-convention */
import type { Translation } from '../i18n-types';

const en = {
  // TODO: your translations go here
  command: 'Export as an image',
  noActiveFile: 'Please open an article first!',
  imageExportPreview: 'Image Export Preview',
  copiedSuccess: 'Copied to clipboard',
  copy: 'Copy to Clipboard',
  copyFail: 'Failed to copy',
  notAllowCopy: 'Unable to directly copy {format} format',
  save: 'Save Image',
  saveSuccess: 'Export and save the image as {filePath}.',
  saveFail: 'Failed to save the image',
  saveVault: 'Save to Vault',
  includingFilename: 'Including File Name As Title',
  imageWidth: 'Image Width',
  exportImage: 'Export to image',
  exportSelectionImage: 'Export selection to image',
  exportFolder: 'Export all notes to image',
  loading: 'Loading document content...',
  invalidWidth: 'Please set width with a reasonable number.',
  resolutionMode: 'Use resolution image',
  moreSetting:
    'More detailed settings can be found in the `Export Image` plugin settings.',
  guide: 'Drag to Move, scroll or pinch to zoom in/out, double click to reset.',
  copyNotAllowed: 'pdf format is not supported for copy',
  exportAll: 'Export Selected Notes',
  noMarkdownFile: 'No markdown files in the current directory',
  selectAll: 'Select All',
  setting: {
    title: 'Export Image',
    imageWidth: {
      label: 'Default exported image width',
      description:
        'Set the width of the exported image in pixel. The default is 640px.',
    },
    padding: {
      title: 'Image Padding',
      description: 'Set padding for the exported image. The default is 6px for all sides.',
      top: 'Top padding',
      right: 'Right padding',
      bottom: 'Bottom padding',
      left: 'Left padding',
    },
    split: {
      title: 'Split Image',
      mode: {
        label: 'Split mode',
        description: 'Choose whether to split the image, and how to split. Fixed height means each split image has a fixed height, which may cut off text at the split point. Split by horizontal rule means split the image by the horizontal rule in the document. Auto split by paragraph means split the image by the paragraph, ensuring that a paragraph is not split into two images, and the height is as close as possible to the split height.',
        none: 'No split',
        fixed: 'Fixed height',
        hr: 'Split by horizontal rule',
        auto: 'Auto split by paragraph',
      },
      height: {
        label: 'Split image height',
        description: 'Set the height of each split image in pixels. The default is 1000px.',
      },
      overlap: {
        label: 'Split image overlap',
        description: 'Set the overlap between adjacent split images to prevent content from being cut off. The default is 40px.',
      },
    },
    filename: {
      label: 'Include file name as title',
      description:
        'Set whether to include the file name as the title. When Obsidian displays the document, it will display the file name as an h1 title. Sometimes this is not what you want, and you will get duplicate titles.',
    },
    resolutionMode: {
      label: 'Resolution mode image',
      description: 'Set resolution mode, using 1x, 2x, 3x, 4x resolution images. When enabled, images will appear sharper, with a better experience on high PPI screens like smartphones. The downside is that the image file size will increase.',
    },
    metadata: {
      label: 'Show metadata',
    },
    format: {
      title: 'Output file format',
      description:
        'Default PNG format images should satisfy the majority of needs, but to better support user scenarios: 1. Support for exporting images with both normal and transparent backgrounds; 2. Support for exporting JPG images to achieve smaller file sizes, though it may not be possible to copy directly to the clipboard; 3. Support for exporting to single-page PDF format, which differs from the usual PDF paper formats, please be careful not to misuse.',
      png0: 'png - default',
      png1: 'png - export transparent background image',
      jpg: 'jpg - export jpg image',
      pdf: 'pdf - export single page pdf',
    },
    quickExportSelection: {
      label: 'Quick export selection',
      description: 'Whether to skip the configuration process when exporting selected content, directly copying the exported image to the clipboard.',
    },
    userInfo: {
      title: 'Author info',
      show: 'Show author info',
      avatar: {
        title: 'Avatar',
        description: 'Recommend using square pictures',
      },
      name: 'Author name',
      position: 'Display position',
      remark: 'Extra text',
      align: 'Alignment',
      removeAvatar: 'Remove avatar',
    },
    watermark: {
      title: 'Watermark',
      enable: {
        label: 'Enable watermark',
        description:
          'Enable watermark, supporting text watermark and image watermark.',
      },
      type: {
        label: 'Watermark type',
        description: 'Set the type of watermark, text or image.',
        text: 'Text',
        image: 'Image',
      },
      text: {
        content: 'Watermark text content',
        fontSize: 'Watermark font size',
        color: 'Watermark text color',
      },
      image: {
        src: {
          label: 'Image url',
          upload: 'Upload image',
          select: 'Select from current vault',
        },
      },
      opacity: 'Watermark opacity (0 is transparent, 1 is not transparent)',
      rotate: 'Watermark rotation (in degrees)',
      width: 'Watermark width',
      height: 'Watermark height',
      x: 'Watermark horizontal gap',
      y: 'Watermark vertical gap',
    },
    preview: 'Watermark effect preview',
    reset: 'Reset to default',
    recursive: 'Include notes from subdirectories',
  },
  imageSelect: {
    search: 'Search',
    select: 'Select',
    cancel: 'Cancel',
    empty: 'No image found',
  },
  confirm: 'Confirm',
  cancel: 'Cancel',
  imageUrl: 'Enter URL',
  splitInfo: 'The total height of the image is {rootHeight}px, and the split height is {splitHeight}px, so {pages} images will be generated',
  splitInfoHr: 'The total height of the image is {rootHeight}px, and the image will be split by the horizontal rule, so {pages} images will be generated',
} satisfies Translation;

export default en;
