import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, Clock, ArrowLeft } from "lucide-react"
import { Curso } from "@/types/curso"
import Link from "next/link"
import { useState } from "react"

interface CursoHeaderProps {
  curso: Curso
  isEnrolled: boolean
  isEnrolling: boolean
  onEnroll: () => void
}

export function CursoHeader({ curso, isEnrolled, isEnrolling, onEnroll }: CursoHeaderProps) {
  // Estado para gerenciar se o curso é para "Meus Cursos"
  const [paraMeusCurosos, setParaMeusCursos] = useState(false);

  // Função para lidar com a inscrição no curso
  const handleBotaoInscrever = () => {
    // Quando o usuário se inscrever, redireciona para "Meus Cursos"
    setParaMeusCursos(true);
    onEnroll(); // Chama a função de inscrição passada como prop
  }

  const voltaBotaoHref = () => {
    return paraMeusCurosos ? "/meusCursos" : "/catalogo";
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <Link href={voltaBotaoHref()}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{curso.titulo}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              <span>{curso.avaliacao}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{curso.alunos.toLocaleString()} estudantes</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{curso.duracaoTotal}</span>
            </div>
            <Badge variant="secondary">{curso.nivel}</Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {!isEnrolled && (
          <Button onClick={handleBotaoInscrever} disabled={isEnrolling} size="lg">
            {isEnrolling ? "Inscrevendo..." : "Inscreva-se Agora"}
          </Button>
        )}
      </div>
    </div>
  )
}