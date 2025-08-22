"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  Search,
  Play,
  Clock,
  BookOpen,
  Star,
  TrendingUp,
  Award,
  MoreHorizontal,
  Download,
  Share,
  Bookmark,
  BookmarkCheck,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface Course {
  id: number
  title: string
  instructor: {
    name: string
    avatar: string
  }
  thumbnail: string
  progress: number
  totalLessons: number
  completedLessons: number
  duration: string
  category: string
  level: string
  rating: number
  lastAccessed: string
  enrolledDate: string
  isCompleted: boolean
  isFavorite: boolean
  nextLesson?: {
    title: string
    duration: string
  }
}

export function MyCoursesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [unenrollDialog, setUnenrollDialog] = useState<{
    isOpen: boolean
    course: Course | null
  }>({
    isOpen: false,
    course: null,
  })
  const [isUnenrolling, setIsUnenrolling] = useState(false)

  // Dados simulados dos cursos do usuário
  const userCourses: Course[] = [
    {
      id: 1,
      title: "JavaScript Completo - Do Básico ao Avançado",
      instructor: {
        name: "Prof. Maria Silva",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      duration: "40h",
      category: "Programação",
      level: "Iniciante",
      rating: 4.8,
      lastAccessed: "2024-01-20",
      enrolledDate: "2024-01-01",
      isCompleted: false,
      isFavorite: true,
      nextLesson: {
        title: "Arrow Functions e Métodos de Array",
        duration: "18:30",
      },
    },
    {
      id: 2,
      title: "React.js - Construindo Aplicações Modernas",
      instructor: {
        name: "Prof. João Santos",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 45,
      totalLessons: 16,
      completedLessons: 7,
      duration: "35h",
      category: "Programação",
      level: "Intermediário",
      rating: 4.9,
      lastAccessed: "2024-01-19",
      enrolledDate: "2024-01-10",
      isCompleted: false,
      isFavorite: false,
      nextLesson: {
        title: "Hooks - useState e useEffect",
        duration: "22:15",
      },
    },
    {
      id: 3,
      title: "Python para Data Science",
      instructor: {
        name: "Prof. Ana Costa",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
      duration: "45h",
      category: "Data Science",
      level: "Intermediário",
      rating: 4.7,
      lastAccessed: "2024-01-15",
      enrolledDate: "2023-12-01",
      isCompleted: true,
      isFavorite: true,
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: {
        name: "Prof. Carlos Lima",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 30,
      totalLessons: 14,
      completedLessons: 4,
      duration: "25h",
      category: "Design",
      level: "Iniciante",
      rating: 4.6,
      lastAccessed: "2024-01-18",
      enrolledDate: "2024-01-15",
      isCompleted: false,
      isFavorite: false,
      nextLesson: {
        title: "Princípios de Design Visual",
        duration: "16:45",
      },
    },
    {
      id: 5,
      title: "Node.js e Express - Backend Completo",
      instructor: {
        name: "Prof. Roberto Oliveira",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 100,
      totalLessons: 18,
      completedLessons: 18,
      duration: "50h",
      category: "Programação",
      level: "Avançado",
      rating: 4.8,
      lastAccessed: "2024-01-10",
      enrolledDate: "2023-11-15",
      isCompleted: true,
      isFavorite: true,
    },
    {
      id: 6,
      title: "Desenvolvimento Mobile com React Native",
      instructor: {
        name: "Prof. Fernanda Rocha",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 15,
      totalLessons: 22,
      completedLessons: 3,
      duration: "38h",
      category: "Mobile",
      level: "Intermediário",
      rating: 4.5,
      lastAccessed: "2024-01-17",
      enrolledDate: "2024-01-16",
      isCompleted: false,
      isFavorite: false,
      nextLesson: {
        title: "Configuração do Ambiente de Desenvolvimento",
        duration: "12:20",
      },
    },
  ]

  // Estatísticas do usuário
  const userStats = {
    totalCourses: userCourses.length,
    completedCourses: userCourses.filter((course) => course.isCompleted).length,
    inProgressCourses: userCourses.filter((course) => !course.isCompleted).length,
    totalHours: userCourses.reduce((acc, course) => acc + Number.parseInt(course.duration), 0),
    certificates: userCourses.filter((course) => course.isCompleted).length,
  }

  // Filtrar cursos
  const filteredCourses = userCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Separar cursos por status
  const inProgressCourses = filteredCourses.filter((course) => !course.isCompleted)
  const completedCourses = filteredCourses.filter((course) => course.isCompleted)
  const favoriteCourses = filteredCourses.filter((course) => course.isFavorite)

  // Ordenar cursos
  const sortCourses = (courses: Course[]) => {
    return [...courses].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
        case "progress":
          return b.progress - a.progress
        case "alphabetical":
          return a.title.localeCompare(b.title)
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })
  }

  const toggleFavorite = (courseId: number) => {
    // Aqui você implementaria a lógica para favoritar/desfavoritar
    console.log(`Toggle favorite for course ${courseId}`)
  }

  const handleUnenroll = async (course: Course) => {
    setIsUnenrolling(true)
    try {
      // Simula a desinscrição
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aqui você removeria o curso da lista real
      console.log(`Usuário desinscrito do curso: ${course.title}`)

      // Fechar o modal
      setUnenrollDialog({ isOpen: false, course: null })

      // Mostrar feedback de sucesso (você pode usar toast aqui)
      alert(`Você foi desinscrito do curso "${course.title}" com sucesso.`)
    } catch (error) {
      console.error("Erro ao desinscrever:", error)
      alert("Erro ao desinscrever do curso. Tente novamente.")
    } finally {
      setIsUnenrolling(false)
    }
  }

  const openUnenrollDialog = (course: Course) => {
    setUnenrollDialog({ isOpen: true, course })
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 flex gap-2">
          {course.isCompleted && <Badge className="bg-green-500 hover:bg-green-600">Concluído</Badge>}
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toggleFavorite(course.id)}>
                {course.isFavorite ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Remover dos Favoritos
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Adicionar aos Favoritos
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                Compartilhar
              </DropdownMenuItem>
              {course.isCompleted && (
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Certificado
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => openUnenrollDialog(course)} className="text-red-600 dark:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                Desinscrever-se
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
            <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 dark:text-gray-400">{course.instructor.name}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progresso */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {course.completedLessons}/{course.totalLessons} aulas
            </span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>

        {/* Próxima aula (se não concluído) */}
        {!course.isCompleted && course.nextLesson && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Próxima aula:</p>
            <p className="text-sm text-blue-700 dark:text-blue-200">{course.nextLesson.title}</p>
            <p className="text-xs text-blue-600 dark:text-blue-300">{course.nextLesson.duration}</p>
          </div>
        )}

        {/* Estatísticas */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </div>
          </div>
          {course.isFavorite && <Bookmark className="h-4 w-4 fill-current text-blue-500" />}
        </div>

        <Separator />

        {/* Ações */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Último acesso: {new Date(course.lastAccessed).toLocaleDateString("pt-BR")}
          </span>
          <Link href={`/curso/${course.id}`}>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              {course.isCompleted ? "Revisar" : "Continuar"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meus Cursos</h1>
        <p className="text-gray-600 dark:text-gray-400">Acompanhe seu progresso e continue aprendendo</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.totalCourses}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total de Cursos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userStats.completedCourses}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Concluídos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{userStats.inProgressCourses}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Em Progresso</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userStats.totalHours}h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Horas Estudadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{userStats.certificates}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Certificados</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barra de Pesquisa */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar meus cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtros */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="Programação">Programação</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recente</SelectItem>
                  <SelectItem value="progress">Maior Progresso</SelectItem>
                  <SelectItem value="alphabetical">Alfabética</SelectItem>
                  <SelectItem value="rating">Melhor Avaliado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Cursos */}
      <Tabs defaultValue="in-progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Em Progresso ({inProgressCourses.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Concluídos ({completedCourses.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Favoritos ({favoriteCourses.length})
          </TabsTrigger>
        </TabsList>

        {/* Cursos em Progresso */}
        <TabsContent value="in-progress">
          {inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortCourses(inProgressCourses).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum curso em progresso</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore nosso catálogo e comece um novo curso hoje!
                </p>
                <Link href="/catalog">
                  <Button>Explorar Cursos</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Cursos Concluídos */}
        <TabsContent value="completed">
          {completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortCourses(completedCourses).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum curso concluído ainda</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Continue estudando para conquistar seus primeiros certificados!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Cursos Favoritos */}
        <TabsContent value="favorites">
          {favoriteCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortCourses(favoriteCourses).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum curso favorito</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Marque seus cursos favoritos para acessá-los rapidamente!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Modal de Confirmação de Desinscrição */}
      <Dialog
        open={unenrollDialog.isOpen}
        onOpenChange={(open) => !isUnenrolling && setUnenrollDialog({ isOpen: open, course: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Desinscrever-se do Curso
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja se desinscrever do curso <strong>"{unenrollDialog.course?.title}"</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                    Atenção: Esta ação não pode ser desfeita
                  </p>
                  <ul className="text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Você perderá todo o progresso do curso</li>
                    <li>• Suas anotações e marcações serão removidas</li>
                    <li>• Será necessário se inscrever novamente para acessar o conteúdo</li>
                    {unenrollDialog.course?.progress > 0 && (
                      <li>• Seu progresso atual de {unenrollDialog.course.progress}% será perdido</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUnenrollDialog({ isOpen: false, course: null })}
              disabled={isUnenrolling}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => unenrollDialog.course && handleUnenroll(unenrollDialog.course)}
              disabled={isUnenrolling}
            >
              {isUnenrolling ? "Desinscrevendo..." : "Sim, Desinscrever"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
