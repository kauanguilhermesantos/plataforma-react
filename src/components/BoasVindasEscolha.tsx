"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ClipboardList, Zap, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function BoasVindasEscolha() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-full shadow-lg">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Bem-vindo à Koda!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Como você gostaria de começar sua jornada de aprendizado?
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Quiz Option */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 dark:hover:border-blue-600 cursor-pointer relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">Recomendado</Badge>
            </div>
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardList className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Responder Questionário</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Descubra seu estilo de aprendizagem único e receba recomendações personalizadas de cursos que se
                  adequam perfeitamente ao seu perfil.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  <span>Tempo estimado: 10-15 minutos</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  <span>80 perguntas para análise completa</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  <span>Experiência otimizada de aprendizado</span>
                </div>
              </div>

              <Button
                onClick={() => router.push("/lsq")}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                Começar Questionário
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Direct Access Option */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="bg-gradient-to-br from-gray-600 to-gray-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Acesso Direto</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Pule o questionário e comece a explorar a plataforma imediatamente. Você pode responder o questionário
                  depois no seu perfil.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mr-3" />
                  <span>Acesso instantâneo</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mr-3" />
                  <span>Explore todos os cursos disponíveis</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mr-3" />
                  <span>Faça o questionário quando quiser</span>
                </div>
              </div>

              <Button onClick={() => router.push("/home")} size="lg" variant="outline" className="w-full border-2">
                Ir para Plataforma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sua escolha não é permanente. Você pode alterar suas preferências a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  )
}
