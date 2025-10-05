"use client";

import { InvoiceRequest } from './invoice-api';

export interface ApiTestResult {
  success: boolean;
  message: string;
  error?: string;
  responseTime?: number;
}

export class InvoiceApiTester {
  private static API_BASE_URL = process.env.NEXT_PUBLIC_INVOICE_API_URL || 'http://localhost:11111';

  // Test API connectivity
  static async testConnection(): Promise<ApiTestResult> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        return {
          success: true,
          message: `API is reachable at ${this.API_BASE_URL}`,
          responseTime
        };
      } else {
        return {
          success: false,
          message: `API returned status ${response.status}`,
          error: await response.text(),
          responseTime
        };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        success: false,
        message: `Failed to connect to API at ${this.API_BASE_URL}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime
      };
    }
  }

  // Test invoice generation with sample data
  static async testInvoiceGeneration(): Promise<ApiTestResult> {
    const startTime = Date.now();

    const sampleInvoice: InvoiceRequest = {
      client: {
        name: "Test Client",
        address: "123 Test Street\nTest City, Test Country\n12345",
        companyId: "TEST123",
        vatNumber: "GB123456789",
        email: "test@example.com",
        phone: "+33 1 23 45 67 89"
      },
      products: [
        {
          name: "Test Product",
          sku: "TEST001",
          price: 100.00,
          quantity: 2
        }
      ],
      invoice_id: `TEST-${Date.now()}`,
      payment_method: "WIRE",
      currency: "EUR",
      vat_rate: 20.0
    };

    try {
      const response = await fetch(`${this.API_BASE_URL}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(sampleInvoice),
        mode: 'cors',
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          message: `Invoice generated successfully: ${result.invoice_id} - ${result.message}`,
          responseTime
        };
      } else {
        const errorText = await response.text();
        return {
          success: false,
          message: `Invoice generation failed with status ${response.status}`,
          error: errorText,
          responseTime
        };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        success: false,
        message: 'Invoice generation request failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime
      };
    }
  }

  // Test PDF retrieval
  static async testPdfRetrieval(invoiceId: string): Promise<ApiTestResult> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.API_BASE_URL}/invoices/${invoiceId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          message: `PDF URL retrieved successfully: ${result.url}`,
          responseTime
        };
      } else {
        const errorText = await response.text();
        return {
          success: false,
          message: `PDF retrieval failed with status ${response.status}`,
          error: errorText,
          responseTime
        };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        success: false,
        message: 'PDF retrieval request failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime
      };
    }
  }

  // Run all tests
  static async runAllTests(): Promise<{
    connection: ApiTestResult;
    generation: ApiTestResult;
    retrieval?: ApiTestResult;
  }> {
    console.log('🧪 Running API tests...');

    // Test 1: Connection
    console.log('1️⃣ Testing connection...');
    const connectionResult = await this.testConnection();
    console.log(connectionResult.success ? '✅' : '❌', connectionResult.message);

    // Test 2: Invoice Generation
    console.log('2️⃣ Testing invoice generation...');
    const generationResult = await this.testInvoiceGeneration();
    console.log(generationResult.success ? '✅' : '❌', generationResult.message);

    const results = {
      connection: connectionResult,
      generation: generationResult,
    };

    // Test 3: PDF Retrieval (only if generation succeeded)
    if (generationResult.success) {
      console.log('3️⃣ Testing PDF retrieval...');
      const testInvoiceId = `TEST-${Date.now()}`;
      const retrievalResult = await this.testPdfRetrieval(testInvoiceId);
      console.log(retrievalResult.success ? '✅' : '❌', retrievalResult.message);

      return {
        ...results,
        retrieval: retrievalResult
      };
    }

    return results;
  }

  // Helper method to format test results for display
  static formatResults(results: any): string {
    let output = '🧪 API Test Results:\n\n';

    Object.entries(results).forEach(([testName, result]: [string, any]) => {
      const icon = result.success ? '✅' : '❌';
      output += `${icon} ${testName.toUpperCase()}:\n`;
      output += `   Message: ${result.message}\n`;
      if (result.responseTime) {
        output += `   Response Time: ${result.responseTime}ms\n`;
      }
      if (result.error) {
        output += `   Error: ${result.error}\n`;
      }
      output += '\n';
    });

    return output;
  }
}

// Console helper for manual testing
export const testInvoiceApi = () => {
  console.log('🚀 Starting Invoice API Tests...');
  console.log('API URL:', process.env.NEXT_PUBLIC_INVOICE_API_URL || 'http://localhost:11111');

  InvoiceApiTester.runAllTests().then(results => {
    console.log('\n' + InvoiceApiTester.formatResults(results));
  }).catch(error => {
    console.error('❌ Test suite failed:', error);
  });
};

// Export for global access in browser console
if (typeof window !== 'undefined') {
  (window as any).testInvoiceApi = testInvoiceApi;
  (window as any).InvoiceApiTester = InvoiceApiTester;
}
