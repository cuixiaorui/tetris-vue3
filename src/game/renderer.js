import { checkLegalPointInMap } from "./map";
export function render(box, map) {
  if (!box) return;
  reset(map);
  _render(box, map);
}

function _render(box, map) {
  // 每次只重新 render  active 的这个 box
  // 那些已经不动弹的 box 就不需要刷新了
  const shape = box.getShape();

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      // 如果当前的这个位置已经被占用了，那么后来的就不可以被赋值
      // 这个 shape 的 val 必须是有值得，才可以赋值给 map
      // 需要看看这个坐标是不是可以渲染（只可以渲染在 map 范围内的点）
      if (checkLegalPointInMap({ x: j + box.x, y: i + box.y })) {
        if (shape[i][j] && map[i + box.y][j + box.x] === 0) {
          map[i + box.y][j + box.x] = shape[i][j];
        }
      }
    }
  }
}

function reset(map) {
  const row = map.length;
  const col = map[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (map[i][j] >= 0) {
        map[i][j] = 0;
      }
    }
  }
}
