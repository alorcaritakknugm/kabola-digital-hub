function cleanEnvValue(value: string | undefined, fallback: string): string {
  if (!value) return fallback
  const cleaned = value.trim().replace(/^["']|["']$/g, '').trim()
  return cleaned || fallback
}

function cleanProjectId(value: string | undefined, fallback: string): string {
  const cleaned = cleanEnvValue(value, fallback).toLowerCase().replace(/[^a-z0-9-]/g, '')
  return cleaned || fallback
}

function cleanDataset(value: string | undefined, fallback: string): string {
  const cleaned = cleanEnvValue(value, fallback).toLowerCase().replace(/[^a-z0-9_-]/g, '')
  return cleaned || fallback
}

export const apiVersion = '2024-05-24'
export const dataset = 'production'
export const projectId = 'xsj3gs4e'
export const useCdn = false

