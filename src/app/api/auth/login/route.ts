import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/../../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'seu_jwt_secret_aqui'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    })

    // Verificar se usuário existe
    if (!usuario) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar aluno e admin
    const [aluno, admin] = await Promise.all([
      prisma.aluno.findUnique({
        where: { id_usuario: usuario.id_usuario }
      }),
      prisma.admin.findUnique({
        where: { id_usuario: usuario.id_usuario }
      })
    ])

    // Determinar tipo de usuário
    const tipoUsuario = admin ? "admin" : aluno ? "aluno" : "usuario";

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, usuario.senha)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    const payload = {
      usuarioId: usuario.id_usuario,
      email: usuario.email,
      tipo: tipoUsuario
    };

    // Criar token JWT
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1d', // Expira em 1 dia
      algorithm: 'HS256' // Algoritmo de assinatura
    });

    // Preparar dados do usuário para resposta (sem a senha)
    const { senha, ...userWithoutPassword } = usuario

    return NextResponse.json({
      success: true,
      usuario: {
        ...userWithoutPassword,
        tipo: tipoUsuario
      },
      token,
      message: 'Login realizado com sucesso!'
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}