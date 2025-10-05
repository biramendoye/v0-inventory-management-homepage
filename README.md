# FIBEM STOCK - Inventory Management System

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/biramendoyes-projects/v0-inventory-management-homepage)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/ucycudPonee)

## Overview

This is a comprehensive inventory management system built with Next.js 14, featuring:

- 🌍 **Multi-language support** (French, English, Spanish, Arabic)
- 📊 **Dashboard analytics** with real-time inventory tracking
- 📋 **Sales management** with automated PDF invoice generation
- 🔐 **Authentication system** with role-based access
- 📱 **Responsive design** optimized for all devices
- 🎨 **Modern UI** built with shadcn/ui and Tailwind CSS

## Features

### 🏪 Sales & Invoice Management
- Create and manage sales transactions
- Automated PDF invoice generation via API
- Multi-currency support (EUR, USD, GBP)
- Email integration for sending invoices
- Payment tracking and status management

### 📦 Inventory Control
- Real-time stock monitoring
- Low stock alerts and notifications
- Product management with SKU tracking
- Supplier management

### 📊 Analytics Dashboard
- Monthly sales overview
- Customer analytics
- Inventory reports
- Payment status tracking

### 🌐 Internationalization
- Support for 4 languages with RTL support for Arabic
- Currency formatting based on locale
- Contextual translations throughout the application

## PDF Invoice Generation

### Setup

The application includes an automated PDF invoice generation system. To configure it:

1. **Development Mode (Demo)**: 
   - No configuration needed
   - Uses mock PDF generation for testing
   - Generates demo PDFs with invoice data

2. **Production Mode**:
   ```bash
   # Copy the environment example
   cp .env.example .env.local
   
   # Configure your PDF generation API
   NEXT_PUBLIC_INVOICE_API_URL=http://localhost:11111
   ```

### API Integration

The system expects a PDF generation API with the following endpoints:

#### Generate Invoice PDF
```
POST http://localhost:11111/invoices
Content-Type: application/json

{
  "client": {
    "name": "Client Company Name",
    "address": "123 Client Street\nCity, Country\nPostal Code",
    "companyId": "ABC123",
    "vatNumber": "GB123456789",
    "email": "contact@client.com",
    "phone": "+44 123 456 7890"
  },
  "products": [
    {
      "name": "Product 1",
      "sku": "PRD001",
      "price": 100.00,
      "quantity": 2
    }
  ],
  "invoice_id": "INV-2024-001",
  "payment_method": "WIRE",
  "currency": "GBP",
  "vat_rate": 20.0,
  "countryCode": "GB"
}
```

Response:
```json
{
  "invoice_id": "FIBEM-FR-20251004-161806-821644",
  "message": "Professional invoice generated successfully!",
  "url": "http://localhost:11111/static/invoice-FIBEM-FR-20251004-161806-821644.pdf"
}
```

#### Retrieve Invoice PDF
```
GET http://localhost:11111/invoices/{invoice_id}
```

Response:
```json
{
  "invoice_id": "FIBEM-FR-20251004-161806-821644",
  "message": "Professional invoice generated successfully!",
  "url": "http://localhost:11111/static/invoice-FIBEM-FR-20251004-161806-821644.pdf"
}
```

### How It Works

1. **Create Sale**: User fills out the sales form with customer and product details
2. **Country Selection**: System automatically sets currency and VAT rate based on selected country
3. **Generate Invoice**: On form submission, the system calls your PDF generation API with country code
4. **Store PDF URL**: The returned PDF URL is stored with the sale record
5. **View Invoice**: Users can view, download, or share the generated PDF invoice

### Country Code Features

- **Automatic Currency Selection**: EUR, USD, GBP, CHF, CAD, MAD, etc.
- **Dynamic VAT Rates**: Country-specific VAT rates (France: 20%, Germany: 19%, etc.)
- **Multi-Country Support**: 13+ countries including EU, North America, and North Africa
- **Localized Formatting**: Currency symbols and formatting based on country selection

### Demo Mode

When no API is configured, the system automatically uses demo mode:
- Simulates API delays and occasional failures
- Generates mock PDFs for testing
- Perfect for development and demonstration

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- PDF generation service running on `http://localhost:11111`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start your PDF generation service on port 11111

5. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Admin**: admin@fibem.com / admin123
- **Demo**: demo@fibem.com / demo123

### API Configuration
- **PDF Service**: http://localhost:11111/invoices
- **Generate PDF**: POST /invoices (with invoice data)
- **Get PDF**: GET /invoices/{invoice_id}

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Authentication**: Custom localStorage-based (demo)
- **Internationalization**: Custom React Context implementation
- **Country Data**: Built-in country code utilities with currency/VAT mapping

## Deployment

Your project is live at:

**[https://vercel.com/biramendoyes-projects/v0-inventory-management-homepage](https://vercel.com/biramendoyes-projects/v0-inventory-management-homepage)**

## Development

Continue building your app on:

**[https://v0.app/chat/projects/ucycudPonee](https://v0.app/chat/projects/ucycudPonee)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Contributing

This project is automatically synced with v0.app. To contribute:
1. Make changes in the v0.app interface
2. Changes will be automatically reflected in this repository
3. Test your changes in the deployed version

## License

This project is private and proprietary to FIBEM STOCK.