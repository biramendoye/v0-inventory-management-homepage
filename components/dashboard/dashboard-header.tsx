"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  LogOut,
  User,
  ChevronDown,
  Settings,
  Shield,
} from "lucide-react";
import { getCurrentUser, logout, type User as UserType } from "@/lib/auth";
import { useLanguage } from "@/contexts/language-context";

export function DashboardHeader() {
  const [user, setUser] = useState<UserType | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    setUser(getCurrentUser());
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/connexion");
  };

  const getUserRole = () => {
    return user?.role || "User";
  };

  return (
    <header className="border-b bg-[#00A6D6] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and App Name */}
        <Link
          href="/"
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/fibem-logo.jpg"
            alt="FIBEM Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <h1 className="text-xl font-playfair font-bold text-white">
            Gestion De Stock
          </h1>
        </Link>

        {/* Notifications and User Profile */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#FFD700] hover:text-black transition-all duration-300 border border-white/20 hover:border-[#FFD700]"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-3 px-3 py-2 text-white hover:bg-[#FFD700] hover:text-black transition-all duration-300 border border-white/20 hover:border-[#FFD700] rounded-lg"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setDropdownPosition({
                top: rect.bottom + window.scrollY,
                right: window.innerWidth - rect.right,
              });
              setShowUserDropdown(!showUserDropdown);
            }}
          >
            <Avatar className="h-8 w-8 border-2 border-white/20">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User Avatar"
              />
              <AvatarFallback className="bg-[#FFD700] text-black font-semibold">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start hidden sm:block">
              <span className="text-sm font-medium">
                {user?.name || "User"}
              </span>
              <span className="text-xs opacity-80">{getUserRole()}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-80" />
          </Button>

          {mounted &&
            showUserDropdown &&
            createPortal(
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserDropdown(false)}
                />
                <div
                  className="fixed z-50 bg-white border border-gray-200 shadow-xl min-w-[300px] rounded-lg py-2 animate-in slide-in-from-top-2 duration-200"
                  style={{
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`,
                  }}
                >
                  {/* User Info Header */}
                  <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-[#00A6D6]/5 to-[#FFD700]/5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-[#00A6D6]/20">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="User Avatar"
                        />
                        <AvatarFallback className="bg-[#00A6D6] text-white font-semibold">
                          {user?.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-base">
                          {user?.name || "User"}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          {user?.email || "user@example.com"}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {user?.company || "FIBEM"}
                        </span>
                        <div className="flex items-center gap-1 mt-2 px-2 py-1 bg-[#00A6D6]/10 rounded-full w-fit">
                          <Shield className="h-3 w-3 text-[#00A6D6]" />
                          <span className="text-xs text-[#00A6D6] font-semibold">
                            {getUserRole()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      className="w-full px-4 py-3 text-sm text-left hover:bg-[#FFD700] hover:text-black flex items-center gap-3 transition-all duration-200 font-medium group"
                      onClick={() => {
                        setShowUserDropdown(false);
                        // Add profile navigation here
                      }}
                    >
                      <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>
                        {t("common.name") === "Name"
                          ? "My Profile"
                          : "Mon Profil"}
                      </span>
                    </button>
                    <button
                      className="w-full px-4 py-3 text-sm text-left hover:bg-[#FFD700] hover:text-black flex items-center gap-3 transition-all duration-200 font-medium group"
                      onClick={() => {
                        setShowUserDropdown(false);
                        // Add settings navigation here
                      }}
                    >
                      <Settings className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>
                        {t("common.name") === "Name"
                          ? "Settings"
                          : "Paramètres"}
                      </span>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-100 py-2 bg-[#FF0000]/5">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-3 text-sm text-left text-[#FF0000] hover:bg-[#FF0000] hover:text-white flex items-center gap-3 transition-all duration-200 font-semibold group rounded-md mx-2"
                    >
                      <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>
                        {t("common.name") === "Name" ? "Logout" : "Déconnexion"}
                      </span>
                    </button>
                  </div>
                </div>
              </>,
              document.body,
            )}
        </div>
      </div>
    </header>
  );
}
