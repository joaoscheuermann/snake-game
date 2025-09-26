export interface Vector {
  x: number;
  y: number;
}

const vec = (x: number, y: number): Vector => ({
  x,
  y,
});

export const add = (a: Vector, b: Vector) => vec(a.x + b.x, a.y + b.y);
export const equal = (a: Vector, b: Vector) => a.x === b.x && a.y === b.y;

export const random = (
  blacklistedPositions: Vector[],
  minBounds: Vector,
  maxBounds: Vector
): Vector => {
  while (true) {
    const vector = vec(
      Math.floor(Math.random() * (maxBounds.x - minBounds.x + 1)) + minBounds.x,
      Math.floor(Math.random() * (maxBounds.y - minBounds.y + 1)) + minBounds.y
    );

    if (blacklistedPositions.some((pos) => equal(pos, vector))) continue;

    return vector;
  }
};

export const contains = (
  vector: Vector,
  minBounds: Vector,
  maxBounds: Vector
) =>
  vector.x >= minBounds.x &&
  vector.x <= maxBounds.x &&
  vector.y >= minBounds.y &&
  vector.y <= maxBounds.y;

export default vec;
