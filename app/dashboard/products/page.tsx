import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ProductsContent } from "@/components/dashboard/products-content"

export default function ProductsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6">
            <ProductsContent />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
