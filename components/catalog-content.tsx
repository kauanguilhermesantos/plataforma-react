"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Brain,
  Shield,
} from "lucide-react"

interface Course {
  id: number
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  category: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  duration: string
  students: number
  rating: number
  reviews: number
  thumbnail: string
  tags: string[]
  isPopular?: boolean
  isNew?: boolean
}

export function CatalogContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  // Dados simulados dos cursos
  const courses: Course[] = [
    {
      id: 1,
      title: "JavaScript Completo - Do Básico ao Avançado",
      description:
        "Aprenda JavaScript desde os fundamentos até conceitos avançados como async/await, closures e muito mais.",
      instructor: {
        name: "Prof. Maria Silva",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Programação",
      level: "Iniciante",
      duration: "40h",
      students: 1250,
      rating: 4.8,
      reviews: 324,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["JavaScript", "ES6+", "DOM", "APIs"],
      isPopular: true,
    },
    {
      id: 2,
      title: "React.js - Construindo Aplicações Modernas",
      description: "Domine o React.js e aprenda a criar aplicações web modernas e responsivas.",
      instructor: {
        name: "Prof. João Santos",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Programação",
      level: "Intermediário",
      duration: "35h",
      students: 890,
      rating: 4.9,
      reviews: 156,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["React", "Hooks", "Context API", "Redux"],
      isNew: true,
    },
    {
      id: 3,
      title: "Python para Data Science",
      description: "Aprenda Python aplicado à ciência de dados com pandas, numpy e matplotlib.",
      instructor: {
        name: "Prof. Ana Costa",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Data Science",
      level: "Intermediário",
      duration: "45h",
      students: 567,
      rating: 4.7,
      reviews: 89,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      description: "Aprenda os princípios fundamentais de design de interface e experiência do usuário.",
      instructor: {
        name: "Prof. Carlos Lima",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Design",
      level: "Iniciante",
      duration: "25h",
      students: 432,
      rating: 4.6,
      reviews: 67,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Figma", "Prototipagem", "Design System", "Usabilidade"],
    },
    {
      id: 5,
      title: "Node.js e Express - Backend Completo",
      description: "Desenvolva APIs robustas e escaláveis com Node.js, Express e MongoDB.",
      instructor: {
        name: "Prof. Roberto Oliveira",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Programação",
      level: "Avançado",
      duration: "50h",
      students: 298,
      rating: 4.8,
      reviews: 45,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Node.js", "Express", "MongoDB", "JWT"],
    },
    {
      id: 6,
      title: "Desenvolvimento Mobile com React Native",
      description: "Crie aplicativos móveis para iOS e Android usando React Native.",
      instructor: {
        name: "Prof. Fernanda Rocha",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Mobile",
      level: "Intermediário",
      duration: "38h",
      students: 156,
      rating: 4.5,
      reviews: 23,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["React Native", "Expo", "Navigation", "AsyncStorage"],
      isNew: true,
    },
    {
      id: 7,
      title: "aaaaaaaaax",
      description: "Crie aplicativos móveis para iOS e Android usando React Native.",
      instructor: {
        name: "Prof. Fernanda Rocha",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Mobile",
      level: "Intermediário",
      duration: "38h",
      students: 156,
      rating: 4.5,
      reviews: 23,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["React Native", "Expo", "Navigation", "AsyncStorage"],
      isNew: true,
    },
  ]

  const categories = [
    { value: "all", label: "Todas as Categorias", icon: BookOpen },
    { value: "Programação", label: "Programação", icon: Code },
    { value: "Design", label: "Design", icon: Palette },
    { value: "Data Science", label: "Data Science", icon: Database },
    { value: "Mobile", label: "Mobile", icon: Smartphone },
    { value: "Web", label: "Desenvolvimento Web", icon: Globe },
    { value: "IA", label: "Inteligência Artificial", icon: Brain },
    { value: "Segurança", label: "Cibersegurança", icon: Shield },
  ]

  // Filtrar cursos
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Ordenar cursos
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const handleEnroll = (courseId: number) => {
    // Simular inscrição no curso
    console.log(`Inscrevendo no curso ${courseId}`)
    // Aqui você implementaria a lógica de inscrição
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Catálogo de Cursos</h1>
        <p className="text-gray-600 dark:text-gray-400">Descubra novos conhecimentos e desenvolva suas habilidades</p>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Barra de Pesquisa */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar cursos, tecnologias, instrutores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center">
                          <category.icon className="mr-2 h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nível</Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Níveis</SelectItem>
                    <SelectItem value="Iniciante">Iniciante</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                    <SelectItem value="Avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ordenar por</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Mais Popular</SelectItem>
                    <SelectItem value="rating">Melhor Avaliado</SelectItem>
                    <SelectItem value="newest">Mais Recente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          {sortedCourses.length} curso{sortedCourses.length !== 1 ? "s" : ""} encontrado
          {sortedCourses.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                {course.isPopular && <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>}
                {course.isNew && <Badge className="bg-green-500 hover:bg-green-600">Novo</Badge>}
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="secondary">{course.level}</Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              </div>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Instrutor */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600 dark:text-gray-400">{course.instructor.name}</span>
              </div>

              {/* Estatísticas */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                  <span className="ml-1">({course.reviews})</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{course.tags.length - 3}
                  </Badge>
                )}
              </div>

              <Separator />

              {/* Ação */}
              <div className="flex justify-end">
                <Button onClick={() => handleEnroll(course.id)} className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Inscrever-se
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {sortedCourses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum curso encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou termos de pesquisa para encontrar o que procura.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
