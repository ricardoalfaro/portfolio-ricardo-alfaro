import { siteContent } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <span>Experiencia destacada</span>
        <SplitHeading id="work-title" lead="Casos donde estrategia, producto" strong="y tecnología se encuentran." />
      </div>
      <div className="case-grid">
        {siteContent.cases.map((item, index) => (
          <article className="case-card" key={item.title}>
            <div className="case-index">0{index + 1}</div>
            <div className="case-copy">
              <p className="case-context">{item.context}</p>
              <h3>{item.title}</h3>
              <dl>
                <div>
                  <dt>Problema</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>Rol</dt>
                  <dd>{item.role}</dd>
                </div>
                <div>
                  <dt>Qué lideré</dt>
                  <dd>{item.led}</dd>
                </div>
                <div>
                  <dt>Impacto</dt>
                  <dd>{item.impact}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
