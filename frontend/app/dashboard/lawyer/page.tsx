"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { LawyerSidebar } from "@/components/dashboard/lawyer/lawyer-sidebar"
import { LawyerOverview } from "@/components/dashboard/lawyer/lawyer-overview"
import { LawyerCases } from "@/components/dashboard/lawyer/lawyer-cases"
import { LawyerAppointments } from "@/components/dashboard/lawyer/lawyer-appointments"
import { LawyerProfile } from "@/components/dashboard/lawyer/lawyer-profile"
import { LawyerNotifications } from "@/components/dashboard/lawyer/lawyer-notifications"

type ActiveTab = "overview" | "cases" | "appointments" | "profile" | "notifications"

export default function LawyerDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <LawyerOverview />
      case "cases":
        return <LawyerCases />
      case "appointments":
        return <LawyerAppointments />
      case "profile":
        return <LawyerProfile />
      case "notifications":
        return <LawyerNotifications />
      default:
        return <LawyerOverview />
    }
  }

  return (
    <ProtectedRoute allowedRoles={["lawyer"]}>
      <div className="flex h-screen bg-background">
        <LawyerSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">{renderContent()}</div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
