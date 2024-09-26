import {PortableTextBlock} from 'sanity'

export type Author = {
  name: string
  _updatedAt: string
}

export type Blog = {
  _id: string
  publishedAt: Date
  title: string
  description: string
  slug: string
  descriptionImage: string
  mainImage: string
  name: string
  url: string
  body: PortableTextBlock[]
  technology: PortableTextBlock[]
  author: Author
}
