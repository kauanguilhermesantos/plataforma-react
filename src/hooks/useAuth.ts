import { useState, useEffect } from 'react'
import { Usuario } from '@/types/perfil'

interface UsuarioComTipo extends Usuario {
  tipo: "admin" | "aluno" | "usuario"
  primeiroAcesso?: boolean
}

export function useAuth() {
  const [usuario, setUsuario] = useState<UsuarioComTipo | null>(null)
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
  const login = (userData: UsuarioComTipo, token: string) => {
    try {
      console.log('Dados do usuário no login:', userData) // DEBUG
      console.log('Primeiro acesso?:', userData.primeiroAcesso) // DEBUG

      setUsuario(userData)
      localStorage.setItem('usuario', JSON.stringify(userData))
      localStorage.setItem('token', token)

      document.cookie = `token=${token}; path=/; max-age=${1 * 24 * 60 * 60}; secure; samesite=lax`

      // Identifica o tipo de usuário e direciona
      if (userData.tipo === "admin") {
        window.location.href ="/admin"  
      } else if (userData.tipo === "aluno") {
        // Se for primeiro acesso, redireciona para /boasVindas
        if (userData.primeiroAcesso === true) {
          console.log('Primeiro acesso - Redirecionando para /boasVindas') // DEBUG
          window.location.href = "/boasVindas"
        } else {
          console.log('Não é primeiro acesso - Redirecionando para /home') // DEBUG
          window.location.href = "/home"
        }
      }

    } catch (error) {
      console.error('Erro durante o login:', error)
      throw error
    }
  }

  // Função para fazer logout
  const logout = async () => {
    try {
      // Limpar todos os dados de autenticação
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')

      // Limpar cookie de token de forma mais agressiva
      const domain = window.location.hostname
      const basePath = window.location.origin
      
      // Limpar cookies de todas as formas possíveis
      const cookiesToClear = [
        'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        `token=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        'token=; path=/; domain=.' + domain + '; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        `token=; path=/; domain=${basePath}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      ]

      cookiesToClear.forEach(cookie => {
        document.cookie = cookie
      })

      // SÓ DEPOIS limpar o estado
      setUsuario(null)

      // E forçar recarregamento para limpar qualquer cache
      window.location.replace('/login')

    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      // Forçar limpeza e redirecionamento mesmo em caso de erro
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')
      window.location.replace('/login')
    }
  }

  return { usuario, login, logout, loading }
}