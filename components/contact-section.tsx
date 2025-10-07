"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { COUNTRIES, getPhonePrefixByCountry } from "@/lib/utils/country-codes";

export function ContactSection() {
  const { t } = useLanguage();
  const [selectedCountryCode, setSelectedCountryCode] = useState("FR");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fullPhoneNumber = `${getPhonePrefixByCountry(selectedCountryCode)} ${phoneNumber}`;
      console.log("Contact form submitted:", {
        ...formData,
        phone: fullPhoneNumber,
        countryCode: selectedCountryCode,
      });

      setSubmitMessage(
        t("landing.contact.form.success") || "Message sent successfully!",
      );

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setPhoneNumber("");
      setSelectedCountryCode("FR");
    } catch (error) {
      setSubmitMessage(
        t("landing.contact.form.error") ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("landing.contact.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("landing.contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("landing.contact.form.title")}</CardTitle>
              <CardDescription>
                {t("landing.contact.form.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">{t("landing.contact.form.name")}</Label>
                  <Input
                    id="name"
                    placeholder={t("landing.contact.form.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("landing.contact.form.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("landing.contact.form.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t("landing.contact.form.phone")}
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={selectedCountryCode}
                      onValueChange={setSelectedCountryCode}
                    >
                      <SelectTrigger className="min-w-[140px] h-10">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {
                                COUNTRIES.find(
                                  (c) => c.code === selectedCountryCode,
                                )?.flag
                              }
                            </span>
                            <span className="font-mono text-sm">
                              {getPhonePrefixByCountry(selectedCountryCode)}
                            </span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{country.flag}</span>
                              <span className="font-mono text-sm">
                                {country.phonePrefix}
                              </span>
                              <span className="text-sm">{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t("landing.contact.form.phonePlaceholder")}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1"
                      required
                    />
                  </div>
                  {phoneNumber && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="font-mono">
                        {getPhonePrefixByCountry(selectedCountryCode)}{" "}
                        {phoneNumber}
                      </span>
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    {t("landing.contact.form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t("landing.contact.form.messagePlaceholder")}
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#00A6D6] hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-lg font-medium"
                >
                  {isSubmitting
                    ? t("landing.contact.form.submitting") || "Sending..."
                    : t("landing.contact.form.submit")}
                </Button>
                {submitMessage && (
                  <div
                    className={`text-center text-sm p-3 rounded-md ${
                      submitMessage.includes("success") ||
                      submitMessage.includes("succès")
                        ? "bg-[#FFD700]/20 text-black border border-[#FFD700] font-medium"
                        : "bg-[#FF0000]/10 text-[#FF0000] border border-[#FF0000] font-medium"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <div className="flex items-center justify-center">
            <Card className="w-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/20">
                  <MessageCircle className="h-10 w-10 text-[#00A6D6]" />
                </div>
                <CardTitle className="text-2xl">
                  {t("landing.contact.whatsapp.title")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("landing.contact.whatsapp.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  {t("landing.contact.whatsapp.details")}
                </p>
                <Button
                  className="w-full bg-[#00A6D6] hover:bg-[#FFD700] hover:text-black text-white text-lg py-6 transition-all duration-300 shadow-lg font-medium"
                  onClick={() =>
                    window.open("https://wa.me/33605511432", "_blank")
                  }
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t("landing.contact.whatsapp.button")}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  {t("landing.contact.whatsapp.availability")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
