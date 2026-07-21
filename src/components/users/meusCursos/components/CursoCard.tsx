import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import {
  Play,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Share,
  Download,
  Trash2,
} from "lucide-react"
import { Curso } from "@/types/curso"

interface CursoCardProps {
  curso: Curso
  onToggleFavorite: (cursoId: number) => void
  onUnenroll: (curso: Curso) => void
}

export function CursoCard({ curso, onToggleFavorite, onUnenroll }: CursoCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={"/testeImagem.png"} alt={curso.titulo} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 flex gap-2">
          {curso.isCompleted && <Badge className="bg-green-500 hover:bg-green-600">Concluído</Badge>}
          <Badge variant="secondary">{curso.nivel}</Badge>
        </div>
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onToggleFavorite(curso.id)}>
                {curso.isFavorite ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Remover dos Favoritos
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Adicionar aos Favoritos
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                Compartilhar
              </DropdownMenuItem>
              {curso.isCompleted && (
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Certificado
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onUnenroll(curso)} className="text-red-600 dark:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                Desinscrever-se
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{curso.titulo}</CardTitle>
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={curso.instrutor.avatar || "/placeholder.svg"} />
            <AvatarFallback>{curso.instrutor.nome[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 dark:text-gray-400">{curso.instrutor.nome}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {curso.aulasCompletadas}/{curso.totalAulas} aulas
            </span>
            <span className="font-medium">{curso.progresso}%</span>
          </div>
          <Progress value={curso.progresso} className="h-2" />
        </div>

        {!curso.isCompleted && curso.proximaAula && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Próxima aula:</p>
            <p className="text-sm text-blue-700 dark:text-blue-200">{curso.proximaAula.titulo}</p>
            <p className="text-xs text-blue-600 dark:text-blue-300">{curso.proximaAula.duracao}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {curso.duracaoTotal}
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              {curso.avaliacao}
            </div>
          </div>
          {curso.isFavorite && <Bookmark className="h-4 w-4 fill-current text-blue-500" />}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Último acesso: {new Date(curso.ultimoAcesso).toLocaleDateString("pt-BR")}
          </span>
          <Link href={`/curso/${curso.id}`}>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              {curso.isCompleted ? "Revisar" : "Continuar"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}