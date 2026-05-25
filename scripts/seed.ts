import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const umkmData = [
  {
    _type: 'umkm',
    nama: 'Tenun Ikat Alor "Bunda"',
    pemilik: 'Mama Maria',
    deskripsi: 'Kain tenun ikat tradisional Alor dengan pewarna alam khas motif Kabola. Dibuat secara manual menggunakan alat tenun bukan mesin (ATBM).',
    harga: 'Rp 300.000 - Rp 1.500.000',
    kontakWa: '6281234567890',
    kategori: 'kriya',
  },
  {
    _type: 'umkm',
    nama: 'Kopi Alor Kalabahi',
    pemilik: 'Pak Frans',
    deskripsi: 'Biji kopi robusta dan arabika pilihan dari pegunungan Alor. Dipanggang secara tradisional menghasilkan aroma khas yang kuat.',
    harga: 'Rp 50.000 / 250gr',
    kontakWa: '6281234567891',
    kategori: 'kuliner',
  },
  {
    _type: 'umkm',
    nama: 'Kacang Kenari Kupas',
    pemilik: 'Mama Yosina',
    deskripsi: 'Kacang kenari liar yang dikumpulkan dari hutan Kabola. Gurih dan kaya manfaat, cocok untuk camilan sehat atau bahan kue.',
    harga: 'Rp 45.000 / kemasan',
    kontakWa: '6281234567892',
    kategori: 'kuliner',
  },
  {
    _type: 'umkm',
    nama: 'Ikan Kering Kayu Alor',
    pemilik: 'Kelompok Nelayan Pante Deere',
    deskripsi: 'Ikan tangkapan nelayan pesisir Pante Deere yang diasinkan dan dijemur hingga kering. Tahan lama dan tanpa bahan pengawet.',
    harga: 'Rp 35.000 / bungkus',
    kontakWa: '6281234567893',
    kategori: 'kuliner',
  },
  {
    _type: 'umkm',
    nama: 'Kerajinan Anyaman Lontar',
    pemilik: 'Sanggar Seni Kabola',
    deskripsi: 'Tas, topi, dan tikar hasil anyaman daun lontar khas pengrajin lokal. Kuat, tahan lama, dan memiliki nilai seni tinggi.',
    harga: 'Rp 20.000 - Rp 150.000',
    kontakWa: '6281234567894',
    kategori: 'kriya',
  }
];

const wisataData = [
  {
    _type: 'wisata',
    nama: 'Konservasi Dugong Pantai Mali',
    slug: { _type: 'slug', current: 'konservasi-dugong-pantai-mali' },
    deskripsi: 'Pengalaman langka berinteraksi dengan Dugong (Ikan Duyung) bernama Mawar di habitat aslinya. Dipandu oleh pawang lokal.',
    fasilitas: ['Perahu Motor', 'Pemandu Lokal', 'Pelampung', 'Toilet', 'Area Parkir'],
    hargaTiket: 'Rp 150.000 / orang',
    lokasiMaps: 'https://goo.gl/maps/contoh1',
  },
  {
    _type: 'wisata',
    nama: 'Pantai Deere',
    slug: { _type: 'slug', current: 'pantai-deere' },
    deskripsi: 'Pantai pasir putih dengan ombak yang tenang, dikelilingi pepohonan rindang. Sangat cocok untuk bersantai keluarga dan menikmati senja yang indah.',
    fasilitas: ['Gazebo', 'Toilet', 'Warung Makan', 'Penyewaan Alat Renang'],
    hargaTiket: 'Rp 10.000 / orang',
    lokasiMaps: 'https://goo.gl/maps/contoh2',
  },
  {
    _type: 'wisata',
    nama: 'Desa Tradisional Kabola',
    slug: { _type: 'slug', current: 'desa-tradisional-kabola' },
    deskripsi: 'Menjelajahi budaya leluhur Alor dengan rumah adat, pakaian kulit kayu yang unik, serta tarian tradisional Lego-Lego yang memukau.',
    fasilitas: ['Pemandu Budaya', 'Penyewaan Pakaian Adat', 'Pertunjukan Tari', 'Toko Souvenir'],
    hargaTiket: 'Donasi Sukarela',
    lokasiMaps: 'https://goo.gl/maps/contoh3',
  }
];

async function seed() {
  console.log('Deleting existing UMKM data...');
  const existingUmkm = await client.fetch('*[_type == "umkm"]{_id}');
  for (const doc of existingUmkm) {
    await client.delete(doc._id);
    console.log(`Deleted UMKM: ${doc._id}`);
  }

  console.log('Deleting existing Wisata data...');
  const existingWisata = await client.fetch('*[_type == "wisata"]{_id}');
  for (const doc of existingWisata) {
    await client.delete(doc._id);
    console.log(`Deleted Wisata: ${doc._id}`);
  }

  console.log('Seeding new realistic UMKM data...');
  for (const doc of umkmData) {
    const res = await client.create(doc);
    console.log(`Created UMKM: ${res.nama} (${res._id})`);
  }

  console.log('Seeding new realistic Wisata data...');
  for (const doc of wisataData) {
    const res = await client.create(doc);
    console.log(`Created Wisata: ${res.nama} (${res._id})`);
  }
  
  console.log('Seeding finished!');
}

seed().catch(console.error);
