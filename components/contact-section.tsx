"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle } from "lucide-react"
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
                <div className="space-y-2">
                  <Label htmlFor="name">{t("landing.contact.form.name")}</Label>
                  <Input id="name" placeholder={t("landing.contact.form.namePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("landing.contact.form.email")}</Label>
                  <Input id="email" type="email" placeholder={t("landing.contact.form.emailPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("landing.contact.form.phone")}</Label>
                  <Input id="phone" type="tel" placeholder={t("landing.contact.form.phonePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("landing.contact.form.message")}</Label>
                  <Textarea id="message" placeholder={t("landing.contact.form.messagePlaceholder")} rows={5} />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {t("landing.contact.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <div className="flex items-center justify-center">
            <Card className="w-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <MessageCircle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl">{t("landing.contact.whatsapp.title")}</CardTitle>
                <CardDescription className="text-base">{t("landing.contact.whatsapp.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">{t("landing.contact.whatsapp.details")}</p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                  onClick={() => window.open("https://wa.me/212600000000", "_blank")}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t("landing.contact.whatsapp.button")}
                </Button>
                <p className="text-center text-sm text-muted-foreground">{t("landing.contact.whatsapp.availability")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
