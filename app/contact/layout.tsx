import { Header, Footer } from "@/features/shared";
import { ContactBackground } from "@/features/contact/Background";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        Root stacking order:
          zIndex 100 — Header   (position:fixed, above everything)
          zIndex   3 — content  (visually above symbols; pointer-events passed
                                 through structural elements via .contact-passthrough,
                                 re-enabled only on a / button / input / textarea / label)
          zIndex   2 — symbols  (ContactBackground; container pointer-events:none,
                                 individual symbols pointer-events:auto → clickable
                                 wherever no interactive content sits above them)
      */}
      <ContactBackground />
      <Header />

      <div className="contact-passthrough" style={{ position: "relative", zIndex: 3 }}>
        {children}
        <Footer />
      </div>
    </>
  );
}
