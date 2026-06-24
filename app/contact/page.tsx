import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title:       `Contact — ${site.name}`,
  description: "Have a project in mind? Get in touch — I read every message and reply within 24 hours.",
  openGraph: {
    title:       `Contact — ${site.name}`,
    description: "Have a project in mind? Get in touch — I read every message and reply within 24 hours.",
    url:         `${site.url}/contact`,
  },
};

export default function Contact() {
  return <ContactPage />;
}
