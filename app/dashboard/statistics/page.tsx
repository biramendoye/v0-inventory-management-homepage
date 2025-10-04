import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { StatisticsContent } from "@/components/dashboard/statistics-content"

export default function StatisticsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6">
            <StatisticsContent />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
