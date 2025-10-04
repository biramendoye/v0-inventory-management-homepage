"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Download, Mail, Filter } from "lucide-react"
import { NewSaleForm } from "./new-sale-form"
import { InvoiceViewer } from "./invoice-viewer"
import { useLanguage } from "@/contexts/language-context"

const mockSales = [
  {
    id: "INV-001",
    customer: "Entreprise Martin",
    email: "contact@martin.fr",
    date: "2024-01-15",
    total: 1250.0,
    status: "paid" as const,
  },
  {
    id: "INV-002",
    customer: "SAS Dubois",
    email: "admin@dubois.com",
    date: "2024-01-14",
    total: 890.5,
    status: "pending" as const,
  },
  {
    id: "INV-003",
    customer: "SARL Rousseau",
    email: "info@rousseau.fr",
    date: "2024-01-12",
    total: 2100.75,
    status: "paid" as const,
  },
  {
    id: "INV-004",
    customer: "Société Moreau",
    email: "contact@moreau.com",
    date: "2024-01-10",
    total: 675.25,
    status: "pending" as const,
  },
  {
    id: "INV-005",
    customer: "Entreprise Leroy",
    email: "service@leroy.fr",
    date: "2024-01-08",
    total: 1450.0,
    status: "paid" as const,
  },
]

export function SalesContent() {
  const { t } = useLanguage()
  const [sales, setSales] = useState(mockSales)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false)

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "week" && new Date(sale.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "month" && new Date(sale.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleNewSale = (saleData: any) => {
    const newSale = {
      id: saleData.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`,
      customer: saleData.customer.name,
      email: saleData.customer.email,
      date: new Date().toISOString().split("T")[0],
      total: saleData.grandTotal,
      status: saleData.status === "Confirmée" ? "pending" : ("draft" as const),
    }
    setSales([newSale, ...sales])
  }

  const handleViewInvoice = (sale: any) => {
    const invoiceData = {
      id: sale.id,
      customer: {
        name: sale.customer,
        email: sale.email,
        phone: "+33 1 23 45 67 89",
        company: sale.customer.includes("SAS") || sale.customer.includes("SARL") ? sale.customer : undefined,
      },
      date: sale.date,
      dueDate: new Date(new Date(sale.date).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      items: [
        {
          name: "MacBook Air M2",
          sku: "MBA-M2-256",
          quantity: 1,
          unitPrice: sale.total / 1.2,
          subtotal: sale.total / 1.2,
        },
      ],
      subtotal: sale.total / 1.2,
      taxRate: 20,
      taxAmount: sale.total - sale.total / 1.2,
      grandTotal: sale.total,
      status: sale.status,
    }
    setSelectedInvoice(invoiceData)
    setIsInvoiceViewerOpen(true)
  }

  const handleDownloadPDF = (sale: any) => {
    handleViewInvoice(sale)
  }

  const handleSendEmail = (sale: any) => {
    const subject = `${t("sales.invoice")} ${sale.id} - FIBEM STOCK`
    const body =
      t("sales.invoice") === "Invoice"
        ? `Hello ${sale.customer},\n\nPlease find attached your invoice ${sale.id} for €${sale.total.toFixed(2)}.\n\nBest regards,\nFIBEM STOCK Team`
        : `Bonjour ${sale.customer},\n\nVeuillez trouver ci-joint votre facture ${sale.id} d'un montant de €${sale.total.toFixed(2)}.\n\nCordialement,\nL'équipe FIBEM STOCK`

    const mailtoLink = `mailto:${sale.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("sales.title")}</h1>
          <p className="text-gray-600 mt-1">
            {t("sales.title") === "Sales Management"
              ? "Manage your sales and invoices"
              : "Gérez vos ventes et factures"}
          </p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => setIsNewSaleOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("sales.newSale")}
        </Button>
      </div>

      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("sales.monthlySales")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€12,450</div>
            <p className="text-xs text-green-600 mt-1">
              {t("sales.monthlySales") === "Monthly Sales" ? "+15% vs last month" : "+15% vs mois dernier"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("sales.paidInvoices")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <p className="text-xs text-green-600 mt-1">
              {t("sales.paidInvoices") === "Paid Invoices" ? "+8% vs last month" : "+8% vs mois dernier"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("sales.pendingPayments")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">6</div>
            <p className="text-xs text-orange-600 mt-1">
              {t("sales.pendingPayments") === "Pending Payments" ? "€3,200 pending" : "€3,200 en attente"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("sales.activeCustomers")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <p className="text-xs text-blue-600 mt-1">
              {t("sales.activeCustomers") === "Active Customers" ? "+3 new customers" : "+3 nouveaux clients"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t("sales.title") === "Sales Management" ? "Sales List" : "Liste des Ventes"}</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={
                    t("sales.title") === "Sales Management"
                      ? "Search by customer or invoice number..."
                      : "Rechercher par client ou N° facture..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("common.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("common.status") === "Status" ? "All statuses" : "Tous les statuts"}
                  </SelectItem>
                  <SelectItem value="paid">{t("sales.paid")}</SelectItem>
                  <SelectItem value="pending">{t("sales.pending")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("common.date") === "Date" ? "Period" : "Période"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.date") === "Date" ? "All dates" : "Toutes les dates"}</SelectItem>
                  <SelectItem value="week">{t("common.date") === "Date" ? "This week" : "Cette semaine"}</SelectItem>
                  <SelectItem value="month">{t("common.date") === "Date" ? "This month" : "Ce mois"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("sales.invoiceNumber")}</TableHead>
                <TableHead>{t("sales.customer")}</TableHead>
                <TableHead>{t("common.date")}</TableHead>
                <TableHead>{t("common.total")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.customer}</div>
                      <div className="text-sm text-gray-500">{sale.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(sale.date).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell className="font-medium">€{sale.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={sale.status === "paid" ? "default" : "secondary"}>
                      {t(`sales.${sale.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(sale)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadPDF(sale)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleSendEmail(sale)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>
                {t("sales.title") === "Sales Management"
                  ? "No sales found with these filters"
                  : "Aucune vente trouvée avec ces filtres"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <NewSaleForm isOpen={isNewSaleOpen} onClose={() => setIsNewSaleOpen(false)} onSave={handleNewSale} />

      <InvoiceViewer
        isOpen={isInvoiceViewerOpen}
        onClose={() => setIsInvoiceViewerOpen(false)}
        invoiceData={selectedInvoice}
      />
    </div>
  )
}
