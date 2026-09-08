import { siteContent } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function Capabilities() {
  const { capabilities } = siteContent;

  return (
    <section className="section capabilities" id="capacidades" aria-labelledby="capabilities-title">
      <div className="section-heading">
        <span>{capabilities.eyebrow}</span>
        <SplitHeading id="capabilities-title" lead={capabilities.title.lead} strong={capabilities.title.strong} />
      </div>
      <div className="capability-grid">
        {capabilities.items.map((item, index) => (
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
