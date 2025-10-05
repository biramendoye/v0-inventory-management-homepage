"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { LowStockAlertsSection } from "@/components/low-stock-alerts-section";
import { PricingSection } from "@/components/pricing-section";
import { ContactSection } from "@/components/contact-section";
import { CareersSection } from "@/components/careers-section";
import { CallToActionSection } from "@/components/call-to-action-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-[100vw]">
      <Header />
      <main className="overflow-x-hidden">
        <div className="max-w-[calc(100vw-2rem)] mx-auto px-4 lg:px-8">
          <HeroSection />
          <FeaturesSection />
          <LowStockAlertsSection />
          <PricingSection />
          <ContactSection />
          <CareersSection />
          <CallToActionSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
