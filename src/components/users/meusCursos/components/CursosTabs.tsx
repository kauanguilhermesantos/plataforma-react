import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Curso } from "@/types/curso"
import { CursoCard } from "./CursoCard"
import { EmptyState } from "./EmptyState"
import { TrendingUp, Award, Bookmark } from "lucide-react"

interface CursosTabsProps {
  cursosEmProgresso: Curso[]
  CursosCompletos: Curso[]
  cursosFavoritos: Curso[]
  sortedCourses: (cursos: Curso[]) => Curso[]
  onToggleFavorite: (cursoId: number) => void
  onUnenroll: (curso: Curso) => void
}

export function CursosTabs({
  cursosEmProgresso,
  CursosCompletos,
  cursosFavoritos,
  sortedCourses,
  onToggleFavorite,
  onUnenroll,
}: CursosTabsProps) {
  const renderCoursesGrid = (cursos: Curso[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedCourses(cursos).map((curso) => (
        <CursoCard
          key={curso.id}
          curso={curso}
          onToggleFavorite={onToggleFavorite}
          onUnenroll={onUnenroll}
        />
      ))}
    </div>
  )

  return (
    <Tabs defaultValue="in-progress" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="in-progress" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Em Progresso ({cursosEmProgresso.length})
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          Concluídos ({CursosCompletos.length})
        </TabsTrigger>
        <TabsTrigger value="favorites" className="flex items-center gap-2">
          <Bookmark className="h-4 w-4" />
          Favoritos ({cursosFavoritos.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="in-progress">
        {cursosEmProgresso.length > 0 ? (
          renderCoursesGrid(cursosEmProgresso)
        ) : (
          <EmptyState type="in-progress" />
        )}
      </TabsContent>

      <TabsContent value="completed">
        {CursosCompletos.length > 0 ? (
          renderCoursesGrid(CursosCompletos)
        ) : (
          <EmptyState type="completed" />
        )}
      </TabsContent>

      <TabsContent value="favorites">
        {cursosFavoritos.length > 0 ? (
          renderCoursesGrid(cursosFavoritos)
        ) : (
          <EmptyState type="favorites" />
        )}
      </TabsContent>
    </Tabs>
  )
}