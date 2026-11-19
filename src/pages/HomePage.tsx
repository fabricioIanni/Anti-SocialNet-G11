import { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { PostList } from '../components/PostList'
import { getPosts } from '../services/posts'
import type { Post } from '../types'
import { sortByDate } from '../utils/sortByDate'

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(sortByDate(data)))
      .catch(() => setError('No se pudieron cargar las publicaciones'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="bg-dark text-white text-center rounded p-5 mb-4">
        <h1>Bienvenido a UnaHur Anti-Social Net</h1>
        <p className="lead mb-0">La red social donde lo importante es lo que tenés para decir.</p>
      </div>

      <section className="mb-4">
        <h2>Sobre nosotros</h2>
        <p>
          UnaHur Anti-Social Net es una red social simple: compartí publicaciones con etiquetas e imágenes y
          comentá las de otras personas.
        </p>
      </section>

      <h2>Publicaciones recientes</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && posts.length === 0 && <p>Todavía no hay publicaciones.</p>}
      <PostList posts={posts} showImages />
    </>
  )
}
