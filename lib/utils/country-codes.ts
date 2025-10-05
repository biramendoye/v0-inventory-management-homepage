export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  phonePrefix: string;
}

// Country code is now at the root level of invoice request, not in client object
// Example API request structure:
// {
//   "client": { "name": "...", "email": "...", "phone": "..." },
//   "vat_rate": 20.0,
//   "currency": "EUR",
//   "countryCode": "FR"  // <- At root level
// }

export const COUNTRIES: Country[] = [
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", phonePrefix: "+33" },
  { code: "ES", name: "España", flag: "🇪🇸", currency: "EUR", phonePrefix: "+34" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", phonePrefix: "+44" },
  { code: "DE", name: "Deutschland", flag: "🇩🇪", currency: "EUR", phonePrefix: "+49" },
  { code: "IT", name: "Italia", flag: "🇮🇹", currency: "EUR", phonePrefix: "+39" },
  { code: "BE", name: "België", flag: "🇧🇪", currency: "EUR", phonePrefix: "+32" },
  { code: "NL", name: "Nederland", flag: "🇳🇱", currency: "EUR", phonePrefix: "+31" },
  { code: "CH", name: "Schweiz", flag: "🇨🇭", currency: "CHF", phonePrefix: "+41" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", phonePrefix: "+1" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", phonePrefix: "+1" },
  { code: "MA", name: "المغرب", flag: "🇲🇦", currency: "MAD", phonePrefix: "+212" },
  { code: "DZ", name: "الجزائر", flag: "🇩🇿", currency: "DZD", phonePrefix: "+213" },
  { code: "TN", name: "تونس", flag: "🇹🇳", currency: "TND", phonePrefix: "+216" },
];

export const COUNTRY_MAP = COUNTRIES.reduce((acc, country) => {
  acc[country.code] = country;
  return acc;
}, {} as Record<string, Country>);

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRY_MAP[code];
}

export function getCountryName(code: string): string {
  const country = getCountryByCode(code);
  return country ? country.name : code;
}

export function getCountryFlag(code: string): string {
  const country = getCountryByCode(code);
  return country ? country.flag : "🏳️";
}

export function getCurrencyByCountry(code: string): string {
  const country = getCountryByCode(code);
  return country ? country.currency : "EUR";
}

export function getPhonePrefixByCountry(code: string): string {
  const country = getCountryByCode(code);
  return country ? country.phonePrefix : "+33";
}

export function formatCountryDisplay(code: string): string {
  const country = getCountryByCode(code);
  return country ? `${country.flag} ${country.name}` : code;
}

export function isValidCountryCode(code: string): boolean {
  return COUNTRY_MAP.hasOwnProperty(code);
}

// Helper to get EU countries (for VAT purposes)
export const EU_COUNTRIES = [
  "FR", "ES", "DE", "IT", "BE", "NL", "AT", "PT", "IE", "FI", "SE", "DK",
  "PL", "CZ", "SK", "HU", "SI", "HR", "RO", "BG", "GR", "CY", "MT", "LT",
  "LV", "EE", "LU"
];

export function isEUCountry(code: string): boolean {
  return EU_COUNTRIES.includes(code);
}

// Get default currency based on country
export function getDefaultCurrencyForCountry(countryCode: string): string {
  const country = getCountryByCode(countryCode);
  if (country) {
    return country.currency;
  }
  // Default to EUR for unknown countries
  return "EUR";
}

// Get default VAT rate based on country
export function getDefaultVATRate(countryCode: string): number {
  const vatRates: Record<string, number> = {
    FR: 20.0, // France
    ES: 21.0, // Spain
    GB: 20.0, // UK
    DE: 19.0, // Germany
    IT: 22.0, // Italy
    BE: 21.0, // Belgium
    NL: 21.0, // Netherlands
    CH: 7.7,  // Switzerland
    US: 0.0,  // USA (varies by state)
    CA: 5.0,  // Canada (GST, varies by province)
    MA: 20.0, // Morocco
    DZ: 19.0, // Algeria
    TN: 18.0, // Tunisia
  };

  return vatRates[countryCode] || 20.0; // Default to 20%
}

// Format address based on country conventions
export function formatAddressByCountry(address: string, countryCode: string): string {
  // Basic formatting - can be extended based on country-specific formats
  // Country code is now sent separately at root level of API request
  return address;
}

// Helper to create invoice request with country code at root level
export function createInvoiceRequestWithCountry(
  clientData: any,
  products: any[],
  invoiceId: string,
  countryCode: string = 'FR'
) {
  return {
    client: {
      name: clientData.name,
      address: clientData.address,
      email: clientData.email,
      phone: clientData.phone,
      // Note: countryCode is NOT here anymore
    },
    products,
    invoice_id: invoiceId,
    payment_method: 'WIRE',
    currency: getDefaultCurrencyForCountry(countryCode),
    vat_rate: getDefaultVATRate(countryCode),
    countryCode: countryCode // <- At root level
  };
}
