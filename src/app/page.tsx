import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { WorkSection } from "@/components/work-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <WorkSection />
      <Footer />
    </main>
  );
}
