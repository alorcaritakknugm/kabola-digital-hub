export interface LivestockRecord {
  kecamatan: string;
  sapiPotong: number;
  kerbau: number;
  kuda: number;
  kambing: number;
  domba: number;
  babi: number;
  ayamBuras: number;
  ayamRasPedaging: number;
  ayamRasPetelur: number;
  itik: number;
  total: number;
  clusterId: "klaster-1" | "klaster-2" | "klaster-3";
}

export type AnimalTypeKey =
  | "total"
  | "sapiPotong"
  | "kerbau"
  | "kuda"
  | "kambing"
  | "domba"
  | "babi"
  | "ayamBuras"
  | "ayamRasPedaging"
  | "ayamRasPetelur"
  | "itik";

export interface AnimalTypeOption {
  key: AnimalTypeKey;
  label: string;
  shortLabel: string;
  icon?: string;
}

export const ANIMAL_TYPE_OPTIONS: AnimalTypeOption[] = [
  { key: "total", label: "Total Populasi Ternak", shortLabel: "Total" },
  { key: "sapiPotong", label: "Sapi Potong", shortLabel: "Sapi" },
  { key: "kambing", label: "Kambing", shortLabel: "Kambing" },
  { key: "babi", label: "Babi", shortLabel: "Babi" },
  { key: "ayamBuras", label: "Ayam Buras", shortLabel: "Ayam Buras" },
  { key: "ayamRasPedaging", label: "Ayam Ras Pedaging", shortLabel: "Pedaging" },
  { key: "ayamRasPetelur", label: "Ayam Ras Petelur", shortLabel: "Petelur" },
  { key: "itik", label: "Itik", shortLabel: "Itik" },
  { key: "kuda", label: "Kuda", shortLabel: "Kuda" },
  { key: "domba", label: "Domba", shortLabel: "Domba" },
  { key: "kerbau", label: "Kerbau", shortLabel: "Kerbau" },
];

export interface ClusterDetail {
  id: "klaster-1" | "klaster-2" | "klaster-3";
  name: string;
  description: string;
  color: string; // SVG fill color
  strokeColor: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeBg: string;
  anggota: string[];
}

export const CLUSTERS_INFO: ClusterDetail[] = [
  {
    id: "klaster-1",
    name: "Klaster 1",
    description:
      "Populasi ternak tergolong moderat. Komoditas di klaster ini didominasi oleh ternak seperti sapi, kuda, kambing, babi, dan ayam.",
    color: "#D4F4FA", // Light Cyan
    strokeColor: "#2BB6BB",
    bgClass: "bg-teal-50",
    borderClass: "border-teal-500",
    textClass: "text-teal-800",
    badgeBg: "bg-teal-100 text-teal-900 border-teal-300",
    anggota: [
      "Pantar",
      "Pantar Timur",
      "Pantar Barat Laut",
      "Pantar Tengah",
      "Abad Selatan",
      "Alor Timur Laut",
      "Alor Tengah Utara",
      "Pulau Pura",
    ],
  },
  {
    id: "klaster-2",
    name: "Klaster 2",
    description:
      "Memiliki populasi hewan ternak paling besar di Kabupaten Alor dengan dominasi kambing, domba, babi, ayam, dan itik.",
    color: "#46B5BE", // Medium Teal
    strokeColor: "#0E757D",
    bgClass: "bg-cyan-50",
    borderClass: "border-cyan-500",
    textClass: "text-cyan-800",
    badgeBg: "bg-cyan-100 text-cyan-900 border-cyan-300",
    anggota: ["Alor Barat Laut", "Kabola", "Teluk Mutiara", "Alor Barat Daya"],
  },
  {
    id: "klaster-3",
    name: "Klaster 3",
    description:
      "Mencatatkan jumlah populasi paling rendah di antara klaster lainnya. Klaster ini berfokus pada sapi potong sebagai jenis ternak utama.",
    color: "#118B95", // Darker Teal
    strokeColor: "#095359",
    bgClass: "bg-sky-50",
    borderClass: "border-sky-500",
    textClass: "text-sky-900",
    badgeBg: "bg-sky-100 text-sky-900 border-sky-300",
    anggota: [
      "Mataru",
      "Pureman",
      "Alor Selatan",
      "Pantar Barat",
      "Alor Timur",
      "Lembur",
    ],
  },
];

export const LIVESTOCK_DATA: LivestockRecord[] = [
  {
    kecamatan: "Pantar",
    sapiPotong: 8,
    kerbau: 0,
    kuda: 0,
    kambing: 1861,
    domba: 0,
    babi: 695,
    ayamBuras: 4343,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 918,
    total: 7825,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Pantar Barat",
    sapiPotong: 93,
    kerbau: 0,
    kuda: 0,
    kambing: 1031,
    domba: 4,
    babi: 163,
    ayamBuras: 3700,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 1141,
    total: 6132,
    clusterId: "klaster-3",
  },
  {
    kecamatan: "Pantar Timur",
    sapiPotong: 0,
    kerbau: 0,
    kuda: 0,
    kambing: 2968,
    domba: 0,
    babi: 1745,
    ayamBuras: 7553,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 620,
    total: 12886,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Pantar Barat Laut",
    sapiPotong: 856,
    kerbau: 0,
    kuda: 0,
    kambing: 1932,
    domba: 0,
    babi: 567,
    ayamBuras: 4490,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 621,
    total: 8466,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Pantar Tengah",
    sapiPotong: 113,
    kerbau: 0,
    kuda: 3,
    kambing: 1466,
    domba: 0,
    babi: 1458,
    ayamBuras: 6908,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 570,
    total: 10518,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Alor Barat Daya",
    sapiPotong: 334,
    kerbau: 0,
    kuda: 0,
    kambing: 1822,
    domba: 0,
    babi: 5346,
    ayamBuras: 12848,
    ayamRasPedaging: 1067,
    ayamRasPetelur: 4,
    itik: 1970,
    total: 23391,
    clusterId: "klaster-2",
  },
  {
    kecamatan: "Mataru",
    sapiPotong: 505,
    kerbau: 0,
    kuda: 5,
    kambing: 123,
    domba: 0,
    babi: 1084,
    ayamBuras: 3011,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 90,
    total: 4818,
    clusterId: "klaster-3",
  },
  {
    kecamatan: "Abad Selatan",
    sapiPotong: 477,
    kerbau: 0,
    kuda: 0,
    kambing: 990,
    domba: 0,
    babi: 2774,
    ayamBuras: 7247,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 867,
    total: 12355,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Alor Selatan",
    sapiPotong: 88,
    kerbau: 0,
    kuda: 0,
    kambing: 185,
    domba: 0,
    babi: 875,
    ayamBuras: 3978,
    ayamRasPedaging: 0,
    ayamRasPetelur: 0,
    itik: 305,
    total: 5431,
    clusterId: "klaster-3",
  },
  {
    kecamatan: "Alor Timur",
    sapiPotong: 1265,
    kerbau: 0,
    kuda: 3,
    kambing: 533,
    domba: 0,
    babi: 2421,
    ayamBuras: 4631,
    ayamRasPedaging: 3,
    ayamRasPetelur: 0,
    itik: 134,
    total: 8990,
    clusterId: "klaster-3",
  },
  {
    kecamatan: "Alor Timur Laut",
    sapiPotong: 13,
    kerbau: 0,
    kuda: 7,
    kambing: 192,
    domba: 0,
    babi: 1393,
    ayamBuras: 6905,
    ayamRasPedaging: 285,
    ayamRasPetelur: 0,
    itik: 408,
    total: 9203,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Pureman",
    sapiPotong: 4,
    kerbau: 0,
    kuda: 2,
    kambing: 305,
    domba: 0,
    babi: 1181,
    ayamBuras: 3361,
    ayamRasPedaging: 0,
    ayamRasPetelur: 6,
    itik: 74,
    total: 4933,
    clusterId: "klaster-3",
  },
  {
    kecamatan: "Teluk Mutiara",
    sapiPotong: 102,
    kerbau: 0,
    kuda: 4,
    kambing: 722,
    domba: 4,
    babi: 6150,
    ayamBuras: 17266,
    ayamRasPedaging: 11220,
    ayamRasPetelur: 804,
    itik: 2649,
    total: 38921,
    clusterId: "klaster-2",
  },
  {
    kecamatan: "Kabola",
    sapiPotong: 40,
    kerbau: 0,
    kuda: 0,
    kambing: 1142,
    domba: 0,
    babi: 3208,
    ayamBuras: 11294,
    ayamRasPedaging: 401,
    ayamRasPetelur: 52,
    itik: 724,
    total: 16861,
    clusterId: "klaster-2",
  },
  {
    kecamatan: "Alor Barat Laut",
    sapiPotong: 47,
    kerbau: 0,
    kuda: 0,
    kambing: 4100,
    domba: 12,
    babi: 4619,
    ayamBuras: 17700,
    ayamRasPedaging: 0,
    ayamRasPetelur: 70,
    itik: 1713,
    total: 28261,
    clusterId: "klaster-2",
  },
  {
    kecamatan: "Alor Tengah Utara",
    sapiPotong: 26,
    kerbau: 0,
    kuda: 5,
    kambing: 411,
    domba: 0,
    babi: 2488,
    ayamBuras: 5496,
    ayamRasPedaging: 1600,
    ayamRasPetelur: 26,
    itik: 163,
    total: 10215,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Pulau Pura",
    sapiPotong: 0,
    kerbau: 0,
    kuda: 0,
    kambing: 2186,
    domba: 0,
    babi: 2012,
    ayamBuras: 4775,
    ayamRasPedaging: 813,
    ayamRasPetelur: 0,
    itik: 115,
    total: 9901,
    clusterId: "klaster-1",
  },
  {
    kecamatan: "Lembur",
    sapiPotong: 46,
    kerbau: 0,
    kuda: 0,
    kambing: 221,
    domba: 0,
    babi: 559,
    ayamBuras: 3496,
    ayamRasPedaging: 555,
    ayamRasPetelur: 0,
    itik: 225,
    total: 5102,
    clusterId: "klaster-3",
  },
];

// Normalize strings for matching (e.g. "Telukmutiara" <-> "Teluk Mutiara")
export function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[\s\-_]/g, "");
}

export function getLivestockDataByGeoName(geoName: string): LivestockRecord | undefined {
  const normGeo = normalizeName(geoName);
  return LIVESTOCK_DATA.find((item) => normalizeName(item.kecamatan) === normGeo);
}
