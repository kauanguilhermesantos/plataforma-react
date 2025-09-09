export type NivelCurso = "Iniciante" | "Intermediário" | "Avançado";
export type EstiloAprendizagem = "Pragmático" | "Teórico" | "Ativista" | "Reflexivo";
export type TipoAula = "video" | "text" | "quiz";
export type TipoRecurso = "pdf";

export interface Aula {
  id: number;
  titulo: string;
  duracao: string;
  tipo: TipoAula;
  videoUrl?: string;
  descricao?: string;
  videoArquivo?: File;
  videoPreview?: string;
  isUploading?: boolean;
}

export interface Modulo {
  id: number;
  titulo: string;
  descricao: string;
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
  avatar: string;
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  thumbnail: string;
  categoria: string;
  nivel: NivelCurso;
  estiloAprendizagem: EstiloAprendizagem;
  tags: string[];
  instrutor: Instrutor;
  modulos: Modulo[];
  recursos: Recurso[];
  isPublished: boolean;
  alunos: number;
  avaliacao: number;
  reviews: number;
}

export interface EditorCursoProps {
  cursoId?: string;
}