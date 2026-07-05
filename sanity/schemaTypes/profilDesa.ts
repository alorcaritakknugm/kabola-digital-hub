export default {
  name: 'profilDesa',
  title: 'Profil Desa / Kelurahan',
  type: 'document',
  fields: [
    {
      name: 'tipe',
      title: 'Tipe Wilayah',
      type: 'string',
      description: 'Pilih wilayah yang sesuai. Hanya boleh ada SATU dokumen per tipe.',
      options: {
        list: [
          { title: 'Kelurahan Kabola', value: 'kabola' },
          { title: 'Desa Pante Deere', value: 'pantedeere' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'judul',
      title: 'Nama Wilayah',
      type: 'string',
      description: 'Tampil sebagai judul halaman hero. Contoh: Kelurahan Kabola, Desa Pante Deere.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'konten',
      title: 'Deskripsi / Sejarah',
      type: 'text',
      rows: 8,
      description: 'Teks deskripsi utama wilayah. Tampil di bagian "Sekilas Tentang..." dalam halaman profil. Gunakan baris baru (Enter) untuk membuat paragraf baru.',
    },
    {
      name: 'potensi',
      title: 'Daftar Potensi Wilayah',
      type: 'array',
      description: 'Setiap item akan tampil sebagai kartu potensi di halaman profil. Disarankan 2–4 potensi.',
      of: [
        {
          type: 'object',
          title: 'Potensi',
          fields: [
            {
              name: 'judulPotensi',
              title: 'Judul Potensi',
              type: 'string',
              description: 'Contoh: Pariwisata Terintegrasi, Ekonomi Kreatif & UMKM.',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'deskripsiPotensi',
              title: 'Deskripsi Potensi',
              type: 'text',
              rows: 4,
              description: 'Penjelasan singkat potensi ini (2–4 kalimat).',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}
