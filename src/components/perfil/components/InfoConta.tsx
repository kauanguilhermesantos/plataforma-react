import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { Usuario } from "@/types/perfil"

interface InfoContaProps {
  usuario: Usuario
}

export function InfoConta({ usuario }: InfoContaProps) {
//   const getRoleLabel = (role: string) => {
//     const roles = {
//       student: "Estudante",
//       teacher: "Professor",
//       admin: "Administrador"
//     }
//     return roles[role as keyof typeof roles] || role
//   }

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informações da Conta</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">
            Membro desde: {formatJoinDate(usuario.joinDate)}
          </span>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Badge variant={
            usuario.role === "teacher" ? "default" : 
            usuario.role === "admin" ? "destructive" : "secondary"
          }>
            {getRoleLabel(usuario.role)}
          </Badge>
        </div> */}
      </div>
    </div>
  )
}