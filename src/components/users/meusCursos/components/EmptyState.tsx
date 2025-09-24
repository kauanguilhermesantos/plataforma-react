import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Award, Bookmark } from "lucide-react"

interface EmptyStateProps {
  type: "in-progress" | "completed" | "favorites"
}

export function EmptyState({ type }: EmptyStateProps) {
  const config = {
    "in-progress": {
      icon: BookOpen,
      title: "Nenhum curso em progresso",
      description: "Explore nosso catálogo e comece um novo curso hoje!",
      buttonText: "Explorar Cursos",
      showButton: true,
    },
    "completed": {
      icon: Award,
      title: "Nenhum curso concluído ainda",
      description: "Continue estudando para conquistar seus primeiros certificados!",
      buttonText: "",
      showButton: false,
    },
    "favorites": {
      icon: Bookmark,
      title: "Nenhum curso favorito",
      description: "Marque seus cursos favoritos para acessá-los rapidamente!",
      buttonText: "",
      showButton: false,
    },
  }

  const { icon: Icon, title, description, buttonText, showButton } = config[type]

  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        {showButton && (
          <Link href="/catalog">
            <Button>{buttonText}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}