type SplitHeadingProps = {
  lead: string;
  strong: string;
  as?: "h1" | "h2";
  id?: string;
};

export default function SplitHeading({ lead, strong, as = "h2", id }: SplitHeadingProps) {
  const Tag = as;
  return (
    <Tag id={id}>
      <span className="split-lead">{lead}</span> {strong}
    </Tag>
  );
}
