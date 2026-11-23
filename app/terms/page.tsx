import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Use | HeyKakaa",
  description: "Terms for using the HeyKakaa website and its content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="relative min-h-svh">
      <SiteHeader />
      <main className="hk-page hk-legal-page" id="main-content">
        <article>
          <p className="hk-eyebrow">HeyKakaa</p>
          <h1>Terms of use</h1>
          <p className="hk-legal-updated">Last updated 23 November 2026</p>
          <p>
            These terms apply to the heykakaa.com website and its written, visual, and downloadable website content.
            Separate terms may apply to an Android app or a third-party service linked from this site.
          </p>

          <h2>Using this website</h2>
          <p>
            You may browse and share links to the site. Do not disrupt the site, misuse its contact form, or use its content
            in a way that violates another person’s rights or applicable law.
          </p>

          <h2>Content and app information</h2>
          <p>
            HeyKakaa owns the site’s original text, design, and graphics unless a different owner is identified. App names,
            marks, and third-party materials remain with their respective owners. App details and build updates are provided
            for general information and may change over time.
          </p>
          <p>
            Google Play, Instagram, Formspree, and other external services are operated by their own providers. Their terms
            and privacy policies apply when you use those services. These website terms do not replace an app’s separate
            terms or privacy policy.
          </p>

          <h2>No warranty</h2>
          <p>
            The website and its content are provided as available. To the extent permitted by law, HeyKakaa makes no
            warranty that the site will always be available, error-free, or suitable for a particular purpose.
          </p>

          <h2>Limits of liability</h2>
          <p>
            To the extent permitted by applicable law, HeyKakaa is not responsible for indirect or consequential losses
            arising from use of this website or reliance on its content. Nothing in these terms limits a right or liability
            that cannot legally be limited.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India. Courts with jurisdiction in India will hear disputes relating to
            these terms, subject to any mandatory rights that apply where you live.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href="mailto:omkarkubal@protonmail.com">omkarkubal@protonmail.com</a>.
          </p>
          <p className="hk-legal-callout">
            This page is a working draft. Review the final terms for your circumstances before publishing.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
