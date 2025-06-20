"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, TrendingUp, Play, CheckCircle, Users, Calendar } from "lucide-react"

export function DashboardContent() {
  // Simulando dados do usuário
  const userStats = {
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalHours: 156,
    streak: 7,
    achievements: 24,
    rank: "Intermediário",
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

  const achievements = [
    { id: 1, title: "Primeira Aula", description: "Complete sua primeira aula", icon: Play, earned: true },
    {
      id: 2,
      title: "Sequência de 7 dias",
      description: "Estude por 7 dias consecutivos",
      icon: Calendar,
      earned: true,
    },
    { id: 3, title: "Mestre JavaScript", description: "Complete o curso de JavaScript", icon: Trophy, earned: false },
    { id: 4, title: "Colaborador", description: "Ajude 5 colegas no fórum", icon: Users, earned: false },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Workshop: APIs REST",
      date: "2024-01-20",
      time: "14:00",
      type: "workshop",
    },
    {
      id: 2,
      title: "Entrega: Projeto React",
      date: "2024-01-22",
      time: "23:59",
      type: "deadline",
    },
    {
      id: 3,
      title: "Live: Carreira em Tech",
      date: "2024-01-25",
      time: "19:00",
      type: "live",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Bem-vindo de volta! Continue sua jornada de aprendizado.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.streak} dias</div>
            <p className="text-xs text-muted-foreground">Continue assim!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.achievements}</div>
            <p className="text-xs text-muted-foreground">Nível {userStats.rank}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cursos em Progresso */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cursos em Progresso</CardTitle>
              <CardDescription>Continue de onde parou</CardDescription>
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>
                          {course.completedLessons}/{course.totalLessons} aulas
                        </span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Continuar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      event.type === "workshop"
                        ? "bg-blue-500"
                        : event.type === "deadline"
                          ? "bg-red-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Conquistas Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-2 rounded ${
                    achievement.earned ? "bg-yellow-50 dark:bg-yellow-900/20" : "opacity-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      achievement.earned ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{achievement.title}</p>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                  {achievement.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
