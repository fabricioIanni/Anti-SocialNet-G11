import { useEffect, useState } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PostList } from '../components/PostList'
import { useAuth } from '../hooks/useAuth'
import { getPostsByUser } from '../services/posts'
import type { Post } from '../types'
import { sortByDate } from '../utils/sortByDate'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    getPostsByUser(user.id)
      .then((data) => setPosts(sortByDate(data)))
      .catch(() => setError('No se pudieron cargar tus publicaciones'))
      .finally(() => setLoading(false))
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">@{user?.nickName}</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <h3>Mis publicaciones</h3>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && posts.length === 0 && <p>Todavía no publicaste nada.</p>}
      <PostList posts={posts} />
    </>
  )
}
