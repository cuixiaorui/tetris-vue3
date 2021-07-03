import { config } from "./config";
import { createBox } from "./Box";
import { collisionDetection } from "./collisionDetection";

const boxs = [];
export let activeBox = null;

export function initMap(map) {
  // init map
  for (let i = 0; i < config.game.row; i++) {
    map[i] = [];
    for (let j = 0; j < config.game.col; j++) {
      map[i][j] = 0;
    }
  }
}

// 向下移动
export function moveDown(map) {
  // 到底有2种情况
  // 1. 真的到底
  if (activeBox.y + activeBox.height >= config.game.row) {
    nextBox();
    return;
  }

  // 下面是不是有其他的 box
  if (collisionDetection({ box: activeBox, map, offsetY: 1, type: "bottom" })) {
    nextBox();
    return;
  }
  activeBox.y++;
}

// 碰撞检测
export function addBox() {
  const box = createBox();
  activeBox = box;
  boxs.push(box);
}

export function render(map) {
  reset(map);
  _render(map);
}

export function nextBox() {
  addBox();
}

function _render(map) {
  boxs.forEach((box) => {
    const shape = box.getShape();

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        // 如果当前的这个位置已经被占用了，那么后来的就不可以被赋值
        if (map[i + box.y][j + box.x] === 0) {
          map[i + box.y][j + box.x] = shape[i][j];
        }
      }
    }
  });
}

function reset(map) {
  initMap(map);
}
