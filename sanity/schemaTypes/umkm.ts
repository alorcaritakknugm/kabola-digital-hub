export default {
  name: 'umkm',
  title: 'Data UMKM',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Usaha / Produk',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pemilik',
      title: 'Nama Pemilik',
      type: 'string',
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi Produk',
      type: 'text',
    },
    {
      name: 'harga',
      title: 'Harga (Rentang / Satuan)',
      type: 'string',
    },
    {
      name: 'foto',
      title: 'Foto Produk',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'kontakWa',
      title: 'Nomor WhatsApp',
      type: 'string',
      description: 'Format: 6281234567890 (Gunakan 62, tanpa + atau spasi)',
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kuliner', value: 'kuliner' },
          { title: 'Kriya/Kerajinan', value: 'kriya' },
          { title: 'Jasa', value: 'jasa' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
      },
    },
  ],
}
