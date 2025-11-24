"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCursos } from "@/hooks/useCursos"
import { CursoStats } from "./CursoStats"
import { CursoFilters } from "./CursoFilters"
import { CursoTable } from "./CursoTable"
import { DeleteCourseDialog } from "./modals/DeleteCursoDialog"

export function AdminCursosConteudo() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedEstilo,
    setSelectedEstilo,
    selectedCourse,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isLoading,
    stats,
    cursosFiltrados,
    handleDeleteCurso,
    handlePublishCurso,
    handleArchiveCurso,
    getStatusBadge,
    getNivelBadge,
    getEstiloBadge
  } = useCursos()

  const handleNovoCurso = () => {
    window.location.href = "cursos/novoCurso"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Cursos</h1>
          <p className="text-gray-600 dark:text-gray-400">Administre todos os cursos da plataforma</p>
        </div>
        <Button onClick={handleNovoCurso}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      {/* Estatísticas */}
      <CursoStats stats={stats} />

      {/* Filtros */}
      <CursoFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedEstilo={selectedEstilo}
        onEstiloChange={setSelectedEstilo}
      />

      {/* Tabela de Cursos */}
      <CursoTable
        cursos={cursosFiltrados}
        onDelete={handleDeleteCurso}
        onPublish={handlePublishCurso}
        onArchive={handleArchiveCurso}
        isLoading={isLoading}
        getStatusBadge={getStatusBadge}
        getNivelBadge={getNivelBadge}
        getEstiloBadge={getEstiloBadge}
      />

      {/* Dialog de Exclusão */}
      <DeleteCourseDialog
        curso={selectedCourse}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  )
}