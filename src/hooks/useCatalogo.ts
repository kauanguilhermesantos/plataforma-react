import { useState, useMemo, useEffect, useCallback } from 'react'
import { CursoCatalogo, FiltrosCatalogo } from '@/types/catalogo'
import { estiloInfo } from '@/data/mockLSQ' // Importar estiloInfo

interface UserProfile {
  estiloAprendizagem: string | null
  id: number
  primeiroNome: string
  ultimoNome: string
}

export function useCatalogo() {
  const [userProfile, setUserProfile] = useState<{
    data: UserProfile | null
    isLoading: boolean
  }>({
    data: null,
    isLoading: true
  })

  const [filters, setFilters] = useState<FiltrosCatalogo>({
    searchTerm: "",
    selectedCategory: "all",
    selectedLevel: "all",
    sortBy: "newest",
    selectedEstiloAprendizagem: "all"
  })

  const [cursos, setCursos] = useState<CursoCatalogo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
  const [autoFilterApplied, setAutoFilterApplied] = useState(false)

  // Função para normalizar estilo para minúsculas (como está no estiloInfo)
  const normalizarEstiloParaBusca = (estilo: string): string => {
    if (!estilo || estilo === 'all') return estilo
    
    return estilo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  // Função para capitalizar estilo para exibição (usando o nome do estiloInfo)
  const formatarEstiloParaExibicao = (estilo: string | null): string => {
    if (!estilo) return ''
    
    const estiloNormalizado = estilo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    
    // Buscar no estiloInfo para usar o nome formatado
    const info = estiloInfo[estiloNormalizado as keyof typeof estiloInfo]
    
    return info ? info.nome : estilo.charAt(0).toUpperCase() + estilo.slice(1).toLowerCase()
  }

  // Buscar informações do estilo para cores/ícones
  const getEstiloInfo = (estilo: string | null) => {
    if (!estilo) return null
    
    const estiloNormalizado = estilo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    
    return estiloInfo[estiloNormalizado as keyof typeof estiloInfo] || null
  }

  // Função para buscar perfil do usuário
  const fetchUserProfile = useCallback(async () => {
    try {
      console.log('Buscando perfil do usuário...')
      
      // Tenta buscar do localStorage primeiro (se você armazena o token lá)
      const token = localStorage.getItem('token')
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      // Se tiver token no localStorage, adiciona ao header
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      const response = await fetch('/api/usuario/perfil', {
        method: 'GET',
        credentials: 'include',
        headers
      })

      console.log('Status da resposta do perfil:', response.status)
      
      if (!response.ok) {
        // Se não estiver autenticado (401) ou outro erro, continua sem estilo
        console.log('Usuário não autenticado ou erro ao buscar perfil:', response.status)
        return null
      }

      const userData = await response.json()
      console.log('Perfil do usuário carregado:', {
        nome: `${userData.primeiroNome} ${userData.ultimoNome}`,
        estilo: userData.estiloAprendizagem
      })
      return userData
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      return null
    }
  }, [])

  // Função para buscar cursos com filtros
  const fetchCursos = useCallback(async (currentFilters: FiltrosCatalogo) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log("🎯 Buscando cursos com filtros:", currentFilters)

      // Construir query string com filtros normalizados
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
        const estiloNormalizado = normalizarEstiloParaBusca(currentFilters.selectedEstiloAprendizagem)
        params.append('estilo', estiloNormalizado)
        console.log("Usando filtro de estilo (normalizado):", estiloNormalizado)
      }

      const queryString = params.toString()
      const url = queryString ? `/api/catalogo?${queryString}` : '/api/catalogo'

      console.log("URL da requisição:", url)

      const response = await fetch(url, {
        cache: "no-store",
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
      
      // Mapear os dados corretamente
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
      
      setCursos(cursosMapeados)
      
    } catch (error: any) {
      console.error("Erro ao carregar cursos:", error)
      setError(error.message || "Erro ao carregar cursos")
      setCursos([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Buscar perfil do usuário ao montar o componente
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setUserProfile(prev => ({ ...prev, isLoading: true }))
        const userData = await fetchUserProfile()
        
        if (userData && userData.estiloAprendizagem) {
          const estiloFormatado = formatarEstiloParaExibicao(userData.estiloAprendizagem)
          const estiloInfoObj = getEstiloInfo(userData.estiloAprendizagem)
          
          console.log('🎭 Informações do estilo:', {
            original: userData.estiloAprendizagem,
            formatado: estiloFormatado,
            temInfo: !!estiloInfoObj
          })
          
          setUserProfile({
            data: {
              ...userData,
              estiloAprendizagem: estiloFormatado
            },
            isLoading: false
          })
          
          // Aplicar filtro automático se o usuário tiver estilo definido
          if (estiloFormatado && estiloFormatado !== 'all') {
            setFilters(prev => ({
              ...prev,
              selectedEstiloAprendizagem: estiloFormatado
            }))
            setAutoFilterApplied(true)
            console.log("Filtro automático aplicado para estilo:", estiloFormatado)
          } else {
            console.log("Usuário não tem estilo definido ou é 'all'")
            setUserProfile({
              data: userData,
              isLoading: false
            })
          }
        } else {
          console.log("Nenhum estilo de aprendizagem encontrado para o usuário")
          setUserProfile({
            data: userData,
            isLoading: false
          })
        }
      } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error)
        setUserProfile({
          data: null,
          isLoading: false
        })
      }
    }

    loadUserProfile()
  }, [fetchUserProfile])

  // Buscar cursos quando os filtros mudarem
  useEffect(() => {
    // Não buscar cursos enquanto estiver carregando o perfil do usuário
    if (userProfile.isLoading) {
      console.log("⏳ Aguardando carregamento do perfil do usuário...")
      return
    }

    // Limpar timeout anterior se existir
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Criar novo timeout para debounce
    const timer = setTimeout(() => {
      fetchCursos(filters)
    }, 300)

    setSearchTimeout(timer)

    // Cleanup
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [filters, userProfile.isLoading, fetchCursos])

  // Aplicar ordenação localmente
  const filteredAndSortedCourses = useMemo(() => {
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
    // Se o usuário mudar manualmente o filtro de estilo, removemos o "auto-filter"
    if (newFilters.selectedEstiloAprendizagem !== undefined) {
      const novoEstilo = newFilters.selectedEstiloAprendizagem
      const userEstilo = userProfile.data?.estiloAprendizagem
      
      // Se o usuário selecionar um estilo diferente do seu OU selecionar "all", remove auto-filter
      if (novoEstilo !== userEstilo || novoEstilo === 'all') {
        setAutoFilterApplied(false)
        console.log("❌ Filtro automático removido. Usuário alterou manualmente.")
      }
    }
    
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    const novoFiltros = {
      searchTerm: "",
      selectedCategory: "all",
      selectedLevel: "all",
      sortBy: "newest",
      selectedEstiloAprendizagem: "all"
    }
    
    // Se o usuário tem estilo definido, reaplicar o filtro automático
    if (userProfile.data?.estiloAprendizagem && userProfile.data.estiloAprendizagem !== 'all') {
      novoFiltros.selectedEstiloAprendizagem = userProfile.data.estiloAprendizagem
      setAutoFilterApplied(true)
      console.log("Filtro automático reaplicado após reset")
    } else {
      setAutoFilterApplied(false)
    }
    
    setFilters(novoFiltros)
  }

  const removeEstiloFilter = () => {
    setFilters(prev => ({ ...prev, selectedEstiloAprendizagem: "all" }))
    setAutoFilterApplied(false)
  }

  const reaplicarFiltroAutomatico = () => {
    if (userProfile.data?.estiloAprendizagem && userProfile.data.estiloAprendizagem !== 'all') {
      setFilters(prev => ({ 
        ...prev, 
        selectedEstiloAprendizagem: userProfile.data!.estiloAprendizagem ?? 'all'
      }))
      setAutoFilterApplied(true)
      console.log("Filtro automático reaplicado manualmente")
    }
  }

  // Função auxiliar para obter informações do estilo do usuário
  const getUserEstiloInfo = () => {
    if (!userProfile.data?.estiloAprendizagem) return null
    return getEstiloInfo(userProfile.data.estiloAprendizagem)
  }

  return {
    filters,
    cursos: filteredAndSortedCourses,
    updateFilters,
    resetFilters,
    removeEstiloFilter,
    reaplicarFiltroAutomatico,
    autoFilterApplied,
    userProfile: userProfile.data,
    userEstilo: userProfile.data?.estiloAprendizagem || null,
    userEstiloInfo: getUserEstiloInfo(),
    isLoading: isLoading || userProfile.isLoading,
    error
  }
}