import { Progress } from "@/components/ui/progress"

interface ProgressSectionProps {
  currentPage: number
  totalPages: number
  progress: number
}

export function ProgressSection({ currentPage, totalPages, progress }: ProgressSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>
          Página {currentPage + 1} de {totalPages}
        </span>
        <span>{Math.round(progress)}% completo</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}