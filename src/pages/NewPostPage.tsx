import { useEffect, useState, type FormEvent } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { createPost } from '../services/posts'
import { createPostImage } from '../services/postImages'
import { getTags } from '../services/tags'
import type { Tag } from '../types'

export function NewPostPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [imageUrls, setImageUrls] = useState([''])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getTags()
      .then(setTags)
      .catch(() => setError('No se pudieron cargar las etiquetas'))
  }, [])

  const changeUrl = (index: number, value: string) => {
    setImageUrls(imageUrls.map((url, i) => (i === index ? value : url)))
  }

  const toggleTag = (id: number) => {
    setSelectedTagIds(
      selectedTagIds.includes(id) ? selectedTagIds.filter((t) => t !== id) : [...selectedTagIds, id],
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setError('')
    if (!user || !description.trim()) return

    try {
      const post = await createPost({
        description: description.trim(),
        userId: user.id,
        tagIds: selectedTagIds,
      })
      for (const url of imageUrls) {
        if (url.trim()) await createPostImage({ url: url.trim(), postId: post.id })
      }
      navigate('/profile')
    } catch {
      setError('No se pudo crear la publicación')
    }
  }

  return (
    <Card body>
      <h2 className="mb-3">Nueva publicación</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={submitted && !description.trim()}
          />
          <Form.Control.Feedback type="invalid">La descripción es obligatoria</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URLs de imágenes (opcional)</Form.Label>
          {imageUrls.map((url, index) => (
            <Form.Control
              key={index}
              className="mb-2"
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => changeUrl(index, e.target.value)}
            />
          ))}
          <Button variant="outline-secondary" size="sm" onClick={() => setImageUrls([...imageUrls, ''])}>
            Agregar otra URL
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Etiquetas</Form.Label>
          {tags.map((tag) => (
            <Form.Check
              key={tag.id}
              id={`tag-${tag.id}`}
              label={tag.name}
              checked={selectedTagIds.includes(tag.id)}
              onChange={() => toggleTag(tag.id)}
            />
          ))}
        </Form.Group>

        <Button type="submit">Publicar</Button>
      </Form>
    </Card>
  )
}
