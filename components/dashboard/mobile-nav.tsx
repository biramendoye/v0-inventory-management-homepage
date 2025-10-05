"use client";

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

interface MobileNavProps {
  onClose?: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">FIBEM STOCK</h2>
        <p className="text-sm text-gray-500">Gestion d'Inventaire</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} onClick={handleNavClick}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12 px-4",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{t(item.titleKey)}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="text-xs text-gray-500 text-center">
          © 2025 FIBEM STOCK
        </div>
      </div>
    </div>
  );
}
