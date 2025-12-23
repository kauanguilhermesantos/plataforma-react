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

  console.log('=== CURSO CONTEUDO ===', { 
    temCurso: !!curso,
    currentLesson,
    stateCurrentLesson: state.currentLesson,
    modulos: curso?.modulos?.length,
    primeiraAula: curso?.modulos?.[0]?.aulas?.[0]
  });
  
  // Encontrar a aula para exibir
  const aulaParaExibir = currentLesson || 
                        curso?.modulos?.[0]?.aulas?.[0] || 
                        null;

  console.log('Aula para exibir:', aulaParaExibir);

  // Se não tiver nenhuma aula, mostrar mensagem
  // if (!aulaParaExibir) {
  //   return (
  //     <div className="text-center py-8">
  //       <p className="text-lg">Carregando conteúdo do curso...</p>
  //       <p className="text-sm text-gray-500">Se o problema persistir, recarregue a página.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Player de Vídeo e Comentários */}
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer
          aula={aulaParaExibir}
          isPlaying={state.isPlaying}
          onPlayPause={onPlayPause}
          onNext={onNextLesson}
          onPrevious={onPreviousLesson}
        />

        {/* Ações da Aula */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 shadow-md bg-white dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between gap-4 sm:gap-8">
            <Button variant="outline" size="sm" className="w-full xs:w-auto justify-center">
              <ThumbsUp className="h-4 w-4" />
              Curtir
            </Button>
            <Button variant="outline" size="sm" onClick={onToggleComments} className="w-full xs:w-auto justify-center">
              <MessageCircle className="h-4 w-4" />
              Comentários ({curso.reviews || 0})
            </Button>
          </div>
          <Button>
            <CheckCircle className="h-4 w-4" />
            Marcar como Concluída
          </Button>
        </div>

        {/* Comentários */}
        <ComentariosSection
          comentarios={[]}
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
          currentLesson={state.currentLesson || aulaParaExibir.id}
          onLessonSelect={onLessonSelect}
        />
      </div>
    </div>
  );
}