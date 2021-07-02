import { createBox } from "./Box.js";
describe("Box", () => {
  describe("获取 box 的宽度", () => {
    it("最后一个没值", () => {
      const box = createBox();
      box.setShape([
        [2, 0, 0],
        [2, 2, 0],
        [0, 2, 0],
      ]);
      expect(box.width).toBe(2);
    });

    it("最后一个有值", () => {
      const box = createBox();
      box.setShape([
        [0, 0, 3],
        [0, 3, 3],
        [0, 3, 0],
      ]);
      expect(box.width).toBe(3);
    });
  });

  describe("获取 box 的高度", () => {
    it("最后一个没值", () => {
      const box = createBox();
      box.setShape([
        [5, 5, 5],
        [0, 5, 0],
        [0, 0, 0],
      ]);
      expect(box.height).toBe(2);
    });

    it("最后一个有值", () => {
      const box = createBox();
      box.setShape([
        [0, 0, 3],
        [0, 3, 3],
        [0, 3, 0],
      ]);
      expect(box.height).toBe(3);
    });
  });

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
});
