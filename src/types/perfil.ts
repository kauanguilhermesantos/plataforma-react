export interface Usuario {
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

export interface SecurityTabProps {
  senha: Senha
  onPasswordDataChange: (data: Senha) => void
  isLoading: boolean
  onChangePassword: () => void
  onDeleteAccount: () => void
}