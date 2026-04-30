import { About } from "./components/About";
import { BackgroundFX } from "./components/BackgroundFX";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { StructuredData } from "./components/StructuredData";

export default function Page() {
  return (
    <>
      <StructuredData />
      <BackgroundFX />
      <Nav />

      <main className="relative">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
    </>
  );
}

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-[var(--color-line-strong)] to-transparent"
    />
  );
}
