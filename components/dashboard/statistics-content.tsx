"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Package, AlertTriangle, Users, Euro } from "lucide-react"

// Mock data for charts
const stockAvailabilityData = [
  { month: "Jan", stock: 1200, sold: 800 },
  { month: "Fév", stock: 1100, sold: 900 },
  { month: "Mar", stock: 1300, sold: 750 },
  { month: "Avr", stock: 1250, sold: 850 },
  { month: "Mai", stock: 1400, sold: 950 },
  { month: "Jun", stock: 1350, sold: 800 },
]

const bestSellingProducts = [
  { name: "iPhone 15 Pro", sales: 145, value: 173550 },
  { name: "MacBook Air M2", sales: 89, value: 115611 },
  { name: "Samsung Galaxy S24", sales: 76, value: 68324 },
  { name: 'iPad Pro 12.9"', sales: 65, value: 71435 },
  { name: "Dell XPS 13", sales: 43, value: 68757 },
]

const lowStockProducts = [
  { name: "MacBook Air M2", current: 2, minimum: 5, percentage: 40 },
  { name: "Samsung Galaxy S24", current: 0, minimum: 5, percentage: 0 },
  { name: "iPhone 15 Pro", current: 3, minimum: 10, percentage: 30 },
  { name: 'iPad Pro 12.9"', current: 4, minimum: 8, percentage: 50 },
]

const supplierPerformance = [
  { name: "TechSupply Co.", rating: 4.8, orders: 45, onTime: 95 },
  { name: "Electronics Pro", rating: 4.9, orders: 67, onTime: 98 },
  { name: "Mobile World", rating: 4.5, orders: 32, onTime: 88 },
  { name: "Computer Solutions", rating: 3.9, orders: 18, onTime: 72 },
]

const categoryDistribution = [
  { name: "Ordinateurs", value: 35, color: "#FFD700" },
  { name: "Téléphones", value: 40, color: "#00FFFF" },
  { name: "Tablettes", value: 25, color: "#333333" },
]

const chartConfig = {
  stock: {
    label: "Stock",
    color: "#FFD700",
  },
  sold: {
    label: "Vendus",
    color: "#00FFFF",
  },
}

export function StatisticsContent() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistiques et Analyses</h1>
          <p className="text-muted-foreground">Analysez les performances de votre inventaire</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 derniers jours</SelectItem>
            <SelectItem value="30days">30 derniers jours</SelectItem>
            <SelectItem value="90days">90 derniers jours</SelectItem>
            <SelectItem value="1year">1 an</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€497,677</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits Vendus</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">418</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.2% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Rotation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4x</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -3.1% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Fournisseurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +0.2 vs mois dernier
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du Stock</CardTitle>
            <CardDescription>Stock disponible vs produits vendus sur 6 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockAvailabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="stock" stroke="#FFD700" strokeWidth={2} name="Stock" />
                  <Line type="monotone" dataKey="sold" stroke="#00FFFF" strokeWidth={2} name="Vendus" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par Catégorie</CardTitle>
            <CardDescription>Distribution des produits par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produits les Plus Vendus</CardTitle>
            <CardDescription>Top 5 des meilleures ventes ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bestSellingProducts} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="#FFD700" name="Ventes" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance des Fournisseurs</CardTitle>
            <CardDescription>Évaluation et livraisons à temps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplierPerformance.map((supplier, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{supplier.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{supplier.rating}/5</Badge>
                      <span className="text-sm text-muted-foreground">{supplier.orders} commandes</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Livraisons à temps</span>
                      <span>{supplier.onTime}%</span>
                    </div>
                    <Progress value={supplier.onTime} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Alertes Stock Faible
          </CardTitle>
          <CardDescription>Produits nécessitant un réapprovisionnement urgent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.current} / {product.minimum} unités minimum
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-destructive">{product.percentage}%</div>
                  <div className="text-xs text-muted-foreground">du minimum</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
