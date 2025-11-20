import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/../lib/prisma'
import { verify } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação - pegar token do header Authorization
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]

    console.log('🔐 Token recebido:', token)
    console.log('🔑 JWT_SECRET definido:', !!process.env.JWT_SECRET)

    // Verificar e decodificar o token
    let usuarioId: number;
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as { usuarioId: number }
      usuarioId = Number(decoded.usuarioId)
      
      // Validar se o usuarioId é um número válido
      if (!usuarioId || isNaN(usuarioId)) {
        console.error('❌ usuarioId inválido:', decoded.usuarioId)
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
      }

      console.log('✅ Token válido, usuarioId:', usuarioId)
    } catch (jwtError) {
      console.error('❌ Erro na verificação do token:', jwtError)
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Validar dados
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    // Buscar usuário
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: usuarioId }
    })

    if (!usuario) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, usuario.senha)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 400 })
    }

    // Requisitos da Senha
    const requisitosSenha = [
    { test: (pwd: string) => pwd.length >= 8, message: 'A senha deve ter pelo menos 8 caracteres' },
    { test: (pwd: string) => /[a-z]/.test(pwd), message: 'A senha deve conter pelo menos uma letra minúscula' },
    { test: (pwd: string) => /[A-Z]/.test(pwd), message: 'A senha deve conter pelo menos uma letra maiúscula' },
    { test: (pwd: string) => /\d/.test(pwd), message: 'A senha deve conter pelo menos um número' },
    { test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), message: 'A senha deve conter pelo menos um caractere especial' },
    ]

    for (const requisitos of requisitosSenha) {
      if (!requisitos.test(newPassword)) {
        return NextResponse.json({ error: requisitos.message }, { status: 400 })
      }
    }

    // Criptografar nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Atualizar senha
    await prisma.usuario.update({
      where: { id_usuario: usuarioId },
      data: { senha: hashedNewPassword }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Senha alterada com sucesso',
      currentPassword: usuario.senha,
      newPassword: hashedNewPassword
    })

  } catch (error) {
    console.error('Erro ao alterar senha:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
