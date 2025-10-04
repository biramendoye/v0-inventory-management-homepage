"use client"

export interface User {
  id: string
  email: string
  name: string
  company: string
}

// Dummy credentials for testing
const DUMMY_USERS = [
  {
    id: "1",
    email: "admin@fibem.com",
    password: "admin123",
    name: "Jean Dupont",
    company: "FIBEM",
  },
  {
    id: "2",
    email: "demo@fibem.com",
    password: "demo123",
    name: "Marie Martin",
    company: "FIBEM",
  },
]

export function login(email: string, password: string): User | null {
  const user = DUMMY_USERS.find((u) => u.email === email && u.password === password)
  if (user) {
    const userData = { id: user.id, email: user.email, name: user.name, company: user.company }
    localStorage.setItem("user", JSON.stringify(userData))
    return userData
  }
  return null
}

export function logout(): void {
  localStorage.removeItem("user")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
