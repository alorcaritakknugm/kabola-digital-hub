import { groq } from "next-sanity";

// Query untuk mengambil semua UMKM
export const umkmQuery = groq`*[_type == "umkm"] | order(_createdAt desc) {
  _id,
  nama,
  "slug": slug.current,
  pemilik,
  deskripsi,
  harga,
  "imageUrl": foto.asset->url,
  kontakWa,
  kategori
}`;

// Query untuk mengambil satu UMKM berdasarkan slug
export const umkmBySlugQuery = groq`*[_type == "umkm" && slug.current == $slug][0] {
  _id,
  nama,
  "slug": slug.current,
  pemilik,
  deskripsi,
  harga,
  "imageUrl": foto.asset->url,
  kontakWa,
  kategori
}`;

// Query untuk mengambil semua Tempat Wisata
export const wisataQuery = groq`*[_type == "wisata"] | order(_createdAt desc) {
  _id,
  nama,
  "slug": slug.current,
  deskripsi,
  "imageUrl": foto.asset->url,
  "galleryUrls": galeri[].asset->url,
  lokasiMaps,
  fasilitas,
  hargaTiket,
  durasiWisata,
  kontakWa
}`;

// Query untuk mengambil satu Wisata berdasarkan slug (halaman detail)
export const wisataBySlugQuery = groq`*[_type == "wisata" && slug.current == $slug][0] {
  _id,
  nama,
  "slug": slug.current,
  deskripsi,
  "imageUrl": foto.asset->url,
  "galleryUrls": galeri[].asset->url,
  lokasiMaps,
  fasilitas,
  hargaTiket,
  durasiWisata,
  kontakWa
}`;

// Query untuk mengambil Profil Desa berdasarkan tipe (kabola / pantedeere)
export const profilDesaQuery = groq`*[_type == "profilDesa" && tipe == $tipe][0] {
  _id,
  judul,
  konten,
  tipe,
  potensi[]{
    judulPotensi,
    deskripsiPotensi
  }
}`;

// Query untuk mengambil semua data Kabola dalam Cerita
export const ceritaKabolaQuery = groq`*[_type == "ceritaKabola"] | order(_createdAt desc) {
  _id,
  judul,
  "slug": slug.current,
  subtitle,
  kategori,
  deskripsi,
  "imageUrl": gambar.asset->url,
  tag
}`;

// Query untuk mengambil satu Cerita Kabola berdasarkan slug (halaman detail)
export const ceritaKabolaBySlugQuery = groq`*[_type == "ceritaKabola" && slug.current == $slug][0] {
  _id,
  judul,
  "slug": slug.current,
  subtitle,
  kategori,
  deskripsi,
  "imageUrl": gambar.asset->url,
  tag
}`;
