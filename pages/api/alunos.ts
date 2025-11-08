// pages/api/alunos.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const alunos = await prisma.aluno.findMany({
        include: {
          usuario: true
        }
      })
      
      res.status(200).json(alunos)
    } catch (error) {
      console.error('Erro ao buscar alunos:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      const { id_usuario, bio, estilo_aprendizagem } = req.body
      
      const aluno = await prisma.aluno.create({
        data: {
          id_usuario: parseInt(id_usuario),
          bio,
          estilo_aprendizagem
        },
        include: {
          usuario: true
        }
      })
      
      res.status(201).json(aluno)
    } catch (error) {
      console.error('Erro ao criar aluno:', error)
      res.status(500).json({ error: 'Erro ao criar aluno' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}