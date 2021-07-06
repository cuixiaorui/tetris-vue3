export function collisionDetection({
  box,
  map,
  type,
  offsetX = 0,
  offsetY = 0,
}) {
  const fnMap = {
    bottom: box.getBottomPoints.bind(box),
    left: box.getLeftPoints.bind(box),
    right: box.getRightPoints.bind(box),
  };
  const getPointsFn = fnMap[type];

  return getPointsFn().some((p) => {
    // 把 box 的坐标转换为 map 的 也就是全局的坐标，然后+上 offsetY 看看
    // 因为 point 都已经是有值得点了，所以不需要额外的判断
    const col = box.x + p.x;
    const row = box.y + p.y;
    // 如果这个 col 和 row 点 转换不了 map 里面的点的话，那么就说明这个点是超出屏幕了

    return map[row + offsetY][col + offsetX] === -1;
  });
}

// 检测是否超出边界
export function boundaryDetection({
  box,
  map,
  type,
  offsetX = 0,
  offsetY = 0,
}) {
  const fnMap = {
    bottom: box.getBottomPoints.bind(box),
    left: box.getLeftPoints.bind(box),
    right: box.getRightPoints.bind(box),
  };
  const getPointsFn = fnMap[type];

  const mapRow = map.length;
  const mapCol = map[0].length;

  return getPointsFn().some((p) => {
    const col = box.x + p.x + offsetX;
    const row = box.y + p.y + offsetY;
    // 如果这个 col 和 row 点 转换不了 map 里面的点的话，那么就说明这个点是超出屏幕了

    const checkCol = col < 0 || col >= mapCol;
    const checkRow = row < 0 || row >= mapRow;

    return checkCol || checkRow;
  });
}
