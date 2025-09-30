"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Activity,
  Database,
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "User Management", href: "/dashboard/admin/users", icon: Users },
  { name: "Case Management", href: "/dashboard/admin/cases", icon: FileText },
  { name: "Appointments", href: "/dashboard/admin/appointments", icon: Calendar },
  { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { name: "System Activity", href: "/dashboard/admin/activity", icon: Activity },
  { name: "Database", href: "/dashboard/admin/database", icon: Database },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-600">{user?.name}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-3">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || (item.href === "/dashboard/admin" && pathname === "/dashboard/admin")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors",
                isActive
                  ? "bg-red-50 text-red-700 border-r-2 border-red-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900" onClick={logout}>
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
