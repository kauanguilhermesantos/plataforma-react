// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-key';

function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token não fornecido');
  }

  const token = authHeader.substring(7);
  return jwt.verify(token, JWT_SECRET);
}

export async function POST(request: NextRequest) {
  try {
    // Verificar token JWT
    verifyToken(request.headers.get('Authorization'));

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const tipo = formData.get('tipo') as string;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Validar tipo de arquivo
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm'];
    
    if (tipo === 'thumbnail' || tipo === 'instrutor_foto') {
      if (!allowedImageTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Tipo de arquivo de imagem não permitido' }, 
          { status: 400 }
        );
      }
      
      // Limitar tamanho para 5MB
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Arquivo muito grande. Máximo 5MB.' }, 
          { status: 400 }
        );
      }
    } 
    else if (tipo === 'video_aula') {
      if (!allowedVideoTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Tipo de arquivo de vídeo não permitido' }, 
          { status: 400 }
        );
      }
      
      // Limitar tamanho para 100MB
      if (file.size > 100 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Arquivo muito grande. Máximo 100MB.' }, 
          { status: 400 }
        );
      }
    }

    // Criar diretório se não existir
    const uploadsDir = join(process.cwd(), 'public/uploads', tipo);
    await mkdir(uploadsDir, { recursive: true });

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}_${randomString}.${extension}`;
    const filepath = join(uploadsDir, filename);

    // Converter File para Buffer e salvar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Retornar URL relativa
    const fileUrl = `/uploads/${tipo}/${filename}`;

    return NextResponse.json({ url: fileUrl });

  } catch (error: any) {
    console.error('Erro no upload:', error);
    
    if (error.message === 'Token não fornecido') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}