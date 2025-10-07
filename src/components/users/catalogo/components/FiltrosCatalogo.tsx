import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { FiltrosCatalogo as FiltersType } from "@/types/catalogo"
import { categoriasCatalogo } from "@/data/mockCatalogo"

interface FiltrosCatalogoProps {
  filters: FiltersType
  onFiltersChange: (filters: Partial<FiltersType>) => void
}

export function FiltrosCatalogo({ filters, onFiltersChange }: FiltrosCatalogoProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Barra de Pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar cursos, tecnologias, instrutores..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Por Catogoria */}
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={filters.selectedCategory}
                onValueChange={(value) => onFiltersChange({ selectedCategory: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoriasCatalogo.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center">
                        <category.icon className="mr-2 h-4 w-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Por Nível */}
            <div className="space-y-2">
              <Label>Nível</Label>
              <Select
                value={filters.selectedLevel}
                onValueChange={(value) => onFiltersChange({ selectedLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Níveis</SelectItem>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Por Popular */}
            <div className="space-y-2">
              <Label>Ordenar por</Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => onFiltersChange({ sortBy: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Mais Popular</SelectItem>
                  <SelectItem value="rating">Melhor Avaliado</SelectItem>
                  <SelectItem value="newest">Mais Recente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Por Estilo de Aprendizagem */}
            <div className="space-y-2">
              <Label>Estilo de Aprendizagem</Label>
              <Select
                value={filters.selectedEstiloAprendizagem}
                onValueChange={(value) => onFiltersChange({ selectedEstiloAprendizagem: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Estilos</SelectItem>
                  <SelectItem value="Pragmático">Pragmático</SelectItem>
                  <SelectItem value="Teórico">Teórico</SelectItem>
                  <SelectItem value="Ativista">Ativista</SelectItem>
                  <SelectItem value="Reflexivo">Reflexivo</SelectItem>
                </SelectContent>
              </Select>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}