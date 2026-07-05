export default {
  name: 'wisata',
  title: 'Katalog Wisata',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Tempat Wisata',
      type: 'string',
      description: 'Contoh: Pantai Deere, Desa Tradisional Kabola, dll.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Dibuat otomatis dari Nama Wisata. Klik "Generate". Digunakan sebagai URL halaman detail.',
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
      rows: 4,
      description: 'Cerita singkat tentang destinasi ini. Tampil di kartu katalog dan halaman detail.',
    },
    {
      name: 'hargaTiket',
      title: 'Harga Tiket Masuk',
      type: 'string',
      description: 'Contoh: Rp 10.000/orang, Gratis, atau Hubungi Pokdarwis. Tampil di kartu dan sidebar halaman detail.',
    },
    {
      name: 'durasiWisata',
      title: 'Estimasi Durasi Kunjungan',
      type: 'string',
      description: 'Label durasi yang tampil di badge kartu wisata. Contoh: Setengah Hari, Seharian, 2–3 Jam.',
    },
    {
      name: 'kontakWa',
      title: 'Nomor WhatsApp Pemandu / Pokdarwis',
      type: 'string',
      description: 'Format: 628xxxxxxxxx (awali dengan 62, tanpa tanda + atau spasi). Contoh: 6283117149096. Digunakan untuk tombol Reservasi WA di kartu dan halaman detail.',
    },
    {
      name: 'foto',
      title: 'Foto Utama',
      type: 'image',
      description: 'Foto utama destinasi wisata. Tampil sebagai header kartu dan halaman detail. Disarankan rasio 16:9.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'galeri',
      title: 'Galeri Foto',
      type: 'array',
      description: 'Foto-foto tambahan yang tampil di bagian galeri halaman detail.',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'fasilitas',
      title: 'Fasilitas Tersedia',
      type: 'array',
      description: 'Daftar fasilitas yang ada (contoh: Toilet Umum, Parkir, Gazebo, Snorkeling). Tampil sebagai grid di halaman detail.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'lokasiMaps',
      title: 'Link Google Maps',
      type: 'url',
      description: 'Salin link berbagi dari Google Maps. Tampil sebagai tombol "Lihat di Google Maps" di sidebar halaman detail.',
    },
  ],
}
