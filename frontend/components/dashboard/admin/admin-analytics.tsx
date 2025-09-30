"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Users, FileText, Download, Filter } from "lucide-react"

export function AdminAnalytics() {
  const metrics = [
    {
      name: "Total Revenue",
      value: "$124,500",
      change: "+12.5%",
      trend: "up",
      period: "vs last month",
    },
    {
      name: "New Users",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      period: "vs last month",
    },
    {
      name: "Cases Completed",
      value: "89",
      change: "-3.1%",
      trend: "down",
      period: "vs last month",
    },
    {
      name: "Avg. Response Time",
      value: "2.4h",
      change: "-15.3%",
      trend: "up",
      period: "vs last month",
    },
  ]

  const userGrowth = [
    { month: "Jan", lawyers: 45, clients: 234, students: 89 },
    { month: "Feb", lawyers: 52, clients: 287, students: 112 },
    { month: "Mar", lawyers: 61, clients: 342, students: 134 },
    { month: "Apr", lawyers: 68, clients: 398, students: 156 },
    { month: "May", lawyers: 74, clients: 445, students: 178 },
    { month: "Jun", lawyers: 82, clients: 502, students: 201 },
  ]

  const caseStats = [
    { type: "Corporate Law", cases: 45, revenue: "$45,600", avgDuration: "3.2 months" },
    { type: "Criminal Law", cases: 32, revenue: "$28,800", avgDuration: "2.8 months" },
    { type: "Family Law", cases: 28, revenue: "$22,400", avgDuration: "4.1 months" },
    { type: "IP Law", cases: 19, revenue: "$38,000", avgDuration: "5.2 months" },
    { type: "Real Estate", cases: 15, revenue: "$18,000", avgDuration: "2.1 months" },
  ]

  const topPerformers = [
    { name: "Sarah Johnson", cases: 23, revenue: "$46,000", rating: 4.9 },
    { name: "Michael Chen", cases: 19, revenue: "$38,000", rating: 4.8 },
    { name: "Emily Rodriguez", cases: 17, revenue: "$34,000", rating: 4.7 },
    { name: "David Thompson", cases: 15, revenue: "$30,000", rating: 4.6 },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive platform performance metrics and insights</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">{metric.period}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userGrowth.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{data.month}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-blue-600">{data.lawyers} Lawyers</span>
                    <span className="text-green-600">{data.clients} Clients</span>
                    <span className="text-purple-600">{data.students} Students</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Case Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Case Statistics by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {caseStats.map((stat) => (
                <div key={stat.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{stat.type}</p>
                    <p className="text-sm text-gray-600">
                      {stat.cases} cases • {stat.avgDuration} avg
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{stat.revenue}</p>
                    <Badge variant="secondary" className="text-xs">
                      {stat.cases} cases
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Top Performing Lawyers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div
                key={performer.name}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600">Rating: {performer.rating}/5</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{performer.cases}</p>
                    <p className="text-gray-600">Cases</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{performer.revenue}</p>
                    <p className="text-gray-600">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
