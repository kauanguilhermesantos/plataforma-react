import { DashboardLayout } from "@/components/users/dashboard-layout"
import { MeusCursosConteudo } from "@/components/users/meusCursos/components/MeusCursosConteudo"

export default function MyCoursesPage() {
  return (
    <DashboardLayout>
      <MeusCursosConteudo />
    </DashboardLayout>
  )
}
