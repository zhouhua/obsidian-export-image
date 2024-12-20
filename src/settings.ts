import { isCreatable } from './imageFormatTester';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DEFAULT_SETTINGS: ISettings = {
  width: 640,
  showFilename: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '2x': true,
  format: 'png0',
  showMetadata: false,
  recursive: false,
  quickExportSelection: false,
  authorInfo: {
    show: false,
    align: 'right',
    position: 'bottom',
  },
  watermark: {
    enable: false,
    type: 'text',
    text: {
      content: '',
      fontSize: 28,
      color: '#cccccc',
    },
    image: {
      src: '',
    },
    opacity: 0.2,
    rotate: 30,
    height: 64,
    width: 120,
    x: 100,
    y: 100,
  },
};

const formatList: FileFormat[] = ['png0', 'png1', 'jpg', 'webp', 'pdf'];
export const formatAvailable: FileFormat[] = [];

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
  for (const type of formatList) {
    if (await isCreatable(type)) {
      formatAvailable.push(type);
    }
  }
})();
