export const DEFAULT_SETTINGS: ISettings = {
  width: 640,
  showFilename: true,
  "2x": true,
  format: "jpg",
  showMetadata: false,
  recursive: false,
  authorInfo: {
    show: false,
    align: "right",
    position: "bottom",
  },
  watermark: {
    enable: false,
    type: "text",
    text: {
      content: "",
      fontSize: 28,
      color: "#cccccc",
    },
    image: {
      src: "",
    },
    opacity: 0.2,
    rotate: 30,
    height: 64,
    width: 120,
    x: 100,
    y: 100,
  },
};
