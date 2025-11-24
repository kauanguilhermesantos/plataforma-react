export type NivelCurso = "Iniciante" | "Intermediário" | "Avançado";
export type EstiloAprendizagem = "Pragmático" | "Teórico" | "Ativista" | "Reflexivo";
export type TipoAula = "video" | "text" | "quiz";
export type TipoRecurso = "pdf";
export type CursoCategoria = "Programação" | "Data Science" | "Design" | "Mobile" | "Web" | "Banco de Dados" | "DevOps";
export type CursoStatus = "Rascunho" | "Publicado" | "Arquivado";

export interface Aula {
  id: number;
  titulo: string;
  duracao: number;
  descricao?: string;
  status?: string;
  tipo?: TipoAula;
  ordem?: number;
  videoUrl?: string | null;
  videoArquivo?: string;
  videoPreview?: string;
  isUploading?: boolean;
  concluida?: boolean;
}

export interface ProximaAula {
  titulo: string
  duracao: string
}

export interface Modulo {
  id: number;
  titulo: string;
  descricao?: string;
  ordem?: number;
  aulas: Aula[];
  concluida?: number;
  total?:number;
  status?: string
}

export interface Recurso {
  id: number;
  titulo: string;
  tipo: TipoRecurso;
  url: string;
  arquivo?: File;
  isUploading?: boolean;
}

export interface Instrutor {
  id: number
  nome: string;
  bio: string;
  avatar?: string;
  foto?: string | null;
  fotoPreview?: string;
}

export interface Curso {
  id: number;
  titulo: string;
  descricao?: string;
  thumbnail: string;
  categoria: CursoCategoria;
  nivel: NivelCurso;
  status: CursoStatus;
  estiloAprendizagem: EstiloAprendizagem;
  tags: string[];
  instrutor: Instrutor;
  modulos: Modulo[];
  recursos: Recurso[];
  isPublished: boolean;
  alunos: number;
  avaliacao: number;
  reviews?: number;
  dataCriacao?: string;
  ultimoUpdate?: string;
  duracaoTotal?: string;
  progresso?: number;
  proximaAula?: ProximaAula
  totalAulas?: number
  aulasCompletadas?: number
  isFavorite?: boolean
  isCompleted?: boolean
  dataInscricao?: string
  ultimoAcesso?: string
}

export interface CursoFormData {
  titulo: string;
  descricao: string;
  categoria: CursoCategoria | "";
  nivel: NivelCurso | "";
  estiloAprendizagem: EstiloAprendizagem | "";
  status?: CursoStatus | "";
  thumbnail?: string | null;
  thumbnailPreview?: string | null;
  tags: string[];
  instrutor: Instrutor;
  modulos: Modulo[];
}

export interface CursoStats {
  totalCursos: number
  cursosPublicados: number
  cursosRascunho: number
  cursosArquivados: number
  totalEstudantes: number
  mediaAvaliacao: number
}

export interface EditorCursoProps {
  cursoId?: string;
}

export interface UsuarioStats {
  totalCursos: number
  cursosCompletados: number
  cursosEmProgresso: number
  totalHoras: number
  certificados: number
}

export interface Filtros {
  searchTerm: string
  selectedCategory: string
  sortBy: string
}

export interface UnenrollDialogState {
  isOpen: boolean
  curso: Curso | null
}

export interface MeusCursosConteudoProps {
  usuarioId?: string
}