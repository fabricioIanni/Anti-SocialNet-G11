import { useState, type FormEvent } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FIXED_PASSWORD } from '../constants'
import { useAuth } from '../hooks/useAuth'
import { getUsers } from '../services/users'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setError('')
    if (!nickName.trim() || !password) return

    try {
      const users = await getUsers()
      const user = users.find((u) => u.nickName === nickName.trim())
      if (!user) {
        setError('El usuario no existe')
      } else if (password !== FIXED_PASSWORD) {
        setError('Contraseña incorrecta')
      } else {
        login(user)
        navigate('/')
      }
    } catch {
      setError('No se pudo conectar con el servidor')
    }
  }

  return (
    <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <Card body>
          <h2 className="mb-3">Iniciar sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nickName">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                isInvalid={submitted && !nickName.trim()}
              />
              <Form.Control.Feedback type="invalid">El nickname es obligatorio</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={submitted && !password}
              />
              <Form.Control.Feedback type="invalid">La contraseña es obligatoria</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="w-100">Ingresar</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
