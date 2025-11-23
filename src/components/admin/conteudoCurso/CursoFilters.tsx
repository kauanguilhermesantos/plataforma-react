import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface CursoFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedStatus: string
  onStatusChange: (value: string) => void
  selectedEstilo: string
  onEstiloChange: (value: string) => void
}

export function CursoFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedEstilo,
  onEstiloChange
}: CursoFiltersProps) {
  return (
    <Card>
  <CardContent className="p-4 sm:p-6">
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Campo de Pesquisa */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Pesquisar cursos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      
      {/* Filtros em coluna única para sm, linha para md+ */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Filtro por Categoria */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            <SelectItem value="programacao">Programação</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="data-science">Data Science</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="web">Desenvolvimento Web</SelectItem>
            <SelectItem value="banco-de-dados">Banco de Dados</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro por Status */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="Publicado">Publicados</SelectItem>
            <SelectItem value="Rascunho">Rascunhos</SelectItem>
            <SelectItem value="Arquivado">Arquivados</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro por Estilo */}
        <Select value={selectedEstilo} onValueChange={onEstiloChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Estilos</SelectItem>
            <SelectItem value="pragmatico">Pragmático</SelectItem>
            <SelectItem value="teorico">Teórico</SelectItem>
            <SelectItem value="ativista">Ativista</SelectItem>
            <SelectItem value="reflexivo">Reflexivo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </CardContent>
</Card>
  )
}