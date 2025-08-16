export interface Comment {
  id: string
  content: string
  blogSlug: string
  userId: string
  parentId?: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
  user?: {
    id: string
    name: string
    image?: string
  }
  replies?: Comment[]
}

export interface CreateCommentData {
  content: string
  blogSlug: string
  parentId?: string
}

export interface UpdateCommentData {
  content: string
}

export interface CommentFormData {
  content: string
  parentId?: string
}
