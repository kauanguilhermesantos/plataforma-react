import { CourseViewer } from "@/components/course-viewer"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CursoViewer } from "@/components/users/cursoViewer/components/CursoViewer"

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <CursoViewer cursoId={params.id} />
      {/* <CourseViewer courseId={params.id} /> */}
    </DashboardLayout>
  )
}
