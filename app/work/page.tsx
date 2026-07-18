import type { Metadata } from "next";
import Providers from "@/components/Providers";
import SubHeader from "@/components/SubHeader";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work & Projects",
  description: `Web apps, games and client projects built by ${SITE.name} — React, React Native, Next.js, TypeScript and Firebase.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Providers loader={false}>
      <main>
        <SubHeader />
        <Projects />
        <Footer />
      </main>
    </Providers>
  );
}
