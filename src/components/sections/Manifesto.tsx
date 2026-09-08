import { siteContent } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function Manifesto() {
  const { manifesto } = siteContent;

  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <span>Visión</span>
      <SplitHeading id="manifesto-title" lead={manifesto.title.lead} strong={manifesto.title.strong} />
      <p>{manifesto.text}</p>
    </section>
  );
}
