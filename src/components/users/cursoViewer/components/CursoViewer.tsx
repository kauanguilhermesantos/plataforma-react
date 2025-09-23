"use client"

import { useCursoViewer } from "@/components/users/cursoViewer/hooks/useCursoViewer"
import { CursoHeader } from "./CursoHeader"
import { CursoConteudo } from "./CursoConteudo"
import { CursoPreview } from "./CursoPreview"

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
        isEnrolled={state.isEnrolled}
        isEnrolling={state.isEnrolling}
        onEnroll={handleEnrollment}
      />

      {!state.isEnrolled ? (
        <CursoPreview
          curso={curso}
          isEnrolling={state.isEnrolling}
          onEnroll={handleEnrollment}
        />
      ) : (
        <CursoConteudo
          curso={curso}
          currentLesson={currentLessonData}
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