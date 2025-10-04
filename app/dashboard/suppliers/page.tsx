import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SuppliersContent } from "@/components/dashboard/suppliers-content"

export default function SuppliersPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6">
            <SuppliersContent />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
