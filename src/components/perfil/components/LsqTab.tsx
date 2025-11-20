import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { estiloInfo } from "@/data/mockLSQ";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Brain, CircleQuestionMark, RefreshCw, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LsqTabProps } from "@/types/perfil";

{/* Card de Estilo de Aprendizagem */}
export function LsqTab({ usuario }: LsqTabProps) {
  // Função para obter a classificação do nível
  const getLevelClassification = (score: number, style: string) => {
    
    // Se o score for undefined, retorna ?
    if (score === undefined || score === null) {
      return "?";
    }

    const ranges: { [key: string]: number[][] } = {
      Ativista: [
        [0, 7],
        [8, 11],
        [12, 13],
        [14, 17],
        [18, 20],
      ],
      Reflexivo: [
        [0, 10],
        [11, 13],
        [14, 15],
        [16, 18],
        [19, 20],
      ],
      Teórico: [
        [0, 9],
        [10, 12],
        [13, 15],
        [16, 17],
        [18, 20],
      ],
      Pragmático: [
        [0, 9],
        [10, 12],
        [13, 15],
        [16, 17],
        [18, 20],
      ],
    }

    const styleRanges = ranges[style] || ranges.Pragmático
    const levels = ["Muito Baixa", "Baixa", "Moderada", "Forte", "Muito Forte"]

    for (let i = 0; i < styleRanges.length; i++) {
      if (score >= styleRanges[i][0] && score <= styleRanges[i][1]) {
        return levels[i]
      }
    }
    return "Moderada"
  }

  // if (!usuario.estiloAprendizagem) {
  //   return null; // Não renderiza nada se o estilo de aprendizagem não estiver definido
  // }

  const estiloAprendizagemInfo = usuario.estiloAprendizagem ? estiloInfo[usuario.estiloAprendizagem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() as keyof typeof estiloInfo] : null;
  const EstiloIcon = estiloAprendizagemInfo ? estiloAprendizagemInfo.icon : CircleQuestionMark;

  return (
    <Card className={`${estiloAprendizagemInfo?.borderColor || 'border-gray-200'} border-2`}>
        <CardHeader>
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${estiloAprendizagemInfo?.bgColor || 'bg-gray-100'}`}>
                <EstiloIcon className={`h-6 w-6 ${estiloAprendizagemInfo?.textColor || 'text-gray-600'}`} />
                </div>
                <div>
                <CardTitle className={estiloAprendizagemInfo?.textColor || 'text-gray-100'}>Estilo de Aprendizagem: {estiloAprendizagemInfo?.nome || "Desconhecido"}</CardTitle>
                <CardDescription>Baseado no questionário de Peter Honey e Alan Mumford</CardDescription>
                </div>
            </div>
            {!usuario.estiloAprendizagem &&
              <Link href="/lsq">
                  <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Responder Questionário
                  </Button>
              </Link>
            }
            {usuario.estiloAprendizagem &&
              <Link href="/lsq">
                  <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refazer
                  </Button>
              </Link>
            }
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">{estiloAprendizagemInfo?.descricao || "Estilo de aprendizagem não definido. Responda o questionário para descobrir o seu estilo de aprendizagem."}</p>

            {usuario.estiloAprendizagemScores && (
            <>
                <Separator />
                <div className="space-y-4">
                <h4 className="font-medium text-sm">Suas Pontuações:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-orange-600" />
                        <span>Ativista</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <span className="font-bold">{usuario.estiloAprendizagemScores.ativista || 0}/20</span>
                        <Badge variant="outline" className="text-xs">
                            {getLevelClassification(usuario.estiloAprendizagemScores?.ativista, "Ativista")}
                        </Badge>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-orange-600 h-2 rounded-full transition-all"
                        style={{ width: `${((usuario.estiloAprendizagemScores?.ativista || 0) / 20) * 100}%` }}
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-emerald-600" />
                        <span>Reflexivo</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <span className="font-bold">{usuario.estiloAprendizagemScores.reflexivo || 0}/20</span>
                        <Badge variant="outline" className="text-xs">
                            {getLevelClassification(usuario.estiloAprendizagemScores.reflexivo, "Reflexivo")}
                        </Badge>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${((usuario.estiloAprendizagemScores.reflexivo || 0) / 20) * 100}%` }}
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-violet-600" />
                        <span>Teórico</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <span className="font-bold">{usuario.estiloAprendizagemScores.teorico || 0}/20</span>
                        <Badge variant="outline" className="text-xs">
                            {getLevelClassification(usuario.estiloAprendizagemScores.teorico, "Teórico")}
                        </Badge>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-violet-600 h-2 rounded-full transition-all"
                        style={{ width: `${((usuario.estiloAprendizagemScores.teorico || 0) / 20) * 100}%` }}
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-cyan-600" />
                        <span>Pragmático</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <span className="font-bold">{usuario.estiloAprendizagemScores.pragmatico || 0}/20</span>
                        <Badge variant="outline" className="text-xs">
                            {getLevelClassification(usuario.estiloAprendizagemScores.pragmatico, "Pragmático")}
                        </Badge>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-cyan-600 h-2 rounded-full transition-all"
                        style={{ width: `${((usuario.estiloAprendizagemScores.pragmatico || 0) / 20) * 100}%` }}
                        />
                    </div>
                    </div>
                </div>
                </div>
            </>
            )}
        </CardContent>
    </Card>
  )
}