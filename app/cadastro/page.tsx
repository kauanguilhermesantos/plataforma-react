import { RegisterForm } from "@/components/register-form"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Botão Voltar */}
        <Link href="/login">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao login
          </Button>
        </Link>

        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Koda</h1>
          <p className="text-gray-600">Comece sua jornada na programação</p>
        </div>

        {/* Card de Cadastro */}
        <Card className="shadow-lg border-0 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <RegisterForm />
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
