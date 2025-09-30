// API utility functions for backend communication

const API_BASE_URL = "http://localhost:8080/api"

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

// Create headers with auth token
const createHeaders = () => {
  const token = getAuthToken()
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Generic API request function
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = createHeaders()

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

// Cases API
export const casesApi = {
  getAll: () => apiRequest("/cases"),
  getById: (id: string) => apiRequest(`/cases/${id}`),
  create: (caseData: any) =>
    apiRequest("/cases", {
      method: "POST",
      body: JSON.stringify(caseData),
    }),
  update: (id: string, caseData: any) =>
    apiRequest(`/cases/${id}`, {
      method: "PUT",
      body: JSON.stringify(caseData),
    }),
  delete: (id: string) =>
    apiRequest(`/cases/${id}`, {
      method: "DELETE",
    }),
  getFloatingCases: () => apiRequest("/cases/floating"),
}

// Appointments API
export const appointmentsApi = {
  getAll: () => apiRequest("/appointments"),
  getById: (id: string) => apiRequest(`/appointments/${id}`),
  create: (appointmentData: any) =>
    apiRequest("/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    }),
  update: (id: string, appointmentData: any) =>
    apiRequest(`/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(appointmentData),
    }),
  delete: (id: string) =>
    apiRequest(`/appointments/${id}`, {
      method: "DELETE",
    }),
}

// Users API
export const usersApi = {
  getProfile: () => apiRequest("/users/profile"),
  updateProfile: (profileData: any) =>
    apiRequest("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
  getAllUsers: () => apiRequest("/users"),
  updateUser: (id: string, userData: any) =>
    apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    }),
  deleteUser: (id: string) =>
    apiRequest(`/users/${id}`, {
      method: "DELETE",
    }),
}

// Legal Resources API (for students)
export const resourcesApi = {
  getJudgments: () => apiRequest("/resources/judgments"),
  getBareActs: () => apiRequest("/resources/bare-acts"),
  downloadDocument: (id: string) => apiRequest(`/resources/download/${id}`),
}

// Applications API (for students)
export const applicationsApi = {
  getAll: () => apiRequest("/applications"),
  create: (applicationData: any) =>
    apiRequest("/applications", {
      method: "POST",
      body: JSON.stringify(applicationData),
    }),
  updateStatus: (id: string, status: string) =>
    apiRequest(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
}
