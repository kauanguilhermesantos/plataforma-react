import { useState, useMemo, useEffect, useCallback } from 'react'
import { CursoCatalogo, FiltrosCatalogo } from '@/types/catalogo'

export function useCatalogo() {
  const [filters, setFilters] = useState<FiltrosCatalogo>({
    searchTerm: "",
    selectedCategory: "all",
    selectedLevel: "all",
    sortBy: "newest", // Alterado para "newest" como padrão
    selectedEstiloAprendizagem: "all"
  })

  const [cursos, setCursos] = useState<CursoCatalogo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  // Função para buscar cursos com filtros
  const fetchCursos = useCallback(async (currentFilters: FiltrosCatalogo) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log("Buscando cursos com filtros:", currentFilters)

      // Construir query string com filtros
      const params = new URLSearchParams()
      
      if (currentFilters.searchTerm.trim()) {
        params.append('search', currentFilters.searchTerm.trim())
      }
      
      if (currentFilters.selectedCategory !== 'all') {
        params.append('categoria', currentFilters.selectedCategory)
      }
      
      if (currentFilters.selectedLevel !== 'all') {
        params.append('nivel', currentFilters.selectedLevel)
      }
      
      if (currentFilters.selectedEstiloAprendizagem !== 'all') {
        params.append('estilo', currentFilters.selectedEstiloAprendizagem)
      }

      const queryString = params.toString()
      const url = queryString ? `/api/catalogo?${queryString}` : '/api/catalogo'

      console.log("URL da requisição:", url)

      const response = await fetch(url, {
        cache: "no-store", // Alterado de "no-cache" para "no-store"
        headers: {
          'Content-Type': 'application/json',
        }
      })

      console.log("Response status:", response.status)
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log("Dados recebidos:", data.length, "cursos")
      
      // Mapear os dados corretamente - ajuste importante aqui
      const cursosMapeados = data.map((curso: any) => ({
        id: curso.id_curso || curso.id,
        id_curso: curso.id_curso,
        titulo: curso.titulo || '',
        descricao: curso.descricao || '',
        categoria: curso.categoria || '',
        nivel: curso.nivel || '',
        estiloAprendizagem: curso.estiloAprendizagem || curso.estilo_aprendizagem || '',
        alunos: curso.alunos || 0,
        avaliacao: curso.avaliacao || 0,
        reviews: curso.reviews || 0,
        tags: curso.tags || [],
        instrutor: {
          id: curso.instrutor?.id || curso.instrutor?.id_instrutor || 0,
          nome: curso.instrutor?.nome || 'Instrutor',
          avatar: curso.instrutor?.avatar || curso.instrutor?.foto || '',
          bio: curso.instrutor?.bio || ''
        },
        thumbnail: curso.thumbnail || `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/testeImagem.png`
      }))
      
      console.log("Cursos mapeados:", cursosMapeados)
      setCursos(cursosMapeados)
      
    } catch (error: any) {
      console.error("Erro ao carregar cursos:", error)
      setError(error.message || "Erro ao carregar cursos")
      setCursos([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Buscar dados quando os filtros mudarem
  useEffect(() => {
    // Limpar timeout anterior se existir
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Criar novo timeout para debounce
    const timer = setTimeout(() => {
      fetchCursos(filters)
    }, 500) // Aumentado para 500ms para evitar muitas requisições

    setSearchTimeout(timer)

    // Cleanup
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [filters, fetchCursos])

  // Aplicar ordenação localmente
  const filteredAndSortedCourses = useMemo(() => {
    console.log("Ordenando cursos, total:", cursos.length)
    
    let cursosOrdenados = [...cursos]
    
    switch (filters.sortBy) {
      case "popular":
        cursosOrdenados.sort((a, b) => (b.alunos ?? 0) - (a.alunos ?? 0))
        break
      case "rating":
        cursosOrdenados.sort((a, b) => (b.avaliacao ?? 0) - (a.avaliacao ?? 0))
        break
      case "newest":
        cursosOrdenados.sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        break
      default:
        break
    }
    
    return cursosOrdenados
  }, [filters.sortBy, cursos])

  const updateFilters = (newFilters: Partial<FiltrosCatalogo>) => {
    console.log("Atualizando filtros:", newFilters)
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      selectedCategory: "all",
      selectedLevel: "all",
      sortBy: "newest",
      selectedEstiloAprendizagem: "all"
    })
  }

  return {
    filters,
    cursos: filteredAndSortedCourses,
    updateFilters,
    resetFilters,
    isLoading,
    error
  }
}