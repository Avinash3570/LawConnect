"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Eye, Calendar, User, FileText, MessageCircle } from "lucide-react"

interface Case {
  id: string
  title: string
  description: string
  lawyer?: string
  status: "active" | "pending" | "completed" | "consultation" | "floating"
  priority: "high" | "medium" | "low"
  dateCreated: string
  lastUpdated: string
  nextHearing?: string
  budget?: number
}

export function ClientCases() {
  const [cases, setCases] = useState<Case[]>([])
  const [filteredCases, setFilteredCases] = useState<Case[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newCase, setNewCase] = useState({
    title: "",
    description: "",
    priority: "medium" as Case["priority"],
    budget: "",
  })

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // Mock data for demonstration
        const mockCases: Case[] = [
          {
            id: "1",
            title: "Employment Contract Review",
            description:
              "Need legal review of employment contract terms and conditions, including non-compete clauses.",
            lawyer: "Sarah Johnson",
            status: "active",
            priority: "high",
            dateCreated: "2024-11-15",
            lastUpdated: "2024-12-10",
            nextHearing: "2024-12-18",
            budget: 2500,
          },
          {
            id: "2",
            title: "Property Purchase Agreement",
            description:
              "Legal assistance required for residential property purchase, including title review and closing.",
            lawyer: "Michael Brown",
            status: "pending",
            priority: "medium",
            dateCreated: "2024-11-20",
            lastUpdated: "2024-12-09",
            budget: 1800,
          },
          {
            id: "3",
            title: "Business Formation Consultation",
            description: "Seeking advice on LLC formation, operating agreements, and business structure optimization.",
            lawyer: "Emily Davis",
            status: "consultation",
            priority: "medium",
            dateCreated: "2024-12-01",
            lastUpdated: "2024-12-08",
            budget: 1200,
          },
          {
            id: "4",
            title: "Trademark Registration",
            description:
              "Need assistance with trademark search, application, and registration process for business name.",
            status: "floating",
            priority: "low",
            dateCreated: "2024-12-05",
            lastUpdated: "2024-12-05",
            budget: 800,
          },
        ]
        setCases(mockCases)
        setFilteredCases(mockCases)
      } catch (error) {
        console.error("Error fetching cases:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  useEffect(() => {
    let filtered = cases

    if (searchTerm) {
      filtered = filtered.filter(
        (case_) =>
          case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          case_.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((case_) => case_.status === statusFilter)
    }

    setFilteredCases(filtered)
  }, [cases, searchTerm, statusFilter])

  const handleNewCaseSubmit = async () => {
    if (!newCase.title || !newCase.description) return

    const caseData: Case = {
      id: Date.now().toString(),
      title: newCase.title,
      description: newCase.description,
      status: "floating",
      priority: newCase.priority,
      dateCreated: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      budget: newCase.budget ? Number.parseInt(newCase.budget) : undefined,
    }

    setCases((prev) => [caseData, ...prev])
    setNewCase({ title: "", description: "", priority: "medium", budget: "" })
    setShowNewCaseDialog(false)
  }

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
      case "floating":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
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
          <h1 className="text-3xl font-bold text-foreground">My Cases</h1>
          <p className="text-muted-foreground">Track your legal matters and communicate with your lawyers</p>
        </div>
        <Dialog open={showNewCaseDialog} onOpenChange={setShowNewCaseDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post a New Case</DialogTitle>
              <DialogDescription>Describe your legal matter and we'll help you find the right lawyer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Case Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your legal matter"
                  value={newCase.title}
                  onChange={(e) => setNewCase((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about your legal situation..."
                  rows={4}
                  value={newCase.description}
                  onChange={(e) => setNewCase((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newCase.priority}
                    onValueChange={(value) => setNewCase((prev) => ({ ...prev, priority: value as Case["priority"] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (Optional)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={newCase.budget}
                    onChange={(e) => setNewCase((prev) => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewCaseDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewCaseSubmit}>Post Case</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="floating">Floating</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      {filteredCases.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No cases found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredCases.map((case_) => (
            <Card key={case_.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{case_.title}</h3>
                      <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                      <Badge variant="outline" className={getPriorityColor(case_.priority)}>
                        {case_.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      {case_.lawyer && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {case_.lawyer}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Updated {case_.lastUpdated}
                      </div>
                      {case_.budget && (
                        <div className="flex items-center gap-1">
                          <span>Budget: ${case_.budget}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{case_.description}</p>
                    {case_.nextHearing && (
                      <p className="text-sm text-primary font-medium">Next hearing: {case_.nextHearing}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {case_.lawyer && (
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Lawyer
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCase(case_)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedCase?.title}</DialogTitle>
                          <DialogDescription>Case details and information</DialogDescription>
                        </DialogHeader>
                        {selectedCase && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              {selectedCase.lawyer && (
                                <div>
                                  <Label className="text-sm font-medium">Assigned Lawyer</Label>
                                  <p className="text-sm text-muted-foreground">{selectedCase.lawyer}</p>
                                </div>
                              )}
                              <div>
                                <Label className="text-sm font-medium">Status</Label>
                                <Badge className={getStatusColor(selectedCase.status)}>{selectedCase.status}</Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Priority</Label>
                                <Badge className={getPriorityColor(selectedCase.priority)}>
                                  {selectedCase.priority}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Date Created</Label>
                                <p className="text-sm text-muted-foreground">{selectedCase.dateCreated}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Description</Label>
                              <p className="text-sm text-muted-foreground mt-1">{selectedCase.description}</p>
                            </div>
                            <div className="flex gap-2">
                              {selectedCase.lawyer ? (
                                <Button>
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Contact Lawyer
                                </Button>
                              ) : (
                                <Button>Find Lawyer</Button>
                              )}
                              <Button variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                View Documents
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
