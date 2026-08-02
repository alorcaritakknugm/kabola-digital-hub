export default {
  name: 'informasiWisata',
  title: 'Informasi Wisata (Artikel)',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Artikel Wisata',
      type: 'string',
      description: 'Contoh: Pantai Maimol, Pantai Deere, dll.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Dibuat otomatis dari Judul Artikel. Klik "Generate". Digunakan sebagai URL halaman detail.',
      options: {
        source: 'judul',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subjudul',
      title: 'Subjudul / Tagline',
      type: 'string',
      description: 'Contoh: Permata Tersembunyi di Alor.',
    },
    {
      name: 'kategori',
      title: 'Kategori Artikel',
      type: 'string',
      description: 'Pilih kategori artikel wisata.',
      options: {
        list: [
          { title: 'Bahari', value: 'Bahari' },
          { title: 'Budaya', value: 'Budaya' },
          { title: 'Wisata Alam', value: 'Wisata Alam' },
          { title: 'Kuliner', value: 'Kuliner' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ringkasan',
      title: 'Ringkasan Artikel',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat yang tampil di kartu katalog.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'fotoUtama',
      title: 'Foto Utama Header',
      type: 'image',
      description: 'Foto utama yang tampil di kartu dan header artikel.',
      options: { hotspot: true },
    },
    {
      name: 'keteranganFotoUtama',
      title: 'Keterangan / Sumber Gambar Header (Opsional)',
      type: 'string',
      description: 'Contoh: Foto oleh KKN-PPM UGM 2026 / Pokdarwis Kabola.',
    },
    {
      name: 'tanggalDiperbarui',
      title: 'Tanggal Diperbarui / Publikasi',
      type: 'string',
      description: 'Contoh: Agustus 2026.',
    },
    {
      name: 'konten',
      title: 'Konten Artikel (Section & Paragraf)',
      type: 'array',
      description: 'Tambah section/paragraf teks bebas sesuai struktur artikel yang diinginkan.',
      of: [
        {
          type: 'object',
          title: 'Section Teks',
          fields: [
            {
              name: 'judulSection',
              title: 'Sub-judul Section (Opsional)',
              type: 'string',
              description: 'Contoh: Permata Tersembunyi di Alor, Akses Menuju Lokasi, dll.',
            },
            {
              name: 'isiSection',
              title: 'Isi Paragraf Teks',
              type: 'text',
              rows: 6,
              description: 'Teks artikel atau naskah deskripsi.',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'fotoSection',
              title: 'Foto Ilustrasi Section (Opsional)',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'keteranganFotoSection',
              title: 'Keterangan / Sumber Gambar Section (Opsional)',
              type: 'string',
              description: 'Contoh: Foto oleh Dokumentasi Tim KKN UGM 2026.',
            },
          ],
        },
      ],
    },
  ],
}
