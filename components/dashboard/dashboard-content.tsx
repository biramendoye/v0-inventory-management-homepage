"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, Users, Activity } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

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

      {/* Real-Time Tracking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>{t("dashboard.realTime.title")}</CardTitle>
            </div>
            <Badge variant="outline" className="gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t("dashboard.realTime.live")}
            </Badge>
          </div>
          <CardDescription>{t("dashboard.realTime.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col space-y-1 p-4 border rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">{t("dashboard.realTime.stockMovements")}</span>
                <span className="text-2xl font-bold">147</span>
                <span className="text-xs text-green-600">{t("dashboard.realTime.today")}</span>
              </div>
              <div className="flex flex-col space-y-1 p-4 border rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">{t("dashboard.realTime.pendingOrders")}</span>
                <span className="text-2xl font-bold">8</span>
                <span className="text-xs text-amber-600">{t("dashboard.realTime.processing")}</span>
              </div>
              <div className="flex flex-col space-y-1 p-4 border rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">{t("dashboard.realTime.recentUpdates")}</span>
                <span className="text-2xl font-bold">23</span>
                <span className="text-xs text-blue-600">{t("dashboard.realTime.lastHour")}</span>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex h-2 w-2 mt-2">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-blue-500"></span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t("dashboard.realTime.activity1")}</p>
                  <p className="text-xs text-muted-foreground">{t("dashboard.realTime.justNow")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex h-2 w-2 mt-2">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t("dashboard.realTime.activity2")}</p>
                  <p className="text-xs text-muted-foreground">{t("dashboard.realTime.twoMinutesAgo")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex h-2 w-2 mt-2">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-amber-500"></span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t("dashboard.realTime.activity3")}</p>
                  <p className="text-xs text-muted-foreground">{t("dashboard.realTime.fiveMinutesAgo")}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
