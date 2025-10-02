export type EstiloAprendizagem = "ativista" | "reflexivo" | "teorico" | "pragmatico"

export interface PerguntaLSQ {
  id: number
  texto: string
  categoria: EstiloAprendizagem
}

export interface Respostas {
  [key: number]: boolean | null
}

export interface Resultados {
  ativista: number
  reflexivo: number
  teorico: number
  pragmatico: number
}

export interface EstiloInfo {
  nome: string
  color: string
  borderColor?: string
  textColor?: string
  bgColor?: string
  icon: React.ComponentType<any>
  descricao: string
  caracteristicas: string[]
}

export interface LSQProps {
  onComplete?: (resultados: Resultados) => void
  onCancel?: () => void
}
