"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Play, CheckCircle, CircleQuestionMark, TrendingUp, BookOpen } from "lucide-react"
import Link from "next/link"
import { estiloInfo } from "@/data/mockLSQ"
import { usePerfil } from "@/hooks/usePerfil"

export function DashboardContent() {

  // Carregando dados do usuário
  const { userData } = usePerfil();
  const usuario = userData;

  // Simulando dados do usuário
  const userStats = {
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalHours: 156,
    streak: 7,
    achievements: 24,
    rank: "Intermediário",
    estiloAprendizagem: "Pragmático"
  }

  const recentCourses = [
    {
      id: 1,
      title: "JavaScript Avançado",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      instructor: "Prof. Maria Silva",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "React Fundamentals",
      progress: 45,
      totalLessons: 16,
      completedLessons: 7,
      instructor: "Prof. João Santos",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Python para Iniciantes",
      progress: 90,
      totalLessons: 12,
      completedLessons: 11,
      instructor: "Prof. Ana Costa",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
  ]

  const estiloAprendizagemInfo = usuario.estiloAprendizagem ? estiloInfo[usuario.estiloAprendizagem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() as keyof typeof estiloInfo] : null;
  const EstiloIcon = estiloAprendizagemInfo ? estiloAprendizagemInfo.icon: CircleQuestionMark;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="dark:text-gray-400">Bem-vindo de volta! Continue sua jornada de aprendizado.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:text-white">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas de Estudo</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalHours}h</div>
            <p className="text-xs text-muted-foreground">+12h esta semana</p>
          </CardContent>
        </Card>

        {estiloAprendizagemInfo ? (
            <Card className={`${estiloAprendizagemInfo.borderColor} border-2`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estilo de Aprendizagem</CardTitle>
                <EstiloIcon className={`h-4 w-4 ${estiloAprendizagemInfo.textColor}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${estiloAprendizagemInfo.textColor}`}>{estiloAprendizagemInfo.nome}</div>
                <p className="text-xs text-muted-foreground">Personalizado para você</p>
              </CardContent>
            </Card>
          ) : (
            <Card className={"dark:border-gray-200"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium dark:text-gray-300">Estilo de Aprendizagem</CardTitle>
                <EstiloIcon className={"h-4 w-4 text-gray-700 dark:text-gray-300"} />
              </CardHeader>
              <CardContent>
                <div className={"text-xl font-bold text-gray-600 dark:text-gray-300"}>Desconhecido</div>
                <p className="text-xs text-muted-foreground">Faça o teste e descubra</p>
                <div className="mt-2 flex items-center justify-center">
                  <Link href={"/lsq"}>
                    <Button size="sm" className="dark:text-white" variant="default">
                      <Play className="h-4 w-4 mr-1" />
                      Faça o Teste
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 dark:text-white">
        {/* Cursos em Progresso */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Cursos em Progresso</CardTitle>
              <CardDescription className="dark:text-gray-400">Continue de onde parou</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors"
                >
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{course.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 border-red-600">{course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span className="dark:text-white">
                          {course.completedLessons}/{course.totalLessons} aulas
                        </span>
                        <span className="dark:text-white">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                  <Link href={`/curso/${course.id}`}>
                    <Button size="sm" className="dark:text-white bg-blue-600" variant="default">
                      <Play className="h-4 w-4 mr-1" />
                      Continuar
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
