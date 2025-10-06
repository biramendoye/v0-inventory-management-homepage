"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Truck,
  BarChart3,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

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
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "brand-sidebar border-r bg-[#00A6D6] transition-all duration-300 flex-shrink-0 border-white/20",
        collapsed ? "w-16" : "w-64",
        "hidden md:block min-h-screen",
      )}
      style={{
        maxWidth: collapsed ? "4rem" : "16rem",
        minWidth: collapsed ? "4rem" : "16rem",
      }}
    >
      <div className="flex h-full flex-col">
        {/* Collapse Toggle */}
        <div className="flex justify-end p-2 md:p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex text-white hover:bg-[#FFD700] hover:text-black transition-all duration-300 border border-white/20 hover:border-[#FFD700]"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-2">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10 text-white transition-all duration-300",
                collapsed ? "px-2 justify-center" : "px-3",
                pathname === item.href
                  ? "bg-[#FFD700] text-black font-semibold shadow-lg border border-[#FFD700]"
                  : "hover:bg-[#FFD700] hover:text-black border border-transparent hover:border-[#FFD700]",
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="truncate text-sm">{t(item.titleKey)}</span>
                )}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
