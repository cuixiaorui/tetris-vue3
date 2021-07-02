import { config, speedUp, resetSpeed } from "./config";
import { createBox } from "./Box";
import { collisionDetection } from "./collisionDetection";

const boxs = [];
let activeBox = null;

keyboard();

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
  if (collisionDetection(activeBox, map, 1, "bottom", 0)) {
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

function nextBox() {
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

function keyboard() {
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleKeydown);
}
function handleKeyup(e) {
  if (e.code === "ArrowDown") {
    resetSpeed();
  }
}

function handleKeydown(e) {
  if (!activeBox) return;
  switch (e.code) {
    case "ArrowLeft":
      if (activeBox.x <= 0) return;
      // TODO 这里的 map 应该如何获取到呢？
      // 需要重新的组织一下代码了
      // 这里的逻辑可以上移到 game/index.js 内
      //       if (collisionDetection(activeBox, _map, 0, "left", 1)) {
      //         nextBox();
      //         return;
      //       }
      activeBox.x--;
      break;
    case "ArrowRight":
      if (activeBox.x + activeBox.width >= config.game.col) return;
      activeBox.x++;
      break;
    case "ArrowDown":
      speedUp();
      break;
  }
}
