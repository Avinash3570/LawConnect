"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
} from "lucide-react"

export function AdminOverview() {
  const stats = [
    { name: "Total Users", value: "2,847", icon: Users, change: "+12% from last month", color: "blue" },
    { name: "Active Cases", value: "156", icon: FileText, change: "+8% from last month", color: "green" },
    { name: "Appointments Today", value: "23", icon: Calendar, change: "5 pending approval", color: "orange" },
    { name: "System Uptime", value: "99.9%", icon: Activity, change: "Last 30 days", color: "purple" },
  ]

  const userBreakdown = [
    { role: "Lawyers", count: 89, percentage: 31, color: "bg-blue-500" },
    { role: "Clients", count: 1456, percentage: 51, color: "bg-green-500" },
    { role: "Students", count: 298, percentage: 10, color: "bg-purple-500" },
    { role: "Admins", count: 4, percentage: 1, color: "bg-red-500" },
  ]

  const recentActivity = [
    {
      type: "user",
      action: "New lawyer registration",
      user: "Sarah Johnson",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      type: "case",
      action: "Case status updated",
      case: "Smith vs. Johnson",
      time: "12 minutes ago",
      status: "completed",
    },
    {
      type: "appointment",
      action: "Appointment scheduled",
      user: "Michael Chen",
      time: "1 hour ago",
      status: "completed",
    },
    { type: "system", action: "Database backup completed", time: "2 hours ago", status: "completed" },
    {
      type: "user",
      action: "Student account verified",
      user: "Emily Rodriguez",
      time: "3 hours ago",
      status: "completed",
    },
  ]

  const alerts = [
    { type: "warning", message: "3 lawyer applications pending review", priority: "medium" },
    { type: "info", message: "System maintenance scheduled for tonight", priority: "low" },
    { type: "error", message: "Failed payment notification for Case #1234", priority: "high" },
  ]

  const getStatColor = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      orange: "bg-orange-50 text-orange-600",
      purple: "bg-purple-50 text-purple-600",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="w-4 h-4" />
      case "case":
        return <FileText className="w-4 h-4" />
      case "appointment":
        return <Calendar className="w-4 h-4" />
      case "system":
        return <Activity className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "info":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage the LawConnect platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatColor(stat.color)}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userBreakdown.map((user) => (
                <div key={user.role} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${user.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{user.role}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{user.count}</span>
                    <span className="text-xs text-gray-500">({user.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <Badge
                      variant={
                        alert.priority === "high"
                          ? "destructive"
                          : alert.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="mt-1 text-xs"
                    >
                      {alert.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Review Pending Users
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                System Health Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.user && `User: ${activity.user}`}
                      {activity.case && `Case: ${activity.case}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            View All Activity
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
