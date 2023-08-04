import { PortableTextBlock } from "sanity"

export type Blog = {
    _id: string
    publishedAt: Date
    title: string
    description: string
    slug: string
    image: string
    url: string
    body: PortableTextBlock[]
}