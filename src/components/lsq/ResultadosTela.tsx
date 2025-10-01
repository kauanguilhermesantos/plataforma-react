import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Resultados, EstiloAprendizagem, EstiloInfo } from "@/types/perguntaLSQ"
import { EstiloCard } from "./EstiloCard"
import { ScoreBar } from "./ScoreBar"

interface ResultadosTelaProps {
  resultados: Resultados
  estiloDominante: EstiloAprendizagem
  estiloInfo: Record<string, EstiloInfo>
  getStyleLevel: (score: number, estilo: EstiloAprendizagem) => string
  onFinish: () => void
}

export function ResultadosTela({
  resultados,
  estiloDominante,
  estiloInfo,
  getStyleLevel,
  onFinish,
}: ResultadosTelaProps) {
  const router = useRouter()
  
  // Verificação de segurança
  const estiloDominanteInfo = estiloDominante ? estiloInfo[estiloDominante] : null

  const handleFinish = () => {
    onFinish()
    router.push("/home")
  }

  // Se não houver estilo dominante, mostrar estado de erro
  if (!estiloDominante || !estiloDominanteInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto py-12">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="text-red-500 mb-4">
                <CheckCircle className="h-16 w-16 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Erro ao processar resultados
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Não foi possível determinar seu estilo de aprendizagem. Por favor, tente novamente.
              </p>
              <Button onClick={() => window.location.reload()} size="lg">
                Tentar Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <Card className="shadow-2xl border-0">
        <CardContent className="p-8">
          {/* Header Sucesso*/}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={`bg-gradient-to-br ${estiloDominanteInfo.color} p-6 rounded-full shadow-lg`}>
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Questionário Concluído!</h1>
            <p className="text-gray-600 dark:text-gray-400">Descobrimos seu estilo de aprendizagem dominante</p>
          </div>

          {/* Estilo Dominante */}
          <EstiloCard estiloInfo={estiloDominanteInfo} isDominant />

          {/* Pontuações */}
          <div className="space-y-6 mb-8">
            <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              Suas Pontuações Detalhadas
            </h3>

            <div className="grid gap-4">
              {(Object.entries(resultados) as [EstiloAprendizagem, number][]).map(([style, score]) => {
                const info = estiloInfo[style]
                const level = getStyleLevel(score, style)

                return (
                  <ScoreBar
                    key={style}
                    estilo={style}
                    score={score}
                    maxScore={20}
                    color={info.color}
                    nome={info.nome}
                    nivel={level}
                    icon={info.icon}
                  />
                )
              })}
            </div>
          </div>

          {/* Botões de Acão */}
          <div className="text-center">
            <Button
              onClick={handleFinish}
              size="lg"
              className={`bg-gradient-to-r ${estiloDominanteInfo.color} hover:opacity-90 text-white px-8`}
            >
              Começar a Aprender
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Seus cursos serão personalizados de acordo com seu estilo de aprendizagem
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}