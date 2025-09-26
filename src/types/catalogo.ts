import { CursoCategoria, Instrutor, NivelCurso } from "./curso"

export interface CursoCatalogo {
  id: number
  titulo: string
  descricao?: string
  instrutor: Instrutor
  categoria: CursoCategoria
  nivel: NivelCurso
  duracao?: string
  alunos?: number
  avaliacao: number
  reviews?: number
  thumbnail: string
  tags?: string[]
  isPopular?: boolean
  isNew?: boolean
}

export interface CategoriaCatalogo {
  value: string
  label: string
  icon: React.ComponentType<any>
}

export interface FiltrosCatalogo {
  searchTerm: string
  selectedCategory: string
  selectedLevel: string
  sortBy: string
}