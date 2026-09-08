import Link from "next/link";
import { siteContent } from "@/lib/content";
import { getAllCases } from "@/lib/cases";
import CaseList from "@/components/CaseList";
import SplitHeading from "@/components/SplitHeading";

export default function CasesTeaser() {
  const { casesTeaser } = siteContent;
  const cases = getAllCases().slice(0, 5);
  const tags = ["Todos", ...Array.from(new Set(cases.map((item) => item.tag)))];

  return (
    <section className="section work" id="casos" aria-labelledby="cases-title">
      <div className="section-heading">
        <span>{casesTeaser.eyebrow}</span>
        <SplitHeading id="cases-title" lead={casesTeaser.title.lead} strong={casesTeaser.title.strong} />
      </div>
      <CaseList cases={cases} tags={tags} />
      <p style={{ marginTop: 28 }}>
        <Link className="button button-dark" href="/casos">
          Ver todos los casos
        </Link>
      </p>
    </section>
  );
}
