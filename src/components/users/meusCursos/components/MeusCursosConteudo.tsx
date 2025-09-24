"use client"

import { MeusCursosConteudoProps } from "@/types/curso"
import { useMeusCursos } from "../hooks/useMeusCursos"
import { MeusCursosHeader } from "./MeusCursosHeader"
import { StatsGrid } from "./StatsGrid"
import { FiltrosSection } from "./FiltrosSection"
import { CursosTabs } from "./CursosTabs"
import { UnenrollDialog } from "./UnenrollDialog"
import { mockUsuarioStats } from "@/data/mockUsuarioCurso"

export function  MeusCursosConteudo({ usuarioId }: MeusCursosConteudoProps) {
  const {
    filters,
    inProgressCourses,
    completedCourses,
    favoriteCourses,
    unenrollDialog,
    isUnenrolling,
    sortCourses,
    toggleFavorite,
    handleUnenroll,
    openUnenrollDialog,
    updateFilters,
    setUnenrollDialog,
  } = useMeusCursos()

  const userStats = {
    ...mockUsuarioStats,
    totalCourses: inProgressCourses.length + completedCourses.length,
    completedCourses: completedCourses.length,
    inProgressCourses: inProgressCourses.length,
  }

  return (
    <div className="space-y-6">
      <MeusCursosHeader
        titulo="Meus Cursos"
        descricao="Acompanhe seu progresso e continue aprendendo"
      />

      <StatsGrid stats={userStats} />

      <FiltrosSection filtros={filters} onFiltersChange={updateFilters} />

      <CursosTabs
        cursosEmProgresso={inProgressCourses}
        CursosCompletos={completedCourses}
        cursosFavoritos={favoriteCourses}
        sortedCourses={sortCourses}
        onToggleFavorite={toggleFavorite}
        onUnenroll={openUnenrollDialog}
      />

      <UnenrollDialog
        isOpen={unenrollDialog.isOpen}
        curso={unenrollDialog.curso}
        isUnenrolling={isUnenrolling}
        onClose={() => setUnenrollDialog({ isOpen: false, curso: null })}
        onConfirm={handleUnenroll}
      />
    </div>
  )
}