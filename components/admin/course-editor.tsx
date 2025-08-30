"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Eye, Save, Users, BookOpen, Clock, Star, Plus, X, Upload } from "lucide-react"

interface CourseEditorProps {
  courseId: string
}

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "text" | "quiz"
  videoUrl?: string
  description?: string
  order: number
}

interface Module {
  id: number
  title: string
  description?: string
  lessons: Lesson[]
  order: number
}

interface Course {
  id: number
  title: string
  description: string
  shortDescription: string
  instructor: {
    id: number
    name: string
    avatar: string
    bio: string
  }
  thumbnail: string
  rating: number
  students: number
  duration: string
  level: string
  category: string
  price: number
  isPublished: boolean
  modules: Module[]
  resources: Array<{
    id: number
    title: string
    type: string
    url: string
  }>
  tags: string[]
}

export function CourseEditor({ courseId }: CourseEditorProps) {
  const [course, setCourse] = useState<Course>({
    id: Number.parseInt(courseId),
    title: "JavaScript Completo - Do Básico ao Avançado",
    description:
      "Aprenda JavaScript desde os fundamentos até conceitos avançados como async/await, closures e muito mais. Este curso foi cuidadosamente estruturado para levar você desde os conceitos mais básicos até técnicas avançadas de programação.",
    shortDescription: "Domine JavaScript do zero ao avançado com projetos práticos",
    instructor: {
      id: 1,
      name: "Prof. Maria Silva",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Desenvolvedora Full Stack com mais de 8 anos de experiência. Especialista em JavaScript e React.",
    },
    thumbnail: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    students: 1250,
    duration: "40h",
    level: "Iniciante",
    category: "Programação",
    price: 0,
    isPublished: true,
    modules: [
      {
        id: 1,
        title: "Introdução ao JavaScript",
        description: "Fundamentos básicos da linguagem",
        order: 1,
        lessons: [
          { id: 1, title: "O que é JavaScript?", duration: "12:30", type: "video", order: 1 },
          { id: 2, title: "Configurando o Ambiente", duration: "8:45", type: "video", order: 2 },
          { id: 3, title: "Primeiro Programa", duration: "15:20", type: "video", order: 3 },
          { id: 4, title: "Variáveis e Tipos", duration: "18:10", type: "video", order: 4 },
          { id: 5, title: "Quiz - Fundamentos", duration: "5:00", type: "quiz", order: 5 },
        ],
      },
      {
        id: 2,
        title: "Estruturas de Controle",
        description: "Condicionais e loops",
        order: 2,
        lessons: [
          { id: 6, title: "Condicionais (if/else)", duration: "14:25", type: "video", order: 1 },
          { id: 7, title: "Switch Case", duration: "10:30", type: "video", order: 2 },
          { id: 8, title: "Loops - For e While", duration: "16:45", type: "video", order: 3 },
          { id: 9, title: "Break e Continue", duration: "8:20", type: "video", order: 4 },
          { id: 10, title: "Exercícios Práticos", duration: "20:00", type: "text", order: 5 },
          { id: 11, title: "Quiz - Estruturas", duration: "5:00", type: "quiz", order: 6 },
        ],
      },
    ],
    resources: [
      { id: 1, title: "Código Fonte - Módulo 1", type: "zip", url: "#" },
      { id: 2, title: "Slides da Apresentação", type: "pdf", url: "#" },
      { id: 3, title: "Exercícios Extras", type: "pdf", url: "#" },
    ],
    tags: ["JavaScript", "Programação", "Web Development", "Frontend"],
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simula salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[v0] Curso salvo:", course)
    } catch (error) {
      console.error("[v0] Erro ao salvar:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublishToggle = () => {
    setCourse((prev) => ({ ...prev, isPublished: !prev.isPublished }))
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now(),
      title: "Novo Módulo",
      description: "",
      order: course.modules.length + 1,
      lessons: [],
    }
    setCourse((prev) => ({ ...prev, modules: [...prev.modules, newModule] }))
  }

  const addLesson = (moduleId: number) => {
    const newLesson: Lesson = {
      id: Date.now(),
      title: "Nova Aula",
      duration: "0:00",
      type: "video",
      order: 1,
    }

    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: [...module.lessons, { ...newLesson, order: module.lessons.length + 1 }] }
          : module,
      ),
    }))
  }

  const updateModule = (moduleId: number, field: string, value: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module)),
    }))
  }

  const updateLesson = (moduleId: number, lessonId: number, field: string, value: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    }))
  }

  const deleteModule = (moduleId: number) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
  }

  const deleteLesson = (moduleId: number, lessonId: number) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    }))
  }

  const addResource = () => {
    const newResource = {
      id: Date.now(),
      title: "Novo Recurso",
      type: "pdf",
      url: "#",
    }
    setCourse((prev) => ({ ...prev, resources: [...prev.resources, newResource] }))
  }

  const updateResource = (resourceId: number, field: string, value: string) => {
    setCourse((prev) => ({
      ...prev,
      resources: prev.resources.map((resource) =>
        resource.id === resourceId ? { ...resource, [field]: value } : resource,
      ),
    }))
  }

  const deleteResource = (resourceId: number) => {
    setCourse((prev) => ({
      ...prev,
      resources: prev.resources.filter((resource) => resource.id !== resourceId),
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !course.tags.includes(currentTag.trim())) {
      setCourse((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCourse((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleThumbnailUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB.")
      return
    }

    setIsThumbnailUploading(true)
    setThumbnailFile(file)

    try {
      // Criar preview da imagem
      const previewUrl = URL.createObjectURL(file)

      // Simular upload
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setThumbnailPreview(previewUrl)
      setCourse((prev) => ({ ...prev, thumbnail: previewUrl }))
    } catch (error) {
      console.error("[v0] Erro no upload:", error)
      alert("Erro ao fazer upload da imagem.")
    } finally {
      setIsThumbnailUploading(false)
    }
  }

  const removeThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview)
    }
    setThumbnailFile(null)
    setThumbnailPreview(null)
    setCourse((prev) => ({ ...prev, thumbnail: "/placeholder.svg" }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Curso</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie o conteúdo e configurações do curso</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Label htmlFor="publish-toggle" className="text-sm">
              {course.isPublished ? "Publicado" : "Rascunho"}
            </Label>
            <Switch id="publish-toggle" checked={course.isPublished} onCheckedChange={handlePublishToggle} />
          </div>
          <Link href={`/admin/courses/${courseId}/preview`}>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estudantes</p>
                <p className="text-xl font-bold">{course.students.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Módulos</p>
                <p className="text-xl font-bold">{course.modules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                <p className="text-xl font-bold">{course.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avaliação</p>
                <p className="text-xl font-bold">{course.rating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        {/* Informações Básicas */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Curso</Label>
                  <Input
                    id="title"
                    value={course.title}
                    onChange={(e) => setCourse((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Descrição Curta</Label>
                  <Input
                    id="shortDescription"
                    value={course.shortDescription}
                    onChange={(e) => setCourse((prev) => ({ ...prev, shortDescription: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Completa</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={course.description}
                    onChange={(e) => setCourse((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={course.category}
                      onValueChange={(value) => setCourse((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Programação">Programação</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Nível</Label>
                    <Select
                      value={course.level}
                      onValueChange={(value) => setCourse((prev) => ({ ...prev, level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Iniciante">Iniciante</SelectItem>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Avançado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Digite uma tag e pressione Enter"
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-400">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mídia e Instrutor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Thumbnail do Curso</Label>
                  <div className="border-2 border-dashed border-muted-border rounded-lg p-6 text-center space-y-4">
                    <div className="relative">
                      <img
                        src={thumbnailPreview || course.thumbnail || "/placeholder.svg"}
                        alt="Thumbnail"
                        className="w-full h-32 object-cover rounded mx-auto"
                      />
                      {thumbnailPreview && (
                        <button
                          onClick={removeThumbnail}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    {isThumbnailUploading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm text-muted-foreground">Carregando...</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleThumbnailUpload(file)
                            }
                          }}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label htmlFor="thumbnail-upload">
                          <Button variant="outline" asChild>
                            <span className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              {thumbnailPreview ? "Alterar Imagem" : "Fazer Upload"}
                            </span>
                          </Button>
                        </label>
                        {thumbnailFile && (
                          <p className="text-xs text-muted-foreground">
                            {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Informações do Instrutor</h3>

                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Alterar Foto
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructorName">Nome do Instrutor</Label>
                    <Input
                      id="instructorName"
                      value={course.instructor.name}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          instructor: { ...prev.instructor, name: e.target.value },
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructorBio">Biografia</Label>
                    <Textarea
                      id="instructorBio"
                      rows={3}
                      value={course.instructor.bio}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          instructor: { ...prev.instructor, bio: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conteúdo */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Módulos e Aulas</CardTitle>
                <Button onClick={addModule}>
                  <X className="h-4 w-4 mr-2" />
                  Adicionar Módulo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <Accordion type="multiple" className="w-full space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`} className="border rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex items-center justify-between w-full mr-4">
                          <div className="flex items-center space-x-3">
                            <X className="h-4 w-4 text-gray-400" />
                            <div className="text-left">
                              <p className="font-medium">{module.title}</p>
                              <p className="text-sm text-gray-500">{module.lessons.length} aulas</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteModule(module.id)
                              }}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4">
                          {/* Editar informações do módulo */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="space-y-2">
                              <Label>Título do Módulo</Label>
                              <Input
                                value={module.title}
                                onChange={(e) => updateModule(module.id, "title", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Descrição</Label>
                              <Input
                                value={module.description || ""}
                                onChange={(e) => updateModule(module.id, "description", e.target.value)}
                                placeholder="Descrição opcional do módulo"
                              />
                            </div>
                          </div>

                          {/* Lista de aulas */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Aulas</h4>
                              <Button variant="outline" size="sm" onClick={() => addLesson(module.id)}>
                                <X className="h-4 w-4 mr-2" />
                                Adicionar Aula
                              </Button>
                            </div>

                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                <X className="h-4 w-4 text-gray-400" />

                                <div className="flex-shrink-0">
                                  {lesson.type === "video" ? (
                                    <X className="h-4 w-4 text-blue-500" />
                                  ) : lesson.type === "quiz" ? (
                                    <X className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <X className="h-4 w-4 text-gray-500" />
                                  )}
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                                  <Input
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                                    placeholder="Título da aula"
                                  />
                                  <Input
                                    value={lesson.duration}
                                    onChange={(e) => updateLesson(module.id, lesson.id, "duration", e.target.value)}
                                    placeholder="00:00"
                                  />
                                  <Select
                                    value={lesson.type}
                                    onValueChange={(value) => updateLesson(module.id, lesson.id, "type", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">Vídeo</SelectItem>
                                      <SelectItem value="text">Texto</SelectItem>
                                      <SelectItem value="quiz">Quiz</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => console.log("[v0] Editar aula:", lesson.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => deleteLesson(module.id, lesson.id)}
                                    >
                                      <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recursos */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recursos do Curso</CardTitle>
                <Button onClick={addResource}>
                  <X className="h-4 w-4 mr-2" />
                  Adicionar Recurso
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.resources.map((resource) => (
                <div key={resource.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <X className="h-5 w-5 text-gray-500" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      value={resource.title}
                      onChange={(e) => updateResource(resource.id, "title", e.target.value)}
                      placeholder="Título do recurso"
                    />
                    <Select value={resource.type} onValueChange={(value) => updateResource(resource.id, "type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="zip">ZIP</SelectItem>
                        <SelectItem value="doc">DOC</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteResource(resource.id)}>
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="published">Status de Publicação</Label>
                    <p className="text-sm text-gray-500">
                      {course.isPublished ? "Curso visível para estudantes" : "Curso em modo rascunho"}
                    </p>
                  </div>
                  <Switch id="published" checked={course.isPublished} onCheckedChange={handlePublishToggle} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={course.price}
                    onChange={(e) => setCourse((prev) => ({ ...prev, price: Number(e.target.value) }))}
                  />
                  <p className="text-sm text-gray-500">Deixe 0 para curso gratuito</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração Total</Label>
                  <Input
                    id="duration"
                    value={course.duration}
                    onChange={(e) => setCourse((prev) => ({ ...prev, duration: e.target.value }))}
                    placeholder="Ex: 40h"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {course.students.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Estudantes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{course.rating}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avaliação</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Ações Avançadas</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <X className="h-4 w-4 mr-2" />
                      Configurações Avançadas
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Excluir Curso
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
