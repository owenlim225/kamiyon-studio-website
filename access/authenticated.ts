import type { Access, PayloadRequest } from "payload";

/** Public read for marketing content and media. */
export const anyone: Access = () => true;

/** Authenticated Payload users only (admin/editor writes). */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Admin panel gate — must return boolean (not a Where query). */
export function isAuthenticatedUser({ req }: { req: PayloadRequest }): boolean {
  return Boolean(req.user);
}
