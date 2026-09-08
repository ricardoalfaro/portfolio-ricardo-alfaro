import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Capabilities from "@/components/sections/Capabilities";
import Expertise from "@/components/sections/Expertise";
import Work from "@/components/sections/Work";
import IdeasTeaser from "@/components/sections/IdeasTeaser";
import Manifesto from "@/components/sections/Manifesto";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="page-sections">
        <Intro />
        <Capabilities />
        <Expertise />
        <Work />
        <IdeasTeaser />
        <Manifesto />
        <About />
        <Contact />
      </div>
    </>
  );
}
