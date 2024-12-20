/* eslint-disable @typescript-eslint/naming-convention */
import type { Translation } from '../i18n-types';

const zh = {
  command: '导出为图片',
  noActiveFile: '请先打开一篇文档！',
  imageExportPreview: '图片导出预览',
  copiedSuccess: '已复制到剪贴板',
  copy: '复制到剪贴板',
  copyFail: '复制到剪贴板失败',
  notAllowCopy: '无法直接复制 {format} 格式',
  save: '保存图片',
  saveSuccess: '已导出并保存图片至 {filePath}。',
  saveFail: '保存图片失败',
  saveVault: '保存到 vault',
  includingFilename: '包含文件名作为标题',
  imageWidth: '图片宽度',
  exportImage: '导出为图片',
  exportFolder: '导出所有笔记为图片',
  exportSelectionImage: '导出选中内容为图片',
  invalidWidth: '请设置合理的宽度。',
  '2x': '输出 2 倍分辨率的图',
  moreSetting: '更详细的配置请进入 Export Image 插件的设置界面。',
  guide: '拖动可移动，滚轮或双指滑动可放大/缩小，双击可重置。',
  copyNotAllowed: 'pdf 格式不支持复制',
  exportAll: '导出所选笔记',
  noMarkdownFile: '当前目录下没有 markdown 文件',
  selectAll: '全选',
  setting: {
    title: '导出图片',
    imageWidth: {
      label: '导出图片的默认宽度',
      description: '设置导出图片的宽度，默认值为 640px。',
    },
    filename: {
      label: '是否包含文件名作为标题',
      desscription:
        '设置是否包含文件名作为标题。Obsidian 展示文档时，会把文件名作为 h1 标题，有时候并不符合预期，产生标题重复的情况。',
    },
    '2x': {
      label: '启用 2x 分辨率图片',
      description:
        '设置是否启用 2x 分辨率图片。启用后，图片会显示得更清晰，在高 PPI 屏幕上体验更好，如智能手机。但缺点是图片文件大小会变大。',
    },
    metadata: {
      label: '显示 metadata',
    },
    format: {
      title: '输出文件格式',
      description:
        '默认的 png 格式图片应该满足绝大多数需求，但为了更好地支持用户场景：1. 支持导出正常背景与透明背景的；图片；2. 支持导出 jpg 图片以获得更小的图片大小，但可能无法直接复制到剪切板；3. 支持导出成单页 pdf 功能，这与通常 pdf 的纸张格式不同，请注意不要误用。',
      png0: 'png - 默认',
      png1: 'png - 导出透明背景图片',
      jpg: 'jpg - 导出 jpg 图片',
      pdf: 'pdf - 导出单页 pdf',
    },
    quickExportSelection: {
      label: '快速导出选中内容',
      description: '导出选中内容时是否要跳过配置过程，直接把导出的图片复制到剪切板。',
    },
    userInfo: {
      title: '作者信息',
      show: '显示作者信息',
      avatar: {
        title: '头像',
        description: '建议使用正方形图片',
      },
      name: '作者名',
      position: '显示位置',
      remark: '额外文案',
      align: '对齐方式',
      removeAvatar: '移除头像',
    },
    watermark: {
      title: '水印',
      enable: {
        label: '启用水印',
        description: '启用水印，支持文字水印和图片水印。',
      },
      type: {
        label: '水印类型',
        description: '设置水印类型，文字或图片。',
        text: '文字',
        image: '图片',
      },
      text: {
        content: '水印文字内容',
        fontSize: '水印字体大小',
        color: '水印文字颜色',
      },
      image: {
        src: {
          label: '图片 url',
          upload: '上传图片',
          select: '从当前仓库选择',
        },
      },
      opacity: '水印透明度（0 为全透明，1 不透明）',
      rotate: '水印旋转角度（以度为单位）',
      width: '水印宽度',
      height: '水印高度',
      x: '水印水平间距',
      y: '水印垂直间距',
    },
    preview: '水印效果预览',
    reset: '重置为默认',
    recursive: '包含子目录中的笔记',
  },
  imageSelect: {
    search: '搜索',
    select: '选择',
    cancel: '取消',
    empty: '没有找到图片',
  },
  confirm: '确认',
  cancel: '取消',
  imageUrl: '输入 URL',
} satisfies Translation;

export default zh;
