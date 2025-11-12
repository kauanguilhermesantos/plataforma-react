import { useState, useEffect } from 'react'
import { Usuario } from '@/types/perfil'

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado ao carregar a página
    const usuarioGuardado = localStorage.getItem('usuario')
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado))
    }
    setLoading(false)
  }, [])

  // Função para fazer login
  const login = (userData: Usuario, token: string) => {
    setUsuario(userData)
    localStorage.setItem('usuario', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }

  // Função para fazer logout
  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
  }

  return { usuario, login, logout, loading }
}