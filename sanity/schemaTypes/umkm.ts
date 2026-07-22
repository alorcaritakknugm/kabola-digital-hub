export default {
  name: 'umkm',
  title: 'Data UMKM',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Produk',
      type: 'string',
      description: 'Contoh: Tenun Ikat, Kopi Robusta, dll.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'namaIkm',
      title: 'Nama IKM',
      type: 'string',
      description: 'Nama Industri Kecil Menengah atau Unit Usaha (Contoh: Tenun Ikat Alor Bunda)',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Dibuat otomatis dari Nama Usaha. Klik "Generate".',
      options: {
        source: 'nama',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pemilik',
      title: 'Nama Pemilik',
      type: 'string',
      description: 'Nama lengkap pemilik usaha.',
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      description: 'Pilih kategori yang paling sesuai.',
      options: {
        list: [
          { title: 'Pangan', value: 'pangan' },
          { title: 'Kriya', value: 'kriya' },
          { title: 'Kuliner', value: 'kuliner' },
          { title: 'Jasa', value: 'jasa' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'jenis',
      title: 'Jenis UMKM / Unit Toko',
      type: 'string',
      options: {
        list: [
          { title: 'UMKM Lokal', value: 'lokal' },
          { title: 'NTT Mart', value: 'nttMart' },
        ],
        layout: 'radio',
      },
      initialValue: 'lokal',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi Produk',
      type: 'text',
      rows: 4,
      description: 'Cerita singkat tentang produk atau usaha ini (tampil di kartu dan halaman detail).',
    },
    {
      name: 'harga',
      title: 'Harga (Rentang / Satuan)',
      type: 'string',
      description: 'Contoh: Rp 50.000 – Rp 200.000 / lembar. Tampil di bawah kartu produk.',
    },
    {
      name: 'foto',
      title: 'Foto Produk Utama',
      type: 'image',
      description: 'Foto produk terbaik. Disarankan rasio 4:3 atau 1:1.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'kontakWa',
      title: 'Nomor WhatsApp Pemilik',
      type: 'string',
      description: 'Format: 6281234567890 (awali dengan 62, tanpa tanda + atau spasi). Contoh: 628123456789',
    },
    {
      name: 'nib',
      title: 'NIB (Nomor Induk Berusaha)',
      type: 'string',
      description: 'Isi nomor NIB atau status (Contoh: "1234000123456" atau "Ada"). Kosongkan jika tidak ada.',
    },
    {
      name: 'pirt',
      title: 'P-IRT (Izin Edar Pangan)',
      type: 'string',
      description: 'Isi nomor P-IRT atau status (Contoh: "P-IRT 2065301010012-27" atau "Ada"). Kosongkan jika tidak ada.',
    },
    {
      name: 'halal',
      title: 'Sertifikat Halal',
      type: 'string',
      description: 'Isi nomor Sertifikat Halal atau status (Contoh: "ID5311000123456" atau "Ada"). Kosongkan jika tidak ada.',
    },
  ],
}
