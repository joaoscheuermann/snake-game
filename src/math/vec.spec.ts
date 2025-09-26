import vec, { random, contains } from "./vec";

describe("random", () => {
  it("should return a random vector within bounds", () => {
    const minBounds = vec(0, 0);
    const maxBounds = vec(20, 20);
    const blacklistedPositions = [vec(0, 1), vec(0, 2)];
    const randomVector = random(blacklistedPositions, minBounds, maxBounds);

    expect(randomVector.x).toBeGreaterThanOrEqual(minBounds.x);
    expect(randomVector.x).toBeLessThanOrEqual(maxBounds.x);
    expect(randomVector.y).toBeGreaterThanOrEqual(minBounds.y);
    expect(randomVector.y).toBeLessThanOrEqual(maxBounds.y);
  });
});

describe("contains", () => {
  it("should return true if vector is within bounds", () => {
    const minBounds = vec(0, 0);
    const maxBounds = vec(10, 10);
    const vector = vec(5, 5);

    expect(contains(vector, minBounds, maxBounds)).toBe(true);
  });

  it("should return false if vector is outside bounds", () => {
    const minBounds = vec(0, 0);
    const maxBounds = vec(10, 10);
    const vector = vec(11, 11);

    expect(contains(vector, minBounds, maxBounds)).toBe(false);
  });
});
