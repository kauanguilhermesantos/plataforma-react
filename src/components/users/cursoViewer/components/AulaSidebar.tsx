import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Play, FileText } from "lucide-react"
import { Curso } from "@/types/curso"
import { RecursosTab } from "./RecursosTab"
import { InstrutorCard } from "./InstrutorCard"

interface AulaSidebarProps {
  curso: Curso
  currentLesson: number
  onLessonSelect: (aulaId: number) => void
}

export function AulaSidebar({ curso, currentLesson, onLessonSelect }: AulaSidebarProps) {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Conteúdo</TabsTrigger>
        <TabsTrigger value="resources">Recursos</TabsTrigger>
        <TabsTrigger value="instructor">Instrutor</TabsTrigger>
      </TabsList>

      <TabsContent value="content">
        <Card>
          <CardHeader>
            <CardTitle>Módulos do Curso</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <Accordion type="multiple" className="w-full">
                {curso.modulos.map((modulo) => (
                  <AccordionItem key={modulo.id} value={`module-${modulo.id}`}>
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center justify-between w-full mr-4">
                        <span className="font-medium">{modulo.titulo}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {/* Acessando aulas concluidas dentro do módulo */}
                            {modulo.aulas.filter(aula => aula.concluida).length}/{modulo.aulas.length}
                            {/* {modulo.concluida}/{modulo.total} */}
                            {/* {modulo.concluida ?? 0}/{modulo.total ?? 0} */}
                          </span>
                          <Progress
                            value={(modulo.aulas.length > 0) ? (modulo.aulas.filter(aula => aula.concluida).length / modulo.aulas.length) * 100 : 0}
                            className="w-16 h-2"
                          />
                          {/* <Progress value={modulo.aulas.filter(aula => aula.concluida).length/modulo.aulas.length} className="w-16 h-2" /> */}
                          {/* <Progress value={90} className="w-16 h-2" /> */}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1">
                        {modulo.aulas.map((aula) => (
                          <div
                            key={aula.id}
                            className={`flex items-center space-x-3 p-3 mx-4 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                              currentLesson === aula.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                            }`}
                            onClick={() => onLessonSelect(aula.id)}
                          >
                            <div className="flex-shrink-0">
                              {aula.concluida ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : aula.tipo === "video" ? (
                                <Play className="h-4 w-4 text-gray-400" />
                              ) : aula.tipo === "quiz" ? (
                                <FileText className="h-4 w-4 text-gray-400" />
                              ) : (
                                <FileText className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{aula.titulo}</p>
                              <p className="text-xs text-gray-500">{aula.duracao}</p>
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

      <TabsContent value="resources">
        <RecursosTab recursos={curso.recursos} />
      </TabsContent>

      <TabsContent value="instructor">
        <InstrutorCard instrutor={curso.instrutor} />
      </TabsContent>
    </Tabs>
  )
}