import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, Play, Pause, MoreHorizontal, Star } from "lucide-react"
import { Curso } from "@/types/curso"

interface CursoTableProps {
  cursos: Curso[]
  onDelete: (course: Curso) => void
  onPublish: (course: Curso) => void
  onArchive: (course: Curso) => void
  isLoading: boolean
  getStatusBadge?: (status: string) => string
  getNivelBadge?: (nivel: string) => string
}

export function CursoTable({ 
  cursos, 
  onDelete, 
  onPublish, 
  onArchive, 
  isLoading,
  getStatusBadge,
  getNivelBadge,
}: CursoTableProps) {
  
  const defaultGetStatusBadge = (status: string) => {
    switch (status) {
      case "Publicado": return "bg-green-500 hover:bg-green-600"
      case "Rascunho": return "bg-gray-500 hover:bg-gray-600"
      case "Arquivado": return "bg-orange-500 hover:bg-orange-600"
      default: return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const defaultGetNivelBadge = (nivel: string) => {
    switch (nivel) {
      case "Iniciante": return "text-green-600 border-green-600"
      case "Intermediário": return "text-yellow-600 border-yellow-600"
      case "Avançado": return "text-red-600 border-red-600"
      default: return "text-gray-600 border-gray-600"
    }
  }

  const statusBadgeFn = getStatusBadge || defaultGetStatusBadge
  const nivelBadgeFn = getNivelBadge || defaultGetNivelBadge

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Cursos ({cursos.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Curso</TableHead>
              <TableHead>Instrutor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Estudantes</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={curso.thumbnail || "/placeholder.svg"}
                      alt={curso.titulo}
                      className="w-12 h-8 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium line-clamp-1">{curso.titulo}</div>
                      <div className="text-sm text-gray-500">{curso.categoria}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={curso.instrutor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{curso.instrutor.nome[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{curso.instrutor.nome}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{curso.categoria}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={nivelBadgeFn(curso.nivel)}>
                    {curso.nivel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusBadgeFn(curso.status)}>
                    {curso.status === "Publicado" && "Publicado"}
                    {curso.status === "Rascunho" && "Rascunho"}
                    {curso.status === "Arquivado" && "Arquivado"}
                  </Badge>
                </TableCell>
                <TableCell>{curso.alunos.toLocaleString()}</TableCell>
                <TableCell>
                  {curso.avaliacao > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{curso.avaliacao}</span>
                      <span className="text-gray-500">({curso.reviews})</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => (window.location.href = `cursos/${curso.id}/editarCurso`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      {curso.status === "Rascunho" && (
                        <DropdownMenuItem onClick={() => onPublish(curso)} disabled={isLoading}>
                          <Play className="mr-2 h-4 w-4" />
                          Publicar
                        </DropdownMenuItem>
                      )}
                      {curso.status === "Publicado" && (
                        <DropdownMenuItem onClick={() => onArchive(curso)} disabled={isLoading}>
                          <Pause className="mr-2 h-4 w-4" />
                          Arquivar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(curso)} 
                        className="text-red-600"
                        disabled={isLoading}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}