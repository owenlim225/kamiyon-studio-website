import type { ReactNode } from "react";
import type { PortableTextBlock } from "@/lib/cms/types";

type BlockTag = "h1" | "h2" | "h3" | "h4" | "p" | "blockquote";

const STYLE_TO_TAG: Record<string, BlockTag> = {
  normal: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  blockquote: "blockquote",
};

function renderSpan(
  span: PortableTextBlock["children"][number],
  key: number
): ReactNode {
  const marks = span.marks ?? [];
  let content: ReactNode = span.text;

  if (marks.includes("strong")) {
    content = <strong>{content}</strong>;
  }

  if (marks.includes("em")) {
    content = <em>{content}</em>;
  }

  return <span key={key}>{content}</span>;
}

type PortableTextProps = {
  blocks: PortableTextBlock[];
};

/** Minimal renderer for the subset of portable text used in service/community body copy. */
export function PortableText({ blocks }: PortableTextProps) {
  return (
    <div className="space-y-4 text-base text-[var(--text-secondary)]">
      {blocks.map((block, index) => {
        const Tag = STYLE_TO_TAG[block.style ?? "normal"] ?? "p";
        const isHeading = Tag !== "p" && Tag !== "blockquote";

        return (
          <Tag
            key={index}
            className={
              isHeading
                ? "font-display font-semibold text-[var(--text-primary)]"
                : undefined
            }
          >
            {block.children.map((span, spanIndex) => renderSpan(span, spanIndex))}
          </Tag>
        );
      })}
    </div>
  );
}
