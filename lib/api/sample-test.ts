"use client";

import { InvoiceRequest, UnifiedInvoiceService } from './invoice-api';

// Sample invoice data that matches your API format
export const SAMPLE_INVOICE_DATA: InvoiceRequest = {
  client: {
    name: "Entreprise Test SARL",
    address: "123 Rue de la Innovation\n75001 Paris, France",
    companyId: "TEST123456",
    vatNumber: "FR12345678901",
    email: "contact@entreprise-test.fr",
    phone: "+33 1 42 36 85 47"
  },
  products: [
    {
      name: "MacBook Air M2 - 256GB",
      sku: "APPLE-MBA-M2-256",
      price: 1299.00,
      quantity: 2
    },
    {
      name: "Magic Mouse",
      sku: "APPLE-MOUSE-WHITE",
      price: 85.00,
      quantity: 2
    },
    {
      name: "USB-C Cable",
      sku: "CABLE-USBC-2M",
      price: 29.90,
      quantity: 3
    }
  ],
  invoice_id: `FIBEM-TEST-${Date.now()}`,
  payment_method: "WIRE",
  currency: "EUR",
  vat_rate: 20.0,
  countryCode: "FR"
};

// Expected API response format from your localhost:11111 service
export interface ExpectedApiResponse {
  invoice_id: string;
  message: string;
  url: string;
}

// Sample expected response for testing
export const SAMPLE_API_RESPONSE: ExpectedApiResponse = {
  invoice_id: "FIBEM-FR-20251004-161806-821644",
  message: "Professional invoice generated successfully!",
  url: "http://localhost:11111/static/invoice-FIBEM-FR-20251004-161806-821644.pdf"
};

export class SampleApiTester {
  // Test with real sample data
  static async testWithSampleData(): Promise<void> {
    console.log('🧪 Testing API with sample invoice data...');
    console.log('📋 Sample Invoice Data:', SAMPLE_INVOICE_DATA);

    try {
      const result = await UnifiedInvoiceService.generateInvoicePDF(SAMPLE_INVOICE_DATA);

      console.log('📥 API Response:', result);

      if (result.success) {
        console.log('✅ Test successful!');
        console.log('📄 PDF URL:', result.pdf_url);
        console.log('🆔 Invoice ID:', result.invoice_id);

        // Try to fetch the PDF
        if (result.pdf_url) {
          console.log('🔍 Testing PDF fetch...');
          const pdfUrl = await UnifiedInvoiceService.getInvoicePDF(result.invoice_id);

          if (pdfUrl) {
            console.log('✅ PDF fetch successful:', pdfUrl);
          } else {
            console.log('⚠️ PDF fetch returned null');
          }
        }

      } else {
        console.log('❌ Test failed:', result.error);
      }
    } catch (error) {
      console.error('💥 Test threw an error:', error);
    }
  }

  // Test direct fetch
  static async testDirectFetch(): Promise<void> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_INVOICE_API_URL || 'http://localhost:11111';

    console.log('🔗 Testing direct API connection to:', API_BASE_URL);

    try {
      // Test basic connectivity
      const response = await fetch(`${API_BASE_URL}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(SAMPLE_INVOICE_DATA),
        mode: 'cors',
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('📥 Raw API Response:', data);

        // Validate response format
        if (data.invoice_id && data.message && data.url) {
          console.log('✅ Response format matches expected structure');
          console.log('🆔 Invoice ID:', data.invoice_id);
          console.log('💬 Message:', data.message);
          console.log('🔗 PDF URL:', data.url);
        } else {
          console.log('⚠️ Response format differs from expected');
          console.log('Expected: { invoice_id, message, url }');
          console.log('Received:', Object.keys(data));
        }
      } else {
        const errorText = await response.text();
        console.error('❌ API returned error:', response.status, errorText);
      }
    } catch (error) {
      console.error('💥 Direct fetch failed:', error);
    }
  }

  // Test with minimal data
  static async testMinimalData(): Promise<void> {
    const minimalData: InvoiceRequest = {
      client: {
        name: "Test Client",
        address: "Test Address\nTest City",
        email: "test@example.com",
        phone: "+33 1 23 45 67 89"
      },
      products: [
        {
          name: "Test Product",
          sku: "TEST-001",
          price: 100.00,
          quantity: 1
        }
      ],
      invoice_id: `MINIMAL-TEST-${Date.now()}`,
      payment_method: "WIRE",
      currency: "EUR",
      vat_rate: 20.0,
      countryCode: "FR"
    };

    console.log('🧪 Testing API with minimal data...');
    console.log('📋 Minimal Data:', minimalData);

    try {
      const result = await UnifiedInvoiceService.generateInvoicePDF(minimalData);
      console.log('📥 Minimal Test Result:', result);

      if (result.success) {
        console.log('✅ Minimal test passed!');
      } else {
        console.log('❌ Minimal test failed:', result.error);
      }
    } catch (error) {
      console.error('💥 Minimal test error:', error);
    }
  }

  // Run comprehensive tests
  static async runComprehensiveTests(): Promise<void> {
    console.log('🚀 Starting comprehensive API tests...');
    console.log('⏰ Test started at:', new Date().toLocaleString());
    console.log('🔗 API URL:', process.env.NEXT_PUBLIC_INVOICE_API_URL || 'http://localhost:11111');
    console.log('🌍 Testing with country code features enabled');

    console.log('\n--- Test 1: Direct API Connection ---');
    await this.testDirectFetch();

    console.log('\n--- Test 2: Sample Data Test ---');
    await this.testWithSampleData();

    console.log('\n--- Test 3: Minimal Data Test ---');
    await this.testMinimalData();

    console.log('\n✨ Comprehensive tests completed!');
    console.log('⏰ Test finished at:', new Date().toLocaleString());
    console.log('🌍 Country codes tested: FR (France) with EUR currency');
  }
}

// Console helper functions
export const testSampleInvoice = () => SampleApiTester.testWithSampleData();
export const testDirectApi = () => SampleApiTester.testDirectFetch();
export const testMinimalInvoice = () => SampleApiTester.testMinimalData();
export const runAllApiTests = () => SampleApiTester.runComprehensiveTests();

// Export for global access in browser console
if (typeof window !== 'undefined') {
  (window as any).testSampleInvoice = testSampleInvoice;
  (window as any).testDirectApi = testDirectApi;
  (window as any).testMinimalInvoice = testMinimalInvoice;
  (window as any).runAllApiTests = runAllApiTests;
  (window as any).SampleApiTester = SampleApiTester;
  (window as any).SAMPLE_INVOICE_DATA = SAMPLE_INVOICE_DATA;
}
