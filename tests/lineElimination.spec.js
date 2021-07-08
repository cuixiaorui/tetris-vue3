
import { lineElimination, canEliminationLines } from "./lineElimination.js";
describe("Line elimination", () => {
  it("消除第二行, 上面的行需要掉落下来", () => {
    const map = [
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
    ];

    lineElimination(map);

    const expectMap = [
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
    ];
    expect(map).toEqual(expectMap);
  });
});

describe("canEliminationLines", () => {
  it("第一行是可以消除的", () => {
    const map = [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
    ];

    const lines = canEliminationLines(map);
    expect(lines).toEqual([1]);
  });
});
