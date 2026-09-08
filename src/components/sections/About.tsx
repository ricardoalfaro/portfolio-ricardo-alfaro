import { siteContent } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function About() {
  const { about } = siteContent;

  return (
    <section className="section about" aria-labelledby="bio-title">
      <div className="section-label">Sobre mí</div>
      <div className="about-copy">
        <SplitHeading id="bio-title" lead={about.title.lead} strong={about.title.strong} />
        <p>{about.text}</p>
        <p>{about.note}</p>
      </div>
    </section>
  );
}
