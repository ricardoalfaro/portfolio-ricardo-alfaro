import { siteContent } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function About() {
  const { about } = siteContent;

  return (
    <section className="section about" id="about" aria-labelledby="bio-title">
      <div className="section-label">{about.eyebrow}</div>
      <div className="about-copy">
        <SplitHeading id="bio-title" lead={about.title.lead} strong={about.title.strong} />
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
