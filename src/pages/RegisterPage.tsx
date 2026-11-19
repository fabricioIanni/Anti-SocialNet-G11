import { useState, type FormEvent } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createUser } from '../services/users'
import type { ApiError } from '../types'

export function RegisterPage() {
  const navigate = useNavigate()
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setError('')
    if (!nickName.trim() || !email.trim()) return

    try {
      await createUser({ nickName: nickName.trim(), email: email.trim() })
      navigate('/login')
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err) && err.response) {
        setError(err.response.data.error)
      } else {
        setError('No se pudo conectar con el servidor')
      }
    }
  }

  return (
    <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <Card body>
          <h2 className="mb-3">Registro</h2>
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={submitted && !email.trim()}
              />
              <Form.Control.Feedback type="invalid">El email es obligatorio</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="w-100">Registrarse</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
