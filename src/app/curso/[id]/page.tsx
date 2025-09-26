import { DashboardLayout } from "@/components/users/dashboard-layout"
import { CursoViewer } from "@/components/users/cursoViewer/components/CursoViewer"

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <CursoViewer cursoId={params.id} />
    </DashboardLayout>
  )
}
