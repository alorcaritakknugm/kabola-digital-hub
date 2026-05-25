export default {
  name: 'ceritaKabola',
  title: 'Kabola dalam Cerita',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Cerita',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Misal: Hutan Mangrove & Nelayan Kabola, Tenun Ikat Alor, dll.',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Misal: Ekologi Pesisir',
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Gastronomi', value: 'gastronomi' },
          { title: 'Eko-Naratif', value: 'eko-naratif' },
          { title: 'Tradisi & Budaya', value: 'tradisi-budaya' },
          { title: 'Lensa Kabola', value: 'lensa-kabola' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi / Cerita',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gambar',
      title: 'Gambar Ilustrasi',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tag',
      title: 'Tag Singkat',
      type: 'string',
      description: 'Label pendek yang muncul di pojok gambar (Misal: Kuliner Tradisional)',
    },
  ],
}
