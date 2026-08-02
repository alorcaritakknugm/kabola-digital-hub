export interface InformasiWisataSection {
  judulSection?: string;
  isiSection: string; // Paragraf atau narasi teks
  fotoSection?: string;
  keteranganFotoSection?: string; // Keterangan atau sumber gambar section
}

export interface InformasiWisataItem {
  id: string;
  slug: string;
  judul: string;
  subjudul?: string;
  kategori: string;
  ringkasan: string;
  fotoUtama: string;
  keteranganFotoUtama?: string; // Keterangan atau sumber gambar header
  tanggalDiperbarui?: string;
  konten: InformasiWisataSection[];
}

// Data sepenuhnya dinamis dari Sanity Studio (Sanity CMS)
export const INFORMASI_WISATA_LIST: InformasiWisataItem[] = [];
