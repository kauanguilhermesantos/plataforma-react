"use client"

import { useCatalogo } from "@/hooks/useCatalogo"
import { CatalogoHeader } from "./CatalogoHeader"
import { FiltrosCatalogo } from "./FiltrosCatalogo"
import { CursoCard } from "./CursoCard"
import { EmptyState } from "./EmptyState"
import { AutoFilterBadge } from "@/components/users/catalogo/components/AutoFilterBadge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Filter, Sparkles, RefreshCw, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function ConteudoCatalogo() {
  const { 
    filters, 
    cursos, 
    updateFilters, 
    resetFilters, 
    removeEstiloFilter,
    reaplicarFiltroAutomatico,
    autoFilterApplied,
    userProfile,
    userEstilo,
    userEstiloInfo,
    isLoading, 
    error 
  } = useCatalogo()

  const isUserAuthenticated = !!userProfile

  // Verificar se há filtros ativos (excluindo o filtro automático)
  const hasActiveFilters = 
    filters.searchTerm.trim() !== "" ||
    filters.selectedCategory !== "all" ||
    filters.selectedLevel !== "all" ||
    (filters.selectedEstiloAprendizagem !== "all" && !autoFilterApplied)

  return (
    <div className="space-y-6">
      {/* Header com indicação de personalização */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Catálogo de Cursos
            </h1>
            {autoFilterApplied && userEstilo && userEstiloInfo?.icon && (
              <userEstiloInfo.icon className={`h-6 w-6 ${userEstiloInfo.textColor}`} />
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {autoFilterApplied && userEstilo
              ? `Cursos recomendados para ${userEstilo}`
              : isUserAuthenticated && !userEstilo
                ? `Faça o teste de estilo para ver cursos personalizados`
                : "Descubra novos conhecimentos e desenvolva suas habilidades"
            }
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Botão para reaplicar filtro automático (se disponível) */}
          {isUserAuthenticated && userEstilo && !autoFilterApplied && (
            <Button
              variant="outline"
              size="sm"
              onClick={reaplicarFiltroAutomatico}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Ver recomendados
            </Button>
          )}
          
          {/* Botão para fazer teste de estilo se não tiver estilo definido */}
          {isUserAuthenticated && !userEstilo && (
            <Link href="/lsq">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Fazer teste de estilo
              </Button>
            </Link>
          )}
          
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
      </div>

      {/* Badge de filtro automático */}
      {autoFilterApplied && userEstilo && (
        <AutoFilterBadge 
          estiloUsuario={userEstilo}
          onRemove={removeEstiloFilter}
          autoFilterApplied={autoFilterApplied}
          estiloInfo={userEstiloInfo}
        />
      )}

      {/* Mensagem para usuário não autenticado */}
      {!isUserAuthenticated && !isLoading && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Faça login
            </Link>
            {" "}para ver recomendações personalizadas baseadas no seu estilo de aprendizagem.
          </p>
        </div>
      )}

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
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              {cursos.length} curso{cursos.length !== 1 ? "s" : ""} encontrado
              {cursos.length !== 1 ? "s" : ""}
              {hasActiveFilters && " com filtros aplicados"}
              {autoFilterApplied && " (personalizado para você)"}
            </p>
            {autoFilterApplied && userEstilo && userEstiloInfo && (
              <Badge 
                className={`
                  ${userEstiloInfo.bgColor} 
                  ${userEstiloInfo.textColor} 
                  border ${userEstiloInfo.borderColor}
                  inline-flex items-center gap-1
                `}
              >
                {userEstiloInfo.icon && (
                  <userEstiloInfo.icon className="h-3 w-3" />
                )}
                {userEstilo}
              </Badge>
            )}
          </div>
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
          {/* Mensagem quando não há cursos filtrados por estilo */}
          {autoFilterApplied && cursos.length === 0 && userEstilo && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-300">
                Nenhum curso encontrado para o estilo <strong>{userEstilo}</strong>.
                {" "}
                <button
                  onClick={removeEstiloFilter}
                  className="underline hover:text-yellow-900 dark:hover:text-yellow-200"
                >
                  Clique aqui para ver todos os cursos disponíveis.
                </button>
              </p>
            </div>
          )}

          {/* Grid de Cursos */}
          {cursos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>
          ) : (
            <EmptyState 
              titulo={
                autoFilterApplied && userEstilo
                  ? `Nenhum curso encontrado para ${userEstilo}`
                  : hasActiveFilters 
                    ? "Nenhum curso encontrado com os filtros aplicados" 
                    : "Nenhum curso encontrado"
              }
              menssagem={
                autoFilterApplied && userEstilo
                  ? "Tente remover o filtro de estilo para ver todos os cursos disponíveis."
                  : hasActiveFilters 
                    ? "Tente ajustar os filtros ou limpar todos para ver os cursos disponíveis." 
                    : "Nenhum curso disponível no momento."
              }
            />
          )}
        </>
      )}
    </div>
  )
}