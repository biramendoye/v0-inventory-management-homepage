"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

const jobs = [
  {
    id: "1",
    titleKey: "landing.careers.jobs.softwareEngineer.title",
    departmentKey: "landing.careers.jobs.softwareEngineer.department",
    locationKey: "landing.careers.jobs.softwareEngineer.location",
    typeKey: "landing.careers.jobs.softwareEngineer.type",
    descriptionKey: "landing.careers.jobs.softwareEngineer.description",
  },
  {
    id: "2",
    titleKey: "landing.careers.jobs.productManager.title",
    departmentKey: "landing.careers.jobs.productManager.department",
    locationKey: "landing.careers.jobs.productManager.location",
    typeKey: "landing.careers.jobs.productManager.type",
    descriptionKey: "landing.careers.jobs.productManager.description",
  },
  {
    id: "3",
    titleKey: "landing.careers.jobs.salesRepresentative.title",
    departmentKey: "landing.careers.jobs.salesRepresentative.department",
    locationKey: "landing.careers.jobs.salesRepresentative.location",
    typeKey: "landing.careers.jobs.salesRepresentative.type",
    descriptionKey: "landing.careers.jobs.salesRepresentative.description",
  },
]

export function CareersSection() {
  const { t } = useLanguage()

  return (
    <section id="careers" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">{t("landing.careers.title")}</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{t("landing.careers.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {jobs.map((job) => (
            <Card key={job.id} className="border shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {t(job.departmentKey)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {t(job.typeKey)}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{t(job.titleKey)}</CardTitle>
                <CardDescription className="text-sm leading-relaxed pt-2">{t(job.descriptionKey)}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{t(job.locationKey)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{t(job.typeKey)}</span>
                  </div>
                </div>
                <Link href={`/careers/${job.id}`}>
                  <Button className="w-full bg-transparent" variant="outline">
                    {t("landing.careers.viewDetails")}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{t("landing.careers.notFound")}</p>
          
        </div>
      </div>
    </section>
  )
}
