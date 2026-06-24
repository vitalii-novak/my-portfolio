import type { Metadata } from "next";
import { ProjectsComingSoon } from "@/features/projects/ComingSoon";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title:       `Projects — ${site.name}`,
  description: `Carefully crafted case studies coming ${site.projectsLaunchDate}. Sign up to be notified when they go live.`,
  openGraph: {
    title:       `Projects — ${site.name}`,
    description: `Carefully crafted case studies coming ${site.projectsLaunchDate}.`,
    url:         `${site.url}/projects`,
  },
};

export default function Projects() {
  return <ProjectsComingSoon />;
}
