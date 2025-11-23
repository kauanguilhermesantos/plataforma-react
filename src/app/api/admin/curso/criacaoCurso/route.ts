// app/api/cursos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-key';

function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token não fornecido');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, JWT_SECRET) as any;
  
  console.log('🔐 Token decodificado:', decoded); // DEBUG

  if (decoded.tipo !== 'admin') {
    throw new Error('Acesso não autorizado');
  }

  // Verificar se o userId existe no token
  if (!decoded.usuarioId && !decoded.id && !decoded.sub) {
    throw new Error('Token não contém ID do usuário');
  }

  // Retornar o ID do usuário - tentar diferentes possíveis campos
  return {
    id_usuario: decoded.usuarioId || decoded.id || decoded.sub,
    tipo: decoded.tipo
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verificar token JWT
    const tokenData = verifyToken(request.headers.get('Authorization'));

    console.log('👤 Dados do token:', tokenData); // DEBUG

    const body = await request.json();

    console.log('📨 Dados recebidos:', body); // DEBUG
    
    // Validar dados obrigatórios
    if (!body.titulo || !body.descricao || !body.categoria || !body.nivel || !body.estiloAprendizagem) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' }, 
        { status: 400 }
      );
    }

    // Validar dados do instrutor
    if (!body.instrutor || !body.instrutor.nome) {
      return NextResponse.json(
        { error: 'Dados do instrutor são obrigatórios' }, 
        { status: 400 }
      );
    }

    // Buscar admin pelo ID do token
    const admin = await prisma.admin.findUnique({
      where: { id_usuario: parseInt(tokenData?.id_usuario) }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin não encontrado' }, 
        { status: 404 }
      );
    }

    // Verificar se o instrutor já existe
    let instrutor;

    // Se tiver ID, buscar instrutor existente
    if (body.instrutor.id_instrutor) {
      instrutor = await prisma.instrutor.findUnique({
        where: { id_instrutor: body.instrutor.id_instrutor }
      });
      
      if (!instrutor) {
        return NextResponse.json(
          { error: 'Instrutor não encontrado' }, 
          { status: 404 }
        );
      }

      // Atualizar dados do instrutor existente
      if (body.instrutor.nome || body.instrutor.bio || body.instrutor.foto) {
        instrutor = await prisma.instrutor.update({
          where: { id_instrutor: body.instrutor.id_instrutor },
          data: {
            nome: body.instrutor.nome,
            bio: body.instrutor.bio,
            foto: body.instrutor.foto,
          }
        });
      }
    } else {
      // Criar novo instrutor
      instrutor = await prisma.instrutor.create({
        data: {
          nome: body.instrutor.nome,
          bio: body.instrutor.bio,
          foto: body.instrutor.foto,
        }
      });
      console.log('👨‍🏫 Novo instrutor criado:', instrutor);
    }

    console.log('🎯 Tentando criar curso com:', {
      titulo: body.titulo,
      id_instrutor: instrutor.id_instrutor,
      id_usuario: admin.id_usuario
    });

    // Criar o curso
    const curso = await prisma.curso.create({
      data: {
        titulo: body.titulo,
        descricao: body.descricao,
        thumbnail: body.thumbnail,
        categoria: body.categoria,
        nivel: body.nivel,
        estilo_aprendizagem: body.estiloAprendizagem,
        status: body.status || 'Rascunho',
        id_usuario: admin.id_usuario,
        tags: {
          create: body.tags?.map((tag: string) => ({
            nome_tag: tag
          })) || []
        },
        id_instrutor: instrutor.id_instrutor,
      }
    });

    // Criar módulos e aulas se existirem
    if (body.modulos && body.modulos.length > 0) {
      for (const [index, modulo] of body.modulos.entries()) {
        const moduloCriado = await prisma.modulo.create({
          data: {
            titulo: modulo.titulo || `Módulo ${index + 1}`,
            descricao: modulo.descricao || '',
            ordem: modulo.ordem || index + 1,
            status: modulo.status || 'Rascunho',
            id_curso: curso.id_curso,
          }
        });

        console.log(`✅ Módulo criado: `, moduloCriado);

        if (modulo.aulas && modulo.aulas.length > 0) {
          for (const [aulaIndex, aula] of modulo.aulas.entries()) {

            console.log(`📹 Criando aula ${aulaIndex + 1}:`, aula.titulo);
            console.log('📁 Dados da aula:', {
              titulo: aula.titulo,
              duracao: aula.duracao,
              arquivo: aula.arquivo,
              video_url: aula.video_url,
              videoUrl: aula.videoUrl
            });
            
            // Converter duração para número se for string
            const duracao = typeof aula.duracao === 'string' 
              ? parseInt(aula.duracao) || 0 
              : aula.duracao || 0;

            // Usar qualquer um dos campos que contenha a URL do vídeo
            const arquivoVideo = aula.videoUrl || null;

            await prisma.aula.create({
              data: {
                titulo: aula.titulo || `Aula ${aulaIndex + 1}`,
                duracao: aula.duracao,
                descricao: aula.descricao || '',
                ordem: aula.ordem || aulaIndex + 1,
                arquivo: aula.arquivo,
                status: aula.status || 'Rascunho',
                id_modulo: moduloCriado.id_modulo,
              }
            });
          }
          console.log(`✅ ${modulo.aulas.length} aulas criadas`);
          console.log("Aulas:", modulo.aulas);
        }
      }
    }

    // Buscar curso completo com relacionamentos
    const cursoCompleto = await prisma.curso.findUnique({
      where: { id_curso: curso.id_curso },
      include: {
        instrutor: true,
        tags: true,
        modulo: {
          include: {
            aula: true
          },
          orderBy: { ordem: 'asc' }
        }
      }
    });

    return NextResponse.json(cursoCompleto, { status: 201 });

  } catch (error: any) {
    console.error('Erro ao criar curso:', error);
    
    if (error.message === 'Token não fornecido' || error.message === 'Acesso não autorizado') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}