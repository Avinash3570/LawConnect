"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Video, FileText, Download, Eye, Clock, Star, Filter } from "lucide-react"

export function StudentResources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const resources = [
    {
      id: 1,
      title: "Constitutional Law Fundamentals",
      type: "video",
      category: "Constitutional Law",
      duration: "2h 30m",
      rating: 4.8,
      views: 1250,
      description: "Comprehensive overview of constitutional principles and landmark cases",
      level: "Beginner",
      instructor: "Prof. Sarah Wilson",
    },
    {
      id: 2,
      title: "Contract Law Case Studies",
      type: "document",
      category: "Contract Law",
      pages: 45,
      rating: 4.6,
      downloads: 890,
      description: "Real-world contract disputes and their legal resolutions",
      level: "Intermediate",
      author: "Legal Education Institute",
    },
    {
      id: 3,
      title: "Criminal Procedure Workshop",
      type: "video",
      category: "Criminal Law",
      duration: "1h 45m",
      rating: 4.9,
      views: 2100,
      description: "Step-by-step guide through criminal court procedures",
      level: "Advanced",
      instructor: "Judge Michael Roberts",
    },
    {
      id: 4,
      title: "Legal Research Methods",
      type: "course",
      category: "Legal Research",
      lessons: 12,
      rating: 4.7,
      enrolled: 567,
      description: "Master the art of legal research and citation",
      level: "Beginner",
      instructor: "Dr. Emily Chen",
    },
    {
      id: 5,
      title: "Tort Law Essentials",
      type: "document",
      category: "Tort Law",
      pages: 78,
      rating: 4.5,
      downloads: 1340,
      description: "Complete guide to tort law principles and applications",
      level: "Intermediate",
      author: "American Bar Association",
    },
    {
      id: 6,
      title: "Mock Trial Preparation",
      type: "video",
      category: "Trial Advocacy",
      duration: "3h 15m",
      rating: 4.8,
      views: 890,
      description: "Prepare for mock trials with expert guidance",
      level: "Advanced",
      instructor: "Trial Attorney Lisa Park",
    },
  ]

  const categories = [
    "all",
    "Constitutional Law",
    "Contract Law",
    "Criminal Law",
    "Legal Research",
    "Tort Law",
    "Trial Advocacy",
  ]
  const types = ["all", "video", "document", "course"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "course":
        return <BookOpen className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-700"
      case "document":
        return "bg-blue-100 text-blue-700"
      case "course":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600">Access comprehensive legal education materials and courses</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
            >
              {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1 rounded ${getTypeColor(resource.type)}`}>{getTypeIcon(resource.type)}</div>
                    <Badge variant="outline" className="text-xs">
                      {resource.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{resource.category}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{resource.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {resource.rating}
                    </div>
                    {resource.type === "video" && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {resource.duration}
                      </div>
                    )}
                    {resource.type === "document" && (
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {resource.pages} pages
                      </div>
                    )}
                    {resource.type === "course" && (
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {resource.lessons} lessons
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  {resource.instructor && `Instructor: ${resource.instructor}`}
                  {resource.author && `Author: ${resource.author}`}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    {resource.type === "video" ? "Watch" : resource.type === "course" ? "Enroll" : "Read"}
                  </Button>
                  {resource.type === "document" && (
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}
