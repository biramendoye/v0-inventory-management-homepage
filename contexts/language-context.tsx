"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en" | "es" | "ar" | "pt" | "zh" | "bn" | "ru" | "ja" | "de"


type CurrencyConfig = {
  symbol: string
  code: string
  position: "before" | "after"
}

const currencyMap: Record<Language, CurrencyConfig> = {
  en: { symbol: "$", code: "USD", position: "before" },
  fr: { symbol: "€", code: "EUR", position: "after" },
  es: { symbol: "€", code: "EUR", position: "after" },
  ar: { symbol: "د.م.", code: "MAD", position: "after" },
  pt: { symbol: "€", code: "EUR", position: "after" },
  zh: { symbol: "¥", code: "CNY", position: "before" },
  bn: { symbol: "৳", code: "BDT", position: "before" },
  ru: { symbol: "₽", code: "RUB", position: "before" },
  ja: { symbol: "¥", code: "JPY", position: "before" },
  de: { symbol: "€", code: "EUR", position: "after" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  currency: CurrencyConfig
  formatPrice: (amount: number) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations: Record<Language, any> = {
  fr: require("../locales/fr.json"),
  en: require("../locales/en.json"),
  es: require("../locales/es.json"),
  ar: require("../locales/ar.json"),
  pt: require("../locales/pt.json"),
  zh: require("../locales/zh.json"),
  bn: require("../locales/bn.json"),
  ru: require("../locales/ru.json"),
  ja: require("../locales/ja.json"),
  de: require("../locales/de.json"),
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("fibem-language") as Language
    if (
      savedLanguage &&
      (savedLanguage === "fr" || savedLanguage === "en" || savedLanguage === "es" || savedLanguage === "ar" || savedLanguage === "pt" || savedLanguage === "zh" || savedLanguage === "bn" || savedLanguage === "ru" || savedLanguage === "ja" || savedLanguage === "de")
    ) {
      setLanguageState(savedLanguage)
    }
    setIsInitialized(true)
  }, [])

  const setLanguage = (lang: Language) => {
    console.log("[v0] Setting language to:", lang)
    setLanguageState(lang)
    localStorage.setItem("fibem-language", lang)
    // Update HTML lang attribute
    document.documentElement.lang = lang
    document.documentElement.dir = (lang === "ar" || lang === "bn") ? "rtl" : "ltr"
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to French if key not found in current language
        let fallbackValue = translations.fr
        for (const fallbackK of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fallbackK in fallbackValue) {
            fallbackValue = fallbackValue[fallbackK]
          } else {
            return key // Return key if not found in any language
          }
        }
        value = fallbackValue
        break
      }
    }

    if (typeof value !== "string") {
      return key
    }

    // Replace parameters in the translation
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
  }

  const formatPrice = (amount: number): string => {
    const config = currencyMap[language]
    const formattedAmount = amount.toFixed(2)

    if (config.position === "before") {
      return `${config.symbol}${formattedAmount}`
    } else {
      return `${formattedAmount} ${config.symbol}`
    }
  }

  if (!isInitialized) {
    return null
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currency: currencyMap[language],
        formatPrice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
