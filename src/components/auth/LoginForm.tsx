"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpa o erro quando o usuário começa a digitar
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validação básica
      if (!formData.email || !formData.password) {
        throw new Error("Por favor, preencha todos os campos")
      }

      if (!isValidEmail(formData.email)) {
        throw new Error("Por favor, insira um email válido")
      }

      // Simula chamada de API
      await simulateLogin(formData)

      // Redirecionar para dashboard (simulado)
      console.log("Login realizado com sucesso!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      // Simula login social
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Login com ${provider} realizado!`)
    } catch (err) {
      setError(`Erro ao fazer login com ${provider}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Entrar na sua conta</h2>
        <p className="text-gray-600 dark:text-gray-300">Continue sua jornada de aprendizado</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 dark:text-red-600" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            className="border-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={formData.password}
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
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Ocultar senha" : "Mostrar senha"}</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link href="#" className="text-sm text-blue-500 hover:text-blue-400 hover:underline">
            Esqueceu a senha?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-300">Ou continue com</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={() => handleSocialLogin("Google")} disabled={isLoading} className="w-full bg-slate-600 hover:bg-slate-500 dark:bg-slate-300 dark:hover:bg-slate-200">
          <FcGoogle />
          Google
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-gray-600 dark:text-gray-300">Não tem uma conta? </span>
        <Link href="/cadastro" className="text-blue-500 hover:text-blue-400 hover:underline font-medium">
          Cadastre-se gratuitamente
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

async function simulateLogin(credentials: { email: string; password: string }) {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simula validação de credenciais
  if (credentials.email === "admin@koda.com" && credentials.password === "123456") {
    return { success: true, user: { email: credentials.email, name: "Admin" } }
  }

  throw new Error("Email ou senha incorretos")
}
