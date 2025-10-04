"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function DashboardContent() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.totalProducts")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.totalProducts") === "Total Products"
                ? "+12% from last month"
                : "+12% par rapport au mois dernier"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.lowStock")}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.lowStock") === "Low Stock"
                ? "Products requiring restocking"
                : "Produits nécessitant un réapprovisionnement"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.totalValue")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,231</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.totalValue") === "Total Value" ? "+8% from last month" : "+8% par rapport au mois dernier"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.totalValue") === "Total Value" ? "Active Suppliers" : "Fournisseurs Actifs"}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.totalValue") === "Total Value" ? "3 new this month" : "3 nouveaux ce mois"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
            <CardDescription>
              {t("dashboard.recentActivity") === "Recent Activity"
                ? "Latest inventory changes"
                : "Dernières modifications d'inventaire"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("dashboard.recentActivity") === "Recent Activity"
                      ? "Product added: Dell Laptop"
                      : "Produit ajouté: Ordinateur Portable Dell"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.recentActivity") === "Recent Activity" ? "2 hours ago" : "Il y a 2 heures"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("dashboard.recentActivity") === "Recent Activity"
                      ? "Stock updated: iPhone 15 Pro"
                      : "Stock mis à jour: iPhone 15 Pro"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.recentActivity") === "Recent Activity" ? "4 hours ago" : "Il y a 4 heures"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("dashboard.recentActivity") === "Recent Activity"
                      ? "New supplier: TechSupply Co."
                      : "Nouveau fournisseur: TechSupply Co."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.recentActivity") === "Recent Activity" ? "1 day ago" : "Il y a 1 jour"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {t("dashboard.recentActivity") === "Recent Activity" ? "Stock Alerts" : "Alertes Stock"}
            </CardTitle>
            <CardDescription>
              {t("dashboard.recentActivity") === "Recent Activity"
                ? "Products requiring your attention"
                : "Produits nécessitant votre attention"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("dashboard.recentActivity") === "Recent Activity"
                      ? "MacBook Air M2 - Critical stock"
                      : "MacBook Air M2 - Stock critique"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.recentActivity") === "Recent Activity" ? "2 units remaining" : "2 unités restantes"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("dashboard.recentActivity") === "Recent Activity"
                      ? "Samsung Galaxy S24 - Low stock"
                      : "Samsung Galaxy S24 - Stock faible"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.recentActivity") === "Recent Activity" ? "5 units remaining" : "5 unités restantes"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {t("dashboard.recentActivity") === "Recent Activity"
                      ? 'iPad Pro 12.9" - Out of stock'
                      : 'iPad Pro 12.9" - Rupture de stock'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.recentActivity") === "Recent Activity" ? "0 units available" : "0 unités disponibles"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
