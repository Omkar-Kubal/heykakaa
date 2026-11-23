import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | HeyKakaa",
  description: "How the HeyKakaa website handles optional analytics and contact form messages.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const formConfigured = Boolean(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim());

  return (
    <div className="relative min-h-svh">
      <SiteHeader />
      <main className="hk-page hk-legal-page" id="main-content">
        <article>
          <p className="hk-eyebrow">HeyKakaa</p>
          <h1>Privacy policy</h1>
          <p className="hk-legal-updated">Last updated 23 November 2026</p>
          <p>
            This policy covers the heykakaa.com website. The Android apps have separate privacy policies linked below;
            those policies continue to govern data handled inside each app.
          </p>

          <h2>Who is responsible</h2>
          <p>
            HeyKakaa is run by Kaka, an independent Android app developer. For questions or requests about this website’s
            data, email <a href="mailto:omkarkubal@protonmail.com">omkarkubal@protonmail.com</a>.
          </p>

          <h2>Optional analytics</h2>
          <p>
            Google Analytics through Firebase is off until you choose “Accept analytics” in the site notice. If you reject
            or make no choice, this website does not initialize Firebase Analytics. You can change your choice from
            “Cookie settings” in the footer.
          </p>
          <p>
            If you accept, the website measures page views, Google Play link clicks, and successful contact form submissions.
            The events include the page path and, for a Play click, the app name and button placement. The contact form’s
            name, email address, and message are not sent as Analytics event parameters. Google may process technical and
            usage information under its own privacy terms. The connected Analytics property is intended to use a 14-month
            event retention setting; the active property setting controls the actual retention period.
          </p>

          <h2>Contact messages</h2>
          <p>
            When the contact form is connected, the name, email address, and message you enter are sent to Formspree so the
            message can be delivered to the Proton Mail address above. Formspree processes the submission and its related
            technical information under its own privacy terms and service settings. A copy may remain in the email inbox
            after delivery. Do not include passwords, payment details, or other sensitive information in a message.
          </p>
          <p>
            {formConfigured
              ? "The contact form is active. You can also contact Kaka directly at the email address above. A deletion or privacy request can be sent to that address."
              : "The contact form is not active until its Formspree endpoint and recipient have been configured. You can contact Kaka directly at the email address above. A deletion or privacy request can be sent to that address."}
          </p>

          <h2>Cookies and browser storage</h2>
          <p>
            This website stores your analytics choice in browser local storage so it can remember whether you accepted or
            rejected analytics. Firebase Analytics may use cookies or similar storage after you accept. Rejecting analytics
            prevents Firebase Analytics from being initialized by this website.
          </p>

          <h2>Third-party links</h2>
          <p>
            The website links to Google Play, Instagram, Google Analytics, Formspree, and the separate app policies below.
            Those services handle information according to their own policies when you visit or use them.
          </p>
          <ul>
            <li><a href="https://sites.google.com/view/sync-spend?usp=sharing" target="_blank" rel="noopener noreferrer">SyncSpend app privacy policy</a></li>
            <li><a href="https://sites.google.com/view/synctask/home" target="_blank" rel="noopener noreferrer">SyncTasks app privacy policy</a></li>
            <li><a href="https://sites.google.com/view/syncfocusprivacypolicy" target="_blank" rel="noopener noreferrer">Sync Focus app privacy policy</a></li>
          </ul>

          <h2>Changes</h2>
          <p>
            This policy may be updated when the website’s data practices change. The date at the top indicates the latest
            revision.
          </p>
          <p className="hk-legal-callout">
            This policy is a working draft. Confirm the Google Analytics retention setting, Formspree configuration, and
            final legal wording before publishing it.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
