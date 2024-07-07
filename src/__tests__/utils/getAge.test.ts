import { getAge } from "@/utils/getAge";

describe("getAge", () => {
  it("should return the correct age", () => {
    const age = getAge("15-08-2003");
    expect(age).toBe(20);
  });

  it("should return the correct age", () => {
    const age = getAge("15-07-2000");
    expect(age).toBe(23);
  });

  it("should return the correct age", () => {
    const age = getAge("15-08-1999");
    expect(age).toBe(24);
  });

  it("should return the correct age", () => {
    const age = getAge("05-07-1998");
    expect(age).toBe(26);
  });
});
