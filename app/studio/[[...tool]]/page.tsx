"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

function StudioSetupNotice() {
  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        margin: "4rem auto",
        maxWidth: "40rem",
        padding: "0 1.5rem",
        lineHeight: 1.6,
      }}
    >
      <h1>Sanity Studio</h1>
      <p>
        Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
        <code>NEXT_PUBLIC_SANITY_DATASET</code> in your environment, then create a project at{" "}
        <a href="https://www.sanity.io/manage">sanity.io/manage</a> or run{" "}
        <code>pnpm sanity init</code>.
      </p>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return <StudioSetupNotice />;
  }

  return <NextStudio config={config} />;
}
