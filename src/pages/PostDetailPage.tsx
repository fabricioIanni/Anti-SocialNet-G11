import { useEffect, useState, type FormEvent } from 'react'
import { Alert, Badge, Button, Card, Col, Form, ListGroup, Row, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { createComment, getCommentsByPost } from '../services/comments'
import { getImagesByPost } from '../services/postImages'
import { getPostById } from '../services/posts'
import type { Comment, Post, PostImage } from '../types'

export function PostDetailPage() {
  const { id } = useParams()
  const postId = Number(id)
  const { user } = useAuth()

  const [post, setPost] = useState<Post | null>(null)
  const [images, setImages] = useState<PostImage[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    Promise.all([getPostById(postId), getImagesByPost(postId), getCommentsByPost(postId)])
      .then(([postData, imagesData, commentsData]) => {
        setPost(postData)
        setImages(imagesData)
        setComments(commentsData)
      })
      .catch(() => setError('No se pudo cargar la publicación'))
      .finally(() => setLoading(false))
  }, [postId])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setCommentError('')
    if (!user || !content.trim()) return

    try {
      await createComment({ content: content.trim(), userId: user.id, postId })
      setComments(await getCommentsByPost(postId))
      setContent('')
      setSubmitted(false)
    } catch {
      setCommentError('No se pudo enviar el comentario')
    }
  }

  if (loading) return <Spinner animation="border" />
  if (error || !post) return <Alert variant="danger">{error || 'Publicación no encontrada'}</Alert>

  return (
    <>
      <Card className="mb-4">
        {images.length > 0 && (
          <Row xs={1} md={images.length === 1 ? 1 : 2} className="g-3 p-3 pb-0">
            {images.map((image) => (
              <Col key={image.id}>
                <img className="detail-image" src={image.url} alt="Imagen de la publicación" />
              </Col>
            ))}
          </Row>
        )}
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">@{post.User.nickName}</Card.Subtitle>
          <Card.Text>{post.description}</Card.Text>
          {post.Tags.map((tag) => (
            <Badge key={tag.id} bg="secondary" className="me-1">
              {tag.name}
            </Badge>
          ))}
        </Card.Body>
      </Card>

      <h3>Comentarios ({comments.length})</h3>
      {comments.length === 0 && <p>Todavía no hay comentarios.</p>}
      <ListGroup className="mb-4">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <strong>@{comment.User.nickName}</strong>
            <div>{comment.content}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {user ? (
        <Form noValidate onSubmit={handleSubmit}>
          {commentError && <Alert variant="danger">{commentError}</Alert>}
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Agregar un comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              isInvalid={submitted && !content.trim()}
            />
            <Form.Control.Feedback type="invalid">El comentario es obligatorio</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Comentar</Button>
        </Form>
      ) : (
        <p>
          <Link to="/login">Iniciá sesión</Link> para comentar.
        </p>
      )}
    </>
  )
}
