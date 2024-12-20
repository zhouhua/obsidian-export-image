/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const id = {
  command: 'Ekspor sebagai gambar',
  noActiveFile: 'Silakan buka artikel terlebih dahulu!',
  imageExportPreview: 'Pratinjau Ekspor Gambar',
  copiedSuccess: 'Disalin ke clipboard',
  copy: 'Salin ke Clipboard',
  copyFail: 'Gagal menyalin',
  notAllowCopy: 'Tidak dapat langsung menyalin format {format}',
  save: 'Simpan Gambar',
  saveSuccess: 'Gambar berhasil diekspor dan disimpan sebagai {filePath: string}.',
  saveFail: 'Gagal menyimpan gambar',
  saveVault: 'Simpan ke Vault',
  includingFilename: 'Termasuk Nama File Sebagai Judul',
  imageWidth: 'Lebar Gambar',
  exportImage: 'Ekspor ke gambar',
  exportSelectionImage: 'Ekspor seleksi ke gambar',
  exportFolder: 'Ekspor semua catatan ke gambar',
  invalidWidth: 'Please set width with a reasonable number.', // Opsional: "Silakan atur lebar dengan angka yang wajar."
  '2x': 'Aktifkan gambar resolusi 2x',
  moreSetting:
    'Pengaturan lebih rinci dapat ditemukan di pengaturan plugin `Ekspor Gambar`.',
  guide: 'Seret untuk Bergerak, gulir atau cubit untuk memperbesar/memperkecil, klik dua kali untuk mereset.',
  copyNotAllowed: 'format pdf tidak didukung untuk disalin',
  exportAll: 'Ekspor Catatan yang Dipilih',
  noMarkdownFile: 'Tidak ada berkas markdown di direktori saat ini',
  selectAll: 'Pilih Semua',
  setting: {
    title: 'Ekspor Gambar',
    imageWidth: {
      label: 'Lebar gambar ekspor default',
      description:
        'Atur lebar gambar yang diekspor dalam piksel. Default adalah 640px.',
    },
    filename: {
      label: 'Termasuk nama file sebagai judul',
      description:
        'Atur apakah nama file akan disertakan sebagai judul. Ketika Obsidian menampilkan dokumen, itu akan menampilkan nama file sebagai judul h1. Kadang ini tidak diinginkan, dan Anda akan mendapat judul ganda.',
    },
    '2x': {
      label: 'Aktifkan gambar resolusi 2x',
      description:
        'Atur apakah gambar resolusi 2x akan diaktifkan. Gambar dengan resolusi 2x akan terlihat lebih tajam dan memberikan pengalaman yang lebih baik pada layar DPI tinggi, seperti pada smartphone. Namun, kekurangannya adalah ukuran file gambar lebih besar.',
    },
    metadata: {
      label: 'Tampilkan metadata',
    },
    format: {
      title: 'Format file keluaran',
      description:
        'Gambar format PNG default harus memenuhi kebutuhan sebagian besar, tapi untuk lebih mendukung skenario pengguna: 1. Dukungan untuk mengekspor gambar dengan latar belakang normal dan transparan; 2. Dukungan untuk mengekspor gambar JPG untuk mencapai ukuran file yang lebih kecil, walaupun mungkin tidak bisa langsung disalin ke clipboard; 3. Dukungan untuk mengekspor ke format PDF satu halaman, yang berbeda dari format kertas PDF biasa, harap berhati-hati untuk tidak salah gunakan.',
      png0: '.png - default',
      png1: '.png - gambar latar belakang transparan',
      jpg: '.jpg - gambar format jpg',
      pdf: '.pdf - PDF satu halaman',
    },
    quickExportSelection: {
      label: 'Ekspor cepat',
      description: 'Jika diaktifkan, proses konfigurasi akan diabaikan saat mengekspor catatan yang dipilih, dan gambar yang diekspor akan langsung disalin ke clipboard.',
    },
    userInfo: {
      title: 'Info Penulis',
      show: 'Tampilkan info penulis',
      avatar: {
        title: 'Avatar',
        description: 'Disarankan menggunakan gambar persegi',
      },
      name: 'Nama penulis',
      position: 'Dimana ditampilkan',
      remark: 'Teks tambahan',
      align: 'Menyelaraskan',
      removeAvatar: 'Hapus avatar',
    },
    watermark: {
      title: 'Watermark',
      enable: {
        label: 'Aktifkan watermark',
        description:
          'Mengaktifkan watermark, mendukung watermark teks dan gambar.',
      },
      type: {
        label: 'Tipe watermark',
        description: 'Atur tipe watermark, teks atau gambar.',
        text: 'Teks',
        image: 'Gambar',
      },
      text: {
        content: 'Konten teks',
        fontSize: 'Ukuran font watermark',
        color: 'Warna teks watermark',
      },
      image: {
        src: {
          label: 'URL gambar',
          upload: 'Unggah gambar',
          select: 'Pilih dari Vault',
        },
      },
      opacity: 'Ketebalan watermark (0 transparan, 1 tidak transparan)',
      rotate: 'Rotasi watermark (dalam derajat)',
      width: 'Lebar watermark',
      height: 'Tinggi watermark',
      x: 'Jarak horizontal watermark',
      y: 'Jarak vertikal watermark',
    },
    preview: 'Pratinjau watermark',
    reset: 'Reset ke default',
    recursive: 'Termasuk catatan dari subdirektori',
  },
  imageSelect: {
    search: 'Cari',
    select: 'Pilih',
    cancel: 'Batal',
    empty: 'Tidak ada gambar yang ditemukan',
  },
  confirm: 'Konfirmasi',
  cancel: 'Batal',
  imageUrl: 'Masukkan URL gambar',
} satisfies BaseTranslation;

export default id;
