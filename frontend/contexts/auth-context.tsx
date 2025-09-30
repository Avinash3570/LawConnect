"use client"

import { signupService, loginService } from "@/services/auth";

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
  role: "lawyer" | "client" | "student" | "admin"
  profilePicture?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: User["role"]) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      const { token, user: userData } = data

      localStorage.setItem("authToken", token)
      localStorage.setItem("userData", JSON.stringify(userData))
      setUser(userData)

      // Redirect based on role
      switch (userData.role) {
        case "lawyer":
          router.push("/dashboard/lawyer")
          break
        case "client":
          router.push("/dashboard/client")
          break
        case "student":
          router.push("/dashboard/student")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
        default:
          router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const signup = async (name: string, email: string, password: string, role: User["role"]) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      if (!response.ok) {
        throw new Error("Signup failed")
      }

      const data = await response.json()
      const { token, user: userData } = data

      localStorage.setItem("authToken", token)
      localStorage.setItem("userData", JSON.stringify(userData))
      setUser(userData)

      // Redirect to appropriate dashboard
      switch (userData.role) {
        case "lawyer":
          router.push("/dashboard/lawyer")
          break
        case "client":
          router.push("/dashboard/client")
          break
        case "student":
          router.push("/dashboard/student")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
        default:
          router.push("/dashboard")
      }
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
