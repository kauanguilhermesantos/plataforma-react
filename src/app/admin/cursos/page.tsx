import { AdminLayout } from "@/components/admin/layoutAdmin"
import { AdminCursosConteudo } from "@/components/admin/conteudoCurso/AdminCursosConteudo"

export default function AdminCoursesPage() {
  return (
    <AdminLayout>
      <AdminCursosConteudo />
    </AdminLayout>
  )
}
