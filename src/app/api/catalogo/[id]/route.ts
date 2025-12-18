// app/api/cursos/[id]/route.ts
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
        recurso: {
          select: {
            id_recurso: true,
            // tipo: true,
            titulo: true,
            arquivo: true,
            // ordem: true
          },
        }
      }
    })

    if (!curso) {
      return NextResponse.json(
        { error: 'Curso não encontrado' },
        { status: 404 }
      )
    }

    // Calcular estatísticas
    // const totalAlunos = await prisma.matricula.count({
    //   where: { id_curso: id }
    // })

    // const avaliacoes = await prisma.avaliacao.findMany({
    //   where: { id_curso: id }
    // })

    // const mediaAvaliacao = avaliacoes.length > 0
    //   ? avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length
    //   : 0

    const cursoFormatado = {
      ...curso,
    //   alunos: totalAlunos,
    //   avaliacao: mediaAvaliacao,
    //   reviews: avaliacoes.length,
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