import { Box } from "../src/game/Box";
import { hitBottomBoundary, hitBottomBox } from "../src/game/hit";
import { gameRow } from "../src/game/config";

describe("hit", () => {
  it("should hit when box move to game bottom boundary", () => {
    const box = new Box();
    box.y = gameRow;

    expect(hitBottomBoundary(box)).toBe(true);
  });
  it("当box没有超出游戏底部边界的时候应该返回 false", () => {
    const box = new Box();
    box.y = 1;

    expect(hitBottomBoundary(box)).toBe(false);
  });

  it("box 在出界的边缘", () => {
    const box = new Box();
    box.shape = [
      [1, 1],
      [1, 1],
    ];

    box.y = gameRow - box.shape.length - 1;

    expect(hitBottomBoundary(box)).toBe(false);
  });

  it("当向下移动碰到其他的 box 的时候，需要停下来", async () => {
    const box = new Box();
    box.shape = [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ];

    const map = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [-1, 0, 0, 0],
      [-1, -1, 0, 0],
      [0, -1, 0, 0],
    ];

    box.x = 1;
    box.y = 2;
    expect(hitBottomBox(box, map)).toBe(true);
    // box.y = 2;
    // expect(hitBottomBox(box, map)).toBe(true);
  });

  //   it.todo("当向左移动碰到其他的 box 的时候，需要停下来", () => {});
  //   it.todo("当向右移动碰到其他的 box 的时候，需要停下来", () => {});
});
