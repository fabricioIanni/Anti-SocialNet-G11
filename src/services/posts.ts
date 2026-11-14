import { api } from './api'
import type { Post } from '../types'

export async function getPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>('/posts')
  return res.data
}

export async function getPostsByUser(userId: number): Promise<Post[]> {
  const res = await api.get<Post[]>('/posts', { params: { userId } })
  return res.data
}

export async function getPostById(id: number): Promise<Post> {
  const res = await api.get<Post>(`/posts/${id}`)
  return res.data
}

export async function createPost(data: {
  description: string
  userId: number
  tagIds: number[]
}): Promise<Post> {
  const res = await api.post<Post>('/posts', data)
  return res.data
}
