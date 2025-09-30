import { AdminSidebar } from "@/components/dashboard/admin/admin-sidebar"
import { AdminOverview } from "@/components/dashboard/admin/admin-overview"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <AdminOverview />
      </main>
    </div>
  )
}
