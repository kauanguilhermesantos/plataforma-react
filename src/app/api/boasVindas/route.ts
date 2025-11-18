import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/../../lib/prisma'
import { getUsuarioFromToken } from '@/utils/auth'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const usuarioToken = await getUsuarioFromToken(request)

    if (!usuarioToken) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar usuário no banco para garantir que existe
    const usuario = await prisma.usuario.findUnique({
        where: { id_usuario: usuarioToken.usuarioId}
    })

    if (!usuario) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar aluno associado ao usuário
    const aluno = await prisma.aluno.findUnique({
      where: { id_usuario: usuario.id_usuario }
    })

    if (!aluno) {
      return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 })
    }

    // Atualizar primeiro_acesso para false
    const alunoAtualizado = await prisma.aluno.update({
      where: { id_usuario: aluno.id_usuario },
      data: { primeiro_acesso: false }
    })

    return NextResponse.json({
      success: true,
      message: 'Primeiro acesso concluído'
    })

  } catch (error) {
    console.error('Erro ao atualizar primeiro acesso:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}