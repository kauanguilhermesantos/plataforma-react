"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLSQ } from "../../hooks/useLSQ"
import { LSQHeader } from "./LSQHeader"
import { ProgressSection } from "./ProgressSection"
import { InstrucoesBanner } from "./InstrucoesBanner"
import { PerguntaCard } from "./PerguntaCard"
import { NavigationButtons } from "./NavigationButtons"
import { ResultadosTela } from "./ResultadosTela"
import { estiloInfo, perguntasPorPagina } from "@/data/mockLSQ"
import { LSQProps } from "@/types/perguntaLSQ"

export function LSQ({ onComplete, onCancel }: LSQProps) {
  const {
    currentPage,
    totalPages,
    progress,
    currentQuestions,
    respostas,
    mostrarResultados,
    resultados,
    todasQuestoesRespondidas,
    handleResposta,
    handleNext,
    handlePrevious,
    getEstiloDominante,
    getNivelEstilo,
    salvarResultados
  } = useLSQ({ onComplete })

  if (mostrarResultados && resultados) {
    const estiloDominante = getEstiloDominante(resultados)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 p-4">
        <ResultadosTela
          resultados={resultados}
          estiloDominante={estiloDominante!}
          estiloInfo={estiloInfo}
          getNivelEstilo={getNivelEstilo}
          onSalvaResultados={salvarResultados}
          onFinaliza={() => onComplete?.(resultados)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <LSQHeader
          titulo="Questionário de Estilos de Aprendizagem"
          subtitulo="Responda com honestidade para obter resultados precisos"
        />

        <ProgressSection
          currentPage={currentPage}
          totalPages={totalPages}
          progress={progress}
        />

        <Card className="shadow-lg border-0 mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              <InstrucoesBanner
                instrucoes="Para cada afirmação, escolha 'Sim' se você concorda mais do que discorda, ou 'Não' se você discorda mais do que concorda."
              />

              {currentQuestions.map((pergunta) => (
                <PerguntaCard
                  key={pergunta.id}
                  pergunta={pergunta}
                  resposta={respostas[pergunta.id]}
                  onAnswer={handleResposta}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <NavigationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          allQuestionsAnswered={todasQuestoesRespondidas}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  )
}