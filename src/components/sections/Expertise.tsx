import { siteContent } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function Expertise() {
  return (
    <section className="section expertise" aria-labelledby="expertise-title">
      <div className="section-heading">
        <span>Expertise</span>
        <SplitHeading id="expertise-title" lead="Profundidad fintech aplicada" strong="a decisiones de producto." />
      </div>
      <div className="expertise-list">
        {siteContent.expertise.map((item) => (
          <article className="expertise-row" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
