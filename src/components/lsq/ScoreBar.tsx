import { Badge } from "@/components/ui/badge"
import { EstiloAprendizagem } from "@/types/perguntaLSQ"

interface ScoreBarProps {
  estilo: EstiloAprendizagem
  score: number
  maxScore: number
  color: string
  nome: string
  nivel: string
  icon: React.ComponentType<any>
}

export function ScoreBar({ estilo, score, maxScore, color, nome, nivel, icon: Icon }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`bg-gradient-to-br ${color} p-2 rounded-lg`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{nome}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{nivel} preferência</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-lg font-bold">
          {score}/{maxScore}
        </Badge>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}