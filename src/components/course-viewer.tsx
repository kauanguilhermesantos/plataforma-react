"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  CheckCircle,
  Clock,
  FileText,
  Download,
  MessageCircle,
  ThumbsUp,
  Share,
  Bookmark,
  Star,
  Users,
  Calendar,
} from "lucide-react"

interface CourseViewerProps {
  courseId: string
}

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "text" | "quiz"
  completed: boolean
  videoUrl?: string
  description?: string
}

interface Module {
  id: number
  title: string
  lessons: Lesson[]
  completed: number
  total: number
}

interface Course {
  id: number
  title: string
  description: string
  instructor: {
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
  progress: number
  modules: Module[]
  resources: Array<{
    id: number
    title: string
    type: string
    url: string
  }>
}

export function CourseViewer({ courseId }: CourseViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)

  // Dados simulados do curso
  const course: Course = {
    id: Number.parseInt(courseId),
    title: "JavaScript Completo - Do Básico ao Avançado",
    description:
      "Aprenda JavaScript desde os fundamentos até conceitos avançados como async/await, closures e muito mais.",
    instructor: {
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
    progress: 35,
    modules: [
      {
        id: 1,
        title: "Introdução ao JavaScript",
        completed: 3,
        total: 5,
        lessons: [
          { id: 1, title: "O que é JavaScript?", duration: "12:30", type: "video", completed: true },
          { id: 2, title: "Configurando o Ambiente", duration: "8:45", type: "video", completed: true },
          { id: 3, title: "Primeiro Programa", duration: "15:20", type: "video", completed: true },
          { id: 4, title: "Variáveis e Tipos", duration: "18:10", type: "video", completed: false },
          { id: 5, title: "Quiz - Fundamentos", duration: "5:00", type: "quiz", completed: false },
        ],
      },
      {
        id: 2,
        title: "Estruturas de Controle",
        completed: 0,
        total: 6,
        lessons: [
          { id: 6, title: "Condicionais (if/else)", duration: "14:25", type: "video", completed: false },
          { id: 7, title: "Switch Case", duration: "10:30", type: "video", completed: false },
          { id: 8, title: "Loops - For e While", duration: "16:45", type: "video", completed: false },
          { id: 9, title: "Break e Continue", duration: "8:20", type: "video", completed: false },
          { id: 10, title: "Exercícios Práticos", duration: "20:00", type: "text", completed: false },
          { id: 11, title: "Quiz - Estruturas", duration: "5:00", type: "quiz", completed: false },
        ],
      },
      {
        id: 3,
        title: "Funções",
        completed: 0,
        total: 4,
        lessons: [
          { id: 12, title: "Declaração de Funções", duration: "12:15", type: "video", completed: false },
          { id: 13, title: "Parâmetros e Argumentos", duration: "14:30", type: "video", completed: false },
          { id: 14, title: "Arrow Functions", duration: "11:45", type: "video", completed: false },
          { id: 15, title: "Escopo e Closures", duration: "18:20", type: "video", completed: false },
        ],
      },
    ],
    resources: [
      { id: 1, title: "Código Fonte - Módulo 1", type: "zip", url: "#" },
      { id: 2, title: "Slides da Apresentação", type: "pdf", url: "#" },
      { id: 3, title: "Exercícios Extras", type: "pdf", url: "#" },
      { id: 4, title: "Cheat Sheet JavaScript", type: "pdf", url: "#" },
    ],
  }

  const comments = [
    {
      id: 1,
      user: { name: "João Santos", avatar: "/placeholder.svg?height=32&width=32" },
      content: "Excelente explicação sobre closures! Finalmente entendi o conceito.",
      timestamp: "2 horas atrás",
      likes: 12,
    },
    {
      id: 2,
      user: { name: "Ana Costa", avatar: "/placeholder.svg?height=32&width=32" },
      content: "Os exercícios práticos estão muito bem elaborados. Parabéns!",
      timestamp: "1 dia atrás",
      likes: 8,
    },
  ]

  const currentLessonData = course.modules
    .flatMap((module) => module.lessons)
    .find((lesson) => lesson.id === currentLesson)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNextLesson = () => {
    const allLessons = course.modules.flatMap((module) => module.lessons)
    const currentIndex = allLessons.findIndex((lesson) => lesson.id === currentLesson)
    if (currentIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentIndex + 1].id)
    }
  }

  const handlePreviousLesson = () => {
    const allLessons = course.modules.flatMap((module) => module.lessons)
    const currentIndex = allLessons.findIndex((lesson) => lesson.id === currentLesson)
    if (currentIndex > 0) {
      setCurrentLesson(allLessons[currentIndex - 1].id)
    }
  }

  const handleLessonSelect = (lessonId: number) => {
    setCurrentLesson(lessonId)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Aqui você adicionaria o comentário
      console.log("Novo comentário:", newComment)
      setNewComment("")
    }
  }

  const handleEnrollment = async () => {
    setIsEnrolling(true)
    try {
      // Simula processo de inscrição
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsEnrolled(true)
      console.log("Inscrito no curso com sucesso!")
    } catch (error) {
      console.error("Erro ao se inscrever:", error)
    } finally {
      setIsEnrolling(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header do Curso */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students.toLocaleString()} estudantes</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <Badge variant="secondary">{course.level}</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isEnrolled ? (
            <Button onClick={handleEnrollment} disabled={isEnrolling} size="lg">
              {isEnrolling ? "Inscrevendo..." : "Inscreva-se Agora"}
            </Button>
          ) : (
            <>
              {/* <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button> */}
            </>
          )}
        </div>
      </div>

      {!isEnrolled ? (
        // Prévia do curso para usuários não inscritos
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sobre este curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{course.description}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Este curso foi cuidadosamente estruturado para levar você desde os conceitos mais básicos até técnicas
                  avançadas de programação. Com uma abordagem prática e projetos reais, você desenvolverá as habilidades
                  necessárias para se destacar no mercado de trabalho.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {course.modules.reduce((acc, module) => acc + module.total, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Aulas Práticas</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{course.duration}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">de Conteúdo</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {course.resources.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recursos Extras</div>
                </div>
              </div>

              <div className="text-center py-6 border-t">
                <h3 className="text-xl font-semibold mb-4">Comece sua jornada de aprendizado hoje</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Junte-se a mais de {course.students.toLocaleString()} estudantes que já transformaram suas carreiras
                </p>
                <Button onClick={handleEnrollment} disabled={isEnrolling} size="lg" className="px-8">
                  {isEnrolling ? "Inscrevendo..." : "Inscreva-se Gratuitamente"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informações do curso para não inscritos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>O que você vai aprender</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {course.modules.slice(0, 3).map((module) => (
                  <div key={module.id} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{module.title}</span>
                  </div>
                ))}
                <div className="flex items-center space-x-3 opacity-60">
                  <CheckCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span>E muito mais...</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sobre o Instrutor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{course.instructor.name}</h3>
                    <p className="text-sm text-gray-500">Instrutor Especialista</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{course.instructor.bio}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Conteúdo completo do curso para usuários inscritos
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player de Vídeo */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-0">
                {/* Video Player */}
                <div className="relative bg-black rounded-t-lg aspect-video">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={currentLessonData?.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-16 h-16" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                  </div>

                  {/* Controles do Player */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={handlePreviousLesson}>
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handlePlayPause}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleNextLesson}>
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informações da Aula */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{currentLessonData?.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {currentLessonData?.description ||
                      "Nesta aula você aprenderá conceitos fundamentais que serão essenciais para seu desenvolvimento."}
                  </p>

                  {/* Ações da Aula */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Curtir
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowComments(!showComments)}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Comentários ({comments.length})
                      </Button>
                    </div>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marcar como Concluída
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comentários */}
            {showComments && (
              <Card>
                <CardHeader>
                  <CardTitle>Comentários</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Novo Comentário */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Adicione um comentário..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleAddComment}>Comentar</Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Lista de Comentários */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{comment.user.name}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              Responder
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
                <TabsTrigger value="resources">Recursos</TabsTrigger>
                <TabsTrigger value="instructor">Instrutor</TabsTrigger>
              </TabsList>

              {/* Conteúdo do Curso */}
              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Módulos do Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                      <Accordion type="multiple" className="w-full">
                        {course.modules.map((module) => (
                          <AccordionItem key={module.id} value={`module-${module.id}`}>
                            <AccordionTrigger className="px-4">
                              <div className="flex items-center justify-between w-full mr-4">
                                <span className="font-medium">{module.title}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">
                                    {module.completed}/{module.total}
                                  </span>
                                  <Progress value={(module.completed / module.total) * 100} className="w-16 h-2" />
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-1">
                                {module.lessons.map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    className={`flex items-center space-x-3 p-3 mx-4 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                      currentLesson === lesson.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                                    }`}
                                    onClick={() => handleLessonSelect(lesson.id)}
                                  >
                                    <div className="flex-shrink-0">
                                      {lesson.completed ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      ) : lesson.type === "video" ? (
                                        <Play className="h-4 w-4 text-gray-400" />
                                      ) : lesson.type === "quiz" ? (
                                        <FileText className="h-4 w-4 text-gray-400" />
                                      ) : (
                                        <FileText className="h-4 w-4 text-gray-400" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">{lesson.title}</p>
                                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                                    </div>
                                  </div>
                                ))}
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
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Recursos do Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {course.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{resource.title}</p>
                            <p className="text-xs text-gray-500 uppercase">{resource.type}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Instrutor */}
              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre o Instrutor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{course.instructor.name}</h3>
                        <p className="text-sm text-gray-500">Instrutor</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{course.instructor.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>15.2k estudantes</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>5 anos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
