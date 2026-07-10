import { describe, expect, it } from "vitest";

import { lexicalToPortableText } from "./lexical";

describe("lexicalToPortableText", () => {
  it("returns an empty array for invalid input", () => {
    expect(lexicalToPortableText(null)).toEqual([]);
    expect(lexicalToPortableText(undefined)).toEqual([]);
  });

  it("maps paragraphs and headings to the portable-text subset", () => {
    const blocks = lexicalToPortableText({
      root: {
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", text: "Intro copy" }],
          },
          {
            type: "heading",
            tag: "h2",
            children: [{ type: "text", text: "Section title", format: 1 }],
          },
        ],
      },
    });

    expect(blocks).toEqual([
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Intro copy" }],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Section title", marks: ["strong"] }],
      },
    ]);
  });
});
