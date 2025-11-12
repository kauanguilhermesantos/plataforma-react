// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/../lib/prisma'
import bcrypt from 'bcryptjs'

// Rota de registro de usuário (POST)
export async function POST(request: NextRequest) {
  try {
    const {
      nome,
      sobrenome,
      email,
      senha,
      aceitar_termos
    } = await request.json()

    // Validações básicas
    if (!nome || !sobrenome || !email || !senha) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se os termos de uso foram aceitos
    if (!aceitar_termos) {
      return NextResponse.json(
        { error: 'Você deve aceitar os termos de uso' },
        { status: 400 }
      )
    }

    // Verificar se o email já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'Este email já está em uso' },
        { status: 400 }
      )
    }

    // Criptografar a senha
    const hashedSenha = await bcrypt.hash(senha, 12)

    // Criar usuário - aluno por padrão
    const usuario = await prisma.usuario.create({
      data: {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: hashedSenha,
        aceitar_termos: aceitar_termos,
      }
    })

    // Criar registro na tabela aluno
    await prisma.aluno.create({
      data: {
        id_usuario: usuario.id_usuario,
        data_entrada: new Date(),
      }
    })

    // Retornar dados sem a senha
    const { senha: _, ...usuarioSemSenha } = usuario

    // Responder com sucesso
    return NextResponse.json(
      { 
        success: true, 
        usuario,
        message: 'Conta criada com sucesso!'
      },
      { status: 201 }
    )

  } catch (error) { // Erro interno do servidor
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}