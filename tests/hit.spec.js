import { hitBottomBox, hitLeftBox } from "../src/game/hit.js";
import { Box } from "../src/game/Box";

test("bottom", () => {
  const map = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, -1, 0, 0, 0],
  ];

  const box = new Box({ x: 0, y: 1 });

  box.setShape([
    [0, 0, 3],
    [0, 3, 3],
    [0, 3, 0],
  ]);

  expect(hitBottomBox(box, map)).toBe(true);
});

describe("left", () => {
  it("not collision", () => {
    const map = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, -1, 0, 0, 0],
    ];

    const box = new Box({ x: 1, y: 0 });
    box.setShape([
      [2, 0, 0],
      [2, 2, 0],
      [0, 2, 0],
    ]);

    expect(hitLeftBox(box, map)).toBe(false);
  });
});

