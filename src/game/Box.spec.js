import { createBox } from "./Box.js";
describe("Box", () => {
  test("获取 box 左侧的检测点", () => {
    const box = createBox();
    box.setShape([
      [0, 0, 3],
      [0, 3, 3],
      [0, 3, 0],
    ]);

    expect(box.getLeftPoints()).toEqual([
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ]);
  });

  test("获取 box 右侧的检测点", () => {
    const box = createBox();
    box.setShape([
      [0, 0, 3],
      [0, 3, 3],
      [0, 3, 0],
    ]);

    expect(box.getRightPoints()).toEqual([
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ]);
  });
});
