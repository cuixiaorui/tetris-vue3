import { getPointsHandler } from "./matrix";

function _hitBox({ box, map, type, offsetX = 0, offsetY = 0 }) {
  const getPoints = getPointsHandler(type);

  return getPoints(box.shape).some((p) => {
    // 把 box 的坐标转换为 map 的 也就是全局的坐标，然后+上 offsetY 看看
    // 因为 point 都已经是有值得点了，所以不需要额外的判断
    const col = box.x + p.x;
    const row = box.y + p.y;

    return map[row + offsetY][col + offsetX] < 0;
  });
}

export function hitRightBox(box, map) {
  return _hitBox({
    box,
    map,
    type: "right",
    offsetX: 1,
  });
}

export function hitLeftBox(box, map) {
  return _hitBox({
    box,
    map,
    type: "left",
    offsetX: -1,
  });
}

export function hitBottomBox(box, map) {
  return _hitBox({
    box,
    map,
    type: "bottom",
    offsetY: 1,
  });
}

function hitBoundary({ box, map, type, offsetX = 0, offsetY = 0 }) {
  const getPoints = getPointsHandler(type);

  const mapRow = map.length;
  const mapCol = map[0].length;

  return getPoints(box.shape).some((p) => {
    const col = box.x + p.x + offsetX;
    const row = box.y + p.y + offsetY;
    // 如果这个 col 和 row 点 转换不了 map 里面的点的话，那么就说明这个点是超出屏幕了

    const checkCol = col < 0 || col >= mapCol;
    const checkRow = row < 0 || row >= mapRow;

    return checkCol || checkRow;
  });
}

export function hitLeftBoundary(box, map) {
  return hitBoundary({
    box,
    map,
    type: "left",
    offsetX: -1,
  });
}

export function hitRightBoundary(box, map) {
  return hitBoundary({
    box,
    map,
    type: "right",
    offsetX: 1,
  });
}

export function hitBottomBoundary(box, map) {
  return hitBoundary({
    box,
    map,
    type: "bottom",
    offsetY: 1,
  });
}
