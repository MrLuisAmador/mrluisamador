export const commentKeys = {
  all: ['comments'] as const,
  byBlog: (slug: string) => ['comments', slug] as const,
  admin: ['admin', 'comments'] as const,
  pending: ['admin', 'comments', 'pending'] as const,
}
