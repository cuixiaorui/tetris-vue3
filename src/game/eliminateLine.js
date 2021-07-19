// 消除行的逻辑
// 1. map -> row -> -1 -> 是可以消除的
// 2. array -> 多行的话如何消除呢？

export function eliminateLine(map) {
  // 2. 消除行
  const lines = getFullLines(map);
  const mapCol = map[0].length;

  for (let i = 0; i < lines.length; i++) {
    map.splice(lines[i], 1);
    // 需要补充一个 array
    const arr = new Array(mapCol).fill(0);
    map.unshift(arr);
  }
}

export function getFullLines(map) {
  const row = map.length;
  const r = [];
  for (let i = 0; i < row; i++) {
    // col
    // -1
    // every
    const boo = map[i].every((v) => {
      return v === -1;
    });

    if (boo) {
      r.push(i);
    }
  }

  return r;
}
