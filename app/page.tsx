import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { homepageWebPageSchema } from "@/lib/structured-data";
import { siteConfig, homeTitle, homeDescription, homeUrl } from "@/lib/constants";
import { HeroSection } from "@/components/home/hero-section";
import { SolutionsSection } from "@/components/home/solutions-section";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { EvaluationSection } from "@/components/home/evaluation-section";
import { FaqSection } from "@/components/home/faq-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { CtaSection } from "@/components/home/cta-section";

// title.absolute ignora o title.template do layout (`%s | ${siteConfig.name}`)
// — sem isto, o template duplicaria o nome do site no <title> da homepage.
export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: {
    canonical: homeUrl,
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: homeUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageWebPageSchema()} />
      <HeroSection />
      <SolutionsSection />
      <ValuePropositionSection />
      <ProcessSection />
      <ServicesSection />
      <EvaluationSection />
      <FaqSection />
      <BenefitsSection />
      <CtaSection />
    </>
  );
}
