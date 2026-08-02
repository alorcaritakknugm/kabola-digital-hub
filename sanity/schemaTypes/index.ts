import { type SchemaTypeDefinition } from 'sanity'
import umkm from './umkm'
import wisata from './wisata'
import profilDesa from './profilDesa'
import ceritaKabola from './ceritaKabola'
import informasiWisata from './informasiWisata'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [umkm, wisata, profilDesa, ceritaKabola, informasiWisata],
}
