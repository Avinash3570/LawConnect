"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { BookOpen, Users, Calendar, FileText, User, Bell, LogOut, GraduationCap, Lightbulb } from "lucide-react"

const navigation = [
  { name: "Overview", href: "/dashboard/student", icon: BookOpen },
  { name: "Mentors", href: "/dashboard/student/mentors", icon: Users },
  { name: "Appointments", href: "/dashboard/student/appointments", icon: Calendar },
  { name: "Resources", href: "/dashboard/student/resources", icon: FileText },
  { name: "Case Studies", href: "/dashboard/student/case-studies", icon: Lightbulb },
  { name: "Profile", href: "/dashboard/student/profile", icon: User },
  { name: "Notifications", href: "/dashboard/student/notifications", icon: Bell },
]

export function StudentSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Student Portal</h2>
            <p className="text-sm text-gray-600">{user?.name}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-3">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || (item.href === "/dashboard/student" && pathname === "/dashboard/student")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
              onClick={() => setActiveTab(item.name.toLowerCase())}
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
