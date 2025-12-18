// app/api/catalogo/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/../lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Obter parâmetros de filtro da URL
    const searchTerm = searchParams.get('search') || ''
    const categoria = searchParams.get('categoria') || 'all'
    const nivel = searchParams.get('nivel') || 'all'
    const estilo = searchParams.get('estilo') || 'all'
    
    console.log('Filtros recebidos:', { searchTerm, categoria, nivel, estilo })

    // Construir o objeto where do Prisma
    const where: any = {
      status: 'Publicado'
    }

    // Filtro por categoria
    if (categoria && categoria !== 'all') {
      where.categoria = categoria
    }

    // Filtro por nível
    if (nivel && nivel !== 'all') {
      where.nivel = nivel
    }

    // Filtro por estilo de aprendizagem
    if (estilo && estilo !== 'all') {
      where.estilo_aprendizagem = estilo
    }

    // Filtro por termo de pesquisa (busca em título, descrição e tags)
    if (searchTerm) {
      where.OR = [
        { titulo: { contains: searchTerm, mode: 'insensitive' } },
        { descricao: { contains: searchTerm, mode: 'insensitive' } },
        {
          tags: {
            some: {
              nome: { contains: searchTerm, mode: 'insensitive' }
            }
          }
        }
      ]
    }

    // Buscar cursos com filtros
    const cursos = await prisma.curso.findMany({
      where,
      include: {
        instrutor: {
          select: {
            id_instrutor: true,
            nome: true,
            foto: true,
            bio: true
          }
        },
        tags: {
          select: {
            nome_tag: true
          }
        }
      },
      orderBy: {
        id_curso: 'desc'
      }
    })

    console.log(`Encontrados ${cursos.length} cursos após filtros`)

    // Formatar os dados para o frontend
    const cursosFormatados = cursos.map((curso) => ({
      id: curso.id_curso,
      id_curso: curso.id_curso,
      titulo: curso.titulo,
      descricao: curso.descricao || '',
      thumbnail: curso.thumbnail || '',
      categoria: curso.categoria || '',
      nivel: curso.nivel || '',
      estiloAprendizagem: curso.estilo_aprendizagem || '',
      alunos: 0, // Para implementar depois com tabela de matrículas
      avaliacao: 0, // Para implementar depois com tabela de avaliações
      reviews: 0,
      tags: curso.tags.map(tag => tag.nome_tag),
      instrutor: {
        id: curso.instrutor?.id_instrutor || 0,
        nome: curso.instrutor?.nome || 'Instrutor',
        avatar: curso.instrutor?.foto || '',
        bio: curso.instrutor?.bio || ''
      }
    }))

    return NextResponse.json(cursosFormatados)

  } catch (error: any) {
    console.error('Erro na API /api/catalogo:', error)
    
    return NextResponse.json(
      { error: 'Erro ao buscar cursos' },
      { status: 500 }
    )
  }
}