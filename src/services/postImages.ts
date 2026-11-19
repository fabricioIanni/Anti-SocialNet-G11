import { api } from './api'
import type { PostImage } from '../types'

export async function getImagesByPost(postId: number): Promise<PostImage[]> {
  const res = await api.get<PostImage[]>(`/postimages/post/${postId}`)
  return res.data
}

export async function createPostImage(data: { url: string; postId: number }): Promise<PostImage> {
  const res = await api.post<PostImage>('/postimages', data)
  return res.data
}
