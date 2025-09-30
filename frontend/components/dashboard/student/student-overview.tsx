"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, TrendingUp, Clock, Award, Lightbulb } from "lucide-react"

export function StudentOverview() {
  const stats = [
    { name: "Completed Courses", value: "12", icon: BookOpen, change: "+2 this month" },
    { name: "Mentorship Sessions", value: "8", icon: Users, change: "+3 scheduled" },
    { name: "Study Hours", value: "45", icon: Clock, change: "+12 this week" },
    { name: "Achievement Points", value: "1,250", icon: Award, change: "+150 earned" },
  ]

  const recentActivities = [
    { type: "course", title: "Constitutional Law Basics", time: "2 hours ago", status: "completed" },
    { type: "session", title: "Mentorship with Sarah Johnson", time: "1 day ago", status: "completed" },
    { type: "resource", title: "Contract Law Case Studies", time: "2 days ago", status: "viewed" },
    { type: "appointment", title: "Career Guidance Session", time: "3 days ago", status: "scheduled" },
  ]

  const upcomingEvents = [
    { title: "Criminal Law Workshop", date: "Tomorrow, 2:00 PM", type: "workshop" },
    { title: "Mentorship Session", date: "Dec 15, 10:00 AM", type: "mentorship" },
    { title: "Mock Trial Practice", date: "Dec 18, 3:00 PM", type: "practice" },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Track your learning progress and upcoming activities</p>
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
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.type === "course" && <BookOpen className="w-4 h-4 text-blue-600" />}
                      {activity.type === "session" && <Users className="w-4 h-4 text-blue-600" />}
                      {activity.type === "resource" && <Lightbulb className="w-4 h-4 text-blue-600" />}
                      {activity.type === "appointment" && <Calendar className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant={activity.status === "completed" ? "default" : "secondary"}>{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span>Find Mentor</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Calendar className="w-6 h-6" />
              <span>Schedule Session</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <BookOpen className="w-6 h-6" />
              <span>Browse Resources</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
