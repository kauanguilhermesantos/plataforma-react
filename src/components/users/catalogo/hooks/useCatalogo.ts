import { useState, useMemo } from 'react'
import { CursoCatalogo, FiltrosCatalogo } from '@/types/catalogo'
import { mockCursos } from '@/data/mockCursos'

export function useCatalogo() {
  const [filters, setFilters] = useState<FiltrosCatalogo>({
    searchTerm: "",
    selectedCategory: "all",
    selectedLevel: "all",
    sortBy: "popular"
  })

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = mockCursos.filter((curso) => {
      const matchesSearch =
        curso.titulo.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        curso.descricao.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        curso.tags.some((tag) => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))

      const matchesCategory = filters.selectedCategory === "all" || curso.categoria === filters.selectedCategory
      const matchesLevel = filters.selectedLevel === "all" || curso.nivel === filters.selectedLevel

      return matchesSearch && matchesCategory && matchesLevel
    })

    return [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "popular":
          return b.alunos - a.alunos
        case "rating":
          return b.avaliacao - a.avaliacao
        case "newest":
          return b.id - a.id
        default:
          return 0
      }
    })
  }, [filters])

  const updateFilters = (newFilters: Partial<FiltrosCatalogo>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    filters,
    cursos: filteredAndSortedCourses,
    updateFilters
  }
}