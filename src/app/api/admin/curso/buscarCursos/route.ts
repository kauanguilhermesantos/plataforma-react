// app/api/cursos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/jwt'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    // Buscar cursos do banco
    const cursos = await prisma.curso.findMany({
      include: {
        instrutor: {
          select: {
            id_instrutor: true,
            nome: true,
            foto: true
          }
        }

        // categoria: {
        //   select: {
        //     nome: true
        //   }
        // },
        // _count: {
        //   select: {
        //     matriculas: true,
        //     avaliacoes: true
        //   }
        // },
        // avaliacoes: {
        //   select: {
        //     rating: true
        //   }
        // }
    //   },
    //   orderBy: {
    //     createdAt: 'desc'
      }
    })

    // Formatar os dados para o frontend
    const cursosFormatados = cursos.map(curso => ({
      id: curso.id_curso,
      titulo: curso.titulo,
    //   descricao: curso.descricao,
    //   thumbnail: curso.thumbnail,
      categoria: curso.categoria,
      nivel: curso.nivel,
      status: curso.status,
      estiloAprendizagem: curso.estilo_aprendizagem,
    //   duracao: curso.duracao,
      instrutor: {
        // id: curso.instrutor.id,
        nome: curso.instrutor.nome,
        avatar: curso.instrutor.foto
      }
    }))

    return NextResponse.json(cursosFormatados)
  } catch (error) {
    console.error('Erro ao buscar cursos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}