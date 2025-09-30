"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { ClientSidebar } from "@/components/dashboard/client/client-sidebar"
import { ClientOverview } from "@/components/dashboard/client/client-overview"
import { ClientLawyers } from "@/components/dashboard/client/client-lawyers"
import { ClientCases } from "@/components/dashboard/client/client-cases"
import { ClientAppointments } from "@/components/dashboard/client/client-appointments"
import { ClientProfile } from "@/components/dashboard/client/client-profile"
import { ClientNotifications } from "@/components/dashboard/client/client-notifications"

type ActiveTab = "overview" | "lawyers" | "cases" | "appointments" | "profile" | "notifications"

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ClientOverview />
      case "lawyers":
        return <ClientLawyers />
      case "cases":
        return <ClientCases />
      case "appointments":
        return <ClientAppointments />
      case "profile":
        return <ClientProfile />
      case "notifications":
        return <ClientNotifications />
      default:
        return <ClientOverview />
    }
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <div className="flex h-screen bg-background">
        <ClientSidebar
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
