"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Users, Plus, ArrowRight, Clock, CheckCircle } from "lucide-react"

interface DashboardStats {
  activeCases: number
  completedCases: number
  upcomingAppointments: number
  availableLawyers: number
}

interface RecentCase {
  id: string
  title: string
  lawyer: string
  status: "active" | "pending" | "completed" | "consultation"
  lastUpdated: string
  nextAction?: string
}

interface UpcomingAppointment {
  id: string
  lawyer: string
  date: string
  time: string
  type: "consultation" | "hearing" | "meeting"
}

export function ClientOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    activeCases: 0,
    completedCases: 0,
    upcomingAppointments: 0,
    availableLawyers: 0,
  })
  const [recentCases, setRecentCases] = useState<RecentCase[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Mock data for demonstration
        setStats({
          activeCases: 3,
          completedCases: 7,
          upcomingAppointments: 2,
          availableLawyers: 45,
        })

        setRecentCases([
          {
            id: "1",
            title: "Employment Contract Review",
            lawyer: "Sarah Johnson",
            status: "active",
            lastUpdated: "2 hours ago",
            nextAction: "Document review scheduled",
          },
          {
            id: "2",
            title: "Property Purchase Agreement",
            lawyer: "Michael Brown",
            status: "pending",
            lastUpdated: "1 day ago",
            nextAction: "Awaiting lawyer response",
          },
          {
            id: "3",
            title: "Business Formation",
            lawyer: "Emily Davis",
            status: "consultation",
            lastUpdated: "3 days ago",
            nextAction: "Initial consultation completed",
          },
        ])

        setUpcomingAppointments([
          {
            id: "1",
            lawyer: "Sarah Johnson",
            date: "Today",
            time: "3:00 PM",
            type: "consultation",
          },
          {
            id: "2",
            lawyer: "Michael Brown",
            date: "Tomorrow",
            time: "11:00 AM",
            type: "meeting",
          },
        ])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "consultation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your legal matters.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCases}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCases}</div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Lawyers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableLawyers}</div>
            <p className="text-xs text-muted-foreground">Ready to help</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Recent Cases</CardTitle>
                <CardDescription>Your latest legal matters and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{case_.title}</h4>
                    <p className="text-sm text-muted-foreground">Lawyer: {case_.lawyer}</p>
                    <p className="text-xs text-muted-foreground">{case_.lastUpdated}</p>
                    {case_.nextAction && <p className="text-xs text-primary font-medium">{case_.nextAction}</p>}
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled meetings with lawyers</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                </div>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{appointment.lawyer}</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {appointment.type}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Find a Lawyer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Plus className="h-6 w-6" />
              <span>Start New Case</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span>Schedule Consultation</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Need Legal Help?</CardTitle>
          <CardDescription>
            Our platform connects you with qualified lawyers who can help with your specific legal needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Browse our directory of experienced lawyers or post your case for lawyers to review.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Free initial consultations available</li>
                <li>• Transparent pricing and reviews</li>
                <li>• Secure communication platform</li>
              </ul>
            </div>
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
