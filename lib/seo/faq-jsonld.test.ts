import { describe, expect, it } from "vitest";

import { getFaqJsonLd } from "./faq-jsonld";

describe("getFaqJsonLd", () => {
  it("builds a FAQPage JSON-LD entry per question/answer pair", () => {
    const jsonLd = getFaqJsonLd([
      { question: "Is Kamiyon a game studio?", answer: "Yes, among other things." },
    ]);

    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "Is Kamiyon a game studio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, among other things.",
        },
      },
    ]);
  });

  it("returns an empty mainEntity array when there is no FAQ content", () => {
    expect(getFaqJsonLd([]).mainEntity).toEqual([]);
  });
});
