export default {
  name: 'wisata',
  title: 'Katalog Wisata',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Tempat Wisata',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nama',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text',
    },
    {
      name: 'foto',
      title: 'Foto Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'galeri',
      title: 'Galeri Foto',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'lokasiMaps',
      title: 'Link Google Maps',
      type: 'url',
    },
    {
      name: 'fasilitas',
      title: 'Fasilitas Tersedia',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'hargaTiket',
      title: 'Harga Tiket Masuk',
      type: 'string',
    },
  ],
}
