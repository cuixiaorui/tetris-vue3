import { addOneLineToMap } from "../src/game/map";
describe("map", () => {
  describe("addOneLineToMap", () => {
    it("一个都没有的时候", () => {
      const map = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      addOneLineToMap(map);

      expect(map).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [-2, -2, -2, -2],
      ]);
    });
    it("第一行有值", () => {
      const map = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, -2, 0, 0],
      ];

      addOneLineToMap(map);

      expect(map).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, -2, 0, 0],
        [-2, -2, -2, -2],
      ]);
    });
    it("在中间", () => {
      const map = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, -2, 0, 0],
        [0, -2, -2, 0],
      ];

      addOneLineToMap(map);

      expect(map).toEqual([
        [0, 0, 0, 0],
        [0, -2, 0, 0],
        [0, -2, -2, 0],
        [-2, -2, -2, -2],
      ]);
    });
  });
});
