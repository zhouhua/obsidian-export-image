/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const ko = {
  // TODO: 여기에 번역을 삽입하세요
  command: '이미지로 내보내기',
  noActiveFile: '먼저 문서를 열어주세요!',
  imageExportPreview: '이미지 내보내기 미리보기',
  copiedSuccess: '클립보드에 복사됨',
  copy: '클립보드에 복사하기',
  copyFail: '복사 실패',
  notAllowCopy: '{format} 형식을 직접 복사할 수 없습니다',
  save: '이미지 저장하기',
  saveSuccess: '이미지가 {filePath: string} 으로 내보내고 저장되었습니다.',
  saveFail: '이미지 저장 실패',
  saveVault: '볼트에 저장하기',
  includingFilename: '파일 이름을 제목으로 포함시키기',
  imageWidth: '이미지 너비',
  exportImage: '이미지로 내보내기',
  exportSelectionImage: '선택 영역을 이미지로 내보내기',
  exportFolder: '모든 노트를 이미지로 내보내기',
  invalidWidth: '적절한 숫자로 너비를 설정해 주세요.',
  '2x': '2배 해상도 이미지 활성화',
  moreSetting:
    '`이미지로 내보내기` 플러그인 설정에서 더 자세한 설정을 찾을 수 있습니다.',
  guide: '이동하려면 드래그하고, 확대/축소하려면 스크롤하거나 핀치하세요, 더블 클릭으로 초기화합니다.',
  copyNotAllowed: 'pdf 형식은 복사를 지원하지 않습니다',
  exportAll: '선택된 노트 내보내기',
  noMarkdownFile: '현재 디렉토리에 마크다운 파일이 없습니다',
  selectAll: '전체 선택',
  setting: {
    title: '이미지로 내보내기',
    imageWidth: {
      label: '내보낼 이미지의 기본 너비',
      description:
        '픽셀 단위로 내보낼 이미지의 너비를 설정하십시오. 기본값은 640px입니다.',
    },
    filename: {
      label: '파일 이름을 제목으로 포함',
      description:
        '파일 이름을 제목으로 포함할지 여부를 설정합니다. Obsidian이 문서를 표시할 때 파일 이름을 h1 제목으로 표시합니다. 때때로 이것은 원하지 않는 것일 수 있으며 제목이 중복될 수 있습니다.',
    },
    '2x': {
      label: '2배 해상도 이미지 활성화',
      description:
        '2배 해상도 이미지를 활성화할지 여부를 설정합니다. 2배 해상도의 이미지는 더 선명해 보이고, 예를 들어 스마트폰과 같은 고PPI 화면에서 더 나은 경험을 제공합니다. 그러나 단점은 이미지 파일 크기가 더 크다는 것입니다.',
    },
    metadata: {
      label: '메타데이터 표시',
    },
    format: {
      title: '출력 파일 형식',
      description:
        '기본 PNG 형식 이미지는 대부분의 요구를 충족해야 하지만 사용자 시나리오를 더 잘 지원하기 위해: 1. 일반 및 투명 배경의 이미지 내보내기 지원; 2. JPG 이미지를 내보내어 파일 크기를 줄이는 지원, 클립보드에 직접 복사할 수는 없을 수도 있음; 3. 일반적인 PDF 용지 형식과 다른 단일 페이지 PDF 형식으로 내보내기 지원, 잘못 사용하지 않도록 주의해 주십시오.',
      png0: '.png - 기본',
      png1: '.png - 투명 배경 이미지',
      jpg: '.jpg - jpg 형식 이미지',
      pdf: '.pdf - 단일 페이지 PDF',
    },
    quickExportSelection: {
      label: '선택 내용 빠르게 내보내기',
      description: '선택 내용을 내보낼 때 설정 프로세스를 건너뛰고 내보낸 이미지를 직접 클립보드에 복사합니다.',
    },
    userInfo: {
      title: '작성자 정보',
      show: '작성자 정보 표시',
      avatar: {
        title: '아바타',
        description: '정사각형 이미지 사용을 권장합니다',
      },
      name: '작성자 이름',
      position: '표시 위치',
      remark: '추가 텍스트',
      align: '정렬',
      removeAvatar: '아바타 제거',
    },
    watermark: {
      title: '워터마크',
      enable: {
        label: '워터마크 활성화',
        description:
          '워터마크를 활성화하며, 텍스트 및 이미지 워터마크를 지원합니다.',
      },
      type: {
        label: '워터마크 유형',
        description: '워터마크 유형을 설정합니다, 텍스트 또는 이미지.',
        text: '텍스트',
        image: '이미지',
      },
      text: {
        content: '텍스트 내용',
        fontSize: '워터마크 글꼴 크기',
        color: '워터마크 텍스트 색상',
      },
      image: {
        src: {
          label: '이미지 URL',
          upload: '이미지 업로드',
          select: '볼트에서 선택',
        },
      },
      opacity: '워터마크 투명도 (0은 투명, 1은 불투명)',
      rotate: '워터마크 회전 (도 단위)',
      width: '워터마크 너비',
      height: '워터마크 높이',
      x: '워터마크의 수평 간격',
      y: '워터마크의 수직 간격',
    },
    preview: '워터마크 미리보기',
    reset: '기본값으로 재설정',
    recursive: '하위 디렉토리의 노트 포함',
  },
  imageSelect: {
    search: '검색',
    select: '선택',
    cancel: '취소',
    empty: '이미지를 찾을 수 없음',
  },
  confirm: '확인',
  cancel: '취소',
  imageUrl: '이미지 URL',
} satisfies BaseTranslation;

export default ko;
