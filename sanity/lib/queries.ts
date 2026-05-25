import { groq } from "next-sanity";

// Query untuk mengambil semua UMKM
export const umkmQuery = groq`*[_type == "umkm"] | order(_createdAt desc) {
  _id,
  nama,
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
  hargaTiket
}`;

// Query untuk mengambil Profil Desa berdasarkan tipe (kabola / pantedeere)
export const profilDesaQuery = groq`*[_type == "profilDesa" && tipe == $tipe][0] {
  _id,
  judul,
  konten,
  tipe,
  "imageUrl": gambarUtama.asset->url,
  potensiUtama,
  potensi[]{
    judulPotensi,
    deskripsiPotensi
  }
}`;

// Query untuk mengambil semua data Storynomics
export const storynomicsQuery = groq`*[_type == "storynomics"] | order(_createdAt desc) {
  _id,
  judul,
  subtitle,
  kategori,
  deskripsi,
  "imageUrl": gambar.asset->url,
  tag
}`;
