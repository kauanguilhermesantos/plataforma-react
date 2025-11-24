import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, Play, Pause, MoreHorizontal, Star } from "lucide-react"
import { Curso } from "@/types/curso"
import { useCursos } from "../../../hooks/useCursos"

interface CursoTableProps {
  cursos: Curso[]
  onDelete: (course: Curso) => void
  onPublish: (course: Curso) => void
  onArchive: (course: Curso) => void
  isLoading: boolean
  getStatusBadge?: (status: string) => string
  getNivelBadge?: (nivel: string) => string
  getEstiloBadge?: (estilo: string) => string
}

export function CursoTable({ 
  cursos, 
  onDelete, 
  onPublish, 
  onArchive, 
  isLoading,
  getStatusBadge,
  getNivelBadge,
  getEstiloBadge
}: CursoTableProps) {

  const { mapNivel, mapStatus, mapCategoria, mapEstilo } = useCursos();
  
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

  const defaultGetEstiloBadge = (estilo: string) => {
    switch (estilo) {
      case "Pragmático": return "text-blue-600 border-blue-600"
      case "Teórico": return "text-purple-600 border-purple-600"
      case "Ativista": return "text-red-600 border-red-600"
      case "Reflexivo": return "text-green-600 border-green-600"
      default: return "text-gray-600 border-gray-600"
    }
  }

  const statusBadgeFn = getStatusBadge || defaultGetStatusBadge
  const nivelBadgeFn = getNivelBadge || defaultGetNivelBadge
  const estiloBadgeFn = getEstiloBadge || defaultGetEstiloBadge

  return (
    <Card>
  <CardHeader>
    <CardTitle>Lista de Cursos ({cursos.length})</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[160px] sm:min-w-[200px]">Curso</TableHead>
            <TableHead className="hidden md:table-cell">Instrutor</TableHead>
            <TableHead className="hidden lg:table-cell">Categoria</TableHead>
            <TableHead className="hidden lg:table-cell">Nível</TableHead>
            <TableHead className="w-20 sm:w-auto">Status</TableHead>
            <TableHead className="hidden xl:table-cell">Estilo de Aprendizagem</TableHead>
            <TableHead className="hidden xl:table-cell">Avaliação</TableHead>
            <TableHead className="text-right w-16 sm:min-w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cursos.map((curso) => (
            <TableRow key={curso.id}>
              {/* Coluna Curso - Sempre visível */}
              <TableCell>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium line-clamp-1 text-sm sm:text-base truncate">{curso.titulo}</div>
                    {/* Informações extras apenas para mobile (até 767px) */}
                    <div className="text-xs text-gray-500 md:hidden">
                      {curso.instrutor.nome.split(' ')[0]} • {curso.categoria}
                    </div>
                    <div className="flex gap-1 sm:gap-2 mt-1 md:hidden">
                      <Badge variant="outline" className="text-xs">
                        {curso.nivel}
                      </Badge>
                      {curso.avaliacao > 0 && (
                        <span className="text-xs text-gray-500 flex items-center justify-center">
                          <Star className="inline h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                          {curso.avaliacao}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Instrutor - Visível apenas em md+ (768px+) */}
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={curso.instrutor.avatar} />
                    <AvatarFallback className="text-xs">
                      {curso.instrutor.nome[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{curso.instrutor.nome}</span>
                </div>
              </TableCell>

              {/* Categoria - Visível apenas em lg+ (1024px+) */}
              <TableCell className="hidden lg:table-cell">
                <Badge variant="outline" className="text-xs border-gray-400 text-gray-400">
                  {mapCategoria(curso.categoria)}
                </Badge>
              </TableCell>

              {/* Nível - Visível apenas em lg+ (1024px+) */}
              <TableCell className="hidden lg:table-cell">
                <Badge variant="outline" className={nivelBadgeFn(mapNivel(curso.nivel))}>
                  {mapNivel(curso.nivel)}
                </Badge>
              </TableCell>

              {/* Status - Sempre visível */}
              <TableCell>
                <Badge className={`text-xs ${statusBadgeFn(curso.status)}`}>
                  {curso.status === "Publicado" && "Pub"}
                  {curso.status === "Rascunho" && "Rasc"}
                  {curso.status === "Arquivado" && "Arq"}
                </Badge>
              </TableCell>

              {/* Estilo de Aprendizagem - Visível apenas em xl+ (1280px+) */}
              <TableCell className="hidden xl:table-cell">
                <Badge variant={"outline"} className={`text-sm ${estiloBadgeFn(mapEstilo(curso.estiloAprendizagem))}`}>
                  {mapEstilo(curso.estiloAprendizagem)}
                </Badge>
              </TableCell>

              {/* Avaliação - Visível apenas em xl+ (1280px+) */}
              <TableCell className="hidden xl:table-cell">
                {curso.avaliacao > 0 ? (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{curso.avaliacao}</span>
                    <span className="text-gray-500 text-xs">({curso.reviews})</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </TableCell>

              {/* Ações - Sempre visível */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 p-0" disabled={isLoading}>
                      <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
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
                    {curso.status === "Arquivado" && (
                      <DropdownMenuItem onClick={() => onPublish(curso)} disabled={isLoading}>
                        <Play className="mr-2 h-4 w-4" />
                        Publicar
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
    </div>
  </CardContent>
</Card>
  )
}