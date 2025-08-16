import {Pool} from 'pg'
import {Comment, CreateCommentData, UpdateCommentData} from '@/lib/types/comment'

const pool = new Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
})

export async function createComment(data: CreateCommentData, userId: string): Promise<Comment> {
  const client = await pool.connect()

  try {
    // First create the comment
    const result = await client.query(
      `INSERT INTO "comment" (id, content, "blogSlug", "userId", "parentId", "isApproved", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        crypto.randomUUID(),
        data.content,
        data.blogSlug,
        userId,
        data.parentId || null,
        true, // Auto-approve comments for now
        new Date(),
        new Date(),
      ]
    )

    // Now fetch the comment with user information
    const commentWithUser = await client.query(
      `SELECT c.*, u.name, u.image
       FROM "comment" c
       JOIN "user" u ON c."userId" = u.id
       WHERE c.id = $1`,
      [result.rows[0].id]
    )

    // Format the comment to match the expected structure
    const comment = commentWithUser.rows[0]
    return {
      ...comment,
      user: {
        id: comment.userId,
        name: comment.name,
        image: comment.image,
      },
    }
  } finally {
    client.release()
  }
}

export async function getCommentsByBlogSlug(blogSlug: string): Promise<Comment[]> {
  const client = await pool.connect()

  try {
    const result = await client.query(
      `SELECT c.*, u.name, u.image
       FROM "comment" c
       JOIN "user" u ON c."userId" = u.id
       WHERE c."blogSlug" = $1 AND c."isApproved" = true
       ORDER BY c."createdAt" ASC`,
      [blogSlug]
    )

    // Build comment tree structure
    const comments = result.rows.map((comment) => {
      const {name, image, ...commentData} = comment
      return {
        ...commentData,
        user: {
          id: comment.userId,
          name: name,
          image: image,
        },
        replies: [],
      }
    })

    const commentMap = new Map<string, Comment>()
    const rootComments: Comment[] = []

    comments.forEach((comment) => {
      commentMap.set(comment.id, comment)
    })

    comments.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId)
        if (parent) {
          parent.replies!.push(comment)
        }
      } else {
        rootComments.push(comment)
      }
    })

    return rootComments
  } finally {
    client.release()
  }
}

export async function updateComment(
  commentId: string,
  data: UpdateCommentData,
  userId: string
): Promise<Comment | null> {
  const client = await pool.connect()

  try {
    const result = await client.query(
      `UPDATE "comment" 
       SET content = $1, "updatedAt" = $2
       WHERE id = $3 AND "userId" = $4
       RETURNING *`,
      [data.content, new Date(), commentId, userId]
    )

    return result.rows[0] || null
  } finally {
    client.release()
  }
}

export async function deleteComment(commentId: string, userId: string): Promise<boolean> {
  const client = await pool.connect()

  try {
    const result = await client.query(
      `DELETE FROM "comment" 
       WHERE id = $1 AND "userId" = $2`,
      [commentId, userId]
    )

    return (result.rowCount || 0) > 0
  } finally {
    client.release()
  }
}

export async function approveComment(commentId: string): Promise<Comment | null> {
  const client = await pool.connect()

  try {
    const result = await client.query(
      `UPDATE "comment" 
       SET "isApproved" = true, "updatedAt" = $1
       WHERE id = $2
       RETURNING *`,
      [new Date(), commentId]
    )

    return result.rows[0] || null
  } finally {
    client.release()
  }
}
