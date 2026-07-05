export default {
  name: 'ceritaKabola',
  title: 'Kabola dalam Cerita',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Cerita',
      type: 'string',
      description: 'Contoh: Hutan Mangrove & Nelayan Kabola, Tenun Ikat Alor, Jagung Bose, dll.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Dibuat otomatis dari Judul Cerita. Klik "Generate". Digunakan sebagai URL halaman detail cerita.',
      options: {
        source: 'judul',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Kalimat singkat di bawah judul. Contoh: Ekologi Pesisir, Warisan Tekstil Nusantara.',
    },
    {
      name: 'kategori',
      title: 'Kategori Tab',
      type: 'string',
      description: 'Menentukan di tab mana cerita ini tampil di halaman Kabola dalam Cerita.',
      options: {
        list: [
          { title: 'Gastronomi (Makanan & Kuliner)', value: 'gastronomi' },
          { title: 'Eko-Naratif (Alam & Lingkungan)', value: 'eko-naratif' },
          { title: 'Tradisi & Budaya', value: 'tradisi-budaya' },
          { title: 'Lensa Kabola (Foto & Visual)', value: 'lensa-kabola' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tag',
      title: 'Label Tag',
      type: 'string',
      description: 'Label pendek yang tampil di pojok kiri atas gambar kartu. Contoh: Kuliner Tradisional, Seni Tekstil, Potret.',
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi / Isi Cerita',
      type: 'text',
      rows: 6,
      description: 'Narasi utama cerita ini. Tampil di kartu (dipotong 3 baris) dan halaman detail cerita.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gambar',
      title: 'Gambar Ilustrasi',
      type: 'image',
      description: 'Foto atau gambar yang mewakili cerita ini. Tampil sebagai header kartu. Disarankan rasio 4:3.',
      options: { hotspot: true },
    },
  ],
}
