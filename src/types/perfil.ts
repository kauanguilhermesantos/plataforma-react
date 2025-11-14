export interface Usuario {
  id: number
  primeiroNome: string
  ultimoNome: string
  email: string
  telefone: string
  bio: string
  localizacao: string
  dataNascimento: string
//   role: string
  avatar: string
  joinDate: string
  estiloApredizagem: string
  estiloApredizagemScores?: {
    ativista: number
    reflexivo: number
    teorico: number
    pragmatico: number
  }
}

export interface Senha {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface PerfilConteudoProps {
  usuarioId?: string
}

export interface PerfilTabProps {
  usuario: Usuario
  onUserDataChange: (data: Usuario) => void
  isLoading: boolean
  onSave: () => void
}

export interface LsqTabProps {
    usuario: Usuario
}

export interface SecurityTabProps {
  senha: Senha
  onPasswordDataChange: (data: Senha) => void
  isLoading: boolean
  onChangePassword: () => void
  onDeleteAccount: () => void
}