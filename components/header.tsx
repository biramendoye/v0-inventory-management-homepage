"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Menu, Languages, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: t("landing.header.home"), href: "/" },
    { name: t("landing.header.features"), href: "/#features" },
    { name: t("landing.header.pricing"), href: "/#pricing" },
    { name: t("landing.header.careers"), href: "/#careers" },
    { name: t("landing.header.contact"), href: "/#contact" },
  ];

  const languageFlags = {
    fr: "🇫🇷",
    en: "🇬🇧",
    es: "🇪🇸",
    ar: "🇸🇦",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#00A6D6] backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between overflow-visible">
          <Link
            href="/"
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/fibem-logo.jpg"
              alt="FIBEM Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="font-playfair text-xl font-bold text-white tracking-wide">
              Gestion De Stock
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-white/90 hover:text-primary transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-white/10 hover:shadow-sm group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full"></span>
              </a>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-white hover:bg-primary/20 hover:text-primary transition-all duration-300"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setButtonPosition({
                  top: rect.bottom + window.scrollY,
                  right: window.innerWidth - rect.right,
                });
                setShowLanguageDropdown(!showLanguageDropdown);
              }}
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm">{languageFlags[language]}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>

            {mounted &&
              showLanguageDropdown &&
              createPortal(
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLanguageDropdown(false)}
                  />
                  <div
                    className="fixed z-50 bg-white border border-gray-200 shadow-xl min-w-[160px] rounded-md py-1"
                    style={{
                      top: `${buttonPosition.top}px`,
                      right: `${buttonPosition.right}px`,
                    }}
                  >
                    <button
                      onClick={() => {
                        setLanguage("fr");
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center ${language === "fr" ? "bg-blue-50" : ""}`}
                    >
                      <span className="mr-2">🇫🇷</span>
                      Français
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center ${language === "en" ? "bg-blue-50" : ""}`}
                    >
                      <span className="mr-2">🇬🇧</span>
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("es");
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center ${language === "es" ? "bg-blue-50" : ""}`}
                    >
                      <span className="mr-2">🇪🇸</span>
                      Español
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("ar");
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center ${language === "ar" ? "bg-blue-50" : ""}`}
                    >
                      <span className="mr-2">🇸🇦</span>
                      العربية
                    </button>
                  </div>
                </>,
                document.body,
              )}

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-[#00A6D6] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  {t("landing.header.dashboard")}
                </Button>
              </Link>
              <Link href="/connexion">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-white text-[#00A6D6] hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {t("landing.header.login")}
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-primary/20 hover:text-primary transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">
                  {t("landing.header.toggleMenu")}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 px-3 py-2 rounded-md hover:bg-primary/10"
                  >
                    {item.name}
                  </a>
                ))}

                <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                  <Button
                    variant={language === "fr" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("fr")}
                  >
                    🇫🇷 Français
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                  >
                    🇬🇧 English
                  </Button>
                  <Button
                    variant={language === "es" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("es")}
                  >
                    🇪🇸 Español
                  </Button>
                  <Button
                    variant={language === "ar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("ar")}
                  >
                    🇸🇦 العربية
                  </Button>
                </div>

                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit bg-transparent"
                  >
                    {t("landing.header.dashboard")}
                  </Button>
                </Link>
                <Link href="/connexion">
                  <Button variant="default" size="sm" className="w-fit">
                    {t("landing.header.login")}
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
