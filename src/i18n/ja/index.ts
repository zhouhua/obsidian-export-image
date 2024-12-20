/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const ja = {
  command: '画像としてエクスポート',
  noActiveFile: '先に記事を開いてください！',
  imageExportPreview: '画像エクスポートプレビュー',
  copiedSuccess: 'クリップボードにコピーされました',
  copy: 'クリップボードにコピー',
  copyFail: 'コピーに失敗しました',
  notAllowCopy: '{format}フォーマットの直接コピーはできません',
  save: '画像を保存',
  saveSuccess: '画像を{filePath: string}としてエクスポートして保存しました。',
  saveFail: '画像の保存に失敗しました',
  saveVault: 'ボールトに保存',
  includingFilename: 'ファイル名をタイトルとして含む',
  imageWidth: '画像の幅',
  exportImage: '画像としてエクスポート',
  exportSelectionImage: '選択範囲を画像としてエクスポート',
  exportFolder: 'すべてのノートを画像としてエクスポート',
  invalidWidth: '適切な数値で幅を設定してください。',
  '2x': '2倍の解像度の画像を有効にする',
  moreSetting:
    '`画像をエクスポート`プラグインの設定で、より詳細な設定ができます。',
  guide: 'ドラッグして移動、スクロールまたはピンチでズームイン/アウト、ダブルクリックでリセット。',
  copyNotAllowed: 'pdf形式はコピーをサポートしていません',
  exportAll: '選択したノートをエクスポート',
  noMarkdownFile: '現在のディレクトリにマークダウンファイルがありません',
  selectAll: 'すべて選択',
  setting: {
    title: '画像をエクスポート',
    imageWidth: {
      label: 'エクスポートされる画像のデフォルト幅',
      description:
        'ピクセル単位でエクスポートされる画像の幅を設定します。デフォルトは640pxです。',
    },
    filename: {
      label: 'ファイル名をタイトルとして含む',
      description:
        'ファイル名をタイトルとして含むかどうかを設定します。Obsidianがドキュメントを表示する時、ファイル名をh1タイトルとして表示します。これは望ましくない場合もあり、タイトルが重複することがあります。',
    },
    '2x': {
      label: '2倍の解像度の画像を有効にする',
      description:
        '2倍の解像度の画像を有効にするかどうかを設定します。2倍の解像度の画像はより鮮明に見え、高PPIの画面（スマートフォンなど）でより良い体験を提供します。ただし、画像のファイルサイズが大きくなるというデメリットがあります。',
    },
    metadata: {
      label: 'メタデータを表示',
    },
    format: {
      title: '出力ファイル形式',
      description:
        'デフォルトのPNG形式の画像でほとんどのニーズを満たすはずですが、ユーザーシナリオをより良くサポートするために：1. 通常の背景および透明背景の画像をエクスポートするサポート；2. JPG画像をエクスポートしてファイルサイズを小さくするサポート、ただしクリップボードに直接コピーすることはできないかもしれません；3. 単一ページのPDF形式にエクスポートするサポート、通常のPDF紙の形式とは異なりますので、誤用しないように注意してください。',
      png0: '.png - デフォルト',
      png1: '.png - 透明な背景の画像',
      jpg: '.jpg - jpg形式の画像',
      pdf: '.pdf - 単一ページのPDF',
    },
    userInfo: {
      title: '著者情報',
      show: '著者情報を表示',
      avatar: {
        title: 'アバター',
        description: '正方形の画像の使用を推奨',
      },
      name: '著者名',
      position: '表示位置',
      remark: '追加テキスト',
      align: '配置',
      removeAvatar: 'アバターを削除',
    },
    quickExportSelection: {
      label: '選択した内容を迅速にエクスポート',
      description: '選択した内容をエクスポートする際に設定プロセスをスキップし、エクスポートされた画像を直接クリップボードにコピーします。',
    },
    watermark: {
      title: 'ウォーターマーク',
      enable: {
        label: 'ウォーターマークを有効にする',
        description:
          'ウォーターマークを有効にする、テキストウォーターマークと画像ウォーターマークをサポート。',
      },
      type: {
        label: 'ウォーターマークのタイプ',
        description: 'ウォーターマークのタイプを設定します、テキストまたは画像。',
        text: 'テキスト',
        image: '画像',
      },
      text: {
        content: 'テキストの内容',
        fontSize: 'ウォーターマークのフォントサイズ',
        color: 'ウォーターマークのテキスト色',
      },
      image: {
        src: {
          label: '画像URL',
          upload: '画像をアップロード',
          select: 'ボールトから選択',
        },
      },
      opacity: 'ウォーターマークの不透明度（0は透明、1は不透明）',
      rotate: 'ウォーターマークの回転（度単位）',
      width: 'ウォーターマークの幅',
      height: 'ウォーターマークの高さ',
      x: 'ウォーターマークの水平方向の間隔',
      y: 'ウォーターマークの垂直方向の間隔',
    },
    preview: 'ウォーターマークプレビュー',
    reset: 'デフォルトにリセット',
    recursive: 'サブディレクトリのノートを含む',
  },
  imageSelect: {
    search: '検索',
    select: '選択',
    cancel: 'キャンセル',
    empty: '画像が見つかりません',
  },
  confirm: '確認',
  cancel: 'キャンセル',
  imageUrl: '画像URL',
} satisfies BaseTranslation;

export default ja;
