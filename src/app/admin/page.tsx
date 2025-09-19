import { AdminDashboard } from "@/components/admin/dashboardAdmin"
import { AdminLayout } from "@/components/admin/layoutAdmin"

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}
