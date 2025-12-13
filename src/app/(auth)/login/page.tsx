import { LoginForm } from "@/components/auth/LoginForm"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-500">
            <Link href={"/"}>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Koda
              </span>
            </Link>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Plataforma Educacional de Programação</p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-lg border-0 dark:bg-gray-700 dark:border-gray-700">
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 Koda. Transformando o ensino de programação.</p>
        </div>
      </div>
    </div>
  )
}
