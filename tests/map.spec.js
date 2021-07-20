import { Box } from "../src/game/Box";
import { gameRow, gameCol } from "../src/game/config";
import { initMap, addBoxToMap } from "../src/game/Map";
// 地图
describe("Map", () => {
  test("应该基于 gameRow 和 gameCol 初始化地图", () => {
    const map = [];
    initMap(map);

    const row = map.length;
    const col = map[0].length;

    expect(row).toBe(gameRow);
    expect(col).toBe(gameCol);
  });

  it("应该添加box 到 map 中", () => {
    const box = new Box();
    box.shape = [
      [1, 1],
      [1, 1],
    ];
    const map = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addBoxToMap(box, map);

    expect(map).toEqual([
      [-1, -1, 0, 0],
      [-1, -1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
});
