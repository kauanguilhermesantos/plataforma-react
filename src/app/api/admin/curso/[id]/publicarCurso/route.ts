// app/api/cursos/[id]/publicar/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/jwt'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const cursoId = parseInt(params.id)

    // Verificar se o curso existe
    const curso = await prisma.curso.findUnique({
      where: { id_curso: cursoId }
    })

    if (!curso) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    // Publicar o curso
    const cursoAtualizado = await prisma.curso.update({
      where: { id_curso: cursoId },
      data: {
        status: 'Publicado',
        // publishedAt: new Date()
      },
      include: {
        instrutor: {
          select: {
            id_instrutor: true,
            nome: true,
            foto: true
          }
        },
      //   categoria: {
      //     select: {
      //       nome: true
      //     }
      //   }
      }
    })


    return NextResponse.json(cursoAtualizado)
  } catch (error) {
    console.error('Erro ao publicar curso:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}