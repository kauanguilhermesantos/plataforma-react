"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Star } from "lucide-react"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { estiloInfo } from "@/data/mockLSQ"

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

  const categoryData = [
    { name: "Programação", value: 45, color: "#3B82F6" },
    { name: "Design", value: 25, color: "#10B981" },
    { name: "Data Science", value: 20, color: "#F59E0B" },
    { name: "Mobile", value: 10, color: "#EF4444" },
  ]

  const estiloAprendizagemData = [
    { name: "Ativista", value: 40, color: "#f87171" },
    { name: "Reflexivo", value: 30, color: "#4ade80" },
    { name: "Teórico", value: 20, color: "#c084fc" },
    { name: "Pragmático", value: 10, color: "#60a5fa" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400">Visão geral da plataforma Koda</p>
        </div>

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
      </div>

      {/* Charts */}
      {/* Distribuição por Categoria e Atividade Recente */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Cursos por Estilos de Aprendizagem</CardTitle>
            <CardDescription>Distribuição dos cursos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={estiloAprendizagemData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {estiloAprendizagemData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {estiloAprendizagemData.map((category) => (
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
      </div>
    </div>
  )
}
