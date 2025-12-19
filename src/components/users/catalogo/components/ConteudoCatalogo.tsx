"use client"

import { useCatalogo } from "@/hooks/useCatalogo"
import { CatalogoHeader } from "./CatalogoHeader"
import { FiltrosCatalogo } from "./FiltrosCatalogo"
import { CursoCard } from "./CursoCard"
import { EmptyState } from "./EmptyState"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ConteudoCatalogo() {
  const { filters, cursos, updateFilters, resetFilters, isLoading, error } = useCatalogo()

  console.log("ConteudoCatalogo - Estado:", {
    isLoading,
    error,
    totalCursos: cursos.length,
    filters
  })

  // Verificar se há filtros ativos
  const hasActiveFilters = 
    filters.searchTerm.trim() !== "" ||
    filters.selectedCategory !== "all" ||
    filters.selectedLevel !== "all" ||
    filters.selectedEstiloAprendizagem !== "all"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <CatalogoHeader
          titulo="Catálogo de Cursos"
          descricao="Descubra novos conhecimentos e desenvolva suas habilidades"
        />
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Limpar Filtros
          </Button>
        )}
      </div>

      {/* Filtros e Pesquisa */}
      <FiltrosCatalogo
        filters={filters}
        onFiltersChange={updateFilters}
      />

      {/* Mostrar erro se houver */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erro ao carregar cursos: {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Resultados */}
      <div className="flex items-center justify-between">
        {isLoading ? (
          <Skeleton className="h-4 w-32" />
        ) : error ? (
          <p className="text-red-500">Erro ao carregar cursos</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            {cursos.length} curso{cursos.length !== 1 ? "s" : ""} encontrado
            {cursos.length !== 1 ? "s" : ""}
            {hasActiveFilters && " com os filtros aplicados"}
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Grid de Cursos */}
          {cursos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>
          ) : (
            <EmptyState 
              titulo={hasActiveFilters ? "Nenhum curso encontrado com os filtros aplicados" : "Nenhum curso encontrado"}
              menssagem={hasActiveFilters ? "Tente ajustar os filtros ou limpar todos para ver os cursos disponíveis." : "Nenhum curso disponível no momento."}
            />
          )}
        </>
      )}
    </div>
  )
}