import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { Senha } from "@/types/perfil"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface SenhaFormProps {
  senha: Senha
  onPasswordDataChange: (data: Senha) => void
  isLoading: boolean
  onChangePassword: () => void
}

export function SenhaForm({ senha, onPasswordDataChange, isLoading, onChangePassword }: SenhaFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleChange = (field: keyof Senha, value: string) => {
    onPasswordDataChange({
      ...senha,
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Senha Atual</Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            value={senha.currentPassword}
            onChange={(e) => handleChange("currentPassword", e.target.value)}
            placeholder="Digite sua senha atual"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova Senha</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={senha.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            placeholder="Digite sua nova senha"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={senha.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="Confirme sua nova senha"
        />
      </div>

      <Button onClick={onChangePassword} disabled={isLoading}>
        <Shield className="mr-2 h-4 w-4" />
        {isLoading ? "Alterando..." : "Alterar Senha"}
      </Button>
    </div>
  )
}