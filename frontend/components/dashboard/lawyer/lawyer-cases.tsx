"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Plus, Calendar, User, FileText } from "lucide-react"

interface Case {
  id: string
  title: string
  client: string
  description: string
  status: "active" | "pending" | "completed" | "floating"
  priority: "high" | "medium" | "low"
  dateCreated: string
  lastUpdated: string
  nextHearing?: string
}

export function LawyerCases() {
  const [cases, setCases] = useState<Case[]>([])
  const [filteredCases, setFilteredCases] = useState<Case[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // Mock data for demonstration
        const mockCases: Case[] = [
          {
            id: "1",
            title: "Corporate Merger Agreement",
            client: "TechCorp Inc.",
            description: "Legal review and documentation for corporate merger between TechCorp and InnovateLabs.",
            status: "active",
            priority: "high",
            dateCreated: "2024-11-01",
            lastUpdated: "2024-12-10",
            nextHearing: "2024-12-15",
          },
          {
            id: "2",
            title: "Employment Contract Dispute",
            client: "John Smith",
            description: "Dispute resolution for wrongful termination and contract violations.",
            status: "pending",
            priority: "medium",
            dateCreated: "2024-11-15",
            lastUpdated: "2024-12-09",
          },
          {
            id: "3",
            title: "Intellectual Property Filing",
            client: "Innovation Labs",
            description: "Patent application and trademark registration for new technology.",
            status: "active",
            priority: "high",
            dateCreated: "2024-10-20",
            lastUpdated: "2024-12-10",
          },
          {
            id: "4",
            title: "Real Estate Transaction",
            client: "Property Developers LLC",
            description: "Commercial real estate purchase agreement and due diligence.",
            status: "completed",
            priority: "low",
            dateCreated: "2024-09-10",
            lastUpdated: "2024-11-30",
          },
          {
            id: "5",
            title: "Contract Negotiation Services",
            client: "Unassigned",
            description: "General contract negotiation and review services for small business.",
            status: "floating",
            priority: "medium",
            dateCreated: "2024-12-08",
            lastUpdated: "2024-12-08",
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
          case_.client.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((case_) => case_.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((case_) => case_.priority === priorityFilter)
    }

    setFilteredCases(filtered)
  }, [cases, searchTerm, statusFilter, priorityFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "floating":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
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

  const assignedCases = filteredCases.filter((case_) => case_.status !== "floating")
  const floatingCases = filteredCases.filter((case_) => case_.status === "floating")

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
          <h1 className="text-3xl font-bold text-foreground">Cases</h1>
          <p className="text-muted-foreground">Manage your assigned cases and view available floating cases</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases by title or client..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="floating">Floating</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Tabs */}
      <Tabs defaultValue="assigned" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assigned">Assigned Cases ({assignedCases.length})</TabsTrigger>
          <TabsTrigger value="floating">Floating Cases ({floatingCases.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="space-y-4">
          {assignedCases.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No assigned cases found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {assignedCases.map((case_) => (
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
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {case_.client}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Updated {case_.lastUpdated}
                          </div>
                          {case_.nextHearing && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Next hearing: {case_.nextHearing}
                            </div>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{case_.description}</p>
                      </div>
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
                                <div>
                                  <Label className="text-sm font-medium">Client</Label>
                                  <p className="text-sm text-muted-foreground">{selectedCase.client}</p>
                                </div>
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
                                <Button>Update Status</Button>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="floating" className="space-y-4">
          {floatingCases.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No floating cases available.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {floatingCases.map((case_) => (
                <Card
                  key={case_.id}
                  className="hover:shadow-md transition-shadow border-purple-200 dark:border-purple-800"
                >
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
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Posted {case_.dateCreated}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{case_.description}</p>
                      </div>
                      <div className="flex gap-2">
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
                              <DialogDescription>Floating case details</DialogDescription>
                            </DialogHeader>
                            {selectedCase && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Priority</Label>
                                    <Badge className={getPriorityColor(selectedCase.priority)}>
                                      {selectedCase.priority}
                                    </Badge>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Date Posted</Label>
                                    <p className="text-sm text-muted-foreground">{selectedCase.dateCreated}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Description</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{selectedCase.description}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button>Accept Case</Button>
                                  <Button variant="outline">Request More Info</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button size="sm">Accept Case</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
