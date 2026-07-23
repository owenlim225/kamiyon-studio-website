import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
  },
};

/** Minimal layout — `/studio` only redirects to hosted Sanity Studio. */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
