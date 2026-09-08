import type { Metadata } from "next";
import { getAllCases } from "@/lib/cases";
import CaseList from "@/components/CaseList";
import SplitHeading from "@/components/SplitHeading";

export const metadata: Metadata = {
  title: "Casos",
  description: "Casos de producto, pagos, seguros y estrategia fintech liderados por Ricardo Alfaro.",
};

export default function CasosPage() {
  const cases = getAllCases();
  const tags = ["Todos", ...Array.from(new Set(cases.map((item) => item.tag)))];

  return (
    <>
      <div className="blog-header">
        <div className="section-label">Casos</div>
        <SplitHeading
          as="h1"
          lead="Casos donde estrategia, producto"
          strong="y tecnología se encuentran."
        />
      </div>
      <div className="blog-list">
        <CaseList cases={cases} tags={tags} />
      </div>
    </>
  );
}
