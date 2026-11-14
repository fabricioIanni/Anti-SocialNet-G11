import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { AppNavbar } from './components/AppNavbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PostDetailPage } from './pages/PostDetailPage'
import { ProfilePage } from './pages/ProfilePage'
import { NewPostPage } from './pages/NewPostPage'

function App() {
  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/new-post" element={<ProtectedRoute><NewPostPage /></ProtectedRoute>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
