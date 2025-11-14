import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PerfilTabProps } from "@/types/perfil"
import { AvatarSection } from "./AvatarSection"
import { InfoPessoalForm } from "./InfoPessoalForm"
import { InfoConta } from "./InfoConta"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useEffect } from "react"

export function PerfilTab({ usuario, onUserDataChange, isLoading, onSave }: PerfilTabProps) {
  const handleAvatarChange = () => {
    // Simula upload de avatar
    console.log("Iniciar upload de avatar")
  }

  useEffect(() => {
    console.log("Dados do usuário atualizados:", usuario)
  }, [usuario])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Atualize suas informações básicas e foto de perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <AvatarSection
          avatar={usuario.avatar}
          primeiroNome={usuario.primeiroNome}
          ultimoNome={usuario.ultimoNome}
          onAvatarChange={handleAvatarChange}
        /> */}

        <Separator />

        <InfoPessoalForm usuario={usuario} onUserDataChange={onUserDataChange} />

        <Separator />

        <InfoConta usuario={usuario} />

        <div className="flex justify-end">
          <Button onClick={onSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}