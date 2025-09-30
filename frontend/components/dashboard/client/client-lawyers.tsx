"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, MapPin, Calendar, MessageCircle, Filter } from "lucide-react"

interface Lawyer {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  reviewCount: number
  location: string
  hourlyRate: number
  profilePicture?: string
  bio: string
  availability: "available" | "busy" | "unavailable"
  languages: string[]
}

export function ClientLawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [specializationFilter, setSpecializationFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        // Mock data for demonstration
        const mockLawyers: Lawyer[] = [
          {
            id: "1",
            name: "Sarah Johnson",
            specialization: "Employment Law",
            experience: 8,
            rating: 4.9,
            reviewCount: 127,
            location: "New York, NY",
            hourlyRate: 350,
            bio: "Experienced employment lawyer specializing in workplace disputes, contract negotiations, and wrongful termination cases.",
            availability: "available",
            languages: ["English", "Spanish"],
          },
          {
            id: "2",
            name: "Michael Brown",
            specialization: "Real Estate Law",
            experience: 12,
            rating: 4.8,
            reviewCount: 89,
            location: "Los Angeles, CA",
            hourlyRate: 400,
            bio: "Real estate attorney with extensive experience in commercial and residential transactions, zoning issues, and property disputes.",
            availability: "available",
            languages: ["English"],
          },
          {
            id: "3",
            name: "Emily Davis",
            specialization: "Corporate Law",
            experience: 15,
            rating: 4.9,
            reviewCount: 203,
            location: "Chicago, IL",
            hourlyRate: 500,
            bio: "Corporate lawyer focusing on mergers & acquisitions, business formation, and compliance matters for startups and established companies.",
            availability: "busy",
            languages: ["English", "French"],
          },
          {
            id: "4",
            name: "Robert Wilson",
            specialization: "Family Law",
            experience: 10,
            rating: 4.7,
            reviewCount: 156,
            location: "Houston, TX",
            hourlyRate: 300,
            bio: "Compassionate family law attorney handling divorce, custody, adoption, and domestic relations matters.",
            availability: "available",
            languages: ["English", "Spanish"],
          },
          {
            id: "5",
            name: "Jennifer Lee",
            specialization: "Intellectual Property",
            experience: 7,
            rating: 4.8,
            reviewCount: 94,
            location: "San Francisco, CA",
            hourlyRate: 450,
            bio: "IP attorney specializing in patent prosecution, trademark registration, and technology licensing agreements.",
            availability: "available",
            languages: ["English", "Mandarin"],
          },
        ]
        setLawyers(mockLawyers)
        setFilteredLawyers(mockLawyers)
      } catch (error) {
        console.error("Error fetching lawyers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLawyers()
  }, [])

  useEffect(() => {
    let filtered = lawyers

    if (searchTerm) {
      filtered = filtered.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (specializationFilter !== "all") {
      filtered = filtered.filter((lawyer) => lawyer.specialization === specializationFilter)
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((lawyer) => lawyer.location.includes(locationFilter))
    }

    if (availabilityFilter !== "all") {
      filtered = filtered.filter((lawyer) => lawyer.availability === availabilityFilter)
    }

    setFilteredLawyers(filtered)
  }, [lawyers, searchTerm, specializationFilter, locationFilter, availabilityFilter])

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "busy":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "unavailable":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
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
      <div>
        <h1 className="text-3xl font-bold text-foreground">Find Lawyers</h1>
        <p className="text-muted-foreground">
          Browse qualified lawyers and find the right legal representation for your needs
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="Employment Law">Employment Law</SelectItem>
                <SelectItem value="Real Estate Law">Real Estate Law</SelectItem>
                <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                <SelectItem value="Family Law">Family Law</SelectItem>
                <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Houston">Houston</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLawyers.length} of {lawyers.length} lawyers
        </p>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Lawyers Grid */}
      {filteredLawyers.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No lawyers found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Lawyer Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={lawyer.profilePicture || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {lawyer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                          <p className="text-primary font-medium">{lawyer.specialization}</p>
                        </div>
                        <Badge className={getAvailabilityColor(lawyer.availability)}>{lawyer.availability}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(lawyer.rating)}
                          <span className="ml-1 font-medium">{lawyer.rating}</span>
                          <span>({lawyer.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {lawyer.location}
                        </div>
                        <span>{lawyer.experience} years experience</span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{lawyer.bio}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="font-medium">Languages: </span>
                          <span className="text-muted-foreground">{lawyer.languages.join(", ")}</span>
                        </div>
                        <div>
                          <span className="font-medium">Rate: </span>
                          <span className="text-muted-foreground">${lawyer.hourlyRate}/hour</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <Button className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Profile
                    </Button>
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
