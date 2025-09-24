import { UsuarioStats } from "@/types/curso"
import { StatsCard } from "./StatsCard"

interface StatsGridProps {
  stats: UsuarioStats
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatsCard value={stats.totalCursos} label="Total de Cursos" color="blue" />
      <StatsCard value={stats.cursosCompletados} label="Concluídos" color="green" />
      <StatsCard value={stats.cursosEmProgresso} label="Em Progresso" color="orange" />
      <StatsCard value={`${stats.totalHoras}h`} label="Horas Estudadas" color="purple" />
      <StatsCard value={stats.certificados} label="Certificados" color="yellow" />
    </div>
  )
}