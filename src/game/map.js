import { config } from "./config";
export function initMap(map) {
  // init map
  for (let i = 0; i < config.game.row; i++) {
    map[i] = [];
    for (let j = 0; j < config.game.col; j++) {
      map[i][j] = 0;
    }
  }
}

export function addToMap(box, map) {
  const shape = box.getShape();

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      // 如果当前的这个位置已经被占用了，那么后来的就不可以被赋值
      if (shape[i][j]) {
        map[i + box.y][j + box.x] = -1;
      }
    }
  }
}
