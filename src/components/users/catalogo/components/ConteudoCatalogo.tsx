"use client"

import { useCatalogo } from "@/components/users/catalogo/hooks/useCatalogo"
import { CatalogoHeader } from "./CatalogoHeader"
import { FiltrosCatalogo } from "./FiltrosCatalogo"
import { CursoCard } from "./CursoCard"
import { EmptyState } from "./EmptyState"

export function ConteudoCatalogo() {
  const { filters, cursos, updateFilters } = useCatalogo()

  return (
    <div className="space-y-6">
      {/* Header */}
      <CatalogoHeader
        titulo="Catálogo de Cursos"
        descricao="Descubra novos conhecimentos e desenvolva suas habilidades"
      />

      {/* Filtros e Pesquisa */}
      <FiltrosCatalogo
        filters={filters}
        onFiltersChange={updateFilters}
      />

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          {cursos.length} curso{cursos.length !== 1 ? "s" : ""} encontrado
          {cursos.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso) => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {cursos.length === 0 && <EmptyState />}
    </div>
  )
}