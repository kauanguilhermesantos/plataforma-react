"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PasswordStrength } from "@/components/auth/PasswordStrength"
import { FcGoogle } from "react-icons/fc"

interface FormData {
  nome: string
  sobrenome: string
  email: string
  senha: string
  confirmaSenha: string
  aceitar_termos: boolean
}

export function CadastroForm() {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    aceitar_termos: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Limpa o erro quando o usuário começa a digitar
    if (error) setError("")
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
    if (error) setError("")
  }

  const validateForm = (): string | null => {
    if (!formData.nome.trim()) return "Nome é obrigatório"
    if (!formData.sobrenome.trim()) return "Sobrenome é obrigatório"
    if (!formData.email) return "Email é obrigatório"
    if (!isValidEmail(formData.email)) return "Email inválido"
    if (!formData.senha) return "Senha é obrigatória"
    if (formData.senha.length < 6) return "Senha deve ter pelo menos 6 caracteres"
    if (formData.senha !== formData.confirmaSenha) return "Senhas não coincidem"
    // if (!formData.role) return "Selecione seu perfil"
    if (!formData.aceitar_termos) return "Você deve aceitar os termos de uso"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const validationError = validateForm()
      if (validationError) {
        throw new Error(validationError)
      }

      // Chama a API de registro
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify({
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
          senha: formData.senha,
          aceitar_termos: formData.aceitar_termos,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta")
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = async () => {
    setIsLoading(true)
    try {
      // Simula registro social
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
    } catch (err) {
      setError("Erro ao criar conta com Google")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Conta criada com sucesso!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Bem-vindo(a) à Koda, <strong>{formData.nome}</strong>!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enviamos um email de confirmação para <strong>{formData.email}</strong>
          </p>
        </div>
        <div className="space-y-3">
          <Link href="/login" className="block">
            <Button className="w-full">Fazer Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Criar sua conta</h2>
        <p className="text-gray-600 dark:text-gray-300">Junte-se à comunidade Koda</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 dark:text-red-600" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome e Sobrenome */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              name="nome"
              type="text"
              placeholder="João"
              value={formData.nome}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="border-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sobrenome">Sobrenome *</Label>
            <Input
              id="sobrenome"
              name="sobrenome"
              type="text"
              placeholder="Silva"
              value={formData.sobrenome}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="border-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="joao@email.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            className="border-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Senha */}
        <div className="space-y-2">
          <Label htmlFor="password">Senha *</Label>
          <div className="relative">
            <Input
              id="senha"
              name="senha"
              type={mostrarSenha ? "text" : "senha"}
              placeholder="Mínimo 6 caracteres"
              value={formData.senha}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="border-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              disabled={isLoading}
            >
              {mostrarSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{mostrarSenha ? "Ocultar senha" : "Mostrar senha"}</span>
            </Button>
          </div>
            <PasswordStrength password={formData.senha} />
        </div>

        {/* Confirmar Senha */}
        <div className="space-y-2">
          <Label htmlFor="confirmaSenha">Confirmar Senha *</Label>
          <div className="relative">
            <Input
              id="confirmaSenha"
              name="confirmaSenha"
              type={mostrarConfirmaSenha ? "text" : "password"}
              placeholder="Digite a senha novamente"
              value={formData.confirmaSenha}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="border-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setMostrarConfirmaSenha(!mostrarConfirmaSenha)}
              disabled={isLoading}
            >
              {mostrarConfirmaSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Termos de Uso */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="aceitar_termos"
            name="aceitar_termos"
            checked={formData.aceitar_termos}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, aceitar_termos: checked as boolean }))}
            disabled={isLoading}
          />
          <Label htmlFor="aceitar_termos" className="text-sm">
            Aceito os{" "}
            <Link href="/#" className="text-blue-500 hover:text-blue-400 hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/#" className="text-blue-500 hover:text-blue-400 hover:underline">
              Política de Privacidade
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-300">Ou</span>
        </div>
      </div>

      <Button onClick={handleSocialRegister} disabled={isLoading} className="w-full bg-slate-600 hover:bg-slate-500 dark:bg-slate-300 dark:hover:bg-slate-200">
        <FcGoogle />
        Continuar com Google
      </Button>

      <div className="text-center text-sm">
        <span className="text-gray-600 dark:text-gray-300">Já tem uma conta? </span>
        <Link href="/login" className="text-blue-500 hover:text-blue-400 hover:underline font-medium">
          Faça login
        </Link>
      </div>
    </div>
  )
}

// Funções utilitárias
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function simulateRegister(userData: FormData) {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simula verificação de email existente
  if (userData.email === "admin@koda.com") {
    throw new Error("Este email já está em uso")
  }

  return {
    success: true,
    user: {
      id: Math.random().toString(36).substr(2, 9),
      nome: userData.nome,
      sobrenome: userData.sobrenome,
      email: userData.email,
    },
  }
}
