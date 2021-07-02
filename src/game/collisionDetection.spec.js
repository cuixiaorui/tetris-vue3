import { collisionDetection } from "./collisionDetection.js";
import { Box } from "./Box";

test("should is collision", () => {
  const map = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ];

  const box = new Box({ x: 0, y: 1 });
  box.setShape([
    [0, 0, 3],
    [0, 3, 3],
    [0, 3, 0],
  ]);

  expect(collisionDetection(box, map, 1,"bottom")).toBe(true);
});
