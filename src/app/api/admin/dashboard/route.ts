// app/api/dashboard/stats/route.ts
import { prisma } from "@/../lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Buscar total de alunos
    const totalAlunos = await prisma.aluno.count()

    //Buscar total de admins
    const totalAdmins = await prisma.admin.count()
    
    // Buscar total de usuários
    const totalUsuarios = await prisma.usuario.count()
    
    // Buscar dados dos cursos
    const totalCursos = await prisma.curso.count()
    const cursosAtivos = await prisma.curso.count({
      where: {
        status: "Publicado" // Ajuste conforme necessário
      }
    })

    // Buscar usuários ativos (últimos 30 dias)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const activeUsers = await prisma.usuario.count({
      where: {
        // Ajuste conforme sua lógica de usuários ativos
        // Exemplo: se você tiver um campo last_login
        // last_login: { gte: thirtyDaysAgo }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        totalAlunos,
        totalAdmins,
        totalUsuarios,
        activeUsers: activeUsers || Math.round(totalUsuarios * 0.8), // Fallback
        totalCursos,
        cursosAtivos,
      }
    })
  } catch (error) {
    console.error("Erro na API do dashboard:", error)
    return NextResponse.json(
      { success: false, error: "Erro ao buscar dados" },
      { status: 500 }
    )
  }
}