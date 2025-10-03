
import { AdminLayout } from "@/components/admin/layoutAdmin"
import { CriacaoCursoForm } from "@/components/admin/criacaoCurso/CriacaoCursoForm"

export default function NewCoursePage() {
  return (
    <AdminLayout>
        <CriacaoCursoForm />
    </AdminLayout>
  )
}
