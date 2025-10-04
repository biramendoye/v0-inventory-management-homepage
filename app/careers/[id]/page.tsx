"use client"

import type React from "react"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Briefcase, DollarSign, Users, ArrowLeft, Upload, FileText, X, Eye, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const jobsData = {
  "1": {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Paris, France / Remote",
    type: "Full-time",
    description:
      "Join our engineering team to build scalable inventory management solutions using modern technologies.",
    salary: "$80,000 - $120,000",
    experience: "5+ years",
    posted: "Posted 2 days ago",
    responsibilities: [
      "Design and develop new features for our inventory management platform",
      "Write clean, maintainable, and well-tested code",
      "Collaborate with product managers and designers to deliver exceptional user experiences",
      "Mentor junior engineers and contribute to technical documentation",
      "Participate in code reviews and architectural discussions",
    ],
    requirements: [
      "5+ years of experience in software development",
      "Strong proficiency in React, TypeScript, and Node.js",
      "Experience with modern web technologies and cloud platforms",
      "Excellent problem-solving and communication skills",
      "Bachelor's degree in Computer Science or related field",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Flexible remote work options",
      "Health insurance and wellness programs",
      "Professional development budget",
      "25 days paid vacation",
    ],
  },
  "2": {
    title: "Product Manager",
    department: "Product",
    location: "Paris, France",
    type: "Full-time",
    description:
      "Lead product strategy and development for our inventory management platform, working closely with customers and stakeholders.",
    salary: "$90,000 - $130,000",
    experience: "3-5 years",
    posted: "Posted 1 week ago",
    responsibilities: [
      "Define product vision and roadmap based on market research and customer feedback",
      "Work with engineering teams to prioritize features and deliver value",
      "Conduct user research and analyze product metrics",
      "Collaborate with sales and marketing teams on go-to-market strategies",
      "Present product updates to stakeholders and customers",
    ],
    requirements: [
      "3-5 years of product management experience in B2B SaaS",
      "Strong analytical and data-driven decision-making skills",
      "Excellent communication and stakeholder management abilities",
      "Experience with inventory or supply chain management is a plus",
      "MBA or relevant advanced degree preferred",
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Stock options",
      "Comprehensive health benefits",
      "Learning and development opportunities",
      "Modern office in central Paris",
    ],
  },
  "3": {
    title: "Sales Representative",
    department: "Sales",
    location: "Remote (US/Europe)",
    type: "Full-time",
    description:
      "Drive revenue growth by identifying and closing new business opportunities with small to medium-sized businesses.",
    salary: "$60,000 - $90,000 + Commission",
    experience: "2-4 years",
    posted: "Posted 3 days ago",
    responsibilities: [
      "Identify and qualify new sales opportunities through outbound prospecting",
      "Conduct product demonstrations and presentations to potential customers",
      "Build and maintain strong relationships with clients",
      "Negotiate contracts and close deals to meet sales targets",
      "Collaborate with marketing and customer success teams",
    ],
    requirements: [
      "2-4 years of B2B sales experience, preferably in SaaS",
      "Proven track record of meeting or exceeding sales quotas",
      "Strong presentation and negotiation skills",
      "Self-motivated with excellent time management",
      "Experience with CRM tools (Salesforce, HubSpot, etc.)",
    ],
    benefits: [
      "Base salary plus uncapped commission",
      "Remote work flexibility",
      "Health and dental insurance",
      "Sales training and career advancement",
      "Annual team retreats",
    ],
  },
}

export default function JobDetailPage() {
  const params = useParams()
  const { t } = useLanguage()
  const { toast } = useToast()
  const jobId = params.id as string
  const job = jobsData[jobId as keyof typeof jobsData]

  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setIsUploading(true)

      // Simulate 2-second loading
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setResumeFile(file)
      setIsUploading(false)

      // Show success toast
      toast({
        title: t("landing.careers.application.uploadSuccess"),
        description: t("landing.careers.application.uploadSuccessDescription"),
      })
    } else {
      alert(t("landing.careers.application.invalidFile"))
    }
  }

  const handleViewResume = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile)
      window.open(url, "_blank")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!resumeFile) {
      alert(t("landing.careers.application.resumeRequired"))
      return
    }
    console.log("[v0] Application submitted with resume:", resumeFile.name)
    alert(t("landing.careers.application.success"))
    setIsApplicationOpen(false)
    setResumeFile(null)
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{t("landing.careers.jobNotFound")}</h1>
            <Link href="/careers">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("landing.careers.backToJobs")}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("landing.careers.backToJobs")}
          </Link>

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{job.department}</Badge>
                <Badge variant="outline">{job.type}</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
              <p className="text-lg text-muted-foreground">{job.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("landing.careers.details.location")}</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("landing.careers.details.type")}</p>
                      <p className="font-medium">{job.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("landing.careers.details.salary")}</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("landing.careers.details.experience")}</p>
                      <p className="font-medium">{job.experience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("landing.careers.details.responsibilities")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("landing.careers.details.requirements")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("landing.careers.details.benefits")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{t("landing.careers.details.applyTitle")}</h3>
                    <p className="text-sm text-muted-foreground">{t("landing.careers.details.applyDescription")}</p>
                  </div>
                  <Button size="lg" className="shrink-0" onClick={() => setIsApplicationOpen(true)}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    {t("landing.careers.details.applyNow")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>{t("landing.careers.application.title")}</DialogTitle>
            <DialogDescription>{t("landing.careers.application.description")}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 px-6 pb-4 space-y-4">
              <div className="space-y-3">
                <Label htmlFor="resume" className="text-base font-semibold">
                  {t("landing.careers.application.resume")}
                </Label>
                <div className="flex flex-col gap-3">
                  <Input id="resume" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("resume")?.click()}
                    className="w-full h-12"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {t("landing.careers.application.uploading")}
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-2" />
                        {resumeFile
                          ? t("landing.careers.application.changeResume")
                          : t("landing.careers.application.uploadResume")}
                      </>
                    )}
                  </Button>

                  {resumeFile && (
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{resumeFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleViewResume}
                          className="shrink-0 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {t("landing.careers.application.viewResume")}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setResumeFile(null)}
                          className="shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="px-6 py-4 border-t bg-muted/30">
              <Button type="button" variant="outline" onClick={() => setIsApplicationOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button type="submit" disabled={!resumeFile}>
                {t("landing.careers.application.submit")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
