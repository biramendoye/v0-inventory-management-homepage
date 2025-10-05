export interface InvoiceClient {
  name: string
  address: string
  companyId?: string
  vatNumber?: string
  email: string
  phone: string
}

export interface InvoiceProduct {
  name: string
  sku: string
  price: number
  quantity: number
}

export interface InvoiceRequest {
  client: InvoiceClient
  products: InvoiceProduct[]
  invoice_id: string
  payment_method: 'WIRE' | 'CHECK' | 'CASH' | 'CARD'
  currency: 'EUR' | 'USD' | 'GBP'
  vat_rate: number
  countryCode?: string
}

export interface InvoiceResponse {
  success: boolean
  invoice_id: string
  pdf_url?: string
  error?: string
}

export interface ApiInvoiceResponse {
  invoice_id: string
  message: string
  url: string
}

// Configuration - replace with your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_INVOICE_API_URL || 'http://localhost:11111'

export class InvoiceApiService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        mode: 'cors',
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error ${response.status}:`, errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const responseText = await response.text()
      return responseText ? JSON.parse(responseText) : {}
    } catch (error) {
      console.error('API request failed:', error)
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to PDF generation service. Please ensure the service is running on http://localhost:11111')
      }
      throw error
    }
  }

  static async generateInvoicePDF(invoiceData: InvoiceRequest): Promise<InvoiceResponse> {
    try {
      console.log('📤 Sending invoice generation request:', {
        invoice_id: invoiceData.invoice_id,
        client: invoiceData.client.name,
        products_count: invoiceData.products.length
      })

      const response = await this.makeRequest<ApiInvoiceResponse>('/invoices', {
        method: 'POST',
        body: JSON.stringify(invoiceData),
      })

      console.log('📥 Received API response:', response)

      // Convert API response format to our internal format
      const result = {
        success: true,
        invoice_id: response.invoice_id,
        pdf_url: response.url
      }

      console.log('✅ PDF generated successfully:', {
        invoice_id: result.invoice_id,
        pdf_url: result.pdf_url,
        message: response.message
      })

      return result
    } catch (error) {
      console.error('❌ Failed to generate invoice PDF:', error)
      return {
        success: false,
        invoice_id: invoiceData.invoice_id,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  static async getInvoicePDF(invoiceId: string): Promise<string | null> {
    try {
      console.log('📋 Fetching PDF for invoice:', invoiceId)

      const response = await this.makeRequest<ApiInvoiceResponse>(`/invoices/${invoiceId}`, {
        method: 'GET',
      })

      console.log('📥 PDF fetch response:', response)

      if (response.url) {
        console.log('✅ PDF URL retrieved:', response.url)
        return response.url
      } else {
        console.warn('⚠️ No PDF URL in response')
        return null
      }
    } catch (error) {
      console.error('❌ Failed to get invoice PDF:', error)
      return null
    }
  }
}

// Helper function to convert sale form data to invoice API format
export function convertSaleDataToInvoiceRequest(saleData: any): InvoiceRequest {
  const countryCode = saleData.customer.countryCode || 'FR';

  return {
    client: {
      name: saleData.customer.name,
      address: `${saleData.customer.company || saleData.customer.name}\n${saleData.customer.phone}\n${countryCode}`,
      companyId: saleData.customer.company || undefined,
      vatNumber: undefined, // Add this field to your form if needed
      email: saleData.customer.email,
      phone: saleData.customer.phone,
    },
    products: saleData.items.map((item: any) => ({
      name: item.product.name,
      sku: item.product.sku,
      price: item.unitPrice,
      quantity: item.quantity,
    })),
    invoice_id: saleData.invoiceNumber,
    payment_method: 'WIRE', // Default to wire transfer, make this configurable
    currency: saleData.currency || 'EUR', // Use customer's country currency
    vat_rate: saleData.taxRate,
    countryCode: countryCode,
  }
}

// Unified service that handles both demo and production modes
export class UnifiedInvoiceService {
  private static isDemoMode(): boolean {
    return !process.env.NEXT_PUBLIC_INVOICE_API_URL;
  }

  static async generateInvoicePDF(invoiceData: InvoiceRequest): Promise<InvoiceResponse> {
    if (this.isDemoMode()) {
      console.log('🚀 Using Demo Invoice API (no NEXT_PUBLIC_INVOICE_API_URL configured)');
      console.log('📝 Demo mode will simulate PDF generation with mock data');
      // Import demo service dynamically to avoid bundling in production
      const { DemoInvoiceApiService } = await import('./demo-invoice-api');
      return DemoInvoiceApiService.generateInvoicePDF(invoiceData);
    } else {
      console.log('🌐 Using Production Invoice API at:', process.env.NEXT_PUBLIC_INVOICE_API_URL);
      console.log('📋 Calling real API with invoice:', invoiceData.invoice_id);
      return InvoiceApiService.generateInvoicePDF(invoiceData);
    }
  }

  static async getInvoicePDF(invoiceId: string): Promise<string | null> {
    if (this.isDemoMode()) {
      console.log('🚀 Using Demo Invoice API for PDF fetch (no NEXT_PUBLIC_INVOICE_API_URL configured)');
      console.log('📝 Demo mode will return mock PDF URL');
      // Import demo service dynamically to avoid bundling in production
      const { DemoInvoiceApiService } = await import('./demo-invoice-api');
      return DemoInvoiceApiService.getInvoicePDF(invoiceId);
    } else {
      console.log('🌐 Using Production Invoice API for PDF fetch at:', process.env.NEXT_PUBLIC_INVOICE_API_URL);
      console.log('📋 Fetching PDF for invoice:', invoiceId);
      return InvoiceApiService.getInvoicePDF(invoiceId);
    }
  }
}
