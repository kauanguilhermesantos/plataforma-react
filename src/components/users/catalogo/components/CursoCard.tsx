import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Users, Star, Play } from "lucide-react"
import { CursoCatalogo } from "@/types/catalogo"

interface CursoCardProps {
  curso: CursoCatalogo
}

export function CursoCard({ curso }: CursoCardProps) {
  return (
    <Card key={curso.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={curso.thumbnail || "/placeholder.svg"}
          alt={curso.titulo}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {curso.isPopular && <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>}
          {curso.isNew && <Badge className="bg-green-500 hover:bg-green-600">Novo</Badge>}
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{curso.nivel}</Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{curso.titulo}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2">{curso.descricao}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Instrutor */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={curso.instrutor.avatar || "/placeholder.svg"} />
            <AvatarFallback>{curso.instrutor.nome[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 dark:text-gray-400">{curso.instrutor.nome}</span>
        </div>

        {/* Estatísticas */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {curso.duracao}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {curso.alunos.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{curso.avaliacao}</span>
            <span className="ml-1">({curso.reviews})</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {curso.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {curso.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{curso.tags.length - 3}
            </Badge>
          )}
        </div>

        <Separator />

        {/* Ação */}
        <div className="flex justify-end">
          <Link href={`/curso/${curso.id}`} className="w-full">
            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Acessar Curso
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}