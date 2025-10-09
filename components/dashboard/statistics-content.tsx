"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Package, AlertTriangle, Users, Euro, ShoppingCart, DollarSign, BarChart3, Activity } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const revenueData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Revenus',
      data: [92000, 105000, 88000, 98000, 112000, 95000],
      borderColor: '#00A6D6',
      backgroundColor: 'rgba(0, 166, 214, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
    },
    {
      label: 'Profits',
      data: [18400, 21000, 17600, 19600, 22400, 19000],
      borderColor: '#FFD700',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
    },
  ],
}

const weeklyActivityData = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [
    {
      label: 'Commandes',
      data: [45, 52, 48, 61, 55, 35, 28],
      backgroundColor: '#FFD700',
      borderRadius: 8,
    },
  ],
}

const categoryDistribution = {
  labels: ['Ordinateurs', 'Téléphones', 'Tablettes'],
  datasets: [
    {
      data: [35, 40, 25],
      backgroundColor: ['#00A6D6', '#FFD700', '#FF6B6B'],
      borderWidth: 2,
      borderColor: '#fff',
    },
  ],
}

const bestSellingProducts = {
  labels: ['iPhone 15 Pro', 'MacBook Air M2', 'Samsung Galaxy S24', 'iPad Pro 12.9"', 'Dell XPS 13'],
  datasets: [
    {
      label: 'Ventes',
      data: [145, 89, 76, 65, 43],
      backgroundColor: '#FFD700',
      borderRadius: 8,
    },
  ],
}

const bestSellingProductsData = [
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

const categoryStats = [
  { name: "Ordinateurs", sales: 156, color: "#00A6D6" },
  { name: "Téléphones", sales: 178, color: "#FFD700" },
  { name: "Tablettes", sales: 112, color: "#FF6B6B" },
]

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#000',
      bodyColor: '#666',
      borderColor: '#e0e0e0',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: '#e0e0e0',
      },
    },
  },
}

const barChartOptions = {
  ...chartOptions,
  indexAxis: 'y' as const,
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#000',
      bodyColor: '#666',
      borderColor: '#e0e0e0',
      borderWidth: 1,
      padding: 12,
    },
  },
}

export function StatisticsContent() {
  return (
    <div className="space-y-6">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#00A6D6] hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <div className="h-10 w-10 rounded-full bg-[#00A6D6]/10 flex items-center justify-center">
              <Euro className="h-5 w-5 text-[#00A6D6]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00A6D6]">€497,677</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12.5%
              </Badge>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
            <Progress value={85} className="h-1.5 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#FFD700] hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits Vendus</CardTitle>
            <div className="h-10 w-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-[#FFD700]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#FFD700]">418</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                <TrendingUp className="mr-1 h-3 w-3" />
                +8.2%
              </Badge>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
            <Progress value={72} className="h-1.5 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes Totales</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">989</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                <TrendingUp className="mr-1 h-3 w-3" />
                +15.3%
              </Badge>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
            <Progress value={90} className="h-1.5 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marge Moyenne</CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">20%</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2.1%
              </Badge>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
            <Progress value={65} className="h-1.5 mt-3" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-t-4 border-t-[#00A6D6]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#00A6D6]" />
                Évolution du Chiffre d'Affaires
              </CardTitle>
              <CardDescription>Revenus et profits mensuels sur 6 mois</CardDescription>
            </div>
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              Tendance positive
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-t-4 border-t-[#FFD700]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#FFD700]" />
              Activité Hebdomadaire
            </CardTitle>
            <CardDescription>Commandes par jour de la semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={weeklyActivityData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#FF6B6B]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#FF6B6B]" />
              Répartition par Catégorie
            </CardTitle>
            <CardDescription>Distribution des ventes par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <Doughnut data={categoryDistribution} options={doughnutOptions} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {categoryStats.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                  <div className="h-3 w-3 rounded-full mb-1" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs font-medium">{cat.name}</span>
                  <span className="text-lg font-bold">{cat.sales}</span>
                  <span className="text-xs text-muted-foreground">ventes</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produits les Plus Vendus</CardTitle>
            <CardDescription>Top 5 des meilleures ventes ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={bestSellingProducts} options={barChartOptions} />
            </div>
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
