import { AdminLayout } from "@/components/admin/admin-layout"
import { EditorCurso } from "@/components/admin/editorCurso/EditorCurso"

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const isCreating = params.id === "new"
  const courseId = isCreating ? undefined : params.id

  return (
    <AdminLayout>
        <EditorCurso cursoId={courseId} />
    </AdminLayout>
  )
}
