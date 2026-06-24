import { Header, Footer } from "@/features/shared";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
        <Footer />
      </div>
    </>
  );
}
