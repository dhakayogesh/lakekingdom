import { describe, expect, it } from "vitest";
import { validateDates } from "@/lib/enquiry";

describe("booking dates", () => {
  it("rejects check-out on the same day as check-in", () => {
    expect(validateDates("2026-11-01", "2026-11-01")).not.toBeNull();
  });
  it("accepts check-out after check-in", () => {
    expect(validateDates("2026-11-01", "2026-11-03")).toBeNull();
  });
});
