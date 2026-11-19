import { api } from './api'
import type { Tag } from '../types'

export async function getTags(): Promise<Tag[]> {
  const res = await api.get<Tag[]>('/tags')
  return res.data
}
