import { CourseViewer } from "@/components/course-viewer"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <CourseViewer courseId={params.id} />
    </DashboardLayout>
  )
}
