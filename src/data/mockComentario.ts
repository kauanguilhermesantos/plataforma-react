import { Comentario } from "@/types/cursoViewer"

export const mockComentarios: Comentario[] = [
  {
    id: 1,
    user: { name: "João Santos", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Excelente explicação sobre closures! Finalmente entendi o conceito.",
    timestamp: "2 horas atrás",
    likes: 12,
  },
  {
    id: 2,
    user: { name: "Ana Costa", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Os exercícios práticos estão muito bem elaborados. Parabéns!",
    timestamp: "1 dia atrás",
    likes: 8,
  },
]