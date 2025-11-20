import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SecurityTabProps } from "@/types/perfil"
import { SenhaForm } from "./SenhaForm"
import { DangerZone } from "./DangerZone"

export function SecurityTab({
  senha,
  onPasswordDataChange,
  isLoading,
  onChangePassword,
  onDeleteAccount,
}: SecurityTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Mantenha sua conta segura com uma senha forte.</CardDescription>
        </CardHeader>
        <CardContent>
          <SenhaForm
            senha={senha}
            onPasswordDataChange={onPasswordDataChange}
            isLoading={isLoading}
            onChangePassword={onChangePassword}
          />
        </CardContent>
      </Card>

      <DangerZone isLoading={isLoading} onDeleteAccount={onDeleteAccount} />
    </div>
  )
}