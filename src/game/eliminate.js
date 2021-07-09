export function lineElimination(map) {
  // 1. 先把所有列都为 1 的行找出来 -》 得到一个索引数组
  // 2. 基于行的索引把
  const lines = canEliminationLines(map);

  // 需要先删除前面的，在删除后面的，防止数据的移动
  // 所有用得 reverse 来调换一下顺序
  const col = map[0].length;

  lines.reverse().forEach((line) => {
    map.splice(line, 1);
    // TODO 看看有没有更优雅的创建数组的方式
    let arr = [];
    for (let i = 0; i < col; i++) {
      arr.push(0);
    }
    map.unshift(arr);
  });
}

// 得到的是索引
export function canEliminationLines(map) {
  let result = [];
  const row = map.length;
  const col = map[0].length;

  for (let i = row - 1; i >= 0; i--) {
    let hit = true;
    for (let j = 0; j < col; j++) {
      if (!map[i][j]) {
        hit = false;
        break;
      }
    }

    if (hit) {
      result.push(i);
    }
  }

  return result;
}
