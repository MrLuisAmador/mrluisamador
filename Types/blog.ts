import { PortableTextBlock } from "sanity"

export type Blog = {
    _id: string
    publishedAt: Date
    title: string
    slug: string
    image: string
    url: string
    body: PortableTextBlock[]
}