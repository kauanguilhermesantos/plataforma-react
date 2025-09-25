import { CadastroForm } from "@/components/auth/CadastroForm"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold dark:text-blue-500">Koda</h1>
          <p className="text-gray-400">Plataforma Educacional de Programação</p>
        </div>

        {/* Card de Cadastro */}
        <Card className="shadow-lg border-0 dark:bg-gray-700 dark:border-gray-700">
          <CardContent className="p-6">
            <CadastroForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Koda. Transformando o ensino de programação.</p>
        </div>
      </div>
    </div>
  )
}
