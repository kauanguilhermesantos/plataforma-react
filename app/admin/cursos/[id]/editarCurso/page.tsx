import { AdminLayout } from "@/components/admin/admin-layout"
import { CourseEditor } from "@/components/admin/course-editor"

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const isCreating = params.id === "new"
  const courseId = isCreating ? undefined : params.id

  return (
    <AdminLayout>
        <CourseEditor courseId={courseId} />
    </AdminLayout>
  )
}
