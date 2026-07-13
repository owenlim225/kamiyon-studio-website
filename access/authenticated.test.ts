import { describe, expect, it } from "vitest";

import { anyone, authenticated, isAuthenticatedUser } from "./authenticated";

describe("Payload access helpers", () => {
  it("anyone always allows", () => {
    expect(anyone({} as never)).toBe(true);
  });

  it("authenticated allows only when req.user is set", () => {
    expect(authenticated({ req: { user: null } } as never)).toBe(false);
    expect(authenticated({ req: { user: { id: 1 } } } as never)).toBe(true);
  });

  it("isAuthenticatedUser returns a boolean for admin access", () => {
    expect(isAuthenticatedUser({ req: { user: null } } as never)).toBe(false);
    expect(isAuthenticatedUser({ req: { user: { id: 1 } } } as never)).toBe(true);
  });
});
