"use client"

import { useEffect, useState } from "react";
import api from "@/services/api"; // 👈 axios helper

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Calendar,
  User,
  Clock,
  DollarSign,
  MessageSquare,
  Edit,
  Save,
  X,
  Plus,
  Download,
  Eye,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface CaseDetailProps {
  caseId: string
}

export function CaseDetail({ caseId }: CaseDetailProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [newNote, setNewNote] = useState("")

  // Mock case data - in real app, this would come from API
  const caseData = {
    id: caseId,
    title: "Smith vs. Johnson Contract Dispute",
    description: "Contract dispute regarding breach of service agreement between Smith Industries and Johnson Corp.",
    status: "in-progress",
    priority: "high",
    type: "Contract Law",
    client: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      company: "Smith Industries",
    },
    lawyer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@lawfirm.com",
      phone: "+1 (555) 234-5678",
      firm: "Johnson & Associates",
    },
    createdDate: "2024-01-15",
    lastUpdated: "2024-03-10",
    dueDate: "2024-04-15",
    estimatedValue: "$50,000",
    actualHours: 45,
    estimatedHours: 60,
    hourlyRate: "$300",
  }

  const documents = [
    { id: 1, name: "Service Agreement.pdf", type: "contract", size: "2.4 MB", uploadDate: "2024-01-15" },
    { id: 2, name: "Email Correspondence.pdf", type: "evidence", size: "1.8 MB", uploadDate: "2024-02-01" },
    { id: 3, name: "Financial Records.xlsx", type: "financial", size: "3.2 MB", uploadDate: "2024-02-15" },
    { id: 4, name: "Legal Brief.docx", type: "legal", size: "1.5 MB", uploadDate: "2024-03-01" },
  ]

  const notes = [
    {
      id: 1,
      author: "Sarah Johnson",
      role: "lawyer",
      content: "Initial consultation completed. Client provided all necessary documentation.",
      timestamp: "2024-01-16 10:30 AM",
    },
    {
      id: 2,
      author: "John Smith",
      role: "client",
      content: "Sent additional email correspondence as requested.",
      timestamp: "2024-02-01 2:15 PM",
    },
    {
      id: 3,
      author: "Sarah Johnson",
      role: "lawyer",
      content: "Reviewed all documentation. Preparing legal brief for court filing.",
      timestamp: "2024-03-01 9:45 AM",
    },
  ]

  const timeline = [
    { date: "2024-01-15", event: "Case created", type: "created" },
    { date: "2024-01-16", event: "Assigned to Sarah Johnson", type: "assigned" },
    { date: "2024-02-01", event: "Status updated to In Progress", type: "status" },
    { date: "2024-03-01", event: "Legal brief uploaded", type: "document" },
    { date: "2024-03-10", event: "Case notes updated", type: "note" },
  ]

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
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDocumentIcon = (type: string) => {
    return <FileText className="w-4 h-4" />
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In real app, this would make an API call
      console.log("Adding note:", newNote)
      setNewNote("")
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{caseData.title}</h1>
            <div className="flex items-center space-x-4">
              <Badge className={getStatusColor(caseData.status)}>{caseData.status}</Badge>
              <Badge className={getPriorityColor(caseData.priority)}>{caseData.priority} priority</Badge>
              <span className="text-sm text-gray-600">Case #{caseData.id}</span>
            </div>
          </div>
          {(user?.role === "lawyer" || user?.role === "admin") && (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              {isEditing && (
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Case Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Description</Label>
                  {isEditing ? (
                    <Textarea defaultValue={caseData.description} className="mt-1" rows={3} />
                  ) : (
                    <p className="text-gray-900 mt-1">{caseData.description}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Case Type</Label>
                    <p className="text-gray-900 mt-1">{caseData.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Estimated Value</Label>
                    <p className="text-gray-900 mt-1">{caseData.estimatedValue}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents ({documents.length})
                </CardTitle>
                {(user?.role === "lawyer" || user?.role === "admin") && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">
                          {doc.size} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Case Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Case Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {note.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-gray-900">{note.author}</p>
                        <Badge variant="outline" className="text-xs">
                          {note.role}
                        </Badge>
                        <span className="text-xs text-gray-500">{note.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{note.content}</p>
                    </div>
                  </div>
                ))}

                {/* Add Note */}
                <div className="border-t pt-4">
                  <div className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add a note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                        Add Note
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Case Details */}
          <Card>
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">{caseData.createdDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium">{caseData.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Hours</p>
                  <p className="font-medium">
                    {caseData.actualHours} / {caseData.estimatedHours}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {caseData.client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{caseData.client.name}</p>
                    <p className="text-sm text-gray-600">{caseData.client.company}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{caseData.client.email}</p>
                  <p>{caseData.client.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Lawyer */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Lawyer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {caseData.lawyer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{caseData.lawyer.name}</p>
                    <p className="text-sm text-gray-600">{caseData.lawyer.firm}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{caseData.lawyer.email}</p>
                  <p>{caseData.lawyer.phone}</p>
                  <p>Rate: {caseData.hourlyRate}/hour</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
