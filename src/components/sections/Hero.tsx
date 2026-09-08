import { siteContent } from "@/lib/content";
import AsciiField from "@/components/AsciiField";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <AsciiField cols={72} rows={26} />
      </div>
      <div className="hero-content">
        <p className="hero-kicker">{hero.kicker}</p>
        <h1 id="hero-title">
          <span className="split-lead">{hero.headline.lead}</span> {hero.headline.strong}
        </h1>
        <div className="hero-actions" aria-label="Acciones principales">
          <a className="button button-dark button-scroll" href="#work">
            <span className="button-scroll-label">Ver experiencia</span>
            <span className="button-scroll-icon" aria-hidden="true">
              <span className="button-scroll-icon-inner">↓</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
