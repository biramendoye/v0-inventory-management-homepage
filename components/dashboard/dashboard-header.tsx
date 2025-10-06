"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, User, Languages } from "lucide-react"
import { getCurrentUser, logout, type User as UserType } from "@/lib/auth"
import { useLanguage } from "@/contexts/language-context"

export function DashboardHeader() {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/connexion")
  }

  const languageFlags = {
    fr: "🇫🇷",
    en: "🇬🇧",
    es: "🇪🇸",
    ar: "🇸🇦",
  }

  return (
    <header className="border-b bg-[#00A6D6] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and App Name */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <Image src="/images/fibem-logo.jpg" alt="FIBEM Logo" width={40} height={40} className="rounded" />
          <h1 className="text-xl font-playfair font-bold text-white">Gestion De Stock</h1>
        </Link>

        {/* Notifications and User Profile */}
        <div className="flex items-center gap-4">

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-white/20">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Utilisateur" />
                  <AvatarFallback>
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || t("common.name") === "Name" ? "User" : "Utilisateur"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t("common.name") === "Name" ? "Profile" : "Profil"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("common.name") === "Name" ? "Logout" : "Déconnexion"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
