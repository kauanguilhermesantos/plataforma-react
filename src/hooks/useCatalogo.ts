import { useState, useMemo, useEffect, useCallback } from 'react'
import { CursoCatalogo, FiltrosCatalogo } from '@/types/catalogo'

export function useCatalogo() {
  const [filters, setFilters] = useState<FiltrosCatalogo>({
    searchTerm: "",
    selectedCategory: "all",
    selectedLevel: "all",
    sortBy: "popular",
    selectedEstiloAprendizagem: "all"
  })

  const [cursos, setCursos] = useState<CursoCatalogo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar cursos com filtros
  const fetchCursos = useCallback(async (filtrosAtuais: FiltrosCatalogo) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log("Buscando cursos com filtros:", filtrosAtuais)

      // Construir query string com filtros
      const params = new URLSearchParams()
      
      if (filtrosAtuais.searchTerm) {
        params.append('search', filtrosAtuais.searchTerm)
      }
      
      if (filtrosAtuais.selectedCategory !== 'all') {
        params.append('categoria', filtrosAtuais.selectedCategory)
      }
      
      if (filtrosAtuais.selectedLevel !== 'all') {
        params.append('nivel', filtrosAtuais.selectedLevel)
      }
      
      if (filtrosAtuais.selectedEstiloAprendizagem !== 'all') {
        params.append('estilo', filtrosAtuais.selectedEstiloAprendizagem)
      }

      const queryString = params.toString()
      const url = queryString ? `/api/catalogo?${queryString}` : '/api/catalogo'

      console.log("URL da requisição:", url)

      const response = await fetch(url, {
        cache: "no-cache",
        headers: {
          'Content-Type': 'application/json',
        }
      })

      console.log("Response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erro na resposta:", errorText)
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log("Dados recebidos:", data.length, "cursos")
      
      // Mapear os dados corretamente
      const cursosMapeados = data.map((curso: any) => ({
        id: curso.id_curso || curso.id,
        id_curso: curso.id_curso,
        titulo: curso.titulo || '',
        descricao: curso.descricao || '',
        categoria: curso.categoria || '',
        nivel: curso.nivel || '',
        estiloAprendizagem: curso.estiloAprendizagem || '',
        alunos: curso.alunos || 0,
        avaliacao: curso.avaliacao || 0,
        reviews: curso.reviews || 0,
        tags: curso.tags || [],
        instrutor: {
          id: curso.instrutor?.id || curso.instrutor?.id_instrutor || 0,
          nome: curso.instrutor?.nome || 'Instrutor',
          avatar: curso.instrutor?.avatar || '',
          bio: curso.instrutor?.bio || ''
        },
        thumbnail: curso.thumbnail || `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/testeImagem.png`
      }))
      
      console.log("Cursos mapeados:", cursosMapeados)
      setCursos(cursosMapeados)
      
    } catch (error: any) {
      console.error("Erro ao carregar cursos:", error)
      setError(error.message)
      setCursos([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Buscar dados do banco de dados quando os filtros mudarem
  useEffect(() => {
    // Debounce para pesquisa (aguarda 300ms após última digitação)
    const timer = setTimeout(() => {
      fetchCursos(filters)
    }, 300) // Aguarda 300ms para evitar muitas requisições

    return () => clearTimeout(timer)
  }, [filters, fetchCursos])

  // Aplicar ordenação localmente (ou você pode mover para o backend)
  const filteredAndSortedCourses = useMemo(() => {
    console.log("Ordenando cursos, total:", cursos.length)
    
    return [...cursos].sort((a, b) => {
      switch (filters.sortBy) {
        case "popular":
          return ((b.alunos ?? 0) - (a.alunos ?? 0))
        case "rating":
          return (b.avaliacao ?? 0) - (a.avaliacao ?? 0)
        case "newest":
          return (b.id ?? 0) - (a.id ?? 0)
        default:
          return 0
      }
    })
  }, [filters.sortBy, cursos])

  const updateFilters = (newFilters: Partial<FiltrosCatalogo>) => {
    console.log("Atualizando filtros:", newFilters)
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    filters,
    cursos: filteredAndSortedCourses,
    updateFilters,
    isLoading,
    error
  }
}