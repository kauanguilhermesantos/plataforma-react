export type NivelCurso = "Iniciante" | "Intermediário" | "Avançado";
export type EstiloAprendizagem = "Pragmático" | "Teórico" | "Ativista" | "Reflexivo";
export type TipoAula = "video" | "text" | "quiz";
export type TipoRecurso = "pdf";
export type CursoCategoria = "Programação" | "Data-Science" | "Design" | "Mobile" | "Web";
export type CursoStatus = "Rascunho" | "Publicado" | "Arquivado";

export interface Aula {
  id: number;
  titulo: string;
  duracao: string;
  tipo: TipoAula;
  videoUrl?: string;
  descricao?: string;
  videoArquivo?: string;
  videoPreview?: string;
  isUploading?: boolean;
}

export interface Modulo {
  id: number;
  titulo: string;
  descricao?: string;
  aulas: Aula[];
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
  nome: string;
  bio: string;
  avatar?: string;
  foto?: string;
  fotoPreview?: string;
}

export interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  thumbnail: string;
  categoria: string;
  nivel: NivelCurso;
  status: CursoStatus;
  estiloAprendizagem: EstiloAprendizagem;
  tags: string[];
  instrutor: Instrutor;
  modulos: Modulo[];
  recursos: Recurso[];
  // isPublished: boolean;
  alunos: number;
  avaliacao: number;
  reviews: number;
  dataCriacao: string;
  ultimoUpdate: string;
}

export interface CursoFormData {
  titulo: string;
  descricao: string;
  categoria: CursoCategoria | "";
  nivel: NivelCurso | "";
  estiloAprendizagem: EstiloAprendizagem | "";
  thumbnail: string;
  thumbnailPreview?: string;
  tags: string[];
  instrutor: Instrutor;
  modulos: Modulo[];
}

export interface CursoStats {
  totalCursos: number
  cursosPublicados: number
  cursosRascunho: number
  totalEstudantes: number
  mediaAvaliacao: number
}

export interface EditorCursoProps {
  cursoId?: string;
}