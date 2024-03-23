import type { BaseTranslation } from "../i18n-types";

const en = {
  // TODO: your translations go here
  command: "Export as an image",
  noActiveFile: "Please open an article first!",
  imageExportPreview: "Image Export Preview",
  copiedSuccess: "Copied to clipboard",
  copy: "Copy to Clipboard",
  save: "Save Image",
  includingFilename: "Including File Name As Title: ",
  imageWidth: "Image Width: ",
  exportImage: "Export to image",
  exportSelectionImage: "Export selection to image",
  invalidWidth: "Please set width with a reasonable number.",
  "2x": "Enable 2x resolution image",
  moreSetting:
    "More detailed settings can be found in the `Export Image` plugin settings.",
  guide: "Drag to Move, scroll or pinch to zoom in/out, double click to reset.",
  setting: {
    title: "Export Image",
    imageWidth: {
      label: "Default exported image width",
      description:
        "Set the width of the exported image in pixel. The default is 640px.",
    },
    filename: {
      label: "Include file name as title",
      desscription:
        "Set whether to include the file name as the title. When Obsidian displays the document, it will display the file name as an h1 title. Sometimes this is not what you want, and you will get duplicate titles.",
    },
    "2x": {
      label: "Enable 2x resolution image",
      description:
        "Set whether to enable 2x resolution image. Images with 2x resolution will appear sharper and provide a better experience on high PPI screens, such as those on smartphones. However, the downside is that the file size of the images is larger.",
    },
    userInfo: {
      title: "Author info",
      show: "Show author info",
      avatar: {
        title: "Avatar",
        description: "Recommend using square pictures",
      },
      name: "Author name",
      position: "Where to display",
      remark: "Extra text",
      align: "Align",
      removeAvatar: "Remove avatar",
    },
    watermark: {
      title: "Watermark",
      enable: {
        label: "Enable watermark",
        description:
          "Enable watermark, supportting text watermark and image watermark.",
      },
      type: {
        label: "Watermark type",
        description: "Set the type of watermark, text or image.",
        text: "Text",
        image: "Image",
      },
      text: {
        content: "Text content",
        fontSize: "Watermark font size",
        color: "Watermark text color",
      },
      image: {
        src: {
          label: "Image url",
          upload: "Upload image",
          select: "Select from vault",
        },
      },
      opacity: "Watermark opacity (0 is transparent, 1 is not transparent)",
      rotate: "Watermark rotation (in degrees)",
      width: "Watermark width",
      height: "Watermark height",
      x: "Watermark horizontal gap",
      y: "Watermark vertical gap",
    },
    preview: "Watermark preview",
    reset: "Reset to default",
  },
  imageSelect: {
    search: "Search",
    select: "Select",
    cancel: "Cancel",
    empty: "No image found",
  },
} satisfies BaseTranslation;

export default en;
