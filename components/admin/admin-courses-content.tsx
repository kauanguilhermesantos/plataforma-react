"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Star, Download, Play, Pause } from "lucide-react"

interface Course {
  id: number
  title: string
  instructor: {
    name: string
    avatar: string
  }
  category: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  status: "draft" | "published" | "archived"
  students: number
  rating: number
  reviews: number
  createdDate: string
  lastUpdated: string
  thumbnail: string
}

export function AdminCoursesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Dados simulados dos cursos
  const courses: Course[] = [
    {
      id: 1,
      title: "JavaScript Completo - Do Básico ao Avançado",
      instructor: {
        name: "Prof. Maria Silva",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Programação",
      level: "Iniciante",
      status: "published",
      students: 1250,
      rating: 4.8,
      reviews: 324,
      createdDate: "2023-12-01",
      lastUpdated: "2024-01-15",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "React.js - Construindo Aplicações Modernas",
      instructor: {
        name: "Prof. João Santos",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Programação",
      level: "Intermediário",
      status: "published",
      students: 890,
      rating: 4.9,
      reviews: 156,
      createdDate: "2023-11-15",
      lastUpdated: "2024-01-10",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Python para Data Science",
      instructor: {
        name: "Prof. Ana Costa",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Data Science",
      level: "Intermediário",
      status: "published",
      students: 567,
      rating: 4.7,
      reviews: 89,
      createdDate: "2023-10-20",
      lastUpdated: "2024-01-05",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: {
        name: "Prof. Carlos Lima",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Design",
      level: "Iniciante",
      status: "draft",
      students: 0,
      rating: 0,
      reviews: 0,
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-18",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      title: "Node.js e Express - Backend Completo",
      instructor: {
        name: "Prof. Roberto Oliveira",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "Programação",
      level: "Avançado",
      status: "archived",
      students: 298,
      rating: 4.8,
      reviews: 45,
      createdDate: "2023-08-15",
      lastUpdated: "2023-12-20",
      thumbnail: "/placeholder.svg?height=100&width=150",
    },
  ]

  // Estatísticas
  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter((c) => c.status === "published").length,
    draftCourses: courses.filter((c) => c.status === "draft").length,
    totalStudents: courses.reduce((acc, course) => acc + course.students, 0),
    averageRating:
      courses.filter((c) => c.rating > 0).reduce((acc, course) => acc + course.rating, 0) /
      courses.filter((c) => c.rating > 0).length,
  }

  const handleNewCourse = () => {
    window.location.href = "cursos/novoCurso"
  }

  // Filtrar cursos
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsDeleteDialogOpen(true)
  }

  const handlePublishCourse = async (course: Course) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Curso ${course.title} foi publicado`)
    } catch (error) {
      console.error("Erro ao publicar curso:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArchiveCourse = async (course: Course) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Curso ${course.title} foi arquivado`)
    } catch (error) {
      console.error("Erro ao arquivar curso:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500 hover:bg-green-600">Publicado</Badge>
      case "draft":
        return <Badge variant="secondary">Rascunho</Badge>
      case "archived":
        return <Badge variant="outline">Arquivado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Iniciante":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Iniciante
          </Badge>
        )
      case "Intermediário":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Intermediário
          </Badge>
        )
      case "Avançado":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Avançado
          </Badge>
        )
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Cursos</h1>
          <p className="text-gray-600 dark:text-gray-400">Administre todos os cursos da plataforma</p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button> */}
          <Button
            onClick={handleNewCourse}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>

        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalCourses}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.publishedCourses}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Publicados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.draftCourses}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Rascunhos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.totalStudents.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Estudantes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avaliação</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="Programação">Programação</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="archived">Arquivados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Cursos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Cursos ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Instrutor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Estudantes</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-12 h-8 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium line-clamp-1">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.category}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{course.instructor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>{getLevelBadge(course.level)}</TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>{course.students.toLocaleString()}</TableCell>
                  <TableCell>
                    {course.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                        <span className="text-gray-500">({course.reviews})</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => (window.location.href = `cursos/${course.id}/editarCurso`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        {course.status === "draft" && (
                          <DropdownMenuItem onClick={() => handlePublishCourse(course)}>
                            <Play className="mr-2 h-4 w-4" />
                            Publicar
                          </DropdownMenuItem>
                        )}
                        {course.status === "published" && (
                          <DropdownMenuItem onClick={() => handleArchiveCourse(course)}>
                            <Pause className="mr-2 h-4 w-4" />
                            Arquivar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDeleteCourse(course)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Curso</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o curso <strong>{selectedCourse?.title}</strong>? Esta ação não pode ser
              desfeita e todos os dados relacionados serão perdidos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive">Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
