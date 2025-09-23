import { useState, useMemo } from 'react'
import { CursoViewerState } from '@/types/cursoViewer'
import { Curso } from '@/types/curso'
import { mockCursos } from '@/data/mockCursos'
import { mockComentarios } from '@/data/mockComentario'

export function useCursoViewer(cursoId: string) {
  const [state, setState] = useState<CursoViewerState>({
    isPlaying: false,
    currentLesson: 1, // ID da aula, não índice
    showComments: false,
    newComment: "",
    isEnrolled: false,
    isEnrolling: false
  })

  // Busca o curso específico pelo ID em vez de usar todo o array
  const curso = useMemo(() => {
    return mockCursos.find(curso => curso.id === parseInt(cursoId))
  }, [cursoId])

  const comentarios = useMemo(() => mockComentarios, [])

  const currentLessonData = useMemo(() => {
    if (!curso?.modulos || !state.currentLesson) return null;

    return curso.modulos
      .flatMap((modulo) => modulo.aulas || [])
      .find((aula) => aula.id === state.currentLesson);
  }, [curso?.modulos, state.currentLesson])

  const updateState = (newState: Partial<CursoViewerState>) => {
    setState(prev => ({ ...prev, ...newState }))
  }

  const handlePlayPause = () => {
    updateState({ isPlaying: !state.isPlaying })
  }

  const handleNextLesson = () => {
    if (!curso?.modulos) return;
    
    const allLessons = curso.modulos.flatMap((modulo) => modulo.aulas || [])
    const currentIndex = allLessons.findIndex((aula) => aula.id === state.currentLesson)
    
    if (currentIndex < allLessons.length - 1) {
      updateState({ currentLesson: allLessons[currentIndex + 1].id })
    }
  }

  const handlePreviousLesson = () => {
    if (!curso?.modulos) return;
    
    const allLessons = curso.modulos.flatMap((modulo) => modulo.aulas || [])
    const currentIndex = allLessons.findIndex((aula) => aula.id === state.currentLesson)
    
    if (currentIndex > 0) {
      updateState({ currentLesson: allLessons[currentIndex - 1].id })
    }
  }

  const handleLessonSelect = (lessonId: number) => {
    updateState({ currentLesson: lessonId })
  }

  const handleAddComment = () => {
    if (state.newComment.trim()) {
      console.log("Novo comentário:", state.newComment)
      updateState({ newComment: "" })
    }
  }

  const handleEnrollment = async () => {
    updateState({ isEnrolling: true })
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      updateState({ isEnrolled: true, isEnrolling: false })
    } catch (error) {
      console.error("Erro ao se inscrever:", error)
      updateState({ isEnrolling: false })
    }
  }

  return {
    curso, // Corrigido: estava 'course'
    comentarios, // Corrigido: estava 'comments'
    currentLessonData,
    state,
    updateState,
    handlePlayPause,
    handleNextLesson,
    handlePreviousLesson,
    handleLessonSelect,
    handleAddComment,
    handleEnrollment
  }
}