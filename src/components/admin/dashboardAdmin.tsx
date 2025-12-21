"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Star, AlertCircle } from "lucide-react"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useEffect, useState } from "react"

// Tipos para os dados
interface CategoriaData {
  nome: string
  value: number
  quantidade: number
  cor: string
}

interface DashboardStats {
  totalAlunos: number
  totalAdmins: number
  totalUsuarios: number
  activeUsers: number
  totalCursos: number
  cursosAtivos: number
  categorias: CategoriaData[]
  estilosAprendizagem: CategoriaData[]
}

interface ApiResponse {
  success: boolean
  data: DashboardStats
  error?: string
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAlunos: 0,
    totalAdmins: 0,
    totalUsuarios: 0,
    activeUsers: 0,
    totalCursos: 0,
    cursosAtivos: 0,
    categorias: [],
    estilosAprendizagem: [],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/admin/dashboard')
        
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`)
        }
        
        const result: ApiResponse = await response.json()
        
        if (!result.success) {
          throw new Error(result.error || "Erro desconhecido")
        }
        
        setStats({
          ...result.data,
        })
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error)
        setError(error instanceof Error ? error.message : "Erro ao carregar dados")
        
        // Fallback para dados mock em caso de erro
        setStats(prev => ({
          ...prev,
        }))
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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

  // Custom tooltip para os gráficos
  const CustomTooltip = ({ active, payload, labelKey = "nome" }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
          <p className="font-bold">{data[labelKey]}</p>
          <p className="text-sm">
            {data.quantidade} curso{data.quantidade !== 1 ? 's' : ''}
          </p>
          <p className="text-sm">{data.value}% do total</p>
        </div>
      )
    }
    return null
  }

  // Função para renderizar gráfico de dados
  const renderChart = (data: CategoriaData[], title: string, description: string) => {
    const datas = data.map(item => ({
      ...item,
      nome: item.nome
    }))

  // Função auxiliar para capitalizar
  function capitalizeFirstLetter(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
    
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-4">
          <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
          <p className="text-red-500">Erro ao carregar dados</p>
          <p className="text-sm text-gray-500 mt-1">Usando dados de exemplo</p>
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className="text-center text-gray-500 p-4 h-64 flex items-center justify-center">
          Nenhum dado disponível
        </div>
      )
    }

    return (
      <>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={datas}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              nameKey="nome"
            >
              {datas.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-4">
          {datas.map((item) => (
            <div key={item.nome} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.cor }} 
                />
                <span className="text-sm truncate">{item.nome}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{item.value}%</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({item.quantidade})
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total de Alunos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.totalAlunos.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Carregando..." : `de ${stats.totalUsuarios} usuários totais`}
            </p>
          </CardContent>
        </Card>

        {/* Total de Admin */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Admins</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.totalAdmins.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Carregando..." : `de ${stats.totalUsuarios} usuários totais`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.cursosAtivos}
            </div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Carregando..." : `de ${stats.totalCursos} cursos totais`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos por Categoria</CardTitle>
            <CardDescription>
              Distribuição dos cursos publicados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderChart(stats.categorias, "Categorias", "Distribuição por categoria")}
          </CardContent>
        </Card>

        {/* Distribuição por Estilo de Aprendizagem */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos por Estilo de Aprendizagem</CardTitle>
            <CardDescription>
              Distribuição dos cursos publicados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderChart(stats.estilosAprendizagem, "Estilos", "Distribuição por estilo")}
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