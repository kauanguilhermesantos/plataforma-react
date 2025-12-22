// app/api/dashboard/stats/route.ts
import { prisma } from "@/../lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Buscar total de alunos
    const totalAlunos = await prisma.aluno.count()

    //Buscar total de admins
    const totalAdmins = await prisma.admin.count()
    
    // Buscar total de usuários
    const totalUsuarios = await prisma.usuario.count()
    
    // Buscar dados dos cursos
    const totalCursos = await prisma.curso.count()
    const cursosAtivos = await prisma.curso.count({
      where: {
        status: "Publicado" // Ajuste conforme necessário
      }
    })

    // Buscar distribuição de cursos por categoria
    const cursosPorCategoria = await prisma.curso.groupBy({
      by: ['categoria'],
      where: {
        status: "Publicado",
        categoria: {
          not: null
        }
      },
      _count: {
        _all: true
      }
    })

    // Buscar distribuição por estilo de aprendizagem dos cursos
    const cursosPorEstilo = await prisma.curso.groupBy({
      by: ['estilo_aprendizagem'],
      where: {
        status: "Publicado",
        estilo_aprendizagem: {
          not: null
        }
      },
      _count: {
        _all: true
      }
    })

    // Calcular total de cursos categorizados para porcentagem
    const totalCursosCategorizados = cursosPorCategoria.reduce(
      (total, item) => total + item._count._all, 
      0
    )

    // Formatar dados de categorias para o gráfico
    const categoriasData = cursosPorCategoria.map(item => {
      const categoriaNome = item.categoria || "Sem categoria"
      const porcentagem = totalCursosCategorizados > 0 
        ? Math.round((item._count._all / totalCursosCategorizados) * 100)
        : 0

      const categoriaInfo = getCategoriaColor(categoriaNome)
      
      return {
        nome: categoriaInfo.nome,
        value: porcentagem,
        quantidade: item._count._all,
        cor: categoriaInfo.cor
      }
    }).sort((a, b) => b.quantidade - a.quantidade) // Ordenar por quantidade

    // Calcular total de cursos por estilo para porcentagem
    const totalCursosEstilos = cursosPorEstilo.reduce(
      (total, item) => total + item._count._all, 
      0
    )

    // Formatar dados de estilos de aprendizagem para o gráfico
    const estilosAprendizagemData = cursosPorEstilo.map(item => {
      const estiloNome = item.estilo_aprendizagem || "Sem estilo"
      const porcentagem = totalCursosEstilos > 0 
        ? Math.round((item._count._all / totalCursosEstilos) * 100)
        : 0

      const estiloInfo = getEstiloColor(estiloNome);
      
      return {
        nome: estiloInfo.estilo,
        value: porcentagem,
        quantidade: item._count._all,
        cor: estiloInfo.cor
      }
    }).sort((a, b) => b.quantidade - a.quantidade)

    return NextResponse.json({
      success: true,
      data: {
        totalAlunos,
        totalAdmins,
        totalUsuarios,
        totalCursos,
        cursosAtivos,
        categorias: categoriasData,
        estilosAprendizagem: estilosAprendizagemData
      }
    })
  } catch (error) {
    console.error("Erro na API do dashboard:", error)
    return NextResponse.json(
      { success: false, error: "Erro ao buscar dados" },
      { status: 500 }
    )
  }
}

// Funções auxiliares para cores
function getCategoriaColor(categoriaNome: string): { nome: string, cor: string } {
  // Mapeando cores
  const colorsMap: Record<string, string> = {
    "programacao": "#3B82F6",
    "design": "#10B981",
    "data-science": "#F59E0B",
    "mobile": "#EF4444",
    "web": "#8B5CF6",
    "banco-de-dados": "#EC4899",
    "devops": "#06B6D4",
  }
  
  // Formata o nome: "banco-de-dados" → "Banco de Dados"
  const nomesFormatadosMap: Record<string, string> = {
    "programacao": "Programação",
    "design": "Design",
    "data-science": "Data Science",
    "mobile": "Mobile",
    "web": "Desenvolvimento Web",
    "banco-de-dados": "Banco de Dados",
    "devops": "DevOps",
  }

  let nomeFormatado = nomesFormatadosMap[categoriaNome];
  
  return {
    nome: nomeFormatado,
    cor: colorsMap[categoriaNome]
  };
}

function getEstiloColor(estiloNome: string): { estilo: string, cor: string } {
  // Converter para minúsculo para comparação case-insensitive
  const estiloLower = estiloNome.toLowerCase();

  const colorsMap: Record<string, string> = {
    "ativista": "#f87171",
    "reflexivo": "#4ade80",
    "teorico": "#c084fc",
    "pragmatico": "#60a5fa",
  }

  const nomesFormatadosMap: Record<string, string> = {
    "ativista": "Ativista",
    "reflexivo": "Reflexivo",
    "teorico": "Teórico",
    "pragmatico": "Pragmático"
  }

  let nomeFormatado = nomesFormatadosMap[estiloLower];

  return {
    estilo: nomeFormatado,
    cor: colorsMap[estiloNome]
  }
}