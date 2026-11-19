import { api } from './api'
import type { User } from '../types'

export async function getUsers(): Promise<User[]> {
  const res = await api.get<User[]>('/users')
  return res.data
}

export async function createUser(data: { nickName: string; email: string }): Promise<User> {
  const res = await api.post<User>('/users', data)
  return res.data
}
