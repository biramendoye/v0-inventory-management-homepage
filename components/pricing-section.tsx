"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function PricingSection() {
  const { t } = useLanguage()

  const plans = [
    {
      name: t("landing.pricing.starter.name"),
      price: t("landing.pricing.starter.price"),
      period: t("landing.pricing.starter.period"),
      description: t("landing.pricing.starter.description"),
      features: [
        t("landing.pricing.starter.features.products"),
        t("landing.pricing.starter.features.reports"),
        t("landing.pricing.starter.features.support"),
        t("landing.pricing.starter.features.mobile"),
        t("landing.pricing.starter.features.users"),
      ],
      popular: false,
    },
    {
      name: t("landing.pricing.professional.name"),
      price: t("landing.pricing.professional.price"),
      period: t("landing.pricing.professional.period"),
      description: t("landing.pricing.professional.description"),
      features: [
        t("landing.pricing.professional.features.products"),
        t("landing.pricing.professional.features.analytics"),
        t("landing.pricing.professional.features.support"),
        t("landing.pricing.professional.features.api"),
        t("landing.pricing.professional.features.users"),
        t("landing.pricing.professional.features.integrations"),
      ],
      popular: true,
    },
    {
      name: t("landing.pricing.enterprise.name"),
      price: t("landing.pricing.enterprise.price"),
      period: "",
      description: t("landing.pricing.enterprise.description"),
      features: [
        t("landing.pricing.enterprise.features.products"),
        t("landing.pricing.enterprise.features.reports"),
        t("landing.pricing.enterprise.features.support"),
        t("landing.pricing.enterprise.features.whiteLabel"),
        t("landing.pricing.enterprise.features.users"),
        t("landing.pricing.enterprise.features.security"),
        t("landing.pricing.enterprise.features.development"),
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("landing.pricing.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("landing.pricing.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t("landing.pricing.professional.popular")}
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80"}`}
                  variant={plan.popular ? "default" : "secondary"}
                >
                  {plan.name === t("landing.pricing.enterprise.name")
                    ? t("landing.pricing.contactSales")
                    : t("landing.pricing.getStarted")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{t("landing.pricing.trialInfo")}</p>
          <Button variant="outline" size="lg">
            {t("landing.pricing.compareFeatures")}
          </Button>
        </div>
      </div>
    </section>
  )
}
