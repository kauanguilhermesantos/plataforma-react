import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PerguntaLSQ } from "@/types/perguntaLSQ"

interface PerguntaCardProps {
  pergunta: PerguntaLSQ
  resposta: boolean | null
  onAnswer: (perguntaId: number, agree: boolean) => void
}

export function PerguntaCard({ pergunta, resposta, onAnswer }: PerguntaCardProps) {
  return (
    <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {pergunta.id}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-900 dark:text-white">{pergunta.texto}</p>
        </div>
      </div>

      <div className="flex gap-3 ml-12">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onAnswer(pergunta.id, true)}
          className={cn(
            "flex-1 transition-all duration-200",
            resposta === true
              ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
              : "hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-500",
          )}
        >
          <ThumbsUp className={cn("h-5 w-5 mr-2", resposta === true && "text-white")} />
          Sim
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onAnswer(pergunta.id, false)}
          className={cn(
            "flex-1 transition-all duration-200",
            resposta === false
              ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
              : "hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-500",
          )}
        >
          <ThumbsDown className={cn("h-5 w-5 mr-2", resposta === false && "text-white")} />
          Não
        </Button>
      </div>
    </div>
  )
}