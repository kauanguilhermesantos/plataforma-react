import { useState } from "react"
import { Usuario, Senha } from "@/types/perfil"
import { mockUsuario } from "@/data/mockUsuario"

export function usePerfil() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [userData, setUserData] = useState<Usuario>({
    ...mockUsuario
  })

  const [passwordData, setPasswordData] = useState<Senha>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccessMessage("Perfil atualizado com sucesso!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Erro ao salvar perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccessMessage("Senha alterada com sucesso!")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Erro ao alterar senha:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.href = "/login"
    } catch (error) {
      console.error("Erro ao deletar conta:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    successMessage,
    showDeleteDialog,
    showCurrentPassword,
    showNewPassword,
    userData,
    passwordData,
    setUserData,
    setPasswordData,
    setShowDeleteDialog,
    setShowCurrentPassword,
    setShowNewPassword,
    handleSaveProfile,
    handleChangePassword,
    handleDeleteAccount,
  }
}