import { siteContent } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function Capabilities() {
  const { capabilities } = siteContent.whatIDo;

  return (
    <section className="section capabilities" aria-labelledby="capabilities-title">
      <div className="section-heading">
        <span>Capabilities</span>
        <SplitHeading id="capabilities-title" lead="Dónde puedo aportar" strong="criterio y ejecución." />
      </div>
      <div className="capability-grid">
        {capabilities.map((item, index) => (
          <article className="capability-card" key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
