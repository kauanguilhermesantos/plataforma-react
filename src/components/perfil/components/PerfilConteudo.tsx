"use client"

import { PerfilConteudoProps } from "@/types/perfil"
import { usePerfil } from "@/components/perfil/hooks/usePerfil"
import { PerfilHeader } from "./PerfilHeader"
import { PerfilTab } from "./PerfilTab"
import { SecurityTab } from "./SecurityTab"
import { SuccessAlert } from "@/components/shared/SuccessAlert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LsqTab } from "./LsqTab"
import { Skeleton } from "@/components/ui/skeleton"

export function PerfilConteudo({ usuarioId }: PerfilConteudoProps) {
  const {
    isLoading,
    isLoadingUser,
    successMessage,
    userData,
    passwordData,
    setUserData,
    setPasswordData,
    handleSaveProfile,
    handleChangePassword,
    handleDeleteAccount,
  } = usePerfil()

  if (isLoadingUser) {
    return (
      <div className="space-y-6">
        <PerfilHeader 
          titulo="Meu Perfil" 
          descricao="Gerencie suas informações pessoais e configurações da conta" 
        />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PerfilHeader 
        titulo="Meu Perfil" 
        descricao="Gerencie suas informações pessoais e configurações da conta" 
      />

      {successMessage && <SuccessAlert message={successMessage} />}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="estiloAprendizagem">Estilo de Aprendizagem</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <PerfilTab
            usuario={userData}
            onUserDataChange={setUserData}
            isLoading={isLoading}
            onSave={handleSaveProfile}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab
            senha={passwordData}
            onPasswordDataChange={setPasswordData}
            isLoading={isLoading}
            onChangePassword={handleChangePassword}
            onDeleteAccount={handleDeleteAccount}
          />
        </TabsContent>

        <TabsContent value="estiloAprendizagem">
          <LsqTab usuario={userData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}