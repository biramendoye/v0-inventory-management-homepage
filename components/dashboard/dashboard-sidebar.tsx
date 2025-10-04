"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, Truck, BarChart3, Receipt, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const navigationItems = [
  {
    titleKey: "navigation.dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    titleKey: "navigation.products",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    titleKey: "navigation.suppliers",
    icon: Truck,
    href: "/dashboard/suppliers",
  },
  {
    titleKey: "navigation.sales",
    icon: Receipt,
    href: "/dashboard/sales",
  },
  {
    titleKey: "navigation.reports",
    icon: BarChart3,
    href: "/dashboard/statistics",
  },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <div className={cn("border-r bg-white transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-full flex-col">
        {/* Collapse Toggle */}
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn("w-full justify-start", collapsed && "px-2")}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{t(item.titleKey)}</span>}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
