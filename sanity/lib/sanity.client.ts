import {createClient} from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-03-04',
  useCdn: false,
})
