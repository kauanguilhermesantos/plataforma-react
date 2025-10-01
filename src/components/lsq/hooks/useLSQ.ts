import { useState } from "react"
import { PerguntaLSQ, Respostas, Resultados, EstiloAprendizagem } from "@/types/perguntaLSQ"
import { perguntas, perguntasPorPagina, norms } from "@/data/mockLSQ"

export function useLSQ() {
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Respostas>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<Resultados | null>(null)

  const totalPages = Math.ceil(perguntas.length / perguntasPorPagina)
  const progress = ((currentPage + 1) / totalPages) * 100
  const currentQuestions = perguntas.slice(currentPage * perguntasPorPagina, (currentPage + 1) * perguntasPorPagina)

  const handleAnswer = (perguntaId: number, agree: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [perguntaId]: agree,
    }))
  }

  const calculateResults = (): Resultados => {
    const scores = {
      ativista: 0,
      reflexivo: 0,
      teorico: 0,
      pragmatico: 0,
    }

    perguntas.forEach((pergunta) => {
      if (answers[pergunta.id] === true) {
        scores[pergunta.categoria]++
      }
    })

    return scores
  }

  const getDominantStyle = (resultados: Resultados): EstiloAprendizagem | null => {
    if (!resultados) return null

    const entries = Object.entries(resultados) as [EstiloAprendizagem, number][]
    const sorted = entries.sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] || null
  }

  const getStyleLevel = (score: number, estilo: EstiloAprendizagem): string => {
    const norm = norms[estilo]

    if (!norm) return "Indefinida"

    if (score <= norm.veryLow) return "Muito Baixa"
    if (score <= norm.low) return "Baixa"
    if (score <= norm.moderate) return "Moderada"
    if (score <= norm.strong) return "Forte"
    return "Muito Forte"
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const calculatedResults = calculateResults()
      setResults(calculatedResults)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const allCurrentQuestionsAnswered = currentQuestions.every(
    (q) => answers[q.id] !== undefined && answers[q.id] !== null,
  )

  return {
    currentPage,
    totalPages,
    progress,
    currentQuestions,
    answers,
    showResults,
    results,
    allCurrentQuestionsAnswered,
    handleAnswer,
    handleNext,
    handlePrevious,
    getDominantStyle,
    getStyleLevel,
    setShowResults,
    setResults,
  }
}