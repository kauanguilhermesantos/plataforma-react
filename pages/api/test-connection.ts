// pages/api/test-connection.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Teste simples de conexão
    const result = await prisma.$queryRaw`SELECT version()`
    
    // Teste listando usuários
    const usuarios = await prisma.usuario.findMany({
      take: 5
    })
    
    res.status(200).json({
      message: 'Conexão estabelecida com sucesso!',
      databaseVersion: result,
      usuarios: usuarios
    })
  } catch (error) {
    console.error('Erro na conexão:', error)
    res.status(500).json({ 
      error: 'Falha na conexão com o banco',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    })
  }
}