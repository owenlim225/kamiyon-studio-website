import { notFound } from "next/navigation";

/** Catch unmatched public URLs so `(frontend)/not-found.tsx` renders (not the default Next 404). */
export default function UnmatchedRoute() {
  notFound();
}
