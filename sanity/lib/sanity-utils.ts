import {createClient, groq} from 'next-sanity'
import {Blog} from '@/Types/blog'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export async function getBlogs(): Promise<Blog[]> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-03-04',
    useCdn: false,
  })

  return client.fetch(
    groq`
            *[_type == 'post'] {
                ...,
                "slug": slug.current,

            } | order(_id, desc)
        `
  )
}

export async function getBlog(slug: string): Promise<Blog> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-03-04',
    useCdn: false,
  })

  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
            ...,
            "slug": slug.current,
        }`,
    {slug}
  )
}

export async function getCaseStudies(): Promise<Blog[]> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-03-04',
    useCdn: false,
  })

  return client.fetch(
    groq`
            *[_type == 'caseStudy'] {
                ...,
                "slug": slug.current,
                author->,
                categories[]->
            } | order(_createdAt, desc)
        `
  )
}

export async function getCaseStudy(slug: string): Promise<Blog> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-03-04',
    useCdn: false,
  })

  return client.fetch(
    groq`*[_type == "caseStudy" && slug.current == $slug][0]{
            ...,
            "slug": slug.current,
            author->,
            categories[]->
        }`,
    {slug}
  )
}
