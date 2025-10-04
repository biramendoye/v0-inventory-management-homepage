"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, FileText, Zap, Shield, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: BarChart3,
      title: t("landing.features.realTimeTracking.title"),
      description: t("landing.features.realTimeTracking.description"),
    },
    {
      icon: Users,
      title: t("landing.features.supplierManagement.title"),
      description: t("landing.features.supplierManagement.description"),
    },
    {
      icon: FileText,
      title: t("landing.features.automatedReports.title"),
      description: t("landing.features.automatedReports.description"),
    },
    {
      icon: Zap,
      title: t("landing.features.quickIntegration.title"),
      description: t("landing.features.quickIntegration.description"),
    },
    {
      icon: Shield,
      title: t("landing.features.secureCompliant.title"),
      description: t("landing.features.secureCompliant.description"),
    },
    {
      icon: Globe,
      title: t("landing.features.multiLocation.title"),
      description: t("landing.features.multiLocation.description"),
    },
  ]

  return (
    <section id="features" className="py-20 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">{t("landing.features.title")}</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            {t("landing.features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
