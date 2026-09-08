import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Capabilities from "@/components/sections/Capabilities";
import CasesTeaser from "@/components/sections/CasesTeaser";
import IdeasTeaser from "@/components/sections/IdeasTeaser";
import Manifesto from "@/components/sections/Manifesto";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="page-sections">
        <About />
        <Capabilities />
        <CasesTeaser />
        <IdeasTeaser />
        <Manifesto />
      </div>
    </>
  );
}
