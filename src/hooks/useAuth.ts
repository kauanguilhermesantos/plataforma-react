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

    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=lax` // 7 dias
  }

  // Função para fazer logout
  const logout = async () => {
    try {
      // Limpar sessão no servidor
      setUsuario(null)

      // Limpar dados do localStorage
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')

      // Limpar cookie de token
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
      document.cookie = 'token=; path=/; domain=' + window.location.hostname + '; expires=Thu, 01 Jan 1970 00:00:00 GMT;'

      // Redirecionar para a página de login
      window.location.href = '/login';

    } catch (error) {
      console.error('Erro ao fazer logout:', error)

      // Redirecionar para a página de login mesmo em caso de erro
      window.location.href = '/login';
    }
  }

  return { usuario, login, logout, loading }
}