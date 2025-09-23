import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

interface AvatarSectionProps {
  avatar: string
  primeiroNome: string
  ultimoNome: string
  onAvatarChange: () => void
}

export function AvatarSection({ avatar, primeiroNome, ultimoNome, onAvatarChange }: AvatarSectionProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatar || "/placeholder.svg"} alt={primeiroNome} />
        <AvatarFallback className="text-lg">
          {primeiroNome[0]}
          {ultimoNome[0]}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <Button variant="outline" size="sm" onClick={onAvatarChange}>
          <Camera className="mr-2 h-4 w-4" />
          Alterar Foto
        </Button>
        <p className="text-sm text-gray-500">JPG, PNG ou GIF. Máximo 2MB.</p>
      </div>
    </div>
  )
}