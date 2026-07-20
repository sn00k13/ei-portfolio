import { prisma } from "@eui/db";
import { sanitizeContentHtml } from "@eui/shared/sanitize";
import { SiteNav } from "../src/components/nav";
import { Hero } from "../src/components/hero";
import { About } from "../src/components/about";
import { CyberSecuritySection } from "../src/components/cybersecurity-section";
import { Skills } from "../src/components/skills";
import { WebAppSection } from "../src/components/webapp-section";
import { QaSection } from "../src/components/qa-section";
import { PmSection } from "../src/components/pm-section";
import { VenturesSection } from "../src/components/ventures-section";
import { CertificationsSection } from "../src/components/certifications-section";
import { SpeakingSection } from "../src/components/speaking-section";
import { EventsSection } from "../src/components/events-section";
import { TestimonialsSection } from "../src/components/testimonials-section";
import { CaseStudiesSection } from "../src/components/case-studies-section";
import { BlogSection } from "../src/components/blog-section";
import { BookingSection } from "../src/components/booking-section";
import { ContactSection } from "../src/components/contact-section";
import { NewsletterSection } from "../src/components/newsletter-section";
import { Footer } from "../src/components/footer";

export const dynamic = "force-dynamic";

function readTime(content: string): string {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

export default async function HomePage() {
  const [
    siteContentRows,
    assessments,
    cyberTools,
    products,
    qaProducts,
    pmProjects,
    ventures,
    certifications,
    speakingCards,
    events,
    testimonials,
    caseStudies,
    blogPosts,
  ] = await Promise.all([
    prisma.siteContent.findMany(),
    prisma.assessment.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.cyberTool.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.product.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.qaProduct.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.pmProject.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.venture.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.certification.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.speakingCard.findMany({ where: { status: { not: "hidden" } }, orderBy: { displayOrder: "asc" } }),
    prisma.event.findMany({ orderBy: { dateStart: "desc" } }),
    prisma.testimonial.findMany({ where: { status: "active" }, orderBy: { displayOrder: "asc" } }),
    prisma.caseStudy.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.blogPost.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" } }),
  ]);

  const content = Object.fromEntries(siteContentRows.map((r) => [r.key, String(r.value ?? "")]));
  const heroTags = (content.hero_tags ?? "Cybersecurity, Founder, Builder, Educator, Instructor").split(",").map((t) => t.trim());

  return (
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <SiteNav />
      <Hero tags={heroTags} />
      <About pillars={content} />
      <CyberSecuritySection
        assessments={assessments.map((a) => ({
          id: Number(a.id),
          title: a.title,
          tag: a.tag,
          label: a.label,
          overview: a.overview ? sanitizeContentHtml(a.overview) : null,
          findings: a.findings,
          outcome: a.outcome,
          toolsUsed: a.toolsUsed,
          metrics: a.metrics as { outcomes?: { val: string; label: string }[] } | null,
        }))}
        tools={cyberTools.map((t) => ({
          id: Number(t.id),
          name: t.name,
          category: t.category,
          description: t.description,
          techStack: t.techStack,
          githubUrl: t.githubUrl,
        }))}
      />
      <Skills />
      <WebAppSection
        products={products.map((p) => ({
          id: Number(p.id),
          name: p.name,
          sector: p.sector,
          status: p.status,
          description: p.description,
          techStack: p.techStack,
          logoUrl: p.logoUrl,
          websiteUrl: p.websiteUrl,
        }))}
      />
      <QaSection
        products={qaProducts.map((p) => ({ id: Number(p.id), name: p.name, sector: p.sector, description: p.description }))}
      />
      <PmSection
        projects={pmProjects.map((p) => ({ id: Number(p.id), name: p.name, role: p.role, description: p.description }))}
      />
      <VenturesSection
        ventures={ventures.map((v) => ({
          id: Number(v.id),
          name: v.name,
          type: v.type,
          role: v.role,
          status: v.status,
          description: v.description,
          logoUrl: v.logoUrl,
          accentColor: v.accentColor,
          websiteUrl: v.websiteUrl,
        }))}
      />
      <CertificationsSection
        certifications={certifications.map((c) => ({ id: Number(c.id), name: c.name, issuer: c.issuer, dateEarned: c.dateEarned, group: c.group }))}
      />
      <SpeakingSection
        cards={speakingCards.map((c) => ({
          id: Number(c.id),
          title: c.title,
          type: c.type,
          datePeriod: c.datePeriod,
          location: c.location,
          organisation: c.organisation,
          myRole: c.myRole,
          shortDescription: c.shortDescription,
          fullDescription: c.fullDescription,
          status: c.status,
        }))}
      />
      <EventsSection
        events={events.map((e) => ({
          id: Number(e.id),
          name: e.name,
          type: e.type,
          status: e.status,
          dateStart: e.dateStart.toISOString(),
          dateEnd: e.dateEnd ? e.dateEnd.toISOString() : null,
          location: e.location,
          organisation: e.organisation,
          myRole: e.myRole,
          eventLink: e.eventLink,
          shortDescription: e.shortDescription,
          fullDescription: e.fullDescription,
        }))}
      />
      <TestimonialsSection
        testimonials={testimonials.map((t) => ({ id: Number(t.id), quote: t.quote, name: t.name, role: t.role, avatar: t.avatar }))}
      />
      <CaseStudiesSection
        caseStudies={caseStudies.map((c) => ({
          id: Number(c.id),
          title: c.title,
          tag: c.tag,
          label: c.label,
          challenge: c.challenge,
          results: c.results,
          techStack: c.techStack,
          fullDetails: c.fullDetails ? sanitizeContentHtml(c.fullDetails) : null,
          outcomes: c.outcomes as { val: string; label: string }[] | null,
        }))}
      />
      <BlogSection
        posts={blogPosts.map((p) => ({
          id: Number(p.id),
          slug: p.slug,
          title: p.title,
          category: p.category,
          coverImage: p.coverImage,
          excerpt: p.excerpt,
          publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
          readTime: readTime(p.content),
        }))}
      />
      <BookingSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}
