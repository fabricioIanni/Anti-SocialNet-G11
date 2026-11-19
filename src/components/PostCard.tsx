import { useEffect, useState } from 'react'
import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getCommentsByPost } from '../services/comments'
import { getImagesByPost } from '../services/postImages'
import type { Post, PostImage } from '../types'

interface PostCardProps {
  post: Post
  showImages?: boolean
}

export function PostCard({ post, showImages = false }: PostCardProps) {
  const [commentCount, setCommentCount] = useState(0)
  const [images, setImages] = useState<PostImage[]>([])

  useEffect(() => {
    getCommentsByPost(post.id).then((comments) => setCommentCount(comments.length))
    if (showImages) getImagesByPost(post.id).then(setImages)
  }, [post.id, showImages])

  return (
    <Card className="h-100 shadow-sm">
      {images.length > 0 && (
        <div className="post-images">
          {images.map((image) => (
            <img key={image.id} src={image.url} alt="Imagen de la publicación" />
          ))}
        </div>
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Subtitle className="mb-2 text-muted">@{post.User.nickName}</Card.Subtitle>
        <Card.Text>{post.description}</Card.Text>
        <div className="mb-3">
          {post.Tags.map((tag) => (
            <Badge key={tag.id} bg="secondary" className="me-1">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <small className="text-muted">{commentCount} comentarios</small>
          <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm">
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}
