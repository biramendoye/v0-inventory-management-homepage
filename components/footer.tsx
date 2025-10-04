"use client"

import { Package, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    product: [
      { name: t("landing.footer.product.features"), href: "#features" },
      { name: t("landing.footer.product.pricing"), href: "#pricing" },
      { name: t("landing.footer.product.integrations"), href: "#integrations" },
      { name: t("landing.footer.product.api"), href: "#api" },
    ],
    company: [
      { name: t("landing.footer.company.about"), href: "#about" },
      { name: t("landing.footer.company.careers"), href: "#careers" },
      { name: t("landing.footer.company.blog"), href: "#blog" },
      { name: t("landing.footer.company.press"), href: "#press" },
    ],
    support: [
      { name: t("landing.footer.support.helpCenter"), href: "#help" },
      { name: t("landing.footer.support.documentation"), href: "#docs" },
      { name: t("landing.footer.support.contact"), href: "#support" },
      { name: t("landing.footer.support.status"), href: "#status" },
    ],
    legal: [
      { name: t("landing.footer.legal.privacy"), href: "#privacy" },
      { name: t("landing.footer.legal.terms"), href: "#terms" },
      { name: t("landing.footer.legal.cookies"), href: "#cookies" },
      { name: t("landing.footer.legal.gdpr"), href: "#gdpr" },
    ],
  }

  return (
    <footer className="bg-[#00A6D6] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Package className="h-5 w-5 text-[#00A6D6]" />
              </div>
              <span className="text-xl font-bold">FIBEM</span>
            </div>

            <p className="text-white/90 text-pretty max-w-md">{t("landing.footer.description")}</p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-white" />
                <span>{t("landing.footer.address")}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-white" />
                <span>{t("landing.footer.email")}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-white" />
                <span>{t("landing.footer.phone")}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t("landing.footer.product.title")}</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("landing.footer.company.title")}</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("landing.footer.support.title")}</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <p className="text-sm text-white/80">{t("landing.footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
