import { Card, CardContent } from "@/components/ui/card"
import { CursoStats as CursoStatsType } from "@/types/curso"

interface CursoStatsProps {
  stats: CursoStatsType
}

export function CursoStats({ stats }: CursoStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalCursos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.cursosPublicados}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Publicados</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.cursosRascunho}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Rascunhos</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.totalEstudantes.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Estudantes</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.mediaAvaliacao.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avaliação</div>
        </CardContent>
      </Card>
    </div>
  )
}