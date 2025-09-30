"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BellRing, Check, Trash2, Eye, Calendar, Briefcase, User, MessageCircle } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "case" | "appointment" | "system" | "lawyer" | "payment"
  priority: "high" | "medium" | "low"
  read: boolean
  createdAt: string
  actionUrl?: string
}

export function ClientNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Mock data for demonstration
        const mockNotifications: Notification[] = [
          {
            id: "1",
            title: "Case Update",
            message: "Sarah Johnson has updated the status of your Employment Contract Review case.",
            type: "case",
            priority: "high",
            read: false,
            createdAt: "2024-12-10T14:30:00Z",
            actionUrl: "/cases/1",
          },
          {
            id: "2",
            title: "Appointment Reminder",
            message: "You have a consultation with Sarah Johnson tomorrow at 3:00 PM.",
            type: "appointment",
            priority: "medium",
            read: false,
            createdAt: "2024-12-10T10:15:00Z",
            actionUrl: "/appointments/1",
          },
          {
            id: "3",
            title: "New Message",
            message: "Michael Brown has sent you a message regarding your property purchase case.",
            type: "lawyer",
            priority: "medium",
            read: true,
            createdAt: "2024-12-09T16:45:00Z",
          },
          {
            id: "4",
            title: "Payment Confirmation",
            message: "Your payment of $500 for legal consultation has been processed successfully.",
            type: "payment",
            priority: "low",
            read: true,
            createdAt: "2024-12-08T11:20:00Z",
          },
          {
            id: "5",
            title: "System Update",
            message: "LawConnect platform will undergo maintenance on December 15th from 2:00 AM to 4:00 AM.",
            type: "system",
            priority: "low",
            read: false,
            createdAt: "2024-12-08T09:00:00Z",
          },
        ]
        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "case":
        return <Briefcase className="h-4 w-4" />
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "lawyer":
        return <MessageCircle className="h-4 w-4" />
      case "payment":
        return <User className="h-4 w-4" />
      case "system":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "case":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "appointment":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "lawyer":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "payment":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "system":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

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
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your cases, appointments, and important messages
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            All Notifications
          </CardTitle>
          <CardDescription>Your recent notifications and updates</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 transition-all ${
                    !notification.read ? "bg-muted/50 border-primary/20" : "hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(notification.type)}
                          <h3
                            className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {notification.title}
                          </h3>
                        </div>
                        <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                        <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {!notification.read && <Badge variant="secondary">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</p>
                    </div>
                    <div className="flex gap-2">
                      {notification.actionUrl && (
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      )}
                      {!notification.read && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-4 w-4 mr-2" />
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
