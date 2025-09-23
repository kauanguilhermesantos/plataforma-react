import { Button } from "@/components/ui/button"
import { CheckCircle, ThumbsUp, MessageCircle } from "lucide-react"
import { Curso, Aula } from "@/types/curso"
import { CursoViewerState } from "@/types/cursoViewer"
import { VideoPlayer } from "./VideoPlayer"
import { AulaSidebar } from "./AulaSidebar"
import { ComentariosSection } from "./ComentariosSection"

interface CursoConteudoProps {
  curso: Curso
  currentLesson: Aula | undefined
  state: CursoViewerState
  onPlayPause: () => void
  onNextLesson: () => void
  onPreviousLesson: () => void
  onLessonSelect: (lessonId: number) => void
  onAddComment: () => void
  onCommentChange: (comment: string) => void
  onToggleComments: () => void
}

export function CursoConteudo({
  curso,
  currentLesson,
  state,
  onPlayPause,
  onNextLesson,
  onPreviousLesson,
  onLessonSelect,
  onAddComment,
  onCommentChange,
  onToggleComments
}: CursoConteudoProps) {
  if (!currentLesson) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Player de Vídeo e Comentários */}
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer
          aula={currentLesson}
          isPlaying={state.isPlaying}
          onPlayPause={onPlayPause}
          onNext={onNextLesson}
          onPrevious={onPreviousLesson}
        />

        {/* Ações da Aula */}
        <div className="flex items-center justify-between p-4 shadow-md bg-white dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Curtir
            </Button>
            <Button variant="outline" size="sm" onClick={onToggleComments}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Comentários ({curso.reviews})
            </Button>
          </div>
          <Button>
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar como Concluída
          </Button>
        </div>

        {/* Comentários */}
        <ComentariosSection
          comentarios={[]} // Será preenchido com dados reais
          newComment={state.newComment}
          showComments={state.showComments}
          onCommentChange={onCommentChange}
          onAddComment={onAddComment}
        />
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <AulaSidebar
          curso={curso}
          currentLesson={state.currentLesson}
          onLessonSelect={onLessonSelect}
        />
      </div>
    </div>
  )
}