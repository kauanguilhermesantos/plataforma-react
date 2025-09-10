import { useState, useMemo } from 'react'
import { Curso, CursoStats } from '@/types/curso'
import { mockCursos } from '@/data/mockCursos'

export function useCursos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<Curso | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const stats: CursoStats = useMemo(() => ({
    totalCursos: mockCursos.length,
    cursosPublicados: mockCursos.filter((c) => c.status === "Publicado").length,
    cursosRascunho: mockCursos.filter((c) => c.status === "Rascunho").length,
    totalEstudantes: mockCursos.reduce((acc, curso) => acc + curso.alunos, 0),
    mediaAvaliacao:
      mockCursos.filter((c) => c.avaliacao > 0).reduce((acc, curso) => acc + curso.avaliacao, 0) /
      Math.max(1, mockCursos.filter((c) => c.avaliacao > 0).length),
  }), [])

  const cursosFiltrados = useMemo(() => 
    mockCursos.filter((curso) => {
      const matchesSearch =
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.instrutor.nome.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || curso.categoria === selectedCategory
      const matchesStatus = selectedStatus === "all" || curso.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    }), [searchTerm, selectedCategory, selectedStatus]
  )

  const handleDeleteCurso = (curso: Curso) => {
    setSelectedCourse(curso)
    setIsDeleteDialogOpen(true)
  }

  const handlePublishCurso = async (curso: Curso) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Curso ${curso.titulo} foi publicado`)
      // Aqui você faria a chamada API real
    } catch (error) {
      console.error("Erro ao publicar curso:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArchiveCurso = async (curso: Curso) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Curso ${curso.titulo} foi arquivado`)
      // Aqui você faria a chamada API real
    } catch (error) {
      console.error("Erro ao arquivar curso:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Publicado":
        return "bg-green-500 hover:bg-green-600"
      case "Rascunho":
        return "bg-gray-500 hover:bg-gray-600"
      case "Arquivado":
        return "bg-orange-500 hover:bg-orange-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getNivelBadge = (nivel: string) => {
    switch (nivel) {
      case "Iniciante":
        return "text-green-600 border-green-600"
      case "Intermediário":
        return "text-yellow-600 border-yellow-600"
      case "Avançado":
        return "text-red-600 border-red-600"
      default:
        return "text-gray-600 border-gray-600"
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedCourse,
    setSelectedCourse,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isLoading,
    stats,
    cursosFiltrados,
    handleDeleteCurso,
    handlePublishCurso,
    handleArchiveCurso,
    getStatusBadge,
    getNivelBadge
  }
}