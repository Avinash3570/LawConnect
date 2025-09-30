import { StudentSidebar } from "@/components/dashboard/student/student-sidebar"
import { StudentOverview } from "@/components/dashboard/student/student-overview"

export default function StudentDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />
      <main className="flex-1 overflow-y-auto">
        <StudentOverview />
      </main>
    </div>
  )
}
