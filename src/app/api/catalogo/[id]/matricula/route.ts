// app/api/cursos/[id]/matricula/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/../lib/prisma'
import { getToken } from '@/lib/jwt'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const cursoId = parseInt(context.params.id)
    const token = await getToken(request)
    
    if (!token?.usuarioId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    if (isNaN(cursoId)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    // Verificar se curso existe
    const curso = await prisma.curso.findUnique({
      where: { 
        id_curso: cursoId,
        status: 'Publicado'
      }
    })

    if (!curso) {
      return NextResponse.json(
        { error: 'Curso não encontrado' },
        { status: 404 }
      )
    }

    // Verificar matrícula
    const matricula = await prisma.matricula.findUnique({
      where: {
        id_usuario_id_curso: {
          id_usuario: parseInt(token.usuarioId),
          id_curso: cursoId
        }
      }
    })

    return NextResponse.json({
      inscrito: !!matricula,
      dataMatricula: matricula ? matricula : null
    })

  } catch (error) {
    console.error('Erro ao verificar matrícula:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar matrícula' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const cursoId = parseInt(context.params.id)
    const token = await getToken(request)
    
    if (!token?.usuarioId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    if (isNaN(cursoId)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    // Verificar se curso existe
    const curso = await prisma.curso.findUnique({
      where: { 
        id_curso: cursoId,
        status: 'Publicado'
      }
    })

    if (!curso) {
      return NextResponse.json(
        { error: 'Curso não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se já está matriculado
    const matriculaExistente = await prisma.matricula.findUnique({
      where: {
        id_usuario_id_curso: {
          id_usuario: parseInt(token.usuarioId),
          id_curso: cursoId
        }
      }
    })

    if (matriculaExistente) {
      return NextResponse.json(
        { error: 'Você já está matriculado neste curso' },
        { status: 400 }
      )
    }

    // Criar matrícula
    const novaMatricula = await prisma.matricula.create({
      data: {
        id_usuario: parseInt(token.usuarioId),
        id_curso: cursoId
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Matrícula realizada com sucesso',
      matricula: novaMatricula
    })

  } catch (error) {
    console.error('Erro ao realizar matrícula:', error)
    return NextResponse.json(
      { error: 'Erro ao realizar matrícula' },
      { status: 500 }
    )
  }
}