"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background overflow-hidden max-w-[100vw]">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 max-w-[calc(100vw-16rem)]">
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <h1 className="text-xl font-bold">FIBEM STOCK</h1>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <MobileNav onClose={() => setIsMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
          <DashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="max-w-full px-6 py-4 mx-auto desktop-container">
              <DashboardContent />
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
