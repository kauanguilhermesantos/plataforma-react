import { useState } from "react"
import { Curso, Filtros, UnenrollDialogState } from "@/types/curso"
import { mockUsuarioCurso } from "@/data/mockUsuarioCurso"

export function useMeusCursos() {
  const [filters, setFilters] = useState<Filtros>({
    searchTerm: "",
    selectedCategory: "all",
    sortBy: "recent",
  })
  
  const [unenrollDialog, setUnenrollDialog] = useState<UnenrollDialogState>({
    isOpen: false,
    curso: null,
  })
  
  const [isUnenrolling, setIsUnenrolling] = useState(false)
  const [courses, setCourses] = useState<Curso[]>(mockUsuarioCurso)

  // Filtrar cursos
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.titulo.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesCategory = filters.selectedCategory === "all" || course.categoria === filters.selectedCategory
    return matchesSearch && matchesCategory
  })

  // Separar cursos por status
  const inProgressCourses = filteredCourses.filter((course) => !course.isCompleted)
  const completedCourses = filteredCourses.filter((course) => course.isCompleted)
  const favoriteCourses = filteredCourses.filter((course) => course.isFavorite)

  // Ordenar cursos
  const sortCourses = (coursesToSort: Curso[]) => {
    return [...coursesToSort].sort((a, b) => {
      switch (filters.sortBy) {
        case "recent":
          return new Date(b.ultimoAcesso).getTime() - new Date(a.ultimoAcesso).getTime()
        case "progress":
          return b.progresso - a.progresso
        case "alphabetical":
          return a.titulo.localeCompare(b.titulo)
        case "rating":
          return b.avaliacao - a.avaliacao
        default:
          return 0
      }
    })
  }

  const toggleFavorite = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, isFavorite: !course.isFavorite }
        : course
    ))
  }

  const handleUnenroll = async (course: Curso) => {
    setIsUnenrolling(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setCourses(courses.filter(c => c.id !== course.id))
      setUnenrollDialog({ isOpen: false, curso: null })
    } catch (error) {
      console.error("Erro ao desinscrever:", error)
    } finally {
      setIsUnenrolling(false)
    }
  }

  const openUnenrollDialog = (curso: Curso) => {
    setUnenrollDialog({ isOpen: true, curso })
  }

  const updateFilters = (newFilters: Partial<Filtros>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    filters,
    courses,
    filteredCourses,
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
  }
}