/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const ms = {
  command: 'Eksport sebagai imej',
  noActiveFile: 'Sila buka artikel terlebih dahulu!',
  imageExportPreview: 'Pratonton Eksport Imej',
  copiedSuccess: 'Disalin ke papan keratan',
  copy: 'Salin ke Papan Keratan',
  copyFail: 'Gagal menyalin',
  notAllowCopy: 'Tidak boleh menyalin format {format} secara langsung',
  save: 'Simpan Imej',
  saveSuccess: 'Imej telah dieksport dan disimpan sebagai {filePath: string}.',
  saveFail: 'Gagal menyimpan imej',
  saveVault: 'Simpan ke Vault',
  includingFilename: 'Termasuk Nama Fail Sebagai Tajuk',
  imageWidth: 'Lebar Imej',
  exportImage: 'Eksport sebagai imej',
  exportSelectionImage: 'Eksport pilihan sebagai imej',
  exportFolder: 'Eksport semua nota sebagai imej',
  invalidWidth: 'Sila tetapkan lebar dengan angka yang munasabah.',
  '2x': 'Aktifkan imej resolusi 2x',
  moreSetting:
    'Seting lebih terperinci boleh didapati dalam tetapan plugin `Eksport Imej`.',
  guide: 'Seret untuk Bergerak, gulir atau cubit untuk zoom masuk/keluar, klik dua kali untuk menetapkan semula.',
  copyNotAllowed: 'format pdf tidak disokong untuk disalin',
  exportAll: 'Eksport Nota Terpilih',
  noMarkdownFile: 'Tiada fail markdown dalam direktori semasa',
  selectAll: 'Pilih Semua',
  setting: {
    title: 'Eksport Imej',
    imageWidth: {
      label: 'Lebar Imej Eksport Lalai',
      description:
        'Tetapkan lebar imej yang dieksport dalam piksel. Lalai adalah 640px.',
    },
    filename: {
      label: 'Termasuk Nama Fail Sebagai Tajuk',
      description:
        'Tetapkan sama ada untuk menyertakan nama fail sebagai tajuk. Apabila Obsidian memaparkan dokumen, ia akan menunjukkan nama fail sebagai tajuk h1. Kadangkala ini bukan apa yang anda mahu, dan anda akan mendapatkan tajuk berganda.',
    },
    '2x': {
      label: 'Aktifkan imej resolusi 2x',
      description:
        'Tetapkan sama ada untuk mengaktifkan imej resolusi 2x. Imej dengan resolusi 2x akan kelihatan lebih tajam dan menyediakan pengalaman yang lebih baik pada skrin PPI tinggi, seperti pada telefon pintar. Walau bagaimanapun, kelemahannya adalah saiz fail imej lebih besar.',
    },
    metadata: {
      label: 'Papar Metadata',
    },
    format: {
      title: 'Format Fail Output',
      description:
        'Imej format PNG lalai seharusnya memenuhi kebanyakan keperluan, tetapi untuk menyokong skenario pengguna lebih baik: 1. Sokongan untuk mengeksport imej dengan latar belakang normal dan telus; 2. Sokongan untuk mengeksport imej JPG untuk mencapai saiz fail yang lebih kecil, walaupun mungkin tidak dapat disalin langsung ke papan keratan; 3. Sokongan untuk mengeksport ke format PDF satu halaman, yang berbeza dari format kertas PDF biasa, sila berhati-hati untuk tidak salah guna.',
      png0: '.png - lalai',
      png1: '.png - imej dengan latar belakang telus',
      jpg: '.jpg - imej format jpg',
      pdf: '.pdf - PDF satu halaman',
    },
    quickExportSelection: {
      label: 'Eksport cepat',
      description: 'Jika diaktifkan, proses konfigurasi akan diabaikan saat mengekspor catatan yang dipilih, dan gambar yang diekspor akan langsung disalin ke clipboard.',
    },
    userInfo: {
      title: 'Info Penulis',
      show: 'Papar Info Penulis',
      avatar: {
        title: 'Avatar',
        description: 'Menggunakan gambar persegi disarankan',
      },
      name: 'Nama Penulis',
      position: 'Di mana untuk dipaparkan',
      remark: 'Teks tambahan',
      align: 'Menyelaraskan',
      removeAvatar: 'Buang Avatar',
    },
    watermark: {
      title: 'Watermark',
      enable: {
        label: 'Aktifkan watermark',
        description:
          'Aktifkan watermark, menyokong watermark teks dan imej.',
      },
      type: {
        label: 'Jenis Watermark',
        description: 'Tetapkan jenis watermark, teks atau imej.',
        text: 'Teks',
        image: 'Imej',
      },
      text: {
        content: 'Kandungan Teks',
        fontSize: 'Saiz Fon Watermark',
        color: 'Warna Teks Watermark',
      },
      image: {
        src: {
          label: 'URL Imej',
          upload: 'Muat Naik Imej',
          select: 'Pilih dari Vault',
        },
      },
      opacity: 'Ketelapan Watermark (0 telus, 1 tidak telus)',
      rotate: 'Putaran Watermark (dalam darjah)',
      width: 'Lebar Watermark',
      height: 'Tinggi Watermark',
      x: 'Jarak mendatar Watermark',
      y: 'Jarak menegak Watermark',
    },
    preview: 'Pratonton Watermark',
    reset: 'Tetapkan Semula ke Lalai',
    recursive: 'Masukkan nota dari subdirektori',
  },
  imageSelect: {
    search: 'Cari',
    select: 'Pilih',
    cancel: 'Batal',
    empty: 'Tiada imej ditemui',
  },
  confirm: 'Konfirmasi',
  cancel: 'Batal',
  imageUrl: 'URL gambar',
} satisfies BaseTranslation;

export default ms;
