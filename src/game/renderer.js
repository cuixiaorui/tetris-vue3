import { gameCol, gameRow } from "./config";
export function render(box, map) {
  reset(map);
  _render(box, map);
}

function _render(box, map) {
  const shape = box.shape;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      // 处理一下
      const mRow = i + box.y;
      const mCol = j + box.x;
      // 如果这个点是超出屏幕的话，那么就不需要去管
      if (mCol >= gameCol) continue;
      if (mRow < 0 || mCol < 0) continue;
      // 如果地图上这个点有值了，那么也不能再次赋值
      if (map[mRow][mCol] < 0) continue;

      map[mRow][mCol] = shape[i][j];
    }
  }
}

function reset(map) {
  for (let i = 0; i < gameRow; i++) {
    for (let j = 0; j < gameCol; j++) {
      if (map[i][j] > 0) {
        map[i][j] = 0;
      }
    }
  }
}
