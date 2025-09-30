"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, Plus, Calendar, DollarSign, User, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CaseListProps {
  userRole?: string
  showCreateButton?: boolean
}

export function CaseList({ userRole = "admin", showCreateButton = true }: CaseListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const cases = [
    {
      id: "CASE-001",
      title: "Smith vs. Johnson Contract Dispute",
      client: "John Smith",
      lawyer: "Sarah Johnson",
      type: "Contract Law",
      status: "in-progress",
      priority: "high",
      createdDate: "2024-01-15",
      dueDate: "2024-04-15",
      estimatedValue: "$50,000",
      progress: 65,
    },
    {
      id: "CASE-002",
      title: "Corporate Merger Legal Review",
      client: "TechCorp Inc.",
      lawyer: "Michael Chen",
      type: "Corporate Law",
      status: "open",
      priority: "medium",
      createdDate: "2024-02-01",
      dueDate: "2024-05-01",
      estimatedValue: "$125,000",
      progress: 25,
    },
    {
      id: "CASE-003",
      title: "Employment Discrimination Case",
      client: "Jane Doe",
      lawyer: "Emily Rodriguez",
      type: "Employment Law",
      status: "completed",
      priority: "high",
      createdDate: "2023-12-10",
      dueDate: "2024-03-10",
      estimatedValue: "$75,000",
      progress: 100,
    },
    {
      id: "CASE-004",
      title: "Intellectual Property Infringement",
      client: "Innovation Labs",
      lawyer: "David Thompson",
      type: "IP Law",
      status: "in-progress",
      priority: "urgent",
      createdDate: "2024-02-15",
      dueDate: "2024-04-01",
      estimatedValue: "$200,000",
      progress: 45,
    },
    {
      id: "CASE-005",
      title: "Real Estate Transaction Review",
      client: "Property Holdings LLC",
      lawyer: "Lisa Park",
      type: "Real Estate",
      status: "open",
      priority: "low",
      createdDate: "2024-03-01",
      dueDate: "2024-06-01",
      estimatedValue: "$25,000",
      progress: 10,
    },
  ]

  const statuses = ["all", "open", "in-progress", "completed", "closed"]
  const types = ["all", "Contract Law", "Corporate Law", "Employment Law", "IP Law", "Real Estate"]

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || caseItem.status === selectedStatus
    const matchesType = selectedType === "all" || caseItem.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700"
      case "in-progress":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-green-100 text-green-700"
      case "closed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-700"
      case "high":
        return "bg-orange-100 text-orange-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Cases</h1>
            <p className="text-gray-600">Manage and track all legal cases</p>
          </div>
          {showCreateButton && (
            <Link href="/cases/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Case
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search cases by title, client, or case ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
            >
              {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
            >
              {type === "all" ? "All Types" : type}
            </Button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCases.map((caseItem) => (
          <Card key={caseItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getStatusColor(caseItem.status)}>{caseItem.status}</Badge>
                    <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority}</Badge>
                  </div>
                  <CardTitle className="text-lg mb-1">
                    <Link href={`/cases/${caseItem.id}`} className="hover:text-blue-600">
                      {caseItem.title}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{caseItem.type}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/cases/${caseItem.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Case</DropdownMenuItem>
                    <DropdownMenuItem>Assign Lawyer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {caseItem.client}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {caseItem.estimatedValue}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {caseItem.dueDate}
                  </div>
                  <span>#{caseItem.id}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{caseItem.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${caseItem.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {caseItem.lawyer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{caseItem.lawyer}</span>
                  </div>
                  <Link href={`/cases/${caseItem.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}
