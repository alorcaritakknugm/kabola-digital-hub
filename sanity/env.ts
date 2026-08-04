export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-24'

function cleanEnvValue(value: string | undefined, fallback: string): string {
  if (!value) return fallback
  const cleaned = value.trim().replace(/^["']|["']$/g, '').trim()
  return cleaned || fallback
}

function cleanProjectId(value: string | undefined, fallback: string): string {
  const cleaned = cleanEnvValue(value, fallback).toLowerCase().replace(/[^a-z0-9-]/g, '')
  return cleaned || fallback
}

export const dataset = cleanEnvValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'production'
)

export const projectId = cleanProjectId(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'xsj3gs4e'
)

export const useCdn = false

