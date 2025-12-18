// CursoCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Users, Star, Play } from "lucide-react"
import { CursoCatalogo } from "@/types/catalogo"
import { estiloInfo } from "@/data/mockLSQ"

interface CursoCardProps {
  curso: CursoCatalogo;
}

export function CursoCard({ curso }: CursoCardProps) {
  console.log("CursoCard renderizando:", curso.titulo)

  // Função para deixa a primeira letra maiuscula
  function capitalizarPrimeiraLetra(palavra: string): string {
    if (!palavra) return palavra;
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  }

  // Obter informações do estilo de aprendizagem
  const estiloNormalizado = curso.estiloAprendizagem?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()
  const estiloAprendizagemInfo = estiloNormalizado 
    ? estiloInfo[estiloNormalizado as keyof typeof estiloInfo]
    : null

  return (
    <Card key={curso.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {/* Thumbnail do Curso */}
        <img
          src={curso.thumbnail || `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/testeImagem.png`}
          alt={curso.titulo}
          className="w-full h-48 object-cover"
        />
        
        {/* Badge Estilo de Aprendizagem */}
        {estiloAprendizagemInfo && curso.estiloAprendizagem && (
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="secondary" className={`${estiloAprendizagemInfo.bgColor} ${estiloAprendizagemInfo.textColor} border ${estiloAprendizagemInfo.borderColor} no-hover`}>
              {capitalizarPrimeiraLetra(curso.estiloAprendizagem)}
            </Badge>
          </div>
        )}

        {/* Badge Nível */}
        {curso.nivel && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">{capitalizarPrimeiraLetra(curso.nivel)}</Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{curso.titulo}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2">{curso.descricao || 'Sem descrição'}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Instrutor */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={curso.instrutor?.avatar} />
            <AvatarFallback>{curso.instrutor?.nome?.[0] || 'I'}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {curso.instrutor?.nome || 'Instrutor'}
          </span>
        </div>

        {/* Estatísticas */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>10h</span> {/* Temporário */}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{curso.alunos?.toLocaleString() || '0'}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{curso.avaliacao?.toFixed(1) || '0.0'}</span>
            <span className="ml-1">({curso.reviews || 0})</span>
          </div>
        </div>

        {/* Tags */}
        {curso.tags && curso.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {curso.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {curso.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{curso.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <Separator />

        {/* Ação */}
        <div className="flex justify-end">
          <Link href={`/curso/${curso.id}`} className="w-full">
            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Acessar Curso
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}