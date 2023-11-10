import { PortableTextBlock } from "sanity"

export type Blog = {
    _id: string
    publishedAt: Date
    title: string
    description: string
    slug: string
    descriptionImage: string
    mainImage: string
    author: string
    name: any
    url: string
    body: PortableTextBlock[]
}