// app/api/lsq/salvar-resultados/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/../../lib/prisma'
import { verify } from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('token')?.value
    if (!token) {
      console.log('❌ Token não encontrado nos cookies')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.log('✅ Token encontrado')

    // Decodificar token
    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET!) as any
      console.log('🔓 Token decodificado:', decoded)
    } catch (decodeError) {
      console.error('❌ Erro ao decodificar token:', decodeError)
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    // Extrair ID do usuário - verifique a estrutura real do seu token
    const usuarioId = decoded.userId || decoded.id || decoded.sub || decoded.usuarioId
    console.log('👤 ID do usuário extraído:', usuarioId)

    if (!usuarioId) {
      console.error('❌ Estrutura completa do token:', JSON.stringify(decoded, null, 2))
      return NextResponse.json({ 
        error: 'ID do usuário não encontrado no token',
        tokenStructure: decoded // Para debug
      }, { status: 401 })
    }

    // Garantir que é número
    const usuarioIdNumber = Number(usuarioId)
    if (isNaN(usuarioIdNumber)) {
      console.error('❌ ID do usuário não é um número:', usuarioId)
      return NextResponse.json({ error: 'ID do usuário inválido' }, { status: 400 })
    }

    console.log('🔢 ID do usuário (número):', usuarioIdNumber)

    const body = await request.json()
    const { estiloDominante, resultados } = body

    console.log('📦 Dados do corpo:', { estiloDominante, resultados })

    // Validar dados
    if (!estiloDominante || !resultados) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    // Buscar aluno
    console.log('🔍 Buscando aluno com ID:', usuarioIdNumber)
    const aluno = await prisma.aluno.findUnique({
      where: { id_usuario: usuarioIdNumber }
    })

    console.log('🎓 Aluno encontrado:', aluno)

    if (!aluno) {
      return NextResponse.json(
        { error: 'Perfil de aluno não encontrado' },
        { status: 404 }
      )
    }

    // Primeiro, verificar se existe o estilo_aprendizagem na tabela de referência
    try {
      // Tentar inserir ou verificar o estilo_aprendizagem na tabela de referência
      await prisma.$executeRaw`
        INSERT INTO koda_schema.estilo_aprendizagem 
        (estilo_aprendizagem_dominante, ativista_score, reflexivo_score, teorico_score, pragmatico_score)
        VALUES (${estiloDominante}, ${resultados.ativista}, ${resultados.reflexivo}, ${resultados.teorico}, ${resultados.pragmatico})
        ON CONFLICT (estilo_aprendizagem_dominante, ativista_score, reflexivo_score, teorico_score, pragmatico_score) 
        DO NOTHING
      `
      console.log('✅ Estilo aprendizagem preparado na tabela de referência')
    } catch (refError) {
      console.log('ℹ️  Estilo aprendizagem já existe ou não foi necessário inserir')
    }

    // Atualizar usuário
    console.log('🔄 Atualizando aluno...')
    const alunoAtualizado = await prisma.aluno.update({
      where: { id_usuario: usuarioIdNumber  },
      data: {
        estilo_aprendizagem: estiloDominante,
        primeiro_acesso: false,
        ativista_score: resultados.ativista,
        reflexivo_score: resultados.reflexivo,
        teorico_score: resultados.teorico,
        pragmatico_score: resultados.pragmatico,
      },
    })

    console.log('DEBUG - Aluno atualizado:', alunoAtualizado)

    return NextResponse.json({ 
      success: true, 
      usuario: {
        id_usuario: usuarioIdNumber,
        primeiroAcesso: false,
        estiloAprendizagem: estiloDominante,
        estiloAprendizagemScores: {
          ativista: resultados.ativista,
          reflexivo: resultados.reflexivo,
          teorico: resultados.teorico,
          pragmatico: resultados.pragmatico
        }
      } 
    })

  } catch (error) {
    console.error('Erro ao salvar resultados LSQ:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Registro de aluno não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}