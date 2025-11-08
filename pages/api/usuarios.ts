// pages/api/usuarios.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.usuario.findMany({
        include: {
          Aluno: true,
          Admin: true,
        },
        orderBy: {
          id_usuario: 'asc'
        }
      })
      
      res.status(200).json(usuarios)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      const { nome, sobrenome, email, senha, telefone, localizacao, data_nascimento } = req.body
      
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          sobrenome,
          email,
          senha,
          telefone,
          localizacao,
          data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
        }
      })
      
      res.status(201).json(usuario)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      res.status(500).json({ error: 'Erro ao criar usuário' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}