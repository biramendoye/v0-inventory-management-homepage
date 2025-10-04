"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("landing.contact.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("landing.contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("landing.contact.form.title")}</CardTitle>
              <CardDescription>{t("landing.contact.form.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("landing.contact.form.firstName")}</Label>
                    <Input id="firstName" placeholder={t("landing.contact.form.firstNamePlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("landing.contact.form.lastName")}</Label>
                    <Input id="lastName" placeholder={t("landing.contact.form.lastNamePlaceholder")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("landing.contact.form.email")}</Label>
                  <Input id="email" type="email" placeholder={t("landing.contact.form.emailPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t("landing.contact.form.company")}</Label>
                  <Input id="company" placeholder={t("landing.contact.form.companyPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("landing.contact.form.phone")}</Label>
                  <Input id="phone" type="tel" placeholder={t("landing.contact.form.phonePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("landing.contact.form.message")}</Label>
                  <Textarea id="message" placeholder={t("landing.contact.form.messagePlaceholder")} rows={4} />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {t("landing.contact.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t("landing.contact.info.title")}</CardTitle>
                <CardDescription>{t("landing.contact.info.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">{t("landing.contact.info.email.title")}</h4>
                    <p className="text-muted-foreground">{t("landing.contact.info.email.sales")}</p>
                    <p className="text-muted-foreground">{t("landing.contact.info.email.support")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">{t("landing.contact.info.phone.title")}</h4>
                    <p className="text-muted-foreground">{t("landing.contact.info.phone.main")}</p>
                    <p className="text-muted-foreground">{t("landing.contact.info.phone.secondary")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">{t("landing.contact.info.address.title")}</h4>
                    <p className="text-muted-foreground">
                      {t("landing.contact.info.address.line1")}
                      <br />
                      {t("landing.contact.info.address.line2")}
                      <br />
                      {t("landing.contact.info.address.line3")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">{t("landing.contact.info.hours.title")}</h4>
                    <p className="text-muted-foreground">{t("landing.contact.info.hours.weekdays")}</p>
                    <p className="text-muted-foreground">{t("landing.contact.info.hours.saturday")}</p>
                    <p className="text-muted-foreground">{t("landing.contact.info.hours.sunday")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("landing.contact.demo.title")}</CardTitle>
                <CardDescription>{t("landing.contact.demo.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{t("landing.contact.demo.details")}</p>
                <Button className="w-full bg-primary hover:bg-primary/90">{t("landing.contact.demo.button")}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
