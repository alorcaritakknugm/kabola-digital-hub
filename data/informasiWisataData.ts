export interface InformasiWisataSection {
  judulSection?: string;
  isiSection: string; // Paragraf atau narasi teks
  fotoSection?: string;
}

export interface InformasiWisataItem {
  id: string;
  slug: string;
  judul: string;
  subjudul?: string;
  kategori: string;
  ringkasan: string;
  fotoUtama: string;
  tanggalDiperbarui?: string;
  konten: InformasiWisataSection[];
}

// Data sepenuhnya dinamis dari Sanity Studio (Sanity CMS)
export const INFORMASI_WISATA_LIST: InformasiWisataItem[] = [];
