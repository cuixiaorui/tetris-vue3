import { config } from "./config";
import { createBox } from "./Box";
import { boundaryDetection, hitBottomBox } from "./collisionDetection";
import { lineElimination } from "./lineElimination";
import { randomGenerateShape } from "./generateShape";

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
  if (boundaryDetection({ box: activeBox, type: "bottom", offsetY: 1, map })) {
    nextBox(map);
    return;
  }

  // 下面是不是有其他的 box
  if (hitBottomBox(activeBox, map)) {
    nextBox(map);
    return;
  }
  activeBox.y++;
}

// 碰撞检测
export function addBox() {
  const { shape, rotateStrategy } = randomGenerateShape();

  const box = createBox({ shape });
  box.setRotateStrategy(rotateStrategy);
  box.center();
  activeBox = box;
}

function mergeToMap(map) {
  const shape = activeBox.getShape();

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      // 如果当前的这个位置已经被占用了，那么后来的就不可以被赋值
      if (shape[i][j]) {
        map[i + activeBox.y][j + activeBox.x] = -1;
      }
    }
  }
}

export function render(map) {
  _render(map);
}

function nextBox(map) {
  mergeToMap(map);
  lineElimination(map);
  addBox();
}

function _render(map) {
  // 每次只重新 render  active 的这个 box
  // 那些已经不动弹的 box 就不需要刷新了
  const shape = activeBox.getShape();

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      // 如果当前的这个位置已经被占用了，那么后来的就不可以被赋值
      // 这个 shape 的 val 必须是有值得，才可以赋值给 map
      if (shape[i][j] && map[i + activeBox.y][j + activeBox.x] === 0) {
        map[i + activeBox.y][j + activeBox.x] = shape[i][j];
      }
    }
  }
}

export function reset(map) {
  const row = map.length;
  const col = map[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (map[i][j] !== -1) {
        map[i][j] = 0;
      }
    }
  }
}
