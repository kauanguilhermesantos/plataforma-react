import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

interface EmptyStateProps {
  titulo?: string
  menssagem?: string
}

export function EmptyState({ 
  titulo = "Nenhum curso encontrado", 
  menssagem = "Tente ajustar os filtros ou termos de pesquisa para encontrar o que procura." 
}: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{titulo}</h3>
        <p className="text-gray-600 dark:text-gray-400">{menssagem}</p>
      </CardContent>
    </Card>
  )
}