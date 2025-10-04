"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { LowStockAlertsSection } from "@/components/low-stock-alerts-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { CareersSection } from "@/components/careers-section"
import { CallToActionSection } from "@/components/call-to-action-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LowStockAlertsSection />
        <PricingSection />
        <ContactSection />
        <CareersSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  )
}
