"use client"

import { useCursoViewer } from "@/hooks/useCursoViewer"
import { CursoHeader } from "./CursoHeader"
import { CursoConteudo } from "./CursoConteudo"
import { CursoPreview } from "./CursoPreview"
import { useState, useEffect } from "react"
import { Curso } from "@/types/curso"

interface CursoViewerProps {
  cursoId: string
}

export function CursoViewer({ cursoId }: CursoViewerProps) {
  const {
    curso,
    comentarios,
    currentLessonData,
    state,
    updateState,
    handlePlayPause,
    handleNextLesson,
    handlePreviousLesson,
    handleLessonSelect,
    handleAddComment,
    handleEnrollment
  } = useCursoViewer(cursoId)

  // Estado local para sincronizar
  const [localIsEnrolled, setLocalIsEnrolled] = useState(false)

  // Sincronizar com o estado do hook
  console.log('CursoViewer renderizado:', {
    temCurso: !!curso,
    localIsEnrolled,
    stateIsEnrolled: state.isEnrolled,
    currentLessonData,
    temCurrentLessonData: !!currentLessonData,
    primeiraAula: curso?.modulos?.[0]?.aulas?.[0]
  });

  useEffect(() => {
    // Se o usuário está matriculado mas não tem aula selecionada
    if (localIsEnrolled && !state.currentLesson && curso?.modulos?.[0]?.aulas?.[0]) {
      console.log('Forçando seleção da primeira aula');
      const primeiraAulaId = curso.modulos[0].aulas[0].id;
      updateState({ currentLesson: primeiraAulaId });
    }
  }, [localIsEnrolled, state.currentLesson, curso, updateState]);

  // Função wrapper para handleEnrollment
  const handleEnrollmentWrapper = async () => {
    await handleEnrollment()
    // Forçar atualização após matrícula
    setLocalIsEnrolled(true)
  }

  const getPrimeiraAula = (curso: Curso) => {
    return curso?.modulos?.[0]?.aulas?.[0];
  };

  if (!curso) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Curso não encontrado</div>
          <p className="text-gray-600 dark:text-gray-400">O curso solicitado não existe ou não está disponível.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CursoHeader
        curso={curso}
        isEnrolled={localIsEnrolled}
        isEnrolling={state.isEnrolling}
        onEnroll={handleEnrollmentWrapper}
      />

      {!localIsEnrolled ? (
        <CursoPreview
          curso={curso}
          isEnrolling={state.isEnrolling}
          onEnroll={handleEnrollmentWrapper}
        />
      ) : (
        <CursoConteudo
          curso={curso}
          currentLesson={currentLessonData || getPrimeiraAula(curso)}
          state={state}
          onPlayPause={handlePlayPause}
          onNextLesson={handleNextLesson}
          onPreviousLesson={handlePreviousLesson}
          onLessonSelect={handleLessonSelect}
          onAddComment={handleAddComment}
          onCommentChange={(comment) => updateState({ newComment: comment })}
          onToggleComments={() => updateState({ showComments: !state.showComments })}
        />
      )}
    </div>
  )
}