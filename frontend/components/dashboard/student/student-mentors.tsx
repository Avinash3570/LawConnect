"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, MapPin, Calendar, Filter, Users, Award } from "lucide-react"

export function StudentMentors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")

  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Corporate Lawyer",
      firm: "Johnson & Associates",
      specialties: ["Corporate Law", "Mergers & Acquisitions"],
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      experience: "15 years",
      hourlyRate: "$200",
      availability: "Available",
      image: "/professional-woman-lawyer.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Criminal Defense Attorney",
      firm: "Chen Legal Group",
      specialties: ["Criminal Law", "DUI Defense"],
      rating: 4.8,
      reviews: 89,
      location: "Los Angeles, CA",
      experience: "12 years",
      hourlyRate: "$180",
      availability: "Busy",
      image: "/professional-asian-man-lawyer.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Family Law Specialist",
      firm: "Rodriguez Family Law",
      specialties: ["Family Law", "Child Custody"],
      rating: 4.7,
      reviews: 156,
      location: "Chicago, IL",
      experience: "10 years",
      hourlyRate: "$160",
      availability: "Available",
      image: "/professional-hispanic-woman-lawyer.jpg",
    },
    {
      id: 4,
      name: "David Thompson",
      title: "Intellectual Property Lawyer",
      firm: "Thompson IP Law",
      specialties: ["IP Law", "Patent Law"],
      rating: 4.9,
      reviews: 203,
      location: "San Francisco, CA",
      experience: "18 years",
      hourlyRate: "$250",
      availability: "Available",
      image: "/professional-lawyer.png",
    },
  ]

  const specialties = ["all", "Corporate Law", "Criminal Law", "Family Law", "IP Law", "Real Estate"]

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty =
      selectedSpecialty === "all" || mentor.specialties.some((s) => s.includes(selectedSpecialty))
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Mentors</h1>
        <p className="text-gray-600">Connect with experienced lawyers for guidance and mentorship</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search mentors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty === "all" ? "All Specialties" : specialty}
            </Button>
          ))}
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                  <p className="text-sm text-gray-500">{mentor.firm}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {mentor.rating} ({mentor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {mentor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {mentor.location}
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    {mentor.experience} experience
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{mentor.hourlyRate}/session</span>
                    <Badge variant={mentor.availability === "Available" ? "default" : "secondary"}>
                      {mentor.availability}
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                  <Button size="sm" variant="outline">
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}
