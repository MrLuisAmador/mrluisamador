import {describe, it, expect} from 'vitest'
import {addReplyToTree, updateCommentInTree, removeCommentFromTree} from './treeUtils'
import {Comment} from '@/lib/types/comment'

const mockUser = {
  id: 'user-1',
  name: 'Test User',
}

const createMockComment = (overrides: Partial<Comment> = {}): Comment => ({
  id: overrides.id || 'c-1',
  content: overrides.content || 'Root comment',
  blogSlug: 'test-slug',
  userId: 'user-1',
  isApproved: true,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-01T00:00:00Z'),
  user: mockUser,
  replies: overrides.replies || [],
  ...overrides,
})

describe('treeUtils', () => {
  describe('addReplyToTree', () => {
    it('should append a root comment if parentId is not provided', () => {
      const existing: Comment[] = [createMockComment({id: '1', content: 'First'})]
      const newComment = createMockComment({id: '2', content: 'Second'})

      const result = addReplyToTree(existing, newComment)
      expect(result).toHaveLength(2)
      expect(result[0].id).toBe('1')
      expect(result[1].id).toBe('2')
    })

    it('should add reply to a top-level comment', () => {
      const existing: Comment[] = [createMockComment({id: '1', replies: []})]
      const reply = createMockComment({id: '2', parentId: '1', content: 'Reply to 1'})

      const result = addReplyToTree(existing, reply)
      expect(result[0].replies).toHaveLength(1)
      expect(result[0].replies![0].id).toBe('2')
    })

    it('should add reply to a deeply nested comment', () => {
      const nestedReply = createMockComment({id: '2', parentId: '1', replies: []})
      const root = createMockComment({id: '1', replies: [nestedReply]})
      const deepReply = createMockComment({id: '3', parentId: '2', content: 'Deep reply'})

      const result = addReplyToTree([root], deepReply)
      expect(result[0].replies![0].replies).toHaveLength(1)
      expect(result[0].replies![0].replies![0].id).toBe('3')
    })

    it('should return untouched tree if parentId does not exist', () => {
      const root = createMockComment({id: '1', replies: []})
      const orphanReply = createMockComment({id: '99', parentId: 'non-existent'})

      const result = addReplyToTree([root], orphanReply)
      expect(result).toHaveLength(1)
      expect(result[0].replies).toHaveLength(0)
    })
  })

  describe('updateCommentInTree', () => {
    it('should update content of a root comment', () => {
      const root = createMockComment({id: '1', content: 'Old content'})
      const result = updateCommentInTree([root], '1', 'Updated content')

      expect(result[0].content).toBe('Updated content')
      expect(result[0].updatedAt).toBeInstanceOf(Date)
    })

    it('should update content of a nested reply', () => {
      const reply = createMockComment({id: '2', parentId: '1', content: 'Old reply'})
      const root = createMockComment({id: '1', content: 'Root', replies: [reply]})

      const result = updateCommentInTree([root], '2', 'Updated reply')
      expect(result[0].replies![0].content).toBe('Updated reply')
      expect(result[0].content).toBe('Root')
    })

    it('should leave other comments unchanged if id is not found', () => {
      const root = createMockComment({id: '1', content: 'Root'})
      const result = updateCommentInTree([root], 'missing-id', 'Updated')

      expect(result[0].content).toBe('Root')
    })
  })

  describe('removeCommentFromTree', () => {
    it('should remove a root comment', () => {
      const c1 = createMockComment({id: '1'})
      const c2 = createMockComment({id: '2'})

      const result = removeCommentFromTree([c1, c2], '1')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('2')
    })

    it('should remove a nested reply and preserve siblings', () => {
      const reply1 = createMockComment({id: 'r1', parentId: '1'})
      const reply2 = createMockComment({id: 'r2', parentId: '1'})
      const root = createMockComment({id: '1', replies: [reply1, reply2]})

      const result = removeCommentFromTree([root], 'r1')
      expect(result[0].replies).toHaveLength(1)
      expect(result[0].replies![0].id).toBe('r2')
    })

    it('should handle removing from an empty tree gracefully', () => {
      const result = removeCommentFromTree([], 'any')
      expect(result).toEqual([])
    })
  })
})
