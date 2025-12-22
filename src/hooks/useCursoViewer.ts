// src/hooks/useCursoViewer.ts
import { useState, useEffect, useMemo, useCallback } from 'react'
import { CursoViewerState } from '@/types/cursoViewer'
import { Curso, Aula } from '@/types/curso'
import { decodeToken } from '@/lib/jwt'

interface Comentario {
  id: number
  user: {
    name: string
    avatar: string | null
  }
  content: string
  timestamp: string
  likes: number
}

export function useCursoViewer(cursoId: string) {
  const [curso, setCurso] = useState<Curso | null>(null)
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState<CursoViewerState>({
    isPlaying: false,
    currentLesson: 1, // ID da primeira aula
    showComments: false,
    newComment: "",
    isEnrolled: false,
    isEnrolling: false
  })

  // Função para buscar token
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  // Função para buscar usuarioId
  const getUserId = (): string | null => {
    const token = getToken()
    if (!token) return null
    
    try {
      // Decodificar token para obter userId
      const decoded = decodeToken(token)
      return decoded?.userId || null
    } catch (error) {
      console.error('Erro ao decodificar token:', error)
      return null
    }
  }

  // Função para verificar se usuário está autenticado
  const isAuthenticated = useCallback((): boolean => {
    const token = getToken()
    const userId = getUserId()
    return !!(token && userId) // Retorna true se ambos existirem
  }, [])

  // Buscar curso e dados relacionados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        const cursoResponse = await fetch(`/api/catalogo/${cursoId}`)
        
        if (!cursoResponse.ok) {
          if (cursoResponse.status === 404) {
            throw new Error('Curso não encontrado')
          }
          throw new Error('Erro ao carregar curso')
        }
        
        const cursoData = await cursoResponse.json()
        console.log('Curso carregado:', cursoData) // Para debug
        
        // Encontrar o ID da primeira aula
        const primeiraAulaId = cursoData.modulos?.[0]?.aulas?.[0]?.id
        
        setCurso(cursoData)
        
        // Definir a aula atual como a primeira aula
        if (primeiraAulaId) {
          setState(prev => ({ 
            ...prev, 
            currentLesson: primeiraAulaId 
          }))
        }

        // Verificar matrícula se usuário estiver logado
        const token = getToken()
        const userId = getUserId()
        
        if (token && userId) {
          try {
            const matriculaResponse = await fetch(`/api/catalogo/${cursoId}/matricula`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            
            if (matriculaResponse.ok) {
              const { inscrito } = await matriculaResponse.json()
              console.log('Usuário inscrito?', inscrito) // Para debug
              setState(prev => ({ ...prev, isEnrolled: inscrito }))
              
              // Se estiver matriculado, buscar progresso
              if (inscrito) {
                await fetchProgresso(userId)
              }
            }
          } catch (matriculaError) {
            console.warn('Não foi possível verificar matrícula:', matriculaError)
          }
        }

      } catch (error) {
        console.error('Erro ao carregar dados do curso:', error)
        setCurso(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [cursoId])

  // Buscar progresso do usuário (aulas concluídas)
  const fetchProgresso = async (userId: string) => {
    try {
      const response = await fetch(`/api/usuarios/${userId}/progresso?cursoId=${cursoId}`)
      if (response.ok) {
        const progressoData = await response.json()
        
        // Atualizar estado das aulas concluídas
        if (curso && progressoData.aulasConcluidas) {
          const updatedCurso = {
            ...curso,
            modulos: curso.modulos.map(modulo => ({
              ...modulo,
              aulas: modulo.aulas.map(aula => ({
                ...aula,
                concluida: progressoData.aulasConcluidas.includes(aula.id)
              }))
            }))
          }
          setCurso(updatedCurso)
        }
      }
    } catch (error) {
      console.warn('Não foi possível carregar progresso:', error)
    }
  }

  // Encontrar a aula atual
  const currentLessonData = useMemo(() => {
    if (!curso?.modulos || !state.currentLesson) {
      // Se não tiver aula atual definida, retorna a primeira aula
      return curso?.modulos?.[0]?.aulas?.[0] || null
    }

    // Encontrar a aula com o ID atual
    const aulaAtual = curso.modulos
      .flatMap((modulo) => modulo.aulas)
      .find((aula) => aula.id === state.currentLesson)

    return aulaAtual || curso.modulos[0]?.aulas[0] || null
  }, [curso?.modulos, state.currentLesson])

  // Atualizar estado
  const updateState = useCallback((newState: Partial<CursoViewerState>) => {
    setState(prev => ({ ...prev, ...newState }))
  }, [])

  // Controles do player
  const handlePlayPause = useCallback(() => {
    updateState({ isPlaying: !state.isPlaying })
  }, [state.isPlaying, updateState])

  const handleNextLesson = useCallback(() => {
    if (!curso?.modulos) return
    
    // Pegar todas as aulas
    const allLessons = curso.modulos.flatMap((modulo) => modulo.aulas)
    const currentIndex = allLessons.findIndex((aula) => aula.id === state.currentLesson)
    
    // Ir para próxima aula se existir
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1]
      updateState({ 
        currentLesson: nextLesson.id,
        isPlaying: false // Pausar ao mudar de aula
      })
    }
  }, [curso?.modulos, state.currentLesson, updateState])

  const handlePreviousLesson = useCallback(() => {
    if (!curso?.modulos) return
    
    const allLessons = curso.modulos.flatMap((modulo) => modulo.aulas)
    const currentIndex = allLessons.findIndex((aula) => aula.id === state.currentLesson)
    
    // Voltar para aula anterior se existir
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1]
      updateState({ 
        currentLesson: prevLesson.id,
        isPlaying: false
      })
    }
  }, [curso?.modulos, state.currentLesson, updateState])

  const handleLessonSelect = useCallback((lessonId: number) => {
    updateState({ 
      currentLesson: lessonId,
      isPlaying: false
    })
    
    // Scroll suave para o topo do player
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [updateState])

  // Marcar aula como concluída
  const handleMarkAsCompleted = useCallback(async (aulaId: number) => {
    if (!curso) return
    
    const token = getToken()
    const userId = getUserId()
    
    if (!token || !userId) {
      alert('Você precisa estar logado para marcar aulas como concluídas')
      return
    }

    try {
      const response = await fetch(`/api/aulas/${aulaId}/concluir`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      })

      if (response.ok) {
        // Atualizar estado local
        const updatedCurso = {
          ...curso,
          modulos: curso.modulos.map(modulo => ({
            ...modulo,
            aulas: modulo.aulas.map(aula => 
              aula.id === aulaId ? { ...aula, concluida: true } : aula
            )
          }))
        }
        setCurso(updatedCurso)
      }
    } catch (error) {
      console.error('Erro ao marcar aula como concluída:', error)
    }
  }, [curso])

  // Matrícula no curso
  const handleEnrollment = useCallback(async () => {
    const token = getToken()
    
    // Verificar se usuário está autenticado
    if (!isAuthenticated()) {
      // Redirecionar para login
      window.location.href = `/login?redirect=/cursos/${cursoId}&message=Para se inscrever no curso, faça login primeiro`
      return
    }

    try {
      updateState({ isEnrolling: true })
      
      const response = await fetch(`/api/cursos/${cursoId}/matricula`, {
        // CORREÇÃO: Mudando a rota de /api/catalogo para /api/cursos
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        
        // Atualizar estado
        updateState({ 
          isEnrolled: true, 
          isEnrolling: false 
        })
        
        // Atualizar contador de alunos localmente
        if (curso) {
          setCurso({
            ...curso,
            alunos: curso.alunos + 1
          })
        }
        
        // Mostrar mensagem de sucesso
        alert(result.message || 'Inscrição realizada com sucesso!')
        
        // Buscar progresso após matrícula
        const userId = getUserId()
        if (userId) {
          await fetchProgresso(userId)
        }
        
      } else if (response.status === 401) {
        // Token inválido ou expirado
        alert('Sua sessão expirou. Faça login novamente.')
        localStorage.removeItem('token')
        window.location.href = `/login?redirect=/cursos/${cursoId}`
        
      } else if (response.status === 400) {
        // Já está matriculado
        const errorData = await response.json()
        alert(errorData.error || 'Você já está inscrito neste curso')
        updateState({ isEnrolled: true, isEnrolling: false })
        
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro na matrícula')
      }
    } catch (error) {
      console.error('Erro na matrícula:', error)
      alert(error instanceof Error ? error.message : 'Erro ao se inscrever no curso')
      updateState({ isEnrolling: false })
    }
  }, [cursoId, curso, updateState, isAuthenticated])

  // Adicionar comentário
  const handleAddComment = useCallback(async () => {
    if (!state.newComment.trim()) return
    
    const token = getToken()
    const userId = getUserId()
    
    if (!token || !userId) {
      window.location.href = `/login?redirect=/cursos/${cursoId}`
      return
    }

    try {
      const response = await fetch(`/api/catalogo/${cursoId}/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          conteudo: state.newComment,
          aulaId: state.currentLesson
        })
      })

      if (response.ok) {
        const novoComentario = await response.json()
        setComentarios(prev => [novoComentario, ...prev])
        updateState({ newComment: "" })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao adicionar comentário')
      }
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
      alert(error instanceof Error ? error.message : 'Erro ao adicionar comentário')
    }
  }, [cursoId, state.newComment, state.currentLesson, updateState])

  // Curtir comentário
  const handleLikeComment = useCallback(async (commentId: number) => {
    const token = getToken()
    
    if (!token) {
      alert('Você precisa estar logado para curtir comentários')
      return
    }

    try {
      const response = await fetch(`/api/comentarios/${commentId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        // Atualizar localmente
        setComentarios(prev => 
          prev.map(comment => 
            comment.id === commentId 
              ? { ...comment, likes: comment.likes + 1 } 
              : comment
          )
        )
      }
    } catch (error) {
      console.error('Erro ao curtir comentário:', error)
    }
  }, [])

  // Calcular progresso total do curso
  const progressoTotal = useMemo(() => {
    if (!curso?.modulos) return 0
    
    const totalAulas = curso.modulos.reduce((total, modulo) => 
      total + modulo.aulas.length, 0
    )
    
    const aulasConcluidas = curso.modulos.reduce((total, modulo) => 
      total + modulo.aulas.filter(aula => aula.concluida).length, 0
    )
    
    return totalAulas > 0 ? (aulasConcluidas / totalAulas) * 100 : 0
  }, [curso?.modulos])

  // Função para alternar visibilidade dos comentários
  const toggleComments = useCallback(() => {
    updateState({ showComments: !state.showComments })
  }, [state.showComments, updateState])

  // Função para atualizar comentário em tempo real
  const handleCommentChange = useCallback((comment: string) => {
    updateState({ newComment: comment })
  }, [updateState])

  return {
    // Dados
    curso,
    comentarios,
    currentLessonData,
    progressoTotal,
    
    // Estado
    state,
    isLoading,
    
    // Atualizações de estado
    updateState,
    
    // Ações do player
    handlePlayPause,
    handleNextLesson,
    handlePreviousLesson,
    handleLessonSelect,
    handleMarkAsCompleted,
    
    // Comentários
    handleAddComment,
    handleLikeComment,
    handleCommentChange,
    toggleComments,
    
    // Matrícula
    handleEnrollment,
    
    // Utilitários
    getToken,
    getUserId,
    isAuthenticated
  }
}