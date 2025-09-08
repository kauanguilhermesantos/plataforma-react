
import { AdminLayout } from "@/components/admin/admin-layout"
import { CourseCreationForm } from "@/components/admin/course-creation-form"

export default function NewCoursePage() {
  return (
    <AdminLayout>
        <CourseCreationForm />
    </AdminLayout>
  )
}
