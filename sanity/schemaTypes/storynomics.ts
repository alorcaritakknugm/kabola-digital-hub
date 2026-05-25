export default {
  name: 'storynomics',
  title: 'Storynomics Digital',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Storynomics',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Misal: Jagung Bose, Tenun Ikat Alor, dll.',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Misal: Makanan Pokok Tradisional',
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Gastronomi', value: 'gastronomi' },
          { title: 'Etnofarmakologi', value: 'etnofarmakologi' },
          { title: 'Budaya', value: 'budaya' },
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
