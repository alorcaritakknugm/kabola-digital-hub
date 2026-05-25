import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xsj3gs4e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-24',
})

async function test() {
  const data = await client.fetch('*[_type == "umkm"]')
  console.log("UMKM Data:", JSON.stringify(data, null, 2))
}
test()
