import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error()
  return context
}
// Es el punto de acceso a la Sesion, evita que tengamos que importar el contexto en cada componente que lo necesite.
// Reemplaza el uso de useContext(AuthContext) por useAuth() en los componentes que necesiten acceder a la sesion.