import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Clock, Star } from "lucide-react"
import { Curso } from "@/types/curso"
import { InstrutorCard } from "./InstrutorCard"

interface CursoPreviewProps {
  curso: Curso
  isEnrolling: boolean
  onEnroll: () => void
}

export function CursoPreview({ curso, isEnrolling, onEnroll }: CursoPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sobre este curso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {curso.descricao}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Este curso foi cuidadosamente estruturado para levar você desde os conceitos mais básicos até técnicas
              avançadas. Com uma abordagem prática e projetos reais, você desenvolverá as habilidades
              necessárias para se destacar no mercado de trabalho.
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {curso.modulos.reduce((acc, modulo) => acc + modulo.aulas.length, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Aulas Práticas</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {getDuracaoTotalCurso(curso.id)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">de Conteúdo</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {curso.recursos.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Recursos Extras</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-6 border-t">
            <h3 className="text-xl font-semibold mb-4">Comece sua jornada de aprendizado hoje</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Junte-se a mais de {curso.alunos.toLocaleString()} estudantes que já transformaram suas carreiras
            </p>
            <Button onClick={onEnroll} disabled={isEnrolling} size="lg" className="px-8">
              {isEnrolling ? "Inscrevendo..." : "Inscreva-se Gratuitamente"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações do curso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>O que você vai aprender</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {curso.modulos.slice(0, 3).map((modulo) => (
              <div key={modulo.id} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{modulo.titulo}</span>
              </div>
            ))}
            <div className="flex items-center space-x-3 opacity-60">
              <CheckCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span>E muito mais...</span>
            </div>
          </CardContent>
        </Card>

        <InstrutorCard instrutor={curso.instrutor} />
      </div>
    </div>
  )
}

// Função auxiliar (deveria estar no utils)
function getDuracaoTotalCurso(cursoId: number): string {
  // Implementação simplificada - na prática viria dos dados
  return "40h"
}