"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package, TrendingDown, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function LowStockAlertsSection() {
  const { t } = useLanguage()

  // Sample low stock items - in a real app, this would come from your database
  const lowStockItems = [
    {
      id: 1,
      name: "Laptop Dell XPS 15",
      sku: "LAP-001",
      currentStock: 3,
      minimumStock: 10,
      category: "Electronics",
      urgency: "critical",
    },
    {
      id: 2,
      name: "Office Chair Pro",
      sku: "FUR-045",
      currentStock: 8,
      minimumStock: 15,
      category: "Furniture",
      urgency: "warning",
    },
    {
      id: 3,
      name: "Wireless Mouse",
      sku: "ACC-023",
      currentStock: 12,
      minimumStock: 20,
      category: "Accessories",
      urgency: "warning",
    },
    {
      id: 4,
      name: "USB-C Cable 2m",
      sku: "CAB-089",
      currentStock: 2,
      minimumStock: 25,
      category: "Cables",
      urgency: "critical",
    },
  ]

  const criticalItems = lowStockItems.filter((item) => item.urgency === "critical")
  const warningItems = lowStockItems.filter((item) => item.urgency === "warning")

  return (
    <section id="low-stock-alerts" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">{t("landing.lowStockAlerts.title")}</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            {t("landing.lowStockAlerts.subtitle")}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader className="pb-3">
              <CardDescription className="text-destructive font-medium">
                {t("landing.lowStockAlerts.criticalItems")}
              </CardDescription>
              <CardTitle className="text-4xl text-destructive">{criticalItems.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t("landing.lowStockAlerts.criticalDescription")}</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardHeader className="pb-3">
              <CardDescription className="text-orange-600 font-medium">
                {t("landing.lowStockAlerts.warningItems")}
              </CardDescription>
              <CardTitle className="text-4xl text-orange-600">{warningItems.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t("landing.lowStockAlerts.warningDescription")}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardDescription className="text-primary font-medium">
                {t("landing.lowStockAlerts.totalValue")}
              </CardDescription>
              <CardTitle className="text-4xl text-primary">€24,580</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t("landing.lowStockAlerts.valueDescription")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Items List */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{t("landing.lowStockAlerts.itemsTitle")}</CardTitle>
                <CardDescription className="mt-2">{t("landing.lowStockAlerts.itemsDescription")}</CardDescription>
              </div>
              <Link href="/dashboard">
                <Button>
                  {t("landing.lowStockAlerts.viewDashboard")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.urgency === "critical" ? "bg-destructive/10" : "bg-orange-500/10"
                      }`}
                    >
                      <Package
                        className={`h-6 w-6 ${item.urgency === "critical" ? "text-destructive" : "text-orange-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <Badge variant={item.urgency === "critical" ? "destructive" : "secondary"} className="text-xs">
                          {item.urgency === "critical"
                            ? t("landing.lowStockAlerts.critical")
                            : t("landing.lowStockAlerts.warning")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          {t("landing.lowStockAlerts.sku")}: {item.sku}
                        </span>
                        <span>•</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <TrendingDown className="h-4 w-4" />
                        <span>{t("landing.lowStockAlerts.currentStock")}</span>
                      </div>
                      <div className="font-semibold">
                        <span className={item.urgency === "critical" ? "text-destructive" : "text-orange-600"}>
                          {item.currentStock}
                        </span>
                        <span className="text-muted-foreground"> / {item.minimumStock}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("landing.lowStockAlerts.reorder")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">{t("landing.lowStockAlerts.ctaText")}</p>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              {t("landing.lowStockAlerts.ctaButton")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
