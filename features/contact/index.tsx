import { ContactHero } from "./Hero";
import { ContactForm } from "./Form";
import { ContactInfo } from "./Info";

export function ContactPage() {
  return (
    <main>
      <ContactHero />
      <div
        style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px clamp(80px, 12vw, 140px)" }}
      >
        <div className="contact-grid">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
}
