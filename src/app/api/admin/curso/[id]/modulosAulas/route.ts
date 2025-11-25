import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();

// PUT - Atualizar módulos e aulas
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const cursoId = params.id;
    const { modulos } = await request.json();

    // Verificar se o curso existe
    const cursoExistente = await prisma.curso.findUnique({
      where: { id_curso: parseInt(cursoId) },
      include: {
        modulo: {
          include: {
            aula: true
          }
        }
      }
    });

    if (!cursoExistente) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
    }

    // Iniciar uma transação para garantir consistência
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Deletar módulos e aulas existentes
      await tx.aula.deleteMany({
        where: {
          modulo: {
            id_curso: parseInt(cursoId)
          }
        }
      });

      await tx.modulo.deleteMany({
        where: {
          id_curso: parseInt(cursoId)
        }
      });

      // 2. Criar novos módulos e aulas
      for (const moduloData of modulos) {
        const modulo = await tx.modulo.create({
          data: {
            id_curso: parseInt(cursoId),
            titulo: moduloData.titulo,
            descricao: moduloData.descricao,
            ordem: moduloData.ordem
          }
        });

        // Criar aulas do módulo
        for (const aulaData of moduloData.aulas) {
          await tx.aula.create({
            data: {
              id_modulo: modulo.id_modulo,
              titulo: aulaData.titulo,
              descricao: aulaData.descricao,
              arquivo: aulaData.videoUrl,
              duracao: aulaData.duracao,
              ordem: aulaData.ordem
            }
          });
        }
      }

      // 3. Buscar curso atualizado
      const cursoAtualizado = await tx.curso.findUnique({
        where: { id_curso: parseInt(cursoId) },
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
                orderBy: { ordem: 'asc' }
              }
            },
            orderBy: { ordem: 'asc' }
          },
          recurso: true,
          tags: true
        }
      });

      return cursoAtualizado;
    });

    if (!resultado) {
      return NextResponse.json({ error: 'Curso não encontrado após atualização' }, { status: 404 });
    }

    // Formatar a resposta para o frontend
    const respostaFormatada = {
      id: resultado.id_curso,
      titulo: resultado.titulo,
      descricao: resultado.descricao,
      thumbnail: resultado.thumbnail,
      categoria: resultado.categoria,
      nivel: resultado.nivel,
      status: resultado.status,
      estiloAprendizagem: resultado.estilo_aprendizagem,
      tags: resultado.tags.map(tag => tag.nome_tag),
      instrutor: {
        id: resultado.instrutor.id_instrutor,
        nome: resultado.instrutor.nome,
        avatar: resultado.instrutor.foto,
        bio: resultado.instrutor.bio
      },
      modulos: resultado.modulo.map(modulo => ({
        id: modulo.id_modulo,
        titulo: modulo.titulo,
        descricao: modulo.descricao,
        ordem: modulo.ordem,
        aulas: modulo.aula.map(aula => ({
          id: aula.id_aula,
          titulo: aula.titulo,
          descricao: aula.descricao,
          videoUrl: aula.arquivo,
          duracao: aula.duracao,
          ordem: aula.ordem,
          isCompleted: false
        }))
      })),
      recursos: resultado.recurso.map(recurso => ({
        id: recurso.id_recurso,
        titulo: recurso.titulo,
        url: recurso.arquivo
      })),
    };

    return NextResponse.json(respostaFormatada);
  } catch (error) {
    console.error('Erro ao atualizar módulos e aulas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}