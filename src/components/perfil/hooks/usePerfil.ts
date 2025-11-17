import { use, useEffect, useState } from "react"
import { Usuario, Senha } from "@/types/perfil"
import { mockUsuario } from "@/data/mockUsuario"
import { get } from "http"

export function usePerfil() {
  const [isLoading, setIsLoading] = useState(false) // Estado de carregamento geral
  const [isLoadingUser, setIsLoadingUser] = useState(true) // Estado de carregamento dos dados do usuário
  const [isUploadindAvatar, setIsUploadingAvatar] = useState(false) // Estado de upload de avatar
  const [successMessage, setSuccessMessage] = useState("") // Mensagem de sucesso
  const [showDeleteDialog, setShowDeleteDialog] = useState(false) // Estado do diálogo de confirmação de exclusão
  const [showCurrentPassword, setShowCurrentPassword] = useState(false) // Estado de visibilidade da senha atual
  const [showNewPassword, setShowNewPassword] = useState(false) // Estado de visibilidade da nova senha

  // Dados do usuário
  const [userData, setUserData] = useState<Usuario>({
    id: 0,
    primeiroNome: "",
    ultimoNome: "",
    email: "",
    telefone: "",
    localizacao: "",
    dataNascimento: "",
    avatar: "",
    joinDate: "",
    estiloApredizagem: "",
    bio: "",
  })

  const [passwordData, setPasswordData] = useState<Senha>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Pegar token
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || sessionStorage.getItem("token")
    }
    return null
  }

  // Função de upload de avatar
  const handleAvatarUpload = async (file: File) => {
    try {
      console.log('🔄 Iniciando upload do avatar...', file.name)

      setIsUploadingAvatar(true);

      const token = getToken();

      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      // Configurar o FormData
      const formData = new FormData();
      formData.append("avatar", file);

      console.log('🌐 Fazendo requisição para /api/usuario/perfil...')

      const response = await fetch("/api/usuario/perfil", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('📡 Status da resposta:', response.status)
      console.log('📡 Response ok:', response.ok)

      if (!response.ok) {
        const data = await response.json();

        console.log('✅ Resposta da API:', data)

        await fetchUserData()

        // Atualizar os dados do usuário com o novo avatar
        setUserData((prevData) => ({
          ...prevData,
          avatar: data.avatar,
        }));

        setSuccessMessage("Avatar atualizado com sucesso!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {

        console.log('❌ Erro na resposta da API')

        const errorData = await response.json();

        console.log('❌ Detalhes do erro:', errorData)

        // alert("Erro ao fazer upload do avatar: " + errorData.error);
      }
    } catch (error) {
      console.error("Erro ao fazer upload do avatar:", error)
      alert("Erro ao fazer upload do avatar.")
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  const fetchUserData = async () => {
  try {
    const token = getToken()
    
    if (!token) {
      console.error("Token não encontrado")
      return
    }

    const response = await fetch("/api/usuario/perfil", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const userDataFromApi = await response.json()
      console.log('🔄 Dados atualizados do usuário:', userDataFromApi)
      setUserData(userDataFromApi)
    } else {
      console.error("Erro ao carregar dados do usuário")
    }
  } catch (error) {
    console.error("Erro na requisição:", error)
  }
}

  // Buscar dados do usuário logado
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        console.log("Buscando dados do usuário...")
        
        setIsLoadingUser(true);
        const token = getToken();

        console.log("Token encontrado:", token ? "Sim" : "Não");

        if (!token) {
          console.error("Token não encontrado");
          setIsLoadingUser(false);
          return;
        }

        console.log("Fazendo requisição para /api/usuario/perfil");

        const response = await fetch("/api/usuario/perfil", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Status da resposta:", response.status);
        console.log("Response Ok:", response.ok);

        if (response.ok) {
          const data = await response.json();

          console.log("Dados recebidos da API:", data);

          setUserData(data);
        } else if (response.status === 401) {
          console.error("Token inválido ou expirado");
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
        } else {
          console.error("Erro ao buscar dados do usuário:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        console.log("Finalizando busca de dados do usuário");
        setIsLoadingUser(false);
      }
    }
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   console.log("Dados do usuário carregados:", userData)
  // }, [userData])

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      const token = getToken();

      const response = await fetch("/api/usuario/perfil", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser)
        setSuccessMessage("Perfil atualizado com sucesso!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        const errorData = await response.json();
        console.error("Erro ao salvar perfil:", response.statusText)
      }
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
    isLoadingUser,
    isUploadindAvatar,
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
    handleAvatarUpload,
  }
}