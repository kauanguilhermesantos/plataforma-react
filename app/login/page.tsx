import { LoginForm } from "../../components/login-form"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            {/* <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div> */}
          </div>
          <h1 className="text-3xl font-bold text-blue-600">Koda</h1>
          <p className="text-gray-300">Plataforma Educacional de Programação</p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-lg border-0 dark:bg-gray-400 dark:border-gray-300">
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Koda. Transformando o ensino de programação.</p>
        </div>
      </div>
    </div>
  )
}
