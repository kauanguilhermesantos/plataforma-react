"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Flame,
  Eye,
  BookOpen,
  Wrench,
  Sparkles,
  ClipboardList,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  text: string
  category: "activist" | "reflector" | "theorist" | "pragmatist"
}

const questions: Question[] = [
  { id: 1, text: "Tenho fortes crenças sobre o que é certo e errado, bom e mau.", category: "theorist" },
  { id: 2, text: "Frequentemente ajo sem considerar as possíveis consequências.", category: "activist" },
  { id: 3, text: "Tendo a resolver problemas usando uma abordagem passo a passo.", category: "theorist" },
  { id: 4, text: "Acredito que procedimentos e políticas formais restringem as pessoas.", category: "activist" },
  { id: 5, text: "Tenho reputação de dizer o que penso, de forma simples e direta.", category: "pragmatist" },
  {
    id: 6,
    text: "Frequentemente descubro que ações baseadas em sentimentos são tão sólidas quanto aquelas baseadas em pensamento e análise cuidadosos.",
    category: "activist",
  },
  {
    id: 7,
    text: "Gosto do tipo de trabalho onde tenho tempo para preparação e implementação completas.",
    category: "reflector",
  },
  { id: 8, text: "Regularmente questiono as pessoas sobre suas suposições básicas.", category: "theorist" },
  { id: 9, text: "O que mais importa é se algo funciona na prática.", category: "pragmatist" },
  { id: 10, text: "Busco ativamente novas experiências.", category: "activist" },
  {
    id: 11,
    text: "Quando ouço sobre uma nova ideia ou abordagem, imediatamente começo a pensar em como aplicá-la na prática.",
    category: "pragmatist",
  },
  {
    id: 12,
    text: "Tenho interesse em autodisciplina, como cuidar da dieta, fazer exercícios regulares, manter uma rotina fixa, etc.",
    category: "theorist",
  },
  { id: 13, text: "Tenho orgulho de fazer um trabalho completo.", category: "reflector" },
  {
    id: 14,
    text: "Me dou melhor com pessoas lógicas e analíticas e menos bem com pessoas espontâneas e 'irracionais'.",
    category: "theorist",
  },
  {
    id: 15,
    text: "Tenho cuidado com a interpretação dos dados disponíveis e evito tirar conclusões precipitadas.",
    category: "reflector",
  },
  {
    id: 16,
    text: "Gosto de chegar a uma decisão cuidadosamente depois de ponderar muitas alternativas.",
    category: "reflector",
  },
  { id: 17, text: "Sou mais atraído por ideias novas e incomuns do que por ideias práticas.", category: "activist" },
  {
    id: 18,
    text: "Não gosto de coisas desorganizadas e prefiro encaixar as coisas em um padrão coerente.",
    category: "theorist",
  },
  {
    id: 19,
    text: "Aceito e sigo procedimentos e políticas estabelecidos, desde que os considere uma maneira eficiente de fazer o trabalho.",
    category: "pragmatist",
  },
  { id: 20, text: "Gosto de relacionar minhas ações a um princípio geral.", category: "theorist" },
  { id: 21, text: "Nas discussões, gosto de ir direto ao ponto.", category: "pragmatist" },
  {
    id: 22,
    text: "Tendo a ter relacionamentos distantes e bastante formais com pessoas no trabalho.",
    category: "theorist",
  },
  { id: 23, text: "Prospero com o desafio de enfrentar algo novo e diferente.", category: "activist" },
  { id: 24, text: "Gosto de pessoas divertidas e espontâneas.", category: "activist" },
  { id: 25, text: "Presto atenção meticulosa aos detalhes antes de chegar a uma conclusão.", category: "reflector" },
  { id: 26, text: "Acho difícil produzir ideias por impulso.", category: "theorist" },
  { id: 27, text: "Acredito em ir direto ao ponto imediatamente.", category: "pragmatist" },
  { id: 28, text: "Tenho cuidado para não tirar conclusões muito rapidamente.", category: "reflector" },
  {
    id: 29,
    text: "Prefiro ter o máximo possível de fontes de informação - quanto mais dados para pensar, melhor.",
    category: "reflector",
  },
  {
    id: 30,
    text: "Pessoas frívolas que não levam as coisas a sério o suficiente geralmente me irritam.",
    category: "theorist",
  },
  { id: 31, text: "Ouço os pontos de vista de outras pessoas antes de apresentar o meu.", category: "reflector" },
  { id: 32, text: "Tendo a ser aberto sobre como estou me sentindo.", category: "activist" },
  { id: 33, text: "Nas discussões, gosto de observar as manobras dos outros participantes.", category: "reflector" },
  {
    id: 34,
    text: "Prefiro responder aos eventos de forma espontânea e flexível, em vez de planejar as coisas com antecedência.",
    category: "activist",
  },
  {
    id: 35,
    text: "Tendo a ser atraído por técnicas como análise de rede, fluxogramas, programas de ramificação, planejamento de contingência, etc.",
    category: "pragmatist",
  },
  {
    id: 36,
    text: "Me preocupa se tenho que apressar um trabalho para cumprir um prazo apertado.",
    category: "reflector",
  },
  { id: 37, text: "Tendo a julgar as ideias das pessoas por seus méritos práticos.", category: "pragmatist" },
  { id: 38, text: "Pessoas quietas e pensativas tendem a me deixar desconfortável.", category: "activist" },
  { id: 39, text: "Frequentemente fico irritado com pessoas que querem apressar as coisas.", category: "reflector" },
  {
    id: 40,
    text: "É mais importante aproveitar o momento presente do que pensar no passado ou no futuro.",
    category: "activist",
  },
  {
    id: 41,
    text: "Acho que decisões baseadas em uma análise completa de todas as informações são mais sólidas do que aquelas baseadas em intuição.",
    category: "reflector",
  },
  { id: 42, text: "Tendo a ser perfeccionista.", category: "theorist" },
  { id: 43, text: "Nas discussões, geralmente produzo muitas ideias espontâneas.", category: "activist" },
  { id: 44, text: "Nas reuniões, apresento ideias práticas e realistas.", category: "pragmatist" },
  { id: 45, text: "Na maioria das vezes, regras existem para serem quebradas.", category: "activist" },
  { id: 46, text: "Prefiro me afastar de uma situação e observar.", category: "reflector" },
  {
    id: 47,
    text: "Frequentemente consigo ver inconsistências e fraquezas nos argumentos de outras pessoas.",
    category: "theorist",
  },
  { id: 48, text: "No geral, falo mais do que ouço.", category: "activist" },
  {
    id: 49,
    text: "Frequentemente consigo ver maneiras melhores e mais práticas de fazer as coisas.",
    category: "pragmatist",
  },
  { id: 50, text: "Acho que relatórios escritos devem ser curtos e diretos ao ponto.", category: "pragmatist" },
  { id: 51, text: "Acredito que o pensamento racional e lógico deve prevalecer.", category: "theorist" },
  {
    id: 52,
    text: "Tendo a discutir coisas específicas com as pessoas em vez de me envolver em discussões sociais.",
    category: "pragmatist",
  },
  {
    id: 53,
    text: "Gosto de pessoas que abordam as coisas de forma realista em vez de teórica.",
    category: "pragmatist",
  },
  { id: 54, text: "Nas discussões, fico impaciente com irrelevâncias e divagações.", category: "pragmatist" },
  {
    id: 55,
    text: "Se tenho que escrever um relatório, tendo a produzir muitos rascunhos antes de decidir pela versão final.",
    category: "reflector",
  },
  {
    id: 56,
    text: "Tenho interesse em experimentar as coisas para ver se funcionam na prática.",
    category: "pragmatist",
  },
  { id: 57, text: "Tenho interesse em chegar a respostas por meio de uma abordagem lógica.", category: "theorist" },
  { id: 58, text: "Gosto de ser aquele que fala muito.", category: "activist" },
  {
    id: 59,
    text: "Nas discussões, frequentemente sou o realista, mantendo as pessoas no ponto e evitando especulações selvagens.",
    category: "pragmatist",
  },
  { id: 60, text: "Gosto de ponderar muitas alternativas antes de tomar minha decisão.", category: "reflector" },
  {
    id: 61,
    text: "Nas discussões com as pessoas, frequentemente sou o mais desapaixonado e objetivo.",
    category: "theorist",
  },
  {
    id: 62,
    text: "Nas discussões, é mais provável que eu adote um 'perfil baixo' do que lidere e fale a maior parte do tempo.",
    category: "reflector",
  },
  { id: 63, text: "Gosto de poder relacionar as ações atuais a um quadro maior de longo prazo.", category: "theorist" },
  {
    id: 64,
    text: "Quando as coisas dão errado, fico feliz em dar de ombros e 'atribuir à experiência'.",
    category: "activist",
  },
  { id: 65, text: "Tendo a rejeitar ideias selvagens e espontâneas por serem impráticas.", category: "pragmatist" },
  { id: 66, text: "É melhor pensar cuidadosamente antes de agir.", category: "reflector" },
  { id: 67, text: "No geral, ouço mais do que falo.", category: "reflector" },
  { id: 68, text: "Tendo a ser duro com pessoas que acham difícil adotar uma abordagem lógica.", category: "theorist" },
  { id: 69, text: "Na maioria das vezes, acredito que os fins justificam os meios.", category: "pragmatist" },
  {
    id: 70,
    text: "Não me importo em ferir os sentimentos das pessoas, desde que o trabalho seja feito.",
    category: "pragmatist",
  },
  { id: 71, text: "Acho a formalidade de ter objetivos e planos específicos sufocante.", category: "activist" },
  { id: 72, text: "Geralmente sou uma das pessoas que dão vida a uma festa.", category: "activist" },
  { id: 73, text: "Faço o que for conveniente para fazer o trabalho.", category: "pragmatist" },
  { id: 74, text: "Fico entediado rapidamente com trabalho metódico e detalhado.", category: "activist" },
  {
    id: 75,
    text: "Tenho interesse em explorar as suposições básicas, princípios e teorias que sustentam as coisas e eventos.",
    category: "theorist",
  },
  { id: 76, text: "Estou sempre interessado em descobrir o que as pessoas pensam.", category: "reflector" },
  {
    id: 77,
    text: "Gosto que as reuniões sejam conduzidas de forma metódica, seguindo uma agenda estabelecida, etc.",
    category: "theorist",
  },
  { id: 78, text: "Evito tópicos subjetivos ou ambíguos.", category: "theorist" },
  { id: 79, text: "Gosto do drama e da emoção de uma situação de crise.", category: "activist" },
  { id: 80, text: "As pessoas frequentemente me acham insensível aos seus sentimentos.", category: "pragmatist" },
]

const questionsPerPage = 10

const styleInfo = {
  activist: {
    name: "Ativista",
    color: "from-orange-500 to-red-500",
    icon: Flame,
    description: "Você aprende melhor fazendo e experimentando. Gosta de novos desafios e experiências.",
    characteristics: [
      "Envolve-se plenamente em novas experiências",
      "Mente aberta e entusiasta",
      "Age primeiro e considera consequências depois",
      "Prospera com desafios e mudanças",
    ],
  },
  reflector: {
    name: "Reflexivo",
    color: "from-green-500 to-emerald-500",
    icon: Eye,
    description: "Você aprende melhor observando e refletindo. Gosta de considerar diferentes perspectivas.",
    characteristics: [
      "Gosta de observar e ponderar experiências",
      "Coleta dados antes de tirar conclusões",
      "Cauteloso e cuidadoso",
      "Prefere pensar antes de agir",
    ],
  },
  theorist: {
    name: "Teórico",
    color: "from-purple-500 to-violet-500",
    icon: BookOpen,
    description:
      "Você aprende melhor com teorias e modelos lógicos. Gosta de entender os princípios por trás das coisas.",
    characteristics: [
      "Integra observações em teorias lógicas",
      "Pensa de forma vertical e sistemática",
      "Perfeccionista e analítico",
      "Valoriza racionalidade e lógica",
    ],
  },
  pragmatist: {
    name: "Pragmático",
    color: "from-cyan-500 to-blue-500",
    icon: Wrench,
    description: "Você aprende melhor aplicando ideias na prática. Gosta de experimentar e ver resultados.",
    characteristics: [
      "Testa ideias e técnicas na prática",
      "Busca aplicações práticas",
      "Age rápida e confiantemente",
      "Impaciente com teorias sem utilidade prática",
    ],
  },
}

export function LSQ1() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    activist: number
    reflector: number
    theorist: number
    pragmatist: number
  } | null>(null)

  const totalPages = Math.ceil(questions.length / questionsPerPage)
  const progress = ((currentPage + 1) / totalPages) * 100
  const currentQuestions = questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)

  const handleAnswer = (questionId: number, agree: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: agree,
    }))
  }

  const calculateResults = () => {
    const scores = {
      activist: 0,
      reflector: 0,
      theorist: 0,
      pragmatist: 0,
    }

    questions.forEach((question) => {
      if (answers[question.id] === true) {
        scores[question.category]++
      }
    })

    setResults(scores)
    setShowResults(true)
  }

  const getDominantStyle = () => {
    if (!results) return null

    const entries = Object.entries(results) as [keyof typeof results, number][]
    const sorted = entries.sort((a, b) => b[1] - a[1])
    return sorted[0][0]
  }

  const getStyleLevel = (score: number, style: string) => {
    const norms = {
      activist: { veryLow: 6, low: 10, moderate: 13, strong: 17 },
      reflector: { veryLow: 9, low: 12, moderate: 15, strong: 18 },
      theorist: { veryLow: 8, low: 11, moderate: 14, strong: 16 },
      pragmatist: { veryLow: 9, low: 12, moderate: 15, strong: 17 },
    }

    const norm = norms[style as keyof typeof norms]

    if (score <= norm.veryLow) return "Muito Baixa"
    if (score <= norm.low) return "Baixa"
    if (score <= norm.moderate) return "Moderada"
    if (score <= norm.strong) return "Forte"
    return "Muito Forte"
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleFinish = () => {
    // Aqui você salvaria o resultado do usuário
    router.push("/dashboard")
  }

  const allCurrentQuestionsAnswered = currentQuestions.every(
    (q) => answers[q.id] !== undefined && answers[q.id] !== null,
  )

  if (showResults && results) {
    const dominantStyle = getDominantStyle()!
    const styleData = styleInfo[dominantStyle]
    const StyleIcon = styleData.icon

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto py-12">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${styleData.color} p-6 rounded-full shadow-lg`}>
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

              {/* Dominant Style */}
              <div className={`bg-gradient-to-br ${styleData.color} p-8 rounded-2xl shadow-lg mb-8`}>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <StyleIcon className="h-12 w-12 text-white" />
                  <h2 className="text-4xl font-bold text-white">{styleData.name}</h2>
                </div>
                <p className="text-white text-center text-lg mb-6">{styleData.description}</p>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 text-center">Características principais:</h3>
                  <ul className="space-y-2">
                    {styleData.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start text-white">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* All Scores */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                  Suas Pontuações Detalhadas
                </h3>

                <div className="grid gap-4">
                  {(Object.entries(results) as [keyof typeof results, number][]).map(([style, score]) => {
                    const info = styleInfo[style]
                    const Icon = info.icon
                    const level = getStyleLevel(score, style)
                    const percentage = (score / 20) * 100

                    return (
                      <div key={style} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`bg-gradient-to-br ${info.color} p-2 rounded-lg`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{info.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{level} preferência</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-lg font-bold">
                            {score}/20
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${info.color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <Button
                  onClick={handleFinish}
                  size="lg"
                  className={`bg-gradient-to-r ${styleData.color} hover:opacity-90 text-white px-8`}
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-full">
              <ClipboardList className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Questionário de Estilos de Aprendizagem
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Responda com honestidade para obter resultados precisos</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>
              Página {currentPage + 1} de {totalPages}
            </span>
            <span>{Math.round(progress)}% completo</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Questions */}
        <Card className="shadow-lg border-0 mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <strong>Instruções:</strong> Para cada afirmação, escolha "Sim" se você concorda mais do que discorda,
                  ou "Não" se você discorda mais do que concorda.
                </p>
              </div>

              {currentQuestions.map((question) => {
                const answer = answers[question.id]
                return (
                  <div
                    key={question.id}
                    className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          {question.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">{question.text}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 ml-12">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleAnswer(question.id, true)}
                        className={cn(
                          "flex-1 transition-all duration-200",
                          answer === true
                            ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
                            : "hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-500",
                        )}
                      >
                        <ThumbsUp className={cn("h-5 w-5 mr-2", answer === true && "text-white")} />
                        Sim
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleAnswer(question.id, false)}
                        className={cn(
                          "flex-1 transition-all duration-200",
                          answer === false
                            ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                            : "hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-500",
                        )}
                      >
                        <ThumbsDown className={cn("h-5 w-5 mr-2", answer === false && "text-white")} />
                        Não
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentPage === 0} size="lg">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            disabled={!allCurrentQuestionsAnswered}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
          >
            {currentPage === totalPages - 1 ? "Ver Resultados" : "Próxima"}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {!allCurrentQuestionsAnswered && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Responda todas as perguntas para continuar
          </p>
        )}
      </div>
    </div>
  )
}
