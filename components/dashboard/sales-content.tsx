"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Eye,
  Download,
  Mail,
  Filter,
  FileText,
  ExternalLink,
} from "lucide-react";
import { NewSaleForm } from "./new-sale-form";
import { InvoiceViewer } from "./invoice-viewer";
import { useLanguage } from "@/contexts/language-context";
import { UnifiedInvoiceService } from "@/lib/api/invoice-api";

interface Sale {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "paid" | "pending" | "draft";
  pdfUrl: string | null;
  documentType?: "sale" | "quotation";
  validUntil?: string;
}

const mockSales: Sale[] = [
  /* {
    id: "QUO-005",
    customer: "Entreprise Leroy",
    email: "service@leroy.fr",
    date: "2024-01-08",
    total: 1450.0,
    status: "draft",
    pdfUrl: null,
    documentType: "quotation",
    validUntil: "2024-02-08",
    documentType: "sale",
  },*/
];

export function SalesContent() {
  const { t } = useLanguage();
  const [sales, setSales] = useState(mockSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all");
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || sale.status === statusFilter;
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "week" &&
        new Date(sale.date) >=
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "month" &&
        new Date(sale.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const matchesDocumentType =
      documentTypeFilter === "all" ||
      (documentTypeFilter === "sales" &&
        (!sale.documentType || sale.documentType === "sale")) ||
      (documentTypeFilter === "quotations" &&
        sale.documentType === "quotation");

    return matchesSearch && matchesStatus && matchesDate && matchesDocumentType;
  });

  const handleNewSale = (saleData: any) => {
    const documentId =
      saleData.documentType === "quotation"
        ? saleData.quotationNumber || `QUO-${Date.now().toString().slice(-6)}`
        : saleData.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`;

    const newSale: Sale = {
      id: documentId,
      customer: saleData.customer.name,
      email: saleData.customer.email,
      date: new Date().toISOString().split("T")[0],
      total: saleData.grandTotal,
      status:
        saleData.status === "confirmed"
          ? saleData.documentType === "quotation"
            ? "draft"
            : "pending"
          : "draft",
      pdfUrl: saleData.pdfUrl || null,
      documentType: saleData.documentType || "sale",
      validUntil: saleData.validUntil,
    };
    setSales([newSale, ...sales]);
  };

  const handleViewInvoice = async (sale: Sale) => {
    // If PDF URL exists, open it directly
    if (sale.pdfUrl) {
      window.open(sale.pdfUrl, "_blank");
      return;
    }

    // Try to fetch PDF URL from API
    try {
      const pdfUrl = await UnifiedInvoiceService.getInvoicePDF(sale.id);
      if (pdfUrl) {
        // Update the sale with PDF URL and open it
        setSales((prevSales) =>
          prevSales.map((s) => (s.id === sale.id ? { ...s, pdfUrl } : s)),
        );
        window.open(pdfUrl, "_blank");
        return;
      }
    } catch (error) {
      console.error("Failed to fetch invoice PDF:", error);
    }

    // Fallback to invoice viewer if PDF not available
    const invoiceData = {
      id: sale.id,
      customer: {
        name: sale.customer,
        email: sale.email,
        phone: "+33 1 23 45 67 89",
        company:
          sale.customer.includes("SAS") || sale.customer.includes("SARL")
            ? sale.customer
            : undefined,
      },
      date: sale.date,
      dueDate: new Date(
        new Date(sale.date).getTime() + 30 * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .split("T")[0],
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
    };
    setSelectedInvoice(invoiceData);
    setIsInvoiceViewerOpen(true);
  };

  const handleDownloadPDF = async (sale: Sale) => {
    // If PDF URL exists, trigger download
    if (sale.pdfUrl) {
      const link = document.createElement("a");
      link.href = sale.pdfUrl;
      link.download = `${sale.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Try to fetch PDF URL from API
    try {
      const pdfUrl = await UnifiedInvoiceService.getInvoicePDF(sale.id);
      if (pdfUrl) {
        // Update the sale with PDF URL and trigger download
        setSales((prevSales) =>
          prevSales.map((s) => (s.id === sale.id ? { ...s, pdfUrl } : s)),
        );
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${sale.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
    } catch (error) {
      console.error("Failed to fetch invoice PDF for download:", error);
    }

    // Fallback: open invoice viewer
    await handleViewInvoice(sale);
  };

  const handleSendEmail = (sale: Sale) => {
    const subject = `${t("sales.invoice")} ${sale.id} - FIBEM STOCK`;
    const body =
      t("sales.invoice") === "Invoice"
        ? `Hello ${sale.customer},\n\nPlease find attached your invoice ${sale.id} for €${sale.total.toFixed(2)}.\n\nBest regards,\nFIBEM STOCK Team`
        : `Bonjour ${sale.customer},\n\nVeuillez trouver ci-joint votre facture ${sale.id} d'un montant de €${sale.total.toFixed(2)}.\n\nCordialement,\nL'équipe FIBEM STOCK`;

    const mailtoLink = `mailto:${sale.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="max-w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("sales.title")}
          </h1>
          <p className="text-gray-600 mt-1">
            {t("sales.title") === "Sales Management"
              ? "Manage your sales, quotations and invoices"
              : "Gérez vos ventes, devis et factures"}
          </p>
        </div>
        <Button
          className="bg-[#00A6D6] hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-lg font-medium"
          onClick={() => setIsNewSaleOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("sales.newSale")}
        </Button>
      </div>

      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 px-2 stats-grid">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("sales.monthlySales")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€12,450</div>
            <p className="text-xs text-green-600 mt-1">
              {t("sales.monthlySales") === "Monthly Sales"
                ? "+15% vs last month"
                : "+15% vs mois dernier"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("sales.paidInvoices")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <p className="text-xs text-green-600 mt-1">
              {t("sales.paidInvoices") === "Paid Invoices"
                ? "+8% vs last month"
                : "+8% vs mois dernier"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("sales.pendingPayments")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">6</div>
            <p className="text-xs text-orange-600 mt-1">
              {t("sales.pendingPayments") === "Pending Payments"
                ? "€3,200 pending"
                : "€3,200 en attente"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("sales.activeCustomers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <p className="text-xs text-blue-600 mt-1">
              {t("sales.activeCustomers") === "Active Customers"
                ? "+3 new customers"
                : "+3 nouveaux clients"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mx-2">
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <CardTitle>
              {t("sales.title") === "Sales Management"
                ? "Sales List"
                : "Liste des Ventes"}
            </CardTitle>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:gap-2 lg:gap-4">
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
                  className="pl-10 w-full sm:w-48 lg:w-56 max-w-xs"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32 lg:w-36 max-w-xs">
                  <SelectValue placeholder={t("common.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("common.status") === "Status"
                      ? "All statuses"
                      : "Tous les statuts"}
                  </SelectItem>
                  <SelectItem value="paid">{t("sales.paid")}</SelectItem>
                  <SelectItem value="pending">{t("sales.pending")}</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={documentTypeFilter}
                onValueChange={setDocumentTypeFilter}
              >
                <SelectTrigger className="w-full sm:w-32 lg:w-36 max-w-xs">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="sales">Sales Only</SelectItem>
                  <SelectItem value="quotations">Quotations Only</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-32 lg:w-36 max-w-xs">
                  <SelectValue
                    placeholder={
                      t("common.date") === "Date" ? "Period" : "Période"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("common.date") === "Date"
                      ? "All dates"
                      : "Toutes les dates"}
                  </SelectItem>
                  <SelectItem value="week">
                    {t("common.date") === "Date"
                      ? "This week"
                      : "Cette semaine"}
                  </SelectItem>
                  <SelectItem value="month">
                    {t("common.date") === "Date" ? "This month" : "Ce mois"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="table-wrapper">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Document ID</TableHead>
                  <TableHead>Type</TableHead>
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
                      <Badge
                        variant={
                          sale.documentType === "quotation"
                            ? "secondary"
                            : "default"
                        }
                        className={
                          sale.documentType === "quotation"
                            ? "bg-[#00A6D6]/10 text-[#00A6D6] border-[#00A6D6]"
                            : "bg-[#FFD700] text-black font-medium"
                        }
                      >
                        {sale.documentType === "quotation" ? "Quote" : "Sale"}
                      </Badge>
                      {sale.documentType === "quotation" && sale.validUntil && (
                        <div className="text-xs text-gray-500 mt-1">
                          Valid until:{" "}
                          {new Date(sale.validUntil).toLocaleDateString(
                            "fr-FR",
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{sale.customer}</div>
                        <div className="text-sm text-gray-500">
                          {sale.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(sale.date).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell className="font-medium">
                      €{sale.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sale.status === "paid"
                            ? "default"
                            : sale.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          sale.status === "draft" &&
                          sale.documentType === "quotation"
                            ? "bg-[#00A6D6]/10 text-[#00A6D6] border-[#00A6D6]"
                            : sale.status === "paid"
                              ? "bg-[#FFD700] text-black font-medium"
                              : ""
                        }
                      >
                        {t(`sales.${sale.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#00A6D6] hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                          onClick={() => handleViewInvoice(sale)}
                          title={
                            sale.pdfUrl
                              ? `View PDF ${sale.documentType === "quotation" ? "Quotation" : "Invoice"}`
                              : `View ${sale.documentType === "quotation" ? "Quotation" : "Invoice"} Details`
                          }
                        >
                          {sale.pdfUrl ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#00A6D6] hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                          onClick={() => handleDownloadPDF(sale)}
                          title={`Download PDF ${sale.documentType === "quotation" ? "Quotation" : "Invoice"}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {sale.pdfUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#00A6D6] hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                            onClick={() =>
                              sale.pdfUrl && window.open(sale.pdfUrl, "_blank")
                            }
                            title="Open PDF in new tab"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-gray-500 px-4">
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

      <NewSaleForm
        isOpen={isNewSaleOpen}
        onClose={() => setIsNewSaleOpen(false)}
        onSave={handleNewSale}
      />

      <InvoiceViewer
        isOpen={isInvoiceViewerOpen}
        onClose={() => setIsInvoiceViewerOpen(false)}
        invoiceData={selectedInvoice}
      />
    </div>
  );
}
