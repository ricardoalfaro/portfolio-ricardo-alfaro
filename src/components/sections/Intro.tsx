import { siteContent } from "@/lib/content";

export default function Intro() {
  const { whatIDo } = siteContent;

  return (
    <section className="section intro" id="about" aria-labelledby="about-title">
      <div className="section-label">{whatIDo.eyebrow}</div>
      <div className="intro-copy">
        <h2 id="about-title">{whatIDo.title}</h2>
        <p>{whatIDo.text}</p>
      </div>
    </section>
  );
}
