// 小于 0 的话是参与碰撞检测的
// -1 的是可以消除的行
// -2 的是不可以消除的行

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
      if (checkLegalPointInMap({ x: j + box.x, y: i + box.y })) {
        if (shape[i][j]) {
          map[i + box.y][j + box.x] = -1;
        }
      }
    }
  }
}

export function addOneLineToMap(map) {
  // 需要把所有为 -1 的值都往上移动一个位置
  // 1. 可以筛选出所有包含 -1 的 line 的 索引
  //    - 找到最新的那个 line 的索引
  // 2. 删除这个 line ，这样的话，后面的 line 会补位过来
  // 3. 创建一个都是 -1 的line 添加都 map 的最后面
  // 4. 用 -2 来标记，这个是不可以消除的

  const row = map.length;
  const col = map[0].length;
  const getMinLine = () => {
    let r = 0;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (map[i][j] === -1) {
          // 获取当前在 line 的行的上一个 line
          return i - 1;
        }
      }
    }

    return r;
  };

  const minLine = getMinLine();
  if (minLine !== -1) {
    map.splice(minLine, 1);

    // 创建都是 -1 的 array 给添加进去
    let arr = [];
    for (let i = 0; i < col; i++) {
      // -2 标记这行是不可以消除的
      // 但是还参与碰撞
      arr.push(-2);
    }

    map.push(arr);
  }
}

/**
 * 检测 point 是否可以再map 中渲染
 * @param {} box
 * @returns boolean
 */
export function checkLegalPointInMap(point) {
  const mapRow = config.game.row;
  const mapCol = config.game.col;

  const checkCol = point.x < 0 || point.x >= mapCol;
  const checkRow = point.y < 0 || point.y >= mapRow;
  return !checkCol && !checkRow;
}
