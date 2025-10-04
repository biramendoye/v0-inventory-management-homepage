"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, Building2, Calendar, CreditCard, FileText } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface InvoiceData {
  id: string
  customer: {
    name: string
    email: string
    phone?: string
    company?: string
  }
  date: string
  dueDate: string
  items: Array<{
    name: string
    sku: string
    quantity: number
    unitPrice: number
    subtotal: number
  }>
  subtotal: number
  taxRate: number
  taxAmount: number
  grandTotal: number
  status: string
}

interface InvoiceViewerProps {
  isOpen: boolean
  onClose: () => void
  invoiceData: InvoiceData | null
}

export function InvoiceViewer({ isOpen, onClose, invoiceData }: InvoiceViewerProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { t, language } = useLanguage()

  if (!invoiceData) return null

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${t("sales.invoiceViewer.title")} ${invoiceData.id}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 0; 
              color: #1f2937; 
              line-height: 1.6;
              background: #ffffff;
            }
            .container { max-width: 800px; margin: 0 auto; padding: 40px; }
            .header { 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-start;
              margin-bottom: 50px; 
              padding-bottom: 30px;
              border-bottom: 3px solid #f59e0b;
            }
            .company-info { display: flex; align-items: flex-start; gap: 20px; }
            .logo { 
              width: 80px; 
              height: 80px; 
              border-radius: 12px;
              overflow: hidden;
              flex-shrink: 0;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .logo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .company-details h1 { 
              color: #f59e0b; 
              font-size: 2.5em; 
              font-weight: 700; 
              margin-bottom: 10px;
              letter-spacing: -0.5px;
            }
            .company-details p { 
              color: #6b7280; 
              font-size: 0.95em; 
              line-height: 1.5;
            }
            .invoice-info { text-align: right; }
            .invoice-info h2 { 
              font-size: 2em; 
              color: #1f2937; 
              margin-bottom: 15px;
              font-weight: 600;
            }
            .invoice-number { 
              font-size: 1.3em; 
              font-weight: 700; 
              color: #f59e0b; 
              margin-bottom: 8px;
            }
            .dates { color: #6b7280; font-size: 0.95em; margin-bottom: 15px; }
            .status { 
              padding: 8px 16px; 
              border-radius: 20px; 
              font-size: 0.85em; 
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .status-paid { background-color: #d1fae5; color: #065f46; }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .customer-section { 
              margin-bottom: 40px; 
              background: #f9fafb;
              padding: 25px;
              border-radius: 12px;
              border-left: 4px solid #f59e0b;
            }
            .customer-section h3 { 
              color: #1f2937; 
              font-size: 1.2em; 
              margin-bottom: 15px;
              font-weight: 600;
            }
            .customer-details { color: #374151; }
            .customer-name { font-weight: 700; font-size: 1.1em; color: #1f2937; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 40px; 
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            th { 
              background: linear-gradient(135deg, #f59e0b, #f97316); 
              color: white; 
              padding: 16px 12px; 
              text-align: left; 
              font-weight: 600;
              font-size: 0.9em;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            td { 
              padding: 16px 12px; 
              border-bottom: 1px solid #f3f4f6; 
            }
            tr:hover { background-color: #fafafa; }
            .item-name { font-weight: 600; color: #1f2937; }
            .item-sku { color: #6b7280; font-size: 0.9em; }
            .totals-section { 
              background: #f9fafb; 
              padding: 30px; 
              border-radius: 12px;
              margin-bottom: 30px;
            }
            .totals { 
              max-width: 350px; 
              margin-left: auto; 
            }
            .total-row { 
              display: flex; 
              justify-content: space-between; 
              padding: 8px 0; 
              font-size: 1em;
            }
            .total-row.subtotal { color: #6b7280; }
            .total-row.tax { color: #6b7280; }
            .total-row.grand { 
              font-weight: 700; 
              font-size: 1.3em; 
              color: #1f2937;
              border-top: 2px solid #f59e0b;
              padding-top: 15px;
              margin-top: 10px;
            }
            .payment-terms { 
              background: #fef7ed; 
              padding: 25px; 
              border-radius: 12px;
              border: 1px solid #fed7aa;
            }
            .payment-terms h4 { 
              color: #ea580c; 
              font-size: 1.1em; 
              margin-bottom: 12px;
              font-weight: 600;
            }
            .payment-terms p { 
              color: #9a3412; 
              font-size: 0.95em; 
              line-height: 1.6;
            }
            .footer { 
              text-align: center; 
              margin-top: 50px; 
              padding-top: 30px; 
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="company-info">
                <div class="logo">
                  <img src="/images/fibem-logo.jpg" alt="Fibem Stock Logo" />
                </div>
                <div class="company-details">
                  <h1>${t("sales.invoiceViewer.companyName")}</h1>
                  <p>
                    ${t("sales.invoiceViewer.companyTagline")}<br>
                    ${t("sales.invoiceViewer.companyAddress")}<br>
                    ${t("sales.invoiceViewer.companyCity")}<br>
                    ${t("sales.invoiceViewer.companyPhone")}<br>
                    ${t("sales.invoiceViewer.companyEmail")}<br>
                    ${t("sales.invoiceViewer.companySiret")}
                  </p>
                </div>
              </div>
              <div class="invoice-info">
                <h2>${t("sales.invoiceViewer.invoiceTitle")}</h2>
                <div class="invoice-number">${t("sales.invoiceViewer.invoiceNumber")} ${invoiceData.id}</div>
                <div class="dates">
                  ${t("sales.invoiceViewer.date")} ${new Date(invoiceData.date).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}<br>
                  ${t("sales.invoiceViewer.dueDate")} ${new Date(invoiceData.dueDate).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                </div>
                <div class="status ${invoiceData.status === "Payée" || invoiceData.status === "Paid" ? "status-paid" : "status-pending"}">
                  ${invoiceData.status}
                </div>
              </div>
            </div>

            <div class="customer-section">
              <h3>${t("sales.invoiceViewer.billedTo")}</h3>
              <div class="customer-details">
                <div class="customer-name">${invoiceData.customer.name}</div>
                ${invoiceData.customer.company ? `<div>${invoiceData.customer.company}</div>` : ""}
                <div>${t("common.email")}: ${invoiceData.customer.email}</div>
                ${invoiceData.customer.phone ? `<div>${t("common.phone")}: ${invoiceData.customer.phone}</div>` : ""}
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>${t("sales.invoiceViewer.description")}</th>
                  <th>${t("sales.invoiceViewer.sku")}</th>
                  <th style="text-align: center;">${t("sales.invoiceViewer.quantity")}</th>
                  <th style="text-align: right;">${t("sales.invoiceViewer.unitPriceShort")}</th>
                  <th style="text-align: right;">${t("sales.invoiceViewer.total")}</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.items
                  .map(
                    (item) => `
                  <tr>
                    <td class="item-name">${item.name}</td>
                    <td class="item-sku">${item.sku}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right;">€${item.unitPrice.toFixed(2)}</td>
                    <td style="text-align: right; font-weight: 600;">€${item.subtotal.toFixed(2)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="totals-section">
              <div class="totals">
                <div class="total-row subtotal">
                  <span>${t("sales.invoiceViewer.subtotal")}</span>
                  <span>€${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row tax">
                  <span>${t("sales.invoiceViewer.tax")} (${invoiceData.taxRate}%):</span>
                  <span>€${invoiceData.taxAmount.toFixed(2)}</span>
                </div>
                <div class="total-row grand">
                  <span>${t("sales.invoiceViewer.grandTotal")}</span>
                  <span>€${invoiceData.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div class="payment-terms">
              <h4>${t("sales.invoiceViewer.paymentTermsTitle")}</h4>
              <p>
                <strong>${t("sales.invoiceViewer.paymentTermsDue")}</strong> ${t("sales.invoiceViewer.paymentTermsDueText")}<br>
                <strong>${t("sales.invoiceViewer.paymentTermsMethod")}</strong> ${t("sales.invoiceViewer.paymentTermsMethodText")}<br>
                <strong>${t("sales.invoiceViewer.paymentTermsPenalties")}</strong> ${t("sales.invoiceViewer.paymentTermsPenaltiesText")}
              </p>
            </div>

            <div class="footer">
              <p>${t("sales.invoiceViewer.footer")}</p>
            </div>
          </div>
        </body>
      </html>
    `

    const blob = new Blob([invoiceHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${t("sales.invoiceViewer.title")}_${invoiceData.id}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsGeneratingPDF(false)
  }

  const handleSendEmail = () => {
    const subject = t("sales.invoiceViewer.emailSubject").replace("{{invoiceId}}", invoiceData.id)

    const body = t("sales.invoiceViewer.emailBody")
      .replace("{{customerName}}", invoiceData.customer.name)
      .replace("{{invoiceId}}", invoiceData.id)
      .replace("{{total}}", invoiceData.grandTotal.toFixed(2))
      .replace("{{dueDate}}", new Date(invoiceData.dueDate).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US"))

    const mailtoLink = `mailto:${invoiceData.customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[98vw] max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-4 pb-0 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-600" />
              <DialogTitle className="text-lg">
                {t("sales.invoiceViewer.title")} {invoiceData.id}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={handleSendEmail} className="gap-2 bg-transparent text-xs">
                <Mail className="h-3 w-3" />
                <span className="hidden sm:inline">{t("sales.invoiceViewer.sendByEmail")}</span>
                <span className="sm:hidden">{t("sales.invoiceViewer.email")}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="gap-2 bg-transparent text-xs"
              >
                <Download className="h-3 w-3" />
                <span className="hidden sm:inline">
                  {isGeneratingPDF ? t("sales.invoiceViewer.generating") : t("sales.invoiceViewer.downloadPdf")}
                </span>
                <span className="sm:hidden">{t("sales.invoiceViewer.pdf")}</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-4 pb-4">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6 pb-4 border-b-2 border-amber-500">
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-white border border-gray-200">
                    <img src="/images/fibem-logo.jpg" alt="Fibem Stock Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-amber-600 mb-2 tracking-tight">
                      {t("sales.invoiceViewer.companyName")}
                    </h1>
                    <div className="text-gray-600 space-y-0.5 text-xs">
                      <p className="font-medium">{t("sales.invoiceViewer.companyTagline")}</p>
                      <p>{t("sales.invoiceViewer.companyAddress")}</p>
                      <p>{t("sales.invoiceViewer.companyCity")}</p>
                      <p>{t("sales.invoiceViewer.companyPhone")}</p>
                      <p>{t("sales.invoiceViewer.companyEmail")}</p>
                      <p className="text-[10px]">{t("sales.invoiceViewer.companySiret")}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-auto lg:text-right">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                    {t("sales.invoiceViewer.invoiceTitle")}
                  </h2>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="text-base sm:text-lg font-bold text-amber-700 mb-1.5">
                      {t("sales.invoiceViewer.invoiceNumber")} {invoiceData.id}
                    </p>
                    <div className="space-y-1.5 text-gray-600 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span>
                          {t("sales.invoiceViewer.date")}{" "}
                          {new Date(invoiceData.date).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-3 w-3 flex-shrink-0" />
                        <span>
                          {t("sales.invoiceViewer.dueDate")}{" "}
                          {new Date(invoiceData.dueDate).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant={
                          invoiceData.status === "Payée" || invoiceData.status === "Paid" ? "default" : "secondary"
                        }
                        className={
                          invoiceData.status === "Payée" || invoiceData.status === "Paid"
                            ? "bg-green-100 text-green-800 text-xs"
                            : "bg-yellow-100 text-yellow-800 text-xs"
                        }
                      >
                        {invoiceData.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <h3 className="text-base font-semibold text-gray-900">{t("sales.invoiceViewer.billedTo")}</h3>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-amber-500">
                  <p className="font-bold text-base text-gray-900 mb-0.5 break-words">{invoiceData.customer.name}</p>
                  {invoiceData.customer.company && (
                    <p className="text-gray-700 font-medium mb-0.5 break-words text-sm">
                      {invoiceData.customer.company}
                    </p>
                  )}
                  <div className="space-y-0.5 text-gray-600 text-xs">
                    <p className="break-all">📧 {invoiceData.customer.email}</p>
                    {invoiceData.customer.phone && <p>📞 {invoiceData.customer.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="hidden md:block rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <th className="text-left py-2 px-2 font-semibold text-xs">
                          {t("sales.invoiceViewer.description")}
                        </th>
                        <th className="text-left py-2 px-2 font-semibold text-xs">{t("sales.invoiceViewer.sku")}</th>
                        <th className="text-center py-2 px-2 font-semibold text-xs">
                          {t("sales.invoiceViewer.quantity")}
                        </th>
                        <th className="text-right py-2 px-2 font-semibold text-xs">
                          {t("sales.invoiceViewer.unitPriceShort")}
                        </th>
                        <th className="text-right py-2 px-2 font-semibold text-xs">{t("sales.invoiceViewer.total")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-2 px-2">
                            <div className="font-medium text-gray-900 text-xs">{item.name}</div>
                          </td>
                          <td className="py-2 px-2 text-gray-600 font-mono text-[10px]">{item.sku}</td>
                          <td className="py-2 px-2 text-center font-medium text-xs">{item.quantity}</td>
                          <td className="py-2 px-2 text-right text-gray-700 text-xs">€{item.unitPrice.toFixed(2)}</td>
                          <td className="py-2 px-2 text-right font-semibold text-gray-900 text-xs">
                            €{item.subtotal.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-3">
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-xs truncate">{item.name}</h4>
                          <p className="text-[10px] text-gray-500 font-mono">{item.sku}</p>
                        </div>
                        <div className="text-right ml-3">
                          <p className="font-semibold text-gray-900 text-xs">€{item.subtotal.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-600">
                        <span>
                          {t("sales.invoiceViewer.quantityLabel")} {item.quantity}
                        </span>
                        <span>
                          {t("sales.invoiceViewer.unitPriceLabel")} €{item.unitPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mb-6">
                <div className="w-full max-w-sm bg-gray-50 p-3 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600 text-xs">
                      <span>{t("sales.invoiceViewer.subtotal")}</span>
                      <span>€{invoiceData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-xs">
                      <span>
                        {t("sales.invoiceViewer.tax")} (${invoiceData.taxRate}%):
                      </span>
                      <span>€{invoiceData.taxAmount.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold text-gray-900">
                      <span>{t("sales.invoiceViewer.grandTotal")}</span>
                      <span className="text-amber-600">€{invoiceData.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mb-4">
                <h4 className="font-semibold mb-2 text-amber-800 flex items-center gap-1.5 text-sm">
                  <CreditCard className="h-3 w-3" />
                  {t("sales.invoiceViewer.paymentTermsTitle")}
                </h4>
                <div className="text-amber-700 space-y-0.5 text-xs">
                  <p>
                    <strong>{t("sales.invoiceViewer.paymentTermsDue")}</strong>{" "}
                    {t("sales.invoiceViewer.paymentTermsDueText")}
                  </p>
                  <p>
                    <strong>{t("sales.invoiceViewer.paymentTermsMethod")}</strong>{" "}
                    {t("sales.invoiceViewer.paymentTermsMethodText")}
                  </p>
                  <p>
                    <strong>{t("sales.invoiceViewer.paymentTermsPenalties")}</strong>{" "}
                    {t("sales.invoiceViewer.paymentTermsPenaltiesText")}
                  </p>
                </div>
              </div>

              <div className="text-center pt-3 border-t border-gray-200">
                <p className="text-gray-500 text-[10px]">{t("sales.invoiceViewer.footer")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
