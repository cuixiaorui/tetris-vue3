import { rotate, rotate180, rotate270 } from "./rotate";

describe("Rotate", () => {
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

  it("逆时针旋转 180 度", () => {
    const matrix = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];

    expect(rotate180(matrix)).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ]);

    expect(rotate180(rotate180(matrix))).toEqual([
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });

  it("逆时针旋转 270 度", () => {
    const matrix = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];

    expect(rotate270(matrix)).toEqual([
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ]);
  });
});
