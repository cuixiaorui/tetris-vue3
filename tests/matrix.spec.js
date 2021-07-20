import {
  getBottomPoints,
  getLeftPoints,
  getRightPoints,
  rotate,
} from "../src/game/matrix";

describe("matrix", () => {
  it("获取 box 底部有值的点", () => {
    const matrix = [
      [1, 1, 1],
      [1, 1, 1],
    ];

    expect(getBottomPoints(matrix)).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
  });

  it("获取复杂 box 底部有值的点", () => {
    const matrix = [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ];

    expect(getBottomPoints(matrix)).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: 2 },
    ]);
  });

  it("获取 box 左侧有值的点", () => {
    const matrix = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 0, 1],
    ];

    expect(getLeftPoints(matrix)).toEqual([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ]);
  });

  it("获取 box 右侧有值的点", () => {
    const matrix = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ];

    expect(getRightPoints(matrix)).toEqual([
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]);
  });
});
describe("rotate", () => {
  it("rotate 逆时针90度旋转 ", () => {
    const matrix = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];

    // 90
    expect(rotate(matrix)).toEqual([
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ]);

    // 180
    expect(rotate(rotate(matrix))).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ]);

    // // 270
    expect(rotate(rotate(rotate(matrix)))).toEqual([
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ]);

    // 0
    expect(rotate(rotate(rotate(rotate(matrix))))).toEqual([
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });
});
