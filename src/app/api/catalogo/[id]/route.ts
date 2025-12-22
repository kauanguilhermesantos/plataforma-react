import { NextResponse } from 'next/server'
import { prisma } from '@/../lib/prisma'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const curso = await prisma.curso.findUnique({
      where: {
        id_curso: id,
        status: 'Publicado'
      },
      include: {
        instrutor: {
          select: {
            id_instrutor: true,
            nome: true,
            foto: true,
            bio: true
          }
        },
        modulo: {
          include: {
            aula: {
              where: {
                status: 'Publicado'
              },
              orderBy: {
                ordem: 'asc'
              }
            }
          },
          orderBy: {
            ordem: 'asc'
          }
        },
        tags: {
          select: {
            nome_tag: true,
          }
        },
        recurso: true,
        _count: {
          select: {
            matricula: true
          }
        }
      }
    })

    if (!curso) {
      return NextResponse.json(
        { error: 'Curso não encontrado' },
        { status: 404 }
      )
    }

    // Calcular duração total
    const totalMinutos = curso.modulo.reduce((total, modulo) => {
      const minutosModulo = modulo.aula.reduce((sum, aula) => 
        sum + (aula.duracao || 0), 0)
      return total + minutosModulo
    }, 0)

    const horas = Math.floor(totalMinutos / 60)
    const minutos = totalMinutos % 60
    const duracaoTotal = `${horas}h ${minutos}min`

    // Formatar dados para frontend
    const cursoFormatado = {
      id: curso.id_curso,
      titulo: curso.titulo,
      descricao: curso.descricao || 'Descrição não disponível',
      duracaoTotal,
      avaliacao: 4.5, // Placeholder - implementar avaliações depois
      alunos: curso._count.matricula,
      nivel: curso.nivel || 'Intermediário',
      estiloAprendizagem: curso.estilo_aprendizagem || 'Multimodal',
      reviews: 0, // Placeholder
      thumbnail: curso.thumbnail,
      instrutor: {
        id: curso.instrutor.id_instrutor,
        nome: curso.instrutor.nome,
        bio: curso.instrutor.bio || 'Sem biografia',
        avatar: curso.instrutor.foto
      },
      modulos: curso.modulo.map(modulo => ({
        id: modulo.id_modulo,
        titulo: modulo.titulo,
        ordem: modulo.ordem,
        aulas: modulo.aula.map(aula => ({
          id: aula.id_aula,
          titulo: aula.titulo,
          descricao: aula.descricao,
          duracao: formatarDuracao(aula.duracao),
          tipo: determinarTipoAula(aula.arquivo),
          videoUrl: aula.arquivo,
          ordem: aula.ordem,
          concluida: false // Será atualizado pela verificação de matrícula
        }))
      })),
      recursos: curso.recurso.map(recurso => ({
        id: recurso.id_recurso,
        titulo: recurso.titulo,
        tipo: determinarTipoRecurso(recurso.arquivo),
        url: recurso.arquivo
      })),
      tags: curso.tags.map(tag => tag.nome_tag)
    }

    return NextResponse.json(cursoFormatado)
  } catch (error) {
    console.error('Erro ao buscar curso:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar curso' },
      { status: 500 }
    )
  }
}

// Funções auxiliares
function formatarDuracao(minutos: number | null): string {
  if (!minutos) return '0 min'
  if (minutos < 60) return `${minutos} min`
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`
}

function determinarTipoAula(arquivo: string | null): 'video' | 'quiz' | 'texto' {
  if (!arquivo) return 'texto'
  const extensao = arquivo.split('.').pop()?.toLowerCase()
  if (['mp4', 'avi', 'mov', 'webm'].includes(extensao || '')) return 'video'
  return 'texto'
}

function determinarTipoRecurso(arquivo: string | null): string {
  if (!arquivo) return 'arquivo'
  const extensao = arquivo.split('.').pop()?.toLowerCase() || 'arquivo'
  return extensao.toUpperCase()
}