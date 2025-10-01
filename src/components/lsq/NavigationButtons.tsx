import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface NavigationButtonsProps {
  currentPage: number
  totalPages: number
  allQuestionsAnswered: boolean
  onPrevious: () => void
  onNext: () => void
}

export function NavigationButtons({
  currentPage,
  totalPages,
  allQuestionsAnswered,
  onPrevious,
  onNext,
}: NavigationButtonsProps) {
  return (
    <>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} disabled={currentPage === 0} size="lg">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Anterior
        </Button>

        <Button
          onClick={onNext}
          size="lg"
          disabled={!allQuestionsAnswered}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
        >
          {currentPage === totalPages - 1 ? "Ver Resultados" : "Próxima"}
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>

      {!allQuestionsAnswered && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Responda todas as perguntas para continuar
        </p>
      )}
    </>
  )
}