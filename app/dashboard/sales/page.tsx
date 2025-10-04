import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SalesContent } from "@/components/dashboard/sales-content"

export default function SalesPage() {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto">
            <SalesContent />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
