"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Plus, Upload, Play, Loader2, Trash2, HelpCircle } from "lucide-react"

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: string
  description: string
  videoFile?: string
  videoPreview?: string
  isUploading?: boolean
}

export function CourseCreationForm() {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showLearningStylesModal, setShowLearningStylesModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    learningStyle: "",
    instructor: "",
    thumbnail: "",
    tags: [] as string[],
  })
  const [instructorData, setInstructorData] = useState({
    name: "",
    photo: "",
    description: "",
  })
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const [instructorPhotoPreview, setInstructorPhotoPreview] = useState<string>("")
  const [instructorPhotoUploading, setInstructorPhotoUploading] = useState(false)
  const [modules, setModules] = useState<Module[]>([])
  const [currentTag, setCurrentTag] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInstructorChange = (field: string, value: string) => {
    setInstructorData((prev) => ({ ...prev, [field]: value }))
  }

  const handleThumbnailUpload = async (file: File) => {
    setThumbnailUploading(true)
    try {
      const previewUrl = URL.createObjectURL(file)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setThumbnailPreview(previewUrl)
      setFormData((prev) => ({ ...prev, thumbnail: file.name }))
    } catch (error) {
      console.error("Error uploading thumbnail:", error)
    } finally {
      setThumbnailUploading(false)
    }
  }

  const removeThumbnail = () => {
    setThumbnailPreview("")
    setFormData((prev) => ({ ...prev, thumbnail: "" }))
  }

  const handleInstructorPhotoUpload = async (file: File) => {
    setInstructorPhotoUploading(true)
    try {
      const previewUrl = URL.createObjectURL(file)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setInstructorPhotoPreview(previewUrl)
      setInstructorData((prev) => ({ ...prev, photo: file.name }))
    } catch (error) {
      console.error("Error uploading instructor photo:", error)
    } finally {
      setInstructorPhotoUploading(false)
    }
  }

  const removeInstructorPhoto = () => {
    setInstructorPhotoPreview("")
    setInstructorData((prev) => ({ ...prev, photo: "" }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: "",
      lessons: [],
    }
    setModules((prev) => [...prev, newModule])
  }

  const updateModule = (moduleId: string, title: string) => {
    setModules((prev) => prev.map((module) => (module.id === moduleId ? { ...module, title } : module)))
  }

  const removeModule = (moduleId: string) => {
    setModules((prev) => prev.filter((module) => module.id !== moduleId))
  }

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: "",
      duration: "",
      description: "",
    }
    setModules((prev) =>
      prev.map((module) => (module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module)),
    )
  }

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    )
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Course data:", { ...formData, instructorData, modules })
    router.push("/admin")
  }

  const handleSaveDraft = () => {
    console.log("Saving draft:", { ...formData, instructorData, modules, status: "draft" })
    alert("Rascunho salvo com sucesso!")
  }

  const handleCancel = () => {
    router.push("/admin")
  }

  const handleDeleteCourse = () => {
    setShowDeleteModal(true)
  }

  const confirmDeleteCourse = () => {
    console.log("Deleting course...")
    setShowDeleteModal(false)
    router.push("/admin")
  }

  const handleVideoUpload = async (moduleId: string, lessonId: string, file: File) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, isUploading: true } : lesson,
              ),
            }
          : module,
      ),
    )

    try {
      const previewUrl = URL.createObjectURL(file)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setModules((prev) =>
        prev.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.map((lesson) =>
                  lesson.id === lessonId
                    ? {
                        ...lesson,
                        videoFile: file.name,
                        videoPreview: previewUrl,
                        isUploading: false,
                      }
                    : lesson,
                ),
              }
            : module,
        ),
      )
    } catch (error) {
      setModules((prev) =>
        prev.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.map((lesson) =>
                  lesson.id === lessonId ? { ...lesson, isUploading: false } : lesson,
                ),
              }
            : module,
        ),
      )
    }
  }

  const removeVideo = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      videoFile: undefined,
                      videoPreview: undefined,
                      isUploading: false,
                    }
                  : lesson,
              ),
            }
          : module,
      ),
    )
  }

  return (
    <>
      <div className="mb-6">
              <h1 className="text-3xl font-bold dark:text-white">Criar Novo Curso</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Preencha as informações para criar um novo curso</p>
            </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Título do Curso *</label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: JavaScript Completo - Do Básico ao Avançado"
                className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descrição *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva o que os alunos aprenderão neste curso..."
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Categoria *</label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent className="text-slate-700 dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem 
                      value="programacao"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Programação</SelectItem>
                    <SelectItem 
                      value="data-science"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Data Science</SelectItem>
                    <SelectItem 
                      value="design"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Design</SelectItem>
                    <SelectItem 
                      value="mobile"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Mobile</SelectItem>
                    <SelectItem 
                      value="web"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Web Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nível *</label>
                <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                  <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent className="text-slate-700 dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem 
                      value="iniciante"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Iniciante</SelectItem>
                    <SelectItem 
                      value="intermediario"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Intermediário</SelectItem>
                    <SelectItem 
                      value="avancado"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Estilo de Aprendizagem *</label>
                  <Button
                    type="button"
                    onClick={() => setShowLearningStylesModal(true)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6 mb-1 text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </div>
                <Select
                  value={formData.learningStyle}
                  onValueChange={(value) => handleInputChange("learningStyle", value)}
                >
                  <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                    <SelectValue placeholder="Selecione o estilo" />
                  </SelectTrigger>
                  <SelectContent className="text-slate-700 dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem 
                      value="pragmatico"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                      >Pragmático</SelectItem>
                    <SelectItem 
                      value="teorico"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                      >Teórico</SelectItem>
                    <SelectItem 
                      value="ativista"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Ativista</SelectItem>
                    <SelectItem 
                      value="reflexivo"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >Reflexivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Thumbnail do Curso</label>
              <div className="space-y-3">
                {thumbnailUploading ? (
                  <div className="flex items-center gap-2 p-4 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                    <Loader2 className="w-5 h-5 animate-spin text-red-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Carregando thumbnail...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleThumbnailUpload(file)
                        }
                      }}
                      className="text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white file:bg-slate-300 file:text-slate-800 dark:file:bg-slate-600 dark:file:text-white file:border-0 file:rounded file:px-2 file:py-1"
                    />
                    <Upload className="w-5 h-5 dark:text-slate-400" />
                  </div>
                )}

                {thumbnailPreview && !thumbnailUploading && (
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium dark:text-slate-300">Preview da Thumbnail:</span>
                      <Button
                        type="button"
                        onClick={removeThumbnail}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7 bg-transparent"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Preview da thumbnail"
                      className="w-full max-w-sm h-32 object-cover rounded-lg dark:bg-slate-700"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tags</label>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Digite uma tag e pressione Enter"
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white flex-1"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="dark:border-slate-700 dark:text-slate-300 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
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

        {/* Informações do Instrutor */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Informações do Instrutor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome do Instrutor *</label>
                <Input
                  value={instructorData.name}
                  onChange={(e) => handleInstructorChange("name", e.target.value)}
                  placeholder="Ex: Prof. Maria Silva"
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foto do Instrutor</label>
                <div className="space-y-3">
                  {instructorPhotoUploading ? (
                    <div className="flex items-center gap-2 p-3 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                      <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Carregando foto...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleInstructorPhotoUpload(file)
                          }
                        }}
                        className="dark:bg-slate-800 dark:border-slate-700 text-slate-500 dark:text-white file:bg-slate-300 dark:file:bg-slate-600 file:text-slate-800 dark:file:text-white file:border-0 file:rounded file:px-2 file:py-1"
                      />
                      <Upload className="w-5 h-5 dark:text-slate-400" />
                    </div>
                  )}

                  {instructorPhotoPreview && !instructorPhotoUploading && (
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview do Avatar:</span>
                        <Button
                          type="button"
                          onClick={removeInstructorPhoto}
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7 bg-transparent"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={instructorPhotoPreview || "/placeholder.svg"}
                          alt="Preview do avatar do instrutor"
                          className="w-16 h-16 rounded-full object-cover dark:bg-slate-700 border-2 dark:border-slate-600"
                        />
                        <span className="text-xs text-slate-700 dark:text-slate-400">{instructorData.photo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descrição do Instrutor</label>
              <Textarea
                value={instructorData.description}
                onChange={(e) => handleInstructorChange("description", e.target.value)}
                placeholder="Descreva a experiência e qualificações do instrutor..."
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Módulos e Aulas */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="dark:text-white">Módulos e Aulas</CardTitle>
            <Button
              type="button"
              onClick={addModule}
              variant="outline"
              size="sm"
              className="dark:border-slate-700 dark:text-slate-300 bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Módulo
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module, moduleIndex) => (
              <div key={module.id} className="border bg-slate-100 dark:bg-slate-800 dark:border-slate-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      value={module.title}
                      onChange={(e) => updateModule(module.id, e.target.value)}
                      placeholder={`Módulo ${moduleIndex + 1}: Título do módulo`}
                      className="dark:bg-slate-700 border-slate-300 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeModule(module.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                <div className="ml-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium dark:text-slate-300">Aulas</h4>
                    <Button
                      type="button"
                      onClick={() => addLesson(module.id)}
                      variant="outline"
                      size="sm"
                      className="dark:border-slate-700 dark:text-slate-300"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Adicionar Aula
                    </Button>
                  </div>

                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="p-4 dark:bg-slate-800 rounded-lg space-y-3">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 dark:text-slate-400" />
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            value={lesson.title}
                            onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                            placeholder={`Aula ${lessonIndex + 1}: Título da aula`}
                            className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-white"
                          />
                          <Input
                            value={lesson.duration}
                            onChange={(e) => updateLesson(module.id, lesson.id, "duration", e.target.value)}
                            placeholder="Duração (ex: 15:30)"
                            className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-white"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeLesson(module.id, lesson.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-2">Descrição da Aula</label>
                        <Textarea
                          value={lesson.description}
                          onChange={(e) => updateLesson(module.id, lesson.id, "description", e.target.value)}
                          placeholder="Descreva o conteúdo desta aula..."
                          className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-white min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium dark:text-slate-300">Vídeo da Aula:</label>
                          <div className="flex-1">
                            {lesson.isUploading ? (
                              <div className="flex items-center gap-2 p-3 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600">
                                <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Carregando vídeo...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      handleVideoUpload(module.id, lesson.id, file)
                                    }
                                  }}
                                  className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-white file:bg-slate-400 dark:file:bg-slate-600 file:text-slate-800 dark:file:text-white file:border-0 file:rounded file:px-2 file:py-1"
                                />
                                <Upload className="w-4 h-4 dark:text-slate-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        {lesson.videoPreview && !lesson.isUploading && (
                          <div className="bg-slate-200 dark:bg-slate-700 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium dark:text-slate-300">Pré-visualização:</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 dark:text-slate-400">{lesson.videoFile}</span>
                                <Button
                                  type="button"
                                  onClick={() => removeVideo(module.id, lesson.id)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-6 w-6"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <video
                              src={lesson.videoPreview}
                              controls
                              className="w-full max-w-md h-32 bg-black rounded"
                              preload="metadata"
                            >
                              Seu navegador não suporta o elemento de vídeo.
                            </video>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-4">
            <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="border-slate-300 dark:border-slate-700 dark:text-slate-300 bg-transparent"
                >
                    Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Criar Curso
            </Button>
        </div>
      </form>

      {/* Modal de Explicação dos Estilos de Aprendizagem */}
      <Dialog open={showLearningStylesModal} onOpenChange={setShowLearningStylesModal}>
        <DialogContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-blue-600 dark:text-blue-400">Estilos de Aprendizagem</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-300">
              Entenda as características de cada estilo de aprendizagem para escolher o mais adequado ao seu curso.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">🎯 Pragmático</h3>
              <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
                Focado na aplicação prática do conhecimento. Prefere aprender através de exemplos reais, estudos de caso
                e exercícios práticos. Ideal para cursos que enfatizam a implementação e uso imediato das habilidades
                aprendidas.
              </p>
            </div>

            <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">📚 Teórico</h3>
              <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
                Valoriza a compreensão profunda dos conceitos e princípios fundamentais. Prefere explicações detalhadas,
                modelos conceituais e a lógica por trás das práticas. Ideal para cursos com forte base conceitual e
                científica.
              </p>
            </div>

            <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">⚡ Ativista</h3>
              <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
                Aprende melhor através da experiência direta e participação ativa. Prefere atividades hands-on, projetos
                colaborativos e experimentação. Ideal para cursos interativos com muita prática e experimentação.
              </p>
            </div>

            <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">🤔 Reflexivo</h3>
              <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
                Prefere observar e refletir antes de agir. Valoriza o tempo para processar informações e considerar
                diferentes perspectivas. Ideal para cursos que incentivam a análise crítica e a reflexão profunda sobre
                os temas abordados.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setShowLearningStylesModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
