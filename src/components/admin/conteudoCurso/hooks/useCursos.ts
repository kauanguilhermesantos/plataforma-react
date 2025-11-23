import { useState, useMemo, useEffect } from 'react'
import { Curso, CursoStats, NivelCurso, CursoStatus } from '@/types/curso'

// Função para converter os dados da API em objetos Curso
function mapApiDataToCurso(data: any): Curso {
  return {
    id: data.id,
    titulo: data.titulo,
    descricao: data.descricao,
    thumbnail: data.thumbnail,
    categoria: data.categoria,
    nivel: data.nivel,
    status: data.status,
    estiloAprendizagem: data.estiloAprendizagem,
    tags: data.tags,
    instrutor: data.instrutor,
    modulos: data.modulos,
    // recursos: data.recursos,
    alunos: data.alunos,
    avaliacao: data.avaliacao
  }
}

// Função para mapear nível do banco de dados para o tipo CursoNivel
function mapNivel(nivel: string): NivelCurso {
  switch (nivel?.toLowerCase()) {
    case 'iniciante':
      return 'Iniciante'
    case 'intermediario':
      return 'Intermediário'
    default:
      return 'Avançado'
  }
}

// Mapear status do banco para o tipo CursoStatus
function mapStatus(status: string): CursoStatus {
  switch (status?.toUpperCase()) {
    case 'publicado':
    case 'Publicado':
      return 'Publicado'
    case 'rascunho':
    case 'Rascunho':
      return 'Rascunho'
    default:
      return 'Arquivado'
  }
}

// Mapear categoria do banco para string
function mapCategoria(categoria: string): string {
  switch (categoria?.toLowerCase()) {
    case 'programacao':
      return 'Programação'
    case 'data-science':
      return 'Data Science'
    case 'design':
      return 'Design'
    case 'mobile':
      return 'Mobile'
    case 'web':
      return ' Desenvolvimento Web'
    case 'banco-de-dados':
      return 'Banco de Dados'
    case 'devops':
      return 'DevOps'
    default:
      return 'Outros'
  }
}

function mapEstilo(estilo: string): string {
  switch (estilo?.toLowerCase()) {
    case 'pragmatico':
      return 'Pragmático'
    case 'teorico':
      return 'Teórico'
    case 'ativista':
      return 'Ativista'
    case 'reflexivo':
      return 'Reflexivo'
    default:
      return 'Não definido'
  }
}

export function useCursos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedEstilo, setSelectedEstilo] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<Curso | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cursos, setCursos] = useState<Curso[]>([])

  // Buscar cursos do banco de dados
  useEffect(() => {
    const fetchCursos = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/admin/curso/buscarCursos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setCursos(data)
        } else {
          console.error('Erro ao buscar cursos:', response.statusText)
        }
      } catch (error) {
        console.error('Erro ao buscar cursos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCursos()
  }, [])

  const stats: CursoStats = useMemo(() => {
    const cursosPublicados = cursos.filter((c) => c.status === "Publicado").length
    const cursosRascunho = cursos.filter((c) => c.status === "Rascunho").length
    const cursosArquivados = cursos.filter((c) => c.status === "Arquivado").length
    const totalEstudantes = cursos.reduce((acc, curso) => acc + curso.alunos, 0)
    const cursosComAvaliacao = cursos.filter((c) => c.avaliacao > 0)
    const mediaAvaliacao = cursosComAvaliacao.length > 0 
      ? cursosComAvaliacao.reduce((acc, curso) => acc + curso.avaliacao, 0) / cursosComAvaliacao.length
      : 0

    return {
      totalCursos: cursos.length,
      cursosPublicados,
      cursosRascunho,
      cursosArquivados,
      totalEstudantes,
      mediaAvaliacao,
    }
  }, [cursos])

  const cursosFiltrados = useMemo(() => {
    if (!cursos || cursos.length === 0) return []
  
      return cursos.filter((curso) => {
        const matchesSearch =
          curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          curso.instrutor.nome.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || curso.categoria === selectedCategory
        const matchesStatus = selectedStatus === "all" || curso.status === selectedStatus
        const matchesEstilo = selectedEstilo === "all" || curso.estiloAprendizagem === selectedEstilo
        return matchesSearch && matchesCategory && matchesStatus && matchesEstilo
      })
    }, [searchTerm, selectedCategory, selectedStatus, selectedEstilo, cursos]
  )

  const handleDeleteCurso = (curso: Curso) => {
    setSelectedCourse(curso)
    setIsDeleteDialogOpen(true)
  }

  const handlePublishCurso = async (curso: Curso) => {
    try {
      const response = await fetch(`/api/admin/curso/${curso.id}/publicarCurso`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        // Atualizar a lista de cursos
        const cursoAtualizado = await response.json()

        // Cria um novo array com o curso atualizado
        const cursosAtualizados = cursos.map(c => 
          c.id === curso.id ? {
            ...mapApiDataToCurso(cursoAtualizado),
            id: curso.id // manter o id original
          } : c
        )
        setCursos(cursosAtualizados)
      } else {
        console.error('Erro ao publicar curso')
      }
    } catch (error) {
      console.error("Erro ao publicar curso:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArchiveCurso = async (curso: Curso) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/curso/${curso.id}/arquivarCurso`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        // Atualizar a lista de cursos
        const cursoAtualizado = await response.json()
        
        // Cria um novo array com o curso atualizado
        const cursosAtualizados = cursos.map(c => 
          c.id === curso.id ? {
            ...mapApiDataToCurso(cursoAtualizado),
            id: curso.id // manter o id original
          } : c
        )
        setCursos(cursosAtualizados)
      } else {
        console.error('Erro ao arquivar curso')
      }
    } catch (error) {
      console.error("Erro ao arquivar curso:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para obter a classe de badge com base no status do curso
  const getStatusBadge = (status: CursoStatus) => {
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

  // Função para obter a classe de badge com base no nível do curso
  const getNivelBadge = (nivel: NivelCurso) => {
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

  const getEstiloBadge = (estilo: string) => {
    switch (estilo) {
      case "Pragmático":
        return "text-blue-600 border-blue-600"
      case "Teórico":
        return "text-purple-600 border-purple-600"
      case "Ativista":
        return "text-red-600 border-red-600"
      case "Reflexivo":
        return "text-green-600 border-green-600"
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
    selectedEstilo,
    setSelectedEstilo,
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
    getNivelBadge,
    getEstiloBadge,
    mapNivel,
    mapStatus,
    mapCategoria,
    mapEstilo
  }
}