import { useState } from "react"
import { PerguntaLSQ, Respostas, Resultados, EstiloAprendizagem } from "@/types/perguntaLSQ"
import { perguntas, perguntasPorPagina, norms } from "@/data/mockLSQ"
import { useAuth } from "@/hooks/useAuth"

interface useLSQProps {
  onComplete?: (resultados: Resultados) => void
  atualizarUsuario?: (dados: any) => void
}

export function useLSQ({ onComplete }: useLSQProps = {}) {
  const [currentPage, setCurrentPage] = useState(0)
  const [respostas, setRespostas] = useState<Respostas>({})
  const [mostrarResultados, setMostrarResultados] = useState(false)
  const [resultados, setResultados] = useState<Resultados | null>(null)
  const [isSalvando, setIsSalvando] = useState(false)

  const totalPages = Math.ceil(perguntas.length / perguntasPorPagina)
  const progress = ((currentPage + 1) / totalPages) * 100
  const currentQuestions = perguntas.slice(currentPage * perguntasPorPagina, (currentPage + 1) * perguntasPorPagina)

  // Lidar com as respostas
  const handleResposta = (perguntaId: number, agree: boolean) => {
    setRespostas((prev) => ({
      ...prev,
      [perguntaId]: agree,
    }))
  }

  // Calcular respostas 
  const calcularResultados = (): Resultados => {
    const scores = {
      ativista: 0,
      reflexivo: 0,
      teorico: 0,
      pragmatico: 0,
    }

    perguntas.forEach((pergunta) => {
      if (respostas[pergunta.id] === true) {
        scores[pergunta.categoria]++
      }
    })

    return scores
  }

  // Função para salvar os resultados do LSQ
  const salvarResultados = async (resultados: Resultados, estiloDominante: EstiloAprendizagem) => {
    try {
      setIsSalvando(true)
      
      // Chamando API do LSQ
      const response = await fetch('/api/usuario/lsq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          estiloDominante,
          resultados
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Erro ao salvar resultados')
      }

      // Atualizar localStorage
      if (data.usuario) {
        const usuarioStorage = localStorage.getItem('usuario')
        if (usuarioStorage) {
          const usuario = JSON.parse(usuarioStorage)
          const usuarioAtualizado = {
            ...usuario,
            primeiroAcesso: false,
            estiloAprendizagem: estiloDominante,
            estiloAprendizagemScores: resultados
          }
          localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado))
        }
      }

      return data
    } catch (error) {
      console.error('Erro ao salvar resultados:', error)
      throw error
    } finally {
      setIsSalvando(false)
    }
  }

  // Função para pegar o estilo dominante
  const getEstiloDominante = (resultados: Resultados): EstiloAprendizagem | null => {
    if (!resultados) return null

    const entries = Object.entries(resultados) as [EstiloAprendizagem, number][]
    const sorted = entries.sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] || null
  }

  // Função para pegar o nível do estilo
  const getNivelEstilo = (score: number, estilo: EstiloAprendizagem): string => {
    const norm = norms[estilo]

    if (!norm) return "Indefinida"

    if (score <= norm.veryLow) return "Muito Baixa"
    if (score <= norm.low) return "Baixa"
    if (score <= norm.moderate) return "Moderada"
    if (score <= norm.strong) return "Forte"
    return "Muito Forte"
  }

  // Passar para a próxima página
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const resultadosCalculados = calcularResultados()
      setResultados(resultadosCalculados)
      setMostrarResultados(true)
      onComplete?.(resultadosCalculados)
    }
  }

  // Voltar para a página anterior
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const todasQuestoesRespondidas = currentQuestions.every(
    (q) => respostas[q.id] !== undefined && respostas[q.id] !== null,
  )

  return {
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
    setMostrarResultados,
    setResultados,
    salvarResultados
  }
}