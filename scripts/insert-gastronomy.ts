import { getCliClient } from "sanity/cli";

const client = getCliClient();

const kueRambutDoc = {
  _type: 'ceritaKabola',
  judul: 'Kue Rambut',
  slug: { _type: 'slug', current: 'kue-rambut' },
  subtitle: 'Merawat Ingatan Leluhur Melalui Kuliner',
  kategori: 'gastronomi',
  tag: 'Kuliner Tradisional',
  deskripsi: 'Kue rambut merupakan salah satu kuliner tradisional khas Nusa Tenggara Timur, termasuk Alor, yang diwariskan turun-temurun. Namanya berasal dari tampilannya yang menyerupai helaian rambut keriting masyarakat Alor.',
  konten: [
    {
      _key: 'section-1',
      _type: 'object',
      judulSection: 'Simbol Identitas & Kebersamaan',
      isiSection: 'Bagi masyarakat Alor, kue rambut bukan sekadar camilan. Kue ini menjadi bagian dari kehidupan sehari-hari, dinikmati bersama keluarga, disajikan untuk menghormati tamu, hingga hadir dalam berbagai perayaan adat dan upacara keagamaan. Keterampilan membuatnya diwariskan secara lisan dan praktik langsung di lingkungan keluarga.'
    },
    {
      _key: 'section-2',
      _type: 'object',
      judulSection: 'Makna Bentuk Kue Rambut',
      isiSection: 'Setiap bentuk kue rambut memiliki makna tersendiri. Bentuk bulat melambangkan keutuhan dan eratnya hubungan kekeluargaan, sedangkan bentuk yang menyerupai pisau atau kapak menjadi simbol semangat, kerja keras, dan ketangguhan. Helaian-helaian tipis yang membentuk rongga pada kue dimaknai sebagai simbol ketulusan dan keterbukaan.'
    },
    {
      _key: 'section-3',
      _type: 'object',
      judulSection: 'Proses Pembuatan yang Unik',
      isiSection: 'Kue ini dibuat dari campuran tepung beras, gula aren, santan, dan air. Adonan cair dimasukkan ke dalam wadah berlubang, lalu ditekan perlahan hingga keluar membentuk untaian tipis. Untaian tersebut langsung dituangkan ke dalam minyak panas dengan gerakan memutar hingga membentuk pola menyerupai jaring. Saat bersentuhan dengan minyak panas, teksturnya berubah menjadi padat, renyah, dengan aroma gula aren yang harum.'
    }
  ]
};

const jagungTitiDoc = {
  _type: 'ceritaKabola',
  judul: 'Jagung Titi',
  slug: { _type: 'slug', current: 'jagung-titi' },
  subtitle: 'Warisan Kuliner dari Hasil Bumi Lokal',
  kategori: 'gastronomi',
  tag: 'Kuliner Tradisional',
  deskripsi: 'Jagung titi merupakan salah satu warisan kuliner khas Alor yang lahir dari kedekatan masyarakat dengan jagung sebagai sumber pangan utama, mencerminkan kemampuan memanfaatkan hasil pertanian lokal.',
  konten: [
    {
      _key: 'section-1',
      _type: 'object',
      judulSection: 'Lebih Dari Sekadar Makanan Ringan',
      isiSection: 'Bagi masyarakat Alor, jagung titi bukan sekadar makanan ringan. Hidangan ini kerap hadir dalam berbagai momen kebersamaan, menyambut tamu, hingga kegiatan adat dan keagamaan. Proses pembuatannya diwariskan secara alami di dalam keluarga, di mana anak-anak terbiasa melihat dan membantu orang tua menyangrai serta menumbuk jagung.'
    },
    {
      _key: 'section-2',
      _type: 'object',
      judulSection: 'Proses Meniti Jagung',
      isiSection: 'Pembuatannya masih mempertahankan cara tradisional. Jagung pulut disangrai sambil terus diaduk agar matang merata, mengurangi kadar air dan menambah aroma harum. Biji jagung yang masih panas kemudian diletakkan di atas batu datar dan dipukul menggunakan batu pipih hingga menjadi lempengan tipis. Proses pemukulan inilah yang disebut \'meniti\'.'
    },
    {
      _key: 'section-3',
      _type: 'object',
      judulSection: 'Cita Rasa & Pelestarian',
      isiSection: 'Jagung titi memiliki sensasi renyah dengan aroma khas jagung sangrai. Rasanya yang ringan membuatnya cocok dinikmati sebagai camilan atau pelengkap hidangan utama. Meskipun mulai jarang dipraktikkan oleh generasi muda, masyarakat terus menjaga keberadaannya melalui pewarisan dalam keluarga dan menjadikannya salah satu ikon kuliner daerah Alor.'
    }
  ]
};

async function main() {
  console.log("Inserting Kue Rambut...");
  const res1 = await client.create(kueRambutDoc);
  console.log("Kue Rambut inserted:", res1._id);

  console.log("Inserting Jagung Titi...");
  const res2 = await client.create(jagungTitiDoc);
  console.log("Jagung Titi inserted:", res2._id);
}

main().catch(console.error);
