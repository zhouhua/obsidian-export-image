/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const pl = {
  command: 'Eksportuj jako obraz',
  noActiveFile: 'Najpierw otwórz artykuł!',
  imageExportPreview: 'Podgląd eksportu obrazu',
  copiedSuccess: 'Skopiowano do schowka',
  copy: 'Kopiuj do schowka',
  copyFail: 'Nie udało się skopiować',
  notAllowCopy: 'Nie można bezpośrednio skopiować formatu {format}',
  save: 'Zapisz obraz',
  saveSuccess: 'Obraz został wyeksportowany i zapisany jako {filePath: string}.',
  saveFail: 'Nie udało się zapisać obrazu',
  saveVault: 'Zapisz w sejfie',
  includingFilename: 'Włącznie z nazwą pliku jako tytułem',
  imageWidth: 'Szerokość obrazu',
  exportImage: 'Eksportuj do obrazu',
  exportSelectionImage: 'Eksportuj wybór do obrazu',
  exportFolder: 'Eksportuj wszystkie notatki do obrazu',
  invalidWidth: 'Proszę ustawić szerokość na rozsądną liczbę.',
  '2x': 'Włącz obraz o rozdzielczości 2x',
  moreSetting:
    'Więcej szczegółowych ustawień można znaleźć w ustawieniach wtyczki „Eksport obrazu”.',
  guide: 'Przeciągnij, aby przesunąć, przewiń lub zaciśnij, aby przybliżyć/oddalić, podwójne kliknięcie, aby zresetować.',
  copyNotAllowed: 'format pdf nie jest obsługiwany do kopiowania',
  exportAll: 'Eksportuj wybrane notatki',
  noMarkdownFile: 'Brak plików markdown w bieżącym katalogu',
  selectAll: 'Zaznacz wszystko',
  setting: {
    title: 'Eksport obrazu',
    imageWidth: {
      label: 'Domyślna szerokość eksportowanego obrazu',
      description:
        'Ustaw szerokość eksportowanego obrazu w pikselach. Domyślnie jest 640px.',
    },
    filename: {
      label: 'Dołącz nazwę pliku jako tytuł',
      description:
        'Ustaw, czy nazwa pliku powinna być uwzględniona jako tytuł. Gdy Obsidian wyświetla dokument, wyświetla nazwę pliku jako tytuł h1. Czasami nie jest to pożądane i możesz otrzymać zduplikowane tytuły.',
    },
    '2x': {
      label: 'Włącz obraz o rozdzielczości 2x',
      description:
        'Ustaw, czy obraz o rozdzielczości 2x ma być włączony. Obrazy o rozdzielczości 2x wyglądają ostrzej i zapewniają lepsze doświadczenie na ekranach o wysokiej PPI, takich jak te w smartfonach. Jednak wadą jest większy rozmiar pliku obrazów.',
    },
    metadata: {
      label: 'Pokaż metadane',
    },
    format: {
      title: 'Format pliku wyjściowego',
      description:
        'Domyślne obrazy w formacie PNG powinny zaspokoić większość potrzeb, ale aby lepiej wspierać scenariusze użytkowników: 1. Wsparcie dla eksportowania obrazów z normalnym i przezroczystym tłem; 2. Wsparcie dla eksportowania obrazów JPG, aby osiągnąć mniejsze rozmiary plików, choć może nie być możliwe bezpośrednie kopiowanie do schowka; 3. Wsparcie dla eksportowania do formatu PDF jednostronicowego, który różni się od zwykłych formatów papierowych PDF, proszę uważać, aby nie nadużywać.',
      png0: '.png - domyślny',
      png1: '.png - obraz z przezroczystym tłem',
      jpg: '.jpg - obraz w formacie jpg',
      pdf: '.pdf - jednostronicowy PDF',
    },
    quickExportSelection: {
      label: 'Eksportuj szybki',
      description: 'Jeśli jest włączony, pominięty zostanie proces konfiguracji podczas eksportowania wybranych notatek, a eksportowane obrazy zostaną bezpośrednio skopiowane do schowka.',
    },
    userInfo: {
      title: 'Informacje o autorze',
      show: 'Pokaż informacje o autorze',
      avatar: {
        title: 'Awatar',
        description: 'Zaleca się używanie zdjęć kwadratowych',
      },
      name: 'Nazwa autora',
      position: 'Gdzie wyświetlić',
      remark: 'Dodatkowy tekst',
      align: 'Wyrównaj',
      removeAvatar: 'Usuń awatar',
    },
    watermark: {
      title: 'Znak wodny',
      enable: {
        label: 'Włącz znak wodny',
        description:
          'Włącz znak wodny, obsługuje znaki wodne tekstowe i obrazkowe.',
      },
      type: {
        label: 'Typ znaku wodnego',
        description: 'Ustaw typ znaku wodnego, tekst lub obraz.',
        text: 'Tekst',
        image: 'Obraz',
      },
      text: {
        content: 'Treść tekstu',
        fontSize: 'Rozmiar czcionki znaku wodnego',
        color: 'Kolor tekstu znaku wodnego',
      },
      image: {
        src: {
          label: 'URL obrazu',
          upload: 'Prześlij obraz',
          select: 'Wybierz z sejfu',
        },
      },
      opacity: 'Przezroczystość znaku wodnego (0 jest przezroczysty, 1 nieprzezroczysty)',
      rotate: 'Obrót znaku wodnego (w stopniach)',
      width: 'Szerokość znaku wodnego',
      height: 'Wysokość znaku wodnego',
      x: 'Poziome odstępy znaku wodnego',
      y: 'Pionowe odstępy znaku wodnego',
    },
    preview: 'Podgląd znaku wodnego',
    reset: 'Resetuj do domyślnych',
    recursive: 'Dołącz notatki z podkatalogów',
  },
  imageSelect: {
    search: 'Szukaj',
    select: 'Wybierz',
    cancel: 'Anuluj',
    empty: 'Nie znaleziono obrazów',
  },
  confirm: 'Potwierdź',
  cancel: 'Anuluj',
  imageUrl: 'URL obrazu',
} satisfies BaseTranslation;

export default pl;
