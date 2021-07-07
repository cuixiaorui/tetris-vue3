import { getLeftPoints, getRightPoints } from "./getBoxPoints";
describe("获取一个 matrix 的检测点", () => {
  test("获取左侧的检测点", () => {
    const matrix = [
      [0, 0, 3],
      [0, 3, 3],
      [0, 3, 0],
    ];

    expect(getLeftPoints(matrix)).toEqual([
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ]);
  });

  test("获取右侧的检测点", () => {
    const matrix = [
      [0, 0, 3],
      [0, 3, 3],
      [0, 3, 0],
    ];

    expect(getRightPoints(matrix)).toEqual([
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ]);
  });
});
