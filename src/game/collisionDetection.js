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
    return map[row + offsetY][col + offsetX] === -1;
  });
}
