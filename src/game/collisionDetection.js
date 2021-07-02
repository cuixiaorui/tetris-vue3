export function collisionDetection(box, map, offsetY, type,offsetX) {
  // 这个是最下面一行的碰撞检测
  // TODO 还需要左侧和右侧
  // 或者，获取 box 的最下面的几个节点
  // [
  //   [0,3,0]
  //   [0,3,3]
  //   [0,0,3]
  // ]
  // 找出最下方的所有点就可以了，比如这里是  1,1   2,2 两个点
  const fnMap = {
    bottom: box.getBottomPoints.bind(box),
    left: box.getLeftPoints.bind(box),
  };
  const getPointsFn = fnMap[type];

  return getPointsFn().some((p) => {
    // 把 box 的坐标转换为 map 的 也就是全局的坐标，然后+上 offsetY 看看
    // 因为 point 都已经是有值得点了，所以不需要额外的判断
    const col = box.x + p.x;
    const row = box.y + p.y;
    return map[row + offsetY][col + offsetX] !== 0;
  });
}
