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
    //   include: {
    //     aluno: true,
    //     admin: true
    //   }
    })

    // Verificar se usuário existe
    if (!usuario) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, usuario.senha)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Criar token JWT
    const token = jwt.sign(
      { 
        usuarioId: usuario.id_usuario,
        email: usuario.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Preparar dados do usuário para resposta (sem a senha)
    const { senha, ...userWithoutPassword } = usuario

    // Determinar o tipo de usuário
    // const userType = usuario.admin ? 'admin' : usuario.aluno ? 'aluno' : 'usuario'

    return NextResponse.json({
      success: true,
      usuario: {
        ...userWithoutPassword,
        // tipo: userType
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