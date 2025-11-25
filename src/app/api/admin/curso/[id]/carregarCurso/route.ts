// app/api/admin/curso/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();

// GET - Buscar curso por ID
export async function GET(
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

    const curso = await prisma.curso.findUnique({
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

    if (!curso) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
    }

    // Formatar o curso para o frontend
    const cursoFormatado = {
      id: curso.id_curso,
      titulo: curso.titulo,
      descricao: curso.descricao,
      thumbnail: curso.thumbnail,
      categoria: curso.categoria,
      nivel: curso.nivel,
      status: curso.status,
      estiloAprendizagem: curso.estilo_aprendizagem,
      tags: curso.tags.map(tag => tag.nome_tag),
      // instrutor: curso.instrutor,
      instrutor: {
        id: curso.instrutor.id_instrutor,
        nome: curso.instrutor.nome,
        avatar: curso.instrutor.foto,
        bio: curso.instrutor.bio
      },
      modulos: curso.modulo.map(modulo => ({
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
      recursos: curso.recurso.map(recurso => ({
        id: recurso.id_recurso,
        titulo: recurso.titulo,
        url: recurso.arquivo
      })),
    //   alunos: curso._count?.matriculas || 0,
    //   avaliacao: curso.avaliacoes?.length > 0 
    //     ? curso.avaliacoes.reduce((acc, av) => acc + av.rating, 0) / curso.avaliacoes.length
    //     : 0,
    //   createdAt: curso.createdAt.toISOString(),
    //   updatedAt: curso.updatedAt.toISOString()
    };

    return NextResponse.json(cursoFormatado);
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar curso
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
    const dados = await request.json();

    // Verificar se o curso existe
    const cursoExistente = await prisma.curso.findUnique({
      where: { id_curso: parseInt(cursoId) },
      include: { 
        tags: true,
        instrutor: true,
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
      // 1. Remover tags antigas
      await tx.tags.deleteMany({
        where: { id_curso: parseInt(cursoId) }
      });

      // 2. Adicionar novas tags
      if (dados.tags && Array.isArray(dados.tags)) {
        for (const tagNome of dados.tags) {
          if (tagNome.trim()) {
            await tx.tags.create({
              data: {
                id_curso: parseInt(cursoId),
                nome_tag: tagNome.trim()
              }
            });
          }
        }
      }

      // Atualizar informações do instrutor se fornecidas
      if (dados.instrutor && cursoExistente.instrutor) {
        await tx.instrutor.update({
          where: { id_instrutor: cursoExistente.instrutor.id_instrutor },
          data: {
            nome: dados.instrutor.nome,
            foto: dados.instrutor.avatar, // Mapeando 'avatar' para 'foto'
            bio: dados.instrutor.bio
          }
        });
      }

      // Gerenciar módulos e aulas
      if (dados.modulos && Array.isArray(dados.modulos)) {
        // Deletar aulas e módulos existentes
        await tx.aula.deleteMany({
          where: {
            modulo: {
              id_curso: parseInt(cursoId)
            }
          }
        });

        // Deletar módulos existentes
        await tx.modulo.deleteMany({
          where: {
            id_curso: parseInt(cursoId)
          }
        });

        // Criar novos módulos e aulas
        for (const moduloData of dados.modulos) {
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
                duracao: parseInt(aulaData.duracao) || 0,
                ordem: aulaData.ordem
              }
            });
          }
        }
      }

      // 3. Atualizar o curso
      const cursoAtualizado = await tx.curso.update({
        where: { id_curso: parseInt(cursoId) },
        data: {
          titulo: dados.titulo,
          descricao: dados.descricao,
          thumbnail: dados.thumbnail,
          nivel: dados.nivel,
          status: dados.status,
          estilo_aprendizagem: dados.estiloAprendizagem,
          categoria: dados.categoria,
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
          tags: true,
          modulo: {
            include: {
              aula: {
                orderBy: { ordem: 'asc' }
              }
            },
            orderBy: { ordem: 'asc' }
          },
          recurso: true
        }
      });

      return cursoAtualizado;
    });

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
    console.error('Erro ao atualizar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar novo curso
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const dados = await request.json();
    console.log('Criando novo curso:', dados);

    // Iniciar uma transação
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Criar instrutor se necessário
      let instrutorId = dados.instrutor?.id;
      if (dados.instrutor && !dados.instrutor.id) {
        const novoInstrutor = await tx.instrutor.create({
          data: {
            id_instrutor: 0,
            nome: dados.instrutor.nome || '',
            foto: dados.instrutor.avatar || '',
            bio: dados.instrutor.bio || ''
          }
        });
        instrutorId = novoInstrutor.id_instrutor;
      }

      // 2. Criar curso
      const novoCurso = await tx.curso.create({
        data: {
          titulo: dados.titulo || 'Novo Curso',
          descricao: dados.descricao || '',
          thumbnail: dados.thumbnail || '',
          nivel: dados.nivel || 'Iniciante',
          status: dados.status || 'Rascunho',
          estilo_aprendizagem: dados.estiloAprendizagem || 'Pragmático',
          categoria: dados.categoria || 'Programação',
          id_instrutor: instrutorId,
          instrutor: { connect: { id_instrutor: instrutorId } },
          tags: { create: [] }, // Tags serão adicionadas depois
          modulo: { create: [] }, // Módulos serão adicionados depois
          recurso: { create: [] }, // Recursos serão adicionados depois
          admin: { connect: { id_usuario: parseInt(decoded.usuarioId) } }
        }
      });

      // 3. Adicionar tags
      if (dados.tags && Array.isArray(dados.tags)) {
        for (const tagNome of dados.tags) {
          if (tagNome.trim()) {
            await tx.tags.create({
              data: {
                id_curso: novoCurso.id_curso,
                nome_tag: tagNome.trim()
              }
            });
          }
        }
      }

      // 4. Criar módulos e aulas se fornecidos
      if (dados.modulos && Array.isArray(dados.modulos)) {
        for (const moduloData of dados.modulos) {
          const modulo = await tx.modulo.create({
            data: {
              id_curso: novoCurso.id_curso,
              titulo: moduloData.titulo || 'Novo Módulo',
              descricao: moduloData.descricao || '',
              ordem: moduloData.ordem || 1
            }
          });

          // Criar aulas do módulo
          if (moduloData.aulas && Array.isArray(moduloData.aulas)) {
            for (const aulaData of moduloData.aulas) {
              await tx.aula.create({
                data: {
                  id_modulo: modulo.id_modulo,
                  titulo: aulaData.titulo || 'Nova Aula',
                  descricao: aulaData.descricao || '',
                  arquivo: aulaData.videoUrl || '',
                  duracao: parseInt(aulaData.duracao) || 0,
                  ordem: aulaData.ordem || 1
                }
              });
            }
          }
        }
      }

      // 5. Buscar curso completo criado
      const cursoCompleto = await tx.curso.findUnique({
        where: { id_curso: novoCurso.id_curso },
        include: {
          instrutor: {
            select: {
              id_instrutor: true,
              nome: true,
              foto: true,
              bio: true
            }
          },
          tags: true,
          modulo: {
            include: {
              aula: {
                orderBy: { ordem: 'asc' }
              }
            },
            orderBy: { ordem: 'asc' }
          },
          recurso: true
        }
      });

      return cursoCompleto;
    });

    // Formatar resposta
        if (!resultado) {
          console.error('Erro: curso não retornado após criação');
          return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
          );
        }
    
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
    
        console.log('Novo curso criado com sucesso:', respostaFormatada.id);
        return NextResponse.json(respostaFormatada);
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar curso
export async function DELETE(
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

    // Verificar se o curso existe
    const curso = await prisma.curso.findUnique({
      where: { id_curso: parseInt(cursoId) }
    });

    if (!curso) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
    }

    // Deletar o curso
    await prisma.curso.delete({
      where: { id_curso: parseInt(cursoId) }
    });

    return NextResponse.json({ message: 'Curso deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}