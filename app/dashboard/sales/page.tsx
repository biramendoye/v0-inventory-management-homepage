import { AuthGuard } from "@/components/auth-guard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SalesContent } from "@/components/dashboard/sales-content";

export default function SalesPage() {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-background overflow-hidden max-w-[100vw]">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 max-w-[calc(100vw-16rem)]">
          <DashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="max-w-full px-6 py-4 mx-auto desktop-container">
              <SalesContent />
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
