export default {
  name: 'profilDesa',
  title: 'Profil Desa',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul / Nama Entitas',
      type: 'string',
      description: 'Misal: Sejarah Kelurahan Kabola',
    },
    {
      name: 'tipe',
      title: 'Tipe Wilayah',
      type: 'string',
      options: {
        list: [
          { title: 'Kelurahan Kabola', value: 'kabola' },
          { title: 'Desa Pante Deere', value: 'pantedeere' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'konten',
      title: 'Konten / Sejarah',
      type: 'text',
    },
    {
      name: 'gambarUtama',
      title: 'Gambar Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'potensiUtama',
      title: 'Ringkasan Potensi',
      type: 'string',
    },
    {
      name: 'potensi',
      title: 'Daftar Potensi / Storynomics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'judulPotensi',
              title: 'Judul Potensi',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'deskripsiPotensi',
              title: 'Deskripsi Potensi',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            }
          ]
        }
      ]
    }
  ],
}
