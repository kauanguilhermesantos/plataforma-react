import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, XCircle } from "lucide-react"
import { Senha } from "@/types/perfil"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { PasswordStrength } from "@/components/auth/PasswordStrength"

interface SenhaFormProps {
  senha: Senha
  onPasswordDataChange: (data: Senha) => void
  isLoading: boolean
  onChangePassword: () => void
}

export function SenhaForm({ senha, onPasswordDataChange, isLoading, onChangePassword }: SenhaFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (field: keyof Senha, value: string) => {
    onPasswordDataChange({
      ...senha,
      [field]: value,
    })
  }

  // Validações Visuais
  const passwordsMatch = senha.newPassword === senha.confirmPassword

  // Validações específicas para os requisitos
  const hasMinLength = senha.newPassword.length >= 8
  const hasLowerCase = /[a-z]/.test(senha.newPassword)
  const hasUpperCase = /[A-Z]/.test(senha.newPassword)
  const hasNumber = /\d/.test(senha.newPassword)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha.newPassword)
  
  const isNewPasswordValid = hasMinLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar
  
  const isFormValid = senha.currentPassword && 
                     senha.newPassword && 
                     senha.confirmPassword && 
                     passwordsMatch && 
                     isNewPasswordValid

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* Senha Atual */}
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
        {/* Nova Senha */}
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

        {/* Componente de força da senha */}
        {senha.newPassword && (
          <PasswordStrength password={senha.newPassword} />
        )}
      </div>

      {/* Confirmação de senha */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={senha.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            placeholder="Confirme sua nova senha"
          />
          <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
        </div>
      </div>

      {/* Validação de confirmação */}
        {senha.confirmPassword && (
          <div className={`flex items-center space-x-2 text-sm ${
            passwordsMatch ? 'text-green-600' : 'text-red-600'
          }`}>
            {passwordsMatch ? 
              <CheckCircle className="h-4 w-4" /> : 
              <XCircle className="h-4 w-4" />
            }
            <span>{passwordsMatch ? 'Senhas coincidem' : 'Senhas não coincidem'}</span>
          </div>
        )}

      <Button onClick={onChangePassword} disabled={isLoading || !isFormValid}>
        <Shield className="mr-2 h-4 w-4" />
        {isLoading ? "Alterando..." : "Alterar Senha"}
      </Button>

      {!isFormValid && senha.newPassword && (
        <p className="text-sm text-orange-600">
          Preencha todos os campos corretamente para alterar a senha
        </p>
      )}
    </div>
  )
}