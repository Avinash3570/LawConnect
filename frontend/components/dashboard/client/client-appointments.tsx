"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarDays, Clock, Plus, Edit, Trash2, User, Video } from "lucide-react"

interface Appointment {
  id: string
  lawyer: string
  title: string
  date: string
  time: string
  duration: number
  type: "consultation" | "hearing" | "meeting" | "follow-up"
  status: "scheduled" | "completed" | "cancelled"
  location?: string
  meetingLink?: string
  notes?: string
}

export function ClientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Mock data for demonstration
        const mockAppointments: Appointment[] = [
          {
            id: "1",
            lawyer: "Sarah Johnson",
            title: "Employment Contract Review",
            date: "2024-12-11",
            time: "15:00",
            duration: 60,
            type: "consultation",
            status: "scheduled",
            location: "Law Office - Conference Room A",
            notes: "Bring employment contract and any related documents",
          },
          {
            id: "2",
            lawyer: "Michael Brown",
            title: "Property Purchase Discussion",
            date: "2024-12-12",
            time: "11:00",
            duration: 45,
            type: "meeting",
            status: "scheduled",
            meetingLink: "https://meet.google.com/abc-defg-hij",
            notes: "Virtual meeting to discuss property purchase timeline",
          },
          {
            id: "3",
            lawyer: "Emily Davis",
            title: "Business Formation Consultation",
            date: "2024-12-08",
            time: "14:00",
            duration: 90,
            type: "consultation",
            status: "completed",
            location: "Client Office",
            notes: "Initial consultation completed successfully",
          },
        ]
        setAppointments(mockAppointments)
      } catch (error) {
        console.error("Error fetching appointments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "hearing":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "meeting":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "follow-up":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === "scheduled")
  const pastAppointments = appointments.filter((apt) => apt.status !== "scheduled")

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground">Manage your scheduled meetings and consultations with lawyers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Upcoming Appointments ({upcomingAppointments.length})
          </CardTitle>
          <CardDescription>Your scheduled appointments with lawyers</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming appointments scheduled</p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Your First Appointment
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{appointment.title}</h3>
                        <Badge className={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{appointment.lawyer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {formatTime(appointment.time)} ({appointment.duration} min)
                          </span>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Location:</span>
                            <span>{appointment.location}</span>
                          </div>
                        )}
                        {appointment.meetingLink && (
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            <a
                              href={appointment.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Join Video Call
                            </a>
                          </div>
                        )}
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-muted-foreground mt-2 italic">{appointment.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {appointment.meetingLink && (
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Past Appointments ({pastAppointments.length})</CardTitle>
          <CardDescription>Your completed and cancelled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          {pastAppointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No past appointments to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{appointment.title}</h3>
                        <Badge className={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{appointment.lawyer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {formatTime(appointment.time)} ({appointment.duration} min)
                          </span>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Location:</span>
                            <span>{appointment.location}</span>
                          </div>
                        )}
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-muted-foreground mt-2 italic">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
