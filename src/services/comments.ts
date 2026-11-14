import { api } from './api'
import type { Comment } from '../types'

export async function getCommentsByPost(postId: number): Promise<Comment[]> {
  const res = await api.get<Comment[]>(`/comments/post/${postId}`)
  return res.data
}

export async function createComment(data: {
  content: string
  userId: number
  postId: number
}): Promise<Comment> {
  const res = await api.post<Comment>('/comments', data)
  return res.data
}
