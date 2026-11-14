export interface User {
  id: number
  nickName: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: number
  name: string
}

export interface Post {
  id: number
  description: string
  createdAt: string
  UserId: number
  User: User
  Tags: Tag[]
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  UserId: number
  PostId: number
  User: User
}

export interface PostImage {
  id: number
  url: string
  PostId: number
}

export interface ApiError {
  error: string
}
