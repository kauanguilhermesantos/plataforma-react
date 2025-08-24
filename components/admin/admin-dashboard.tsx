"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, TrendingUp, AlertTriangle, Clock, Star, MessageSquare, Download } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AdminDashboard() {
  // Dados simulados para o dashboard
  const stats = {
    totalUsers: 15420,
    activeUsers: 12350,
    totalCourses: 156,
    activeCourses: 142,
    supportTickets: 23,
    pendingReviews: 8,
  }

  const recentUsers = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinDate: "2024-01-20",
      status: "active",
      courses: 3,
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinDate: "2024-01-19",
      status: "active",
      courses: 1,
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinDate: "2024-01-18",
      status: "pending",
      courses: 0,
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "React Avançado",
      instructor: "Prof. Carlos Lima",
      students: 245,
      rating: 4.8,
      status: "published",
    },
    {
      id: 2,
      title: "Python para IA",
      instructor: "Prof. Ana Rocha",
      students: 189,
      rating: 4.9,
      status: "published",
    },
    {
      id: 3,
      title: "Design System",
      instructor: "Prof. Roberto Silva",
      students: 0,
      rating: 0,
      status: "draft",
    },
  ]

  const monthlyData = [
    { month: "Jan", users: 1200, courses: 12 },
    { month: "Fev", users: 1350, courses: 15 },
    { month: "Mar", users: 1180, courses: 18 },
    { month: "Abr", users: 1420, courses: 14 },
    { month: "Mai", users: 1650, courses: 22 },
    { month: "Jun", users: 1580, courses: 19 },
  ]

  const categoryData = [
    { name: "Programação", value: 45, color: "#3B82F6" },
    { name: "Design", value: 25, color: "#10B981" },
    { name: "Data Science", value: 20, color: "#F59E0B" },
    { name: "Mobile", value: 10, color: "#EF4444" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400">Visão geral da plataforma Koda</p>
        </div>
        {/* <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button>Ver Relatórios Completos</Button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">de {stats.totalCourses} cursos totais</p>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets de Suporte</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.supportTickets}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingReviews} pendentes de revisão</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Charts */}
      {/* <div className="grid grid-cols-1 gap-6"> */}
        {/* Gráfico de Usuários */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Crescimento de Usuários</CardTitle>
            <CardDescription>Novos usuários por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      {/* </div> */}

      {/* Distribuição por Categoria e Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos por Categoria</CardTitle>
            <CardDescription>Distribuição dos cursos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usuários Recentes */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Usuários Recentes</CardTitle>
            <CardDescription>Últimos usuários cadastrados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status === "active" ? "Ativo" : "Pendente"}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{user.courses} cursos</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}

        {/* Cursos Populares */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos Populares</CardTitle>
            <CardDescription>Cursos com mais estudantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium truncate">{course.title}</h4>
                  <Badge variant={course.status === "published" ? "default" : "secondary"}>
                    {course.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{course.instructor}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span>{course.students} estudantes</span>
                    {course.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Métricas de Performance */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Métricas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Taxa de Conclusão de Cursos</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Satisfação dos Usuários</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tempo Médio de Resposta</span>
                <span className="font-medium">2.3h</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uptime do Sistema</span>
                <span className="font-medium">99.8%</span>
              </div>
              <Progress value={99.8} className="h-2" />
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Alertas e Notificações */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Alertas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Backup pendente</p>
                <p className="text-xs text-gray-600">Último backup realizado há 25 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Servidor com alta utilização</p>
                <p className="text-xs text-gray-600">CPU em 89% de uso</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Novos tickets de suporte</p>
                <p className="text-xs text-gray-600">5 tickets aguardando resposta</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        
      {/* </div> */}
    </div>
  )
}
