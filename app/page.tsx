import { Header, Footer } from "@/features/shared";
import { Hero } from "@/features/home/Hero";
import { Stats } from "@/features/home/Stats";
// import { FeaturedProjects } from "@/features/home/FeaturedProjects";
// import { Principles } from "@/features/home/Principles";
import { Skills } from "@/features/home/Skills";
import { Timeline } from "@/features/home/Timeline";
import { Process } from "@/features/home/Process";
import { Testimonials } from "@/features/home/Testimonials";
// import { LatestPosts } from "@/features/home/LatestPosts";
// import { ContactCTA } from "@/features/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        {/* <FeaturedProjects /> */}
        {/* <Principles /> */}
        <Skills />
        <Timeline />
        <Process />
        <Testimonials />
        {/* <LatestPosts /> */}
        {/* <ContactCTA /> */}
      </main>
      <Footer />
    </>
  );
}
