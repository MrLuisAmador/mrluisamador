import {Comment} from '@/lib/types/comment'

export function addReplyToTree(comments: Comment[], newComment: Comment): Comment[] {
  if (!newComment.parentId) {
    return [...comments, newComment]
  }

  return comments.map((comment) => {
    if (comment.id === newComment.parentId) {
      return {
        ...comment,
        replies: [...(comment.replies ?? []), newComment],
      }
    }
    if (comment.replies?.length) {
      return {
        ...comment,
        replies: addReplyToTree(comment.replies, newComment),
      }
    }
    return comment
  })
}

export function updateCommentInTree(
  comments: Comment[],
  commentId: string,
  content: string
): Comment[] {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      return {...comment, content, updatedAt: new Date()}
    }
    if (comment.replies?.length) {
      return {
        ...comment,
        replies: updateCommentInTree(comment.replies, commentId, content),
      }
    }
    return comment
  })
}

export function removeCommentFromTree(comments: Comment[], commentId: string): Comment[] {
  const filtered = comments.filter((c) => c.id !== commentId)
  if (filtered.length < comments.length) {
    return filtered
  }
  return comments.map((comment) => ({
    ...comment,
    replies: comment.replies?.length
      ? removeCommentFromTree(comment.replies, commentId)
      : comment.replies,
  }))
}
