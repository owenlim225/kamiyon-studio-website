import type { PortableTextBlock } from "../types";

type LexicalTextNode = {
  type?: string;
  text?: string;
  format?: number;
};

type LexicalElementNode = {
  type?: string;
  tag?: string;
  children?: LexicalNode[];
};

type LexicalNode = LexicalTextNode | LexicalElementNode;

type LexicalRoot = {
  root?: {
    children?: LexicalNode[];
  };
};

const BOLD = 1;
const ITALIC = 2;

function isTextNode(node: LexicalNode): node is LexicalTextNode {
  return node.type === "text";
}

function mapTextNode(node: LexicalTextNode): PortableTextBlock["children"][number] {
  const marks: string[] = [];
  const format = node.format ?? 0;

  if (format & BOLD) {
    marks.push("strong");
  }

  if (format & ITALIC) {
    marks.push("em");
  }

  return {
    _type: "span",
    text: node.text ?? "",
    marks: marks.length > 0 ? marks : undefined,
  };
}

function mapElementNode(node: LexicalElementNode): PortableTextBlock | null {
  const children = (node.children ?? []).filter(isTextNode).map(mapTextNode);

  if (children.length === 0) {
    return null;
  }

  if (node.type === "heading") {
    const style = node.tag === "h3" ? "h3" : "h2";

    return {
      _type: "block",
      style,
      children,
    };
  }

  return {
    _type: "block",
    style: "normal",
    children,
  };
}

/** Maps Payload Lexical JSON to the portable-text subset rendered by `PortableText`. */
export function lexicalToPortableText(value: unknown): PortableTextBlock[] {
  if (!value || typeof value !== "object") {
    return [];
  }

  const root = (value as LexicalRoot).root;
  const nodes = root?.children ?? [];

  return nodes
    .map((node) => (isTextNode(node) ? null : mapElementNode(node)))
    .filter((block): block is PortableTextBlock => block !== null);
}
