import { rotate } from "./rotate";

describe("Rotate", () => {
  it("rotate 逆时针90度旋转 ", () => {
    const matrix = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];

    expect(rotate(matrix)).toEqual([
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ]);

    expect(rotate(rotate(matrix))).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ]);

    expect(rotate(rotate(rotate(matrix)))).toEqual([
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ]);

    expect(rotate(rotate(rotate(rotate(matrix))))).toEqual([
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });
});
