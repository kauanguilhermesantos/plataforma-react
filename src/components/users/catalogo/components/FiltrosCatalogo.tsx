import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { FiltrosCatalogo as FiltersType } from "@/types/catalogo"
import { categoriasCatalogo } from "@/data/mockCatalogo"
import { Button } from "@/components/ui/button"

interface FiltrosCatalogoProps {
  filters: FiltersType
  onFiltersChange: (filters: Partial<FiltersType>) => void
}

export function FiltrosCatalogo({ filters, onFiltersChange }: FiltrosCatalogoProps) {
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ searchTerm: e.target.value })
  }

  const clearSearch = () => {
    onFiltersChange({ searchTerm: "" })
  }

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
              onChange={handleSearchChange}
              className="pl-10 pr-10"
            />
            {filters.searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={filters.selectedCategory}
                onValueChange={(value) => onFiltersChange({ selectedCategory: value })}
              >
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
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

            {/* Nível */}
            <div className="space-y-2">
              <Label htmlFor="nivel">Nível</Label>
              <Select
                value={filters.selectedLevel}
                onValueChange={(value) => onFiltersChange({ selectedLevel: value })}
              >
                <SelectTrigger id="nivel">
                  <SelectValue placeholder="Todos os níveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Níveis</SelectItem>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Ordenar por */}
            <div className="space-y-2">
              <Label htmlFor="ordenar">Ordenar por</Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => onFiltersChange({ sortBy: value })}
              >
                <SelectTrigger id="ordenar">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais Recente</SelectItem>
                  <SelectItem value="popular">Mais Popular</SelectItem>
                  <SelectItem value="rating">Melhor Avaliado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estilo de Aprendizagem */}
            <div className="space-y-2">
              <Label htmlFor="estilo">Estilo de Aprendizagem</Label>
              <Select
                value={filters.selectedEstiloAprendizagem}
                onValueChange={(value) => onFiltersChange({ selectedEstiloAprendizagem: value })}
              >
                <SelectTrigger id="estilo">
                  <SelectValue placeholder="Todos os estilos" />
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