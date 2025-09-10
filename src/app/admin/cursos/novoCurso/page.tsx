
import { AdminLayout } from "@/components/admin/admin-layout"
import { CriacaoCursoForm } from "@/components/admin/criacaoCurso/CriacaoCursoForm"
// import { CourseCreationForm } from "@/components/admin/course-creation-form"

export default function NewCoursePage() {
  return (
    <AdminLayout>
        {/* <CourseCreationForm /> */}
        <CriacaoCursoForm />
    </AdminLayout>
  )
}
