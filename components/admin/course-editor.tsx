"use client"

import type React from "react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Upload, Loader2, Plus, Play, ChevronDown, ChevronRight, Clock, Star, Trash2, FileText } from "lucide-react"
import Link from "next/link"
import { ArrowLeft, Eye, Save, Users, BookOpen } from "lucide-react"

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
  videoFile?: File
  videoPreview?: string
  isUploading?: boolean
}

interface Module {
  id: number
  title: string
  description: string
  lessons: Lesson[]
}

interface Resource {
  id: number
  title: string
  type: "pdf"
  url: string
  file?: File
  isUploading?: boolean
}

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  tags: string[]
  instructor: {
    name: string
    bio: string
    avatar: string
  }
  modules: Module[]
  resources: Resource[]
  isPublished: boolean
  students: number
  rating: number
  reviews: number
}

export function CourseEditor({ courseId }: CourseEditorProps) {
  const [showDeleteModuleModal, setShowDeleteModuleModal] = useState(false)
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [moduleToDelete, setModuleToDelete] = useState<number | null>(null)
  const [lessonToDelete, setLessonToDelete] = useState<{ moduleId: number; lessonId: number } | null>(null)

  const [course, setCourse] = useState<Course>({
    id: courseId,
    title: "JavaScript Completo - Do Básico ao Avançado",
    description: "Aprenda JavaScript desde os conceitos básicos até técnicas avançadas de programação.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Programação",
    level: "Intermediário",
    tags: ["JavaScript", "Web Development", "Frontend"],
    instructor: {
      name: "Prof. Maria Silva",
      bio: "Desenvolvedora Full Stack com mais de 8 anos de experiência em JavaScript e tecnologias web.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    modules: [
      {
        id: 1,
        title: "Introdução ao JavaScript",
        description: "Conceitos básicos e fundamentos da linguagem",
        lessons: [
          {
            id: 1,
            title: "O que é JavaScript?",
            duration: "15:30",
            type: "video",
            videoUrl: "https://example.com/video1",
            description: "Uma introdução completa ao JavaScript e sua importância no desenvolvimento web.",
          },
          {
            id: 2,
            title: "Configurando o Ambiente",
            duration: "12:45",
            type: "video",
            videoUrl: "https://example.com/video2",
            description: "Como configurar seu ambiente de desenvolvimento para JavaScript.",
          },
        ],
      },
    ],
    resources: [
      {
        id: 1,
        title: "Guia de Referência JavaScript",
        type: "pdf",
        url: "https://example.com/guide.pdf",
      },
    ],
    isPublished: true,
    students: 1250,
    rating: 4.8,
    reviews: 324,
  })

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)

  const [instructorPhotoFile, setInstructorPhotoFile] = useState<File | null>(null)
  const [instructorPhotoPreview, setInstructorPhotoPreview] = useState<string | null>(null)
  const [instructorPhotoUploading, setInstructorPhotoUploading] = useState(false)

  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set())
  const [newTag, setNewTag] = useState("")

  const handleThumbnailUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 5MB.")
      return
    }

    setThumbnailUploading(true)
    setThumbnailFile(file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setThumbnailPreview(previewUrl)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setCourse((prev) => ({ ...prev, thumbnail: previewUrl }))
    setThumbnailUploading(false)
  }

  const removeThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview)
    }
    setThumbnailFile(null)
    setThumbnailPreview(null)
    setCourse((prev) => ({ ...prev, thumbnail: "/placeholder.svg?height=200&width=300" }))
  }

  const handleInstructorPhotoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 5MB.")
      return
    }

    setInstructorPhotoUploading(true)
    setInstructorPhotoFile(file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setInstructorPhotoPreview(previewUrl)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setCourse((prev) => ({
      ...prev,
      instructor: { ...prev.instructor, avatar: previewUrl },
    }))
    setInstructorPhotoUploading(false)
  }

  const removeInstructorPhoto = () => {
    if (instructorPhotoPreview) {
      URL.revokeObjectURL(instructorPhotoPreview)
    }
    setInstructorPhotoFile(null)
    setInstructorPhotoPreview(null)
    setCourse((prev) => ({
      ...prev,
      instructor: { ...prev.instructor, avatar: "/placeholder.svg?height=100&width=100" },
    }))
  }

  const handlePublishToggle = () => {
    setShowPublishModal(true)
  }

  const confirmPublishToggle = () => {
    setCourse((prev) => ({ ...prev, isPublished: !prev.isPublished }))
    setShowPublishModal(false)
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now(),
      title: "Novo Módulo",
      description: "Descrição do módulo",
      lessons: [],
    }
    setCourse((prev) => ({ ...prev, modules: [...prev.modules, newModule] }))
  }

  const updateModule = (moduleId: number, field: keyof Module, value: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module)),
    }))
  }

  const addLesson = (moduleId: number) => {
    const newLesson: Lesson = {
      id: Date.now(),
      title: "Nova Aula",
      duration: "00:00",
      type: "video",
      description: "Descrição da aula",
    }
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module,
      ),
    }))
  }

  const updateLesson = (moduleId: number, lessonId: number, field: keyof Lesson, value: any) => {
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
    setModuleToDelete(moduleId)
    setShowDeleteModuleModal(true)
  }

  const confirmDeleteModule = () => {
    if (moduleToDelete) {
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.filter((module) => module.id !== moduleToDelete),
      }))
      setModuleToDelete(null)
      setShowDeleteModuleModal(false)
    }
  }

  const deleteLesson = (moduleId: number, lessonId: number) => {
    setLessonToDelete({ moduleId, lessonId })
    setShowDeleteLessonModal(true)
  }

  const confirmDeleteLesson = () => {
    if (lessonToDelete) {
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.map((module) =>
          module.id === lessonToDelete.moduleId
            ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonToDelete.lessonId) }
            : module,
        ),
      }))
      setLessonToDelete(null)
      setShowDeleteLessonModal(false)
    }
  }

  const addResource = () => {
    const newResource: Resource = {
      id: Date.now(),
      title: "Novo Recurso",
      type: "pdf",
      url: "",
    }
    setCourse((prev) => ({ ...prev, resources: [...prev.resources, newResource] }))
  }

  const updateResource = (resourceId: number, field: keyof Resource, value: any) => {
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

  const toggleLessonExpansion = (lessonId: number) => {
    setExpandedLessons((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId)
      } else {
        newSet.add(lessonId)
      }
      return newSet
    })
  }

  const handleVideoUpload = async (moduleId: number, lessonId: number, file: File) => {
    if (!file.type.startsWith("video/")) {
      alert("Por favor, selecione apenas arquivos de vídeo.")
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 100MB.")
      return
    }

    // Set uploading state
    updateLesson(moduleId, lessonId, "isUploading", true)
    updateLesson(moduleId, lessonId, "videoFile", file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    updateLesson(moduleId, lessonId, "videoPreview", previewUrl)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Update lesson with video URL and clear uploading state
    updateLesson(moduleId, lessonId, "videoUrl", previewUrl)
    updateLesson(moduleId, lessonId, "isUploading", false)
  }

  const removeVideo = (moduleId: number, lessonId: number) => {
    const lesson = course.modules.find((m) => m.id === moduleId)?.lessons.find((l) => l.id === lessonId)

    if (lesson?.videoPreview) {
      URL.revokeObjectURL(lesson.videoPreview)
    }

    updateLesson(moduleId, lessonId, "videoFile", undefined)
    updateLesson(moduleId, lessonId, "videoPreview", undefined)
    updateLesson(moduleId, lessonId, "videoUrl", undefined)
  }

  const addTag = () => {
    if (newTag.trim() && !course.tags.includes(newTag.trim())) {
      setCourse((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCourse((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const removeResource = (resourceId: number) => {
    setCourse((prev) => ({
      ...prev,
      resources: prev.resources.filter((resource) => resource.id !== resourceId),
    }))
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
            <h1 className="text-2xl font-bold">Editar Curso</h1>
            <p className="text-muted-foreground">Gerencie o conteúdo e configurações do curso</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={course.isPublished ? "default" : "secondary"}>
            {course.isPublished ? "Publicado" : "Rascunho"}
          </Badge>
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
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Estudantes</p>
                <p className="text-2xl font-bold">{course.students.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Módulos</p>
                <p className="text-2xl font-bold">{course.modules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Play className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Aulas</p>
                <p className="text-2xl font-bold">
                  {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Total de Horas</p>
                <p className="text-2xl font-bold">
                  {(() => {
                    const totalMinutes = course.modules.reduce((acc, module) => {
                      return (
                        acc +
                        module.lessons.reduce((lessonAcc, lesson) => {
                          if (lesson.duration) {
                            const [minutes, seconds] = lesson.duration.split(":").map(Number)
                            return lessonAcc + minutes + seconds / 60
                          }
                          return lessonAcc
                        }, 0)
                      )
                    }, 0)
                    return Math.round((totalMinutes / 60) * 10) / 10 // Convert to hours with 1 decimal
                  })()}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Avaliação</p>
                <p className="text-2xl font-bold">{course.rating || "4.8"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Informações do Curso */}
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
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={course.description}
                      onChange={(e) => setCourse((prev) => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Nível</Label>
                      <Select
                        value={course.level}
                        onValueChange={(value: "Iniciante" | "Intermediário" | "Avançado") =>
                          setCourse((prev) => ({ ...prev, level: value }))
                        }
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
                    <Label>Tags</Label>
                    <div className="flex items-center gap-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        placeholder="Digite uma tag..."
                        className="flex-1"
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnail */}
              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail do Curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Thumbnail do Curso</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      {thumbnailUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                          <p className="text-sm text-muted-foreground">Carregando imagem...</p>
                        </div>
                      ) : thumbnailPreview ? (
                        <div className="relative">
                          <img
                            src={thumbnailPreview || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            className="max-w-full h-48 object-cover rounded-lg mx-auto"
                          />
                          <Button
                            type="button"
                            onClick={removeThumbnail}
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt="Thumbnail"
                            className="max-w-full h-48 object-cover rounded-lg mx-auto"
                          />
                          <div className="flex justify-center">
                            <label htmlFor="thumbnail-upload" className="cursor-pointer">
                              <Button type="button" variant="outline" asChild>
                                <span>
                                  <Upload className="w-4 h-4 mr-2" />
                                  Alterar Imagem
                                </span>
                              </Button>
                              <input
                                id="thumbnail-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleThumbnailUpload(file)
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instrutor */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instrutor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Informações do Instrutor</h3>

                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {instructorPhotoUploading ? (
                          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                          </div>
                        ) : (
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={instructorPhotoPreview || course.instructor.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        {instructorPhotoPreview && (
                          <Button
                            type="button"
                            onClick={removeInstructorPhoto}
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1">
                        <label htmlFor="instructor-photo-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              {instructorPhotoPreview ? "Alterar Foto" : "Adicionar Foto"}
                            </span>
                          </Button>
                          <input
                            id="instructor-photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleInstructorPhotoUpload(file)
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Nome do Instrutor</Label>
                      <Input
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
                      <Label>Biografia</Label>
                      <Textarea
                        value={course.instructor.bio}
                        onChange={(e) =>
                          setCourse((prev) => ({
                            ...prev,
                            instructor: { ...prev.instructor, bio: e.target.value },
                          }))
                        }
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Módulos e Aulas</CardTitle>
                <Button onClick={addModule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Módulo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-4">
                {course.modules.map((module, moduleIndex) => (
                  <AccordionItem key={module.id} value={`module-${module.id}`} className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                            {moduleIndex + 1}
                          </div>
                          <div className="text-left">
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.lessons.length} aulas</p>
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
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        {/* Editar informações do módulo */}
                        <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="space-y-2">
                            <Label>Título do Módulo</Label>
                            <Input
                              value={module.title}
                              onChange={(e) => updateModule(module.id, "title", e.target.value)}
                              className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                          </div>
                        </div>

                        {/* Lista de aulas */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Aulas</h4>
                            <Button variant="outline" size="sm" onClick={() => addLesson(module.id)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Adicionar Aula
                            </Button>
                          </div>

                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="p-4 bg-muted rounded-lg space-y-3">
                              <div className="flex items-center justify-between">
                                <div
                                  className="flex items-center gap-3 flex-1 cursor-pointer"
                                  onClick={() => toggleLessonExpansion(lesson.id)}
                                >
                                  {expandedLessons.has(lesson.id) ? (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  )}
                                  <Play className="w-4 h-4 text-muted-foreground" />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{lesson.title}</span>
                                      {lesson.duration && (
                                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteLesson(module.id, lesson.id)
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground p-1 h-7 w-7"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>

                              {expandedLessons.has(lesson.id) && (
                                <div className="p-4 border-t bg-muted/20 space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                      <Label className="text-sm font-medium dark:text-slate-300 mb-2">
                                        Título da Aula *
                                      </Label>
                                      <Input
                                        value={lesson.title}
                                        onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                                        placeholder="Título da aula"
                                        className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium dark:text-slate-300 mb-2">Duração</Label>
                                      <Input
                                        value={lesson.duration}
                                        onChange={(e) => updateLesson(module.id, lesson.id, "duration", e.target.value)}
                                        placeholder="Duração (ex: 15:30)"
                                        className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium dark:text-slate-300 mb-2">Descrição da Aula</Label>
                                    <Textarea
                                      value={lesson.description || ""}
                                      onChange={(e) =>
                                        updateLesson(module.id, lesson.id, "description", e.target.value)
                                      }
                                      placeholder="Descreva o conteúdo desta aula..."
                                      className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                      rows={3}
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium dark:text-slate-300 mb-2">Vídeo da Aula</Label>

                                    {lesson.isUploading ? (
                                      <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-700 rounded-lg">
                                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                                        <div className="flex-1">
                                          <p className="text-sm font-medium dark:text-slate-300">Carregando vídeo...</p>
                                          <p className="text-xs dark:text-slate-400">Por favor, aguarde</p>
                                        </div>
                                      </div>
                                    ) : lesson.videoPreview ? (
                                      <div className="bg-white border border-slate-200 dark:bg-slate-700 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium dark:text-slate-300">Pré-visualização:</span>
                                          <Button
                                            type="button"
                                            onClick={() => removeVideo(module.id, lesson.id)}
                                            variant="destructive"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                          >
                                            <X className="w-3 h-3" />
                                          </Button>
                                        </div>
                                        <video src={lesson.videoPreview} controls className="w-full max-h-48 rounded" />
                                      </div>
                                    ) : (
                                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center bg-white dark:bg-slate-700/50">
                                        <Upload className="w-8 h-8 dark:text-slate-400 mx-auto mb-2" />
                                        <p className="text-sm dark:text-slate-300 mb-2">Clique para fazer upload do vídeo</p>
                                        <p className="text-xs dark:text-slate-400 mb-3">MP4, AVI, MOV até 100MB</p>
                                        <label htmlFor={`video-upload-${lesson.id}`} className="cursor-pointer">
                                          <Button type="button" variant="outline" size="sm" asChild>
                                            <span>Selecionar Vídeo</span>
                                          </Button>
                                          <input
                                            id={`video-upload-${lesson.id}`}
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0]
                                              if (file) handleVideoUpload(module.id, lesson.id, file)
                                            }}
                                          />
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recursos */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recursos do Curso</CardTitle>
                <Button onClick={addResource}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Recurso
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {course.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="group relative bg-card border border-border rounded-xl p-6"
                  >
                    {/* Header with title and actions */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 mr-4">
                        <Input
                          value={resource.title}
                          onChange={(e) => updateResource(resource.id, "title", e.target.value)}
                          placeholder="Digite o título do recurso..."
                          className="text-lg font-medium border bg-slate-50 dark:bg-slate-900 focus-visible:ring-0 placeholder:text-muted-foreground/60"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeResource(resource.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Upload Area */}
                    <div className="space-y-4">
                      {!resource.url ? (
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                if (file.type !== "application/pdf") {
                                  alert("Por favor, selecione apenas arquivos PDF.")
                                  return
                                }
                                if (file.size > 10 * 1024 * 1024) {
                                  alert("O arquivo deve ter no máximo 10MB.")
                                  return
                                }

                                updateResource(resource.id, "isUploading", true)

                                setTimeout(() => {
                                  const url = URL.createObjectURL(file)
                                  updateResource(resource.id, "url", url)
                                  updateResource(resource.id, "file", file)
                                  updateResource(resource.id, "isUploading", false)
                                }, 2000)
                              }
                            }}
                            className="hidden"
                            id={`pdf-upload-${resource.id}`}
                          />

                          {resource.isUploading ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                              <p className="text-sm text-muted-foreground">Carregando arquivo...</p>
                            </div>
                          ) : (
                            <label
                              htmlFor={`pdf-upload-${resource.id}`}
                              className="cursor-pointer flex flex-col items-center gap-3"
                            >
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">Clique para fazer upload</p>
                                <p className="text-sm text-muted-foreground">Apenas arquivos PDF até 10MB</p>
                              </div>
                            </label>
                          )}
                        </div>
                      ) : (
                        /* File Preview */
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {resource.file?.name || "Arquivo PDF"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {resource.file ? `${(resource.file.size / 1024 / 1024).toFixed(2)} MB` : "PDF"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  updateResource(resource.id, "url", "")
                                  updateResource(resource.id, "file", undefined)
                                }}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
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
                  <Label>Estatísticas</Label>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Estudantes Inscritos</p>
                      <p className="text-2xl font-bold text-blue-600">{course.students.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Avaliação Média</p>
                      <p className="text-2xl font-bold text-yellow-600">{course.rating}</p>
                    </div>
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

      {/* Delete Module Modal */}
      <Dialog open={showDeleteModuleModal} onOpenChange={setShowDeleteModuleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão do Módulo</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este módulo? Esta ação não pode ser desfeita e todas as aulas do módulo
              também serão removidas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModuleModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteModule}>
              Excluir Módulo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Lesson Modal */}
      <Dialog open={showDeleteLessonModal} onOpenChange={setShowDeleteLessonModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão da Aula</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita e todo o conteúdo da aula será
              perdido.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteLessonModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteLesson}>
              Excluir Aula
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Toggle Modal */}
      <Dialog open={showPublishModal} onOpenChange={setShowPublishModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{course.isPublished ? "Despublicar Curso" : "Publicar Curso"}</DialogTitle>
            <DialogDescription>
              {course.isPublished
                ? "Tem certeza que deseja despublicar este curso? Ele ficará invisível para os estudantes até ser publicado novamente."
                : "Tem certeza que deseja publicar este curso? Ele ficará visível para todos os estudantes na plataforma."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmPublishToggle}>{course.isPublished ? "Despublicar" : "Publicar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
