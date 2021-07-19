// 游戏
export * from "./config";

import { initMap, addBoxToMap } from "./Map";
import { Box, createBox } from "./Box";
import { render } from "./renderer";
import { addTicker, removeTicker } from "./ticker";
import { intervalTimer } from "./utils";
import { eliminateLine } from "./eliminateLine";
import { gameState, superUpSpeed, resetSpeed, upSpeed } from "./gameState";
import {
  hitBottomBoundary,
  hitLeftBoundary,
  hitRightBoundary,
  hitBottomBox,
  hitLeftBox,
} from "./hit";

let activeBox = null;
let _map = null;

// game state

export function initGame(map) {
  initMap(map);
  _map = map;
}

export function startGame() {
  //   initMap(map);
  //   _map = map;
  activeBox = addBox();

  addTicker(handleTicker);

  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowDown") {
      resetSpeed();
    }
  });

  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowLeft":
        leftMoveBox();
        break;
      case "ArrowRight":
        rightMoveBox();
        break;
      case "ArrowDown":
        upSpeed();
        break;
      case "ArrowUp":
        activeBox.rotate();
        break;

      case "Space":
        superUpSpeed();
        break;
    }
  });
}

const needDownMove = intervalTimer();
function handleTicker(n) {
  if (needDownMove(n, gameState.downIntervalTime)) {
    bottomMoveBox();
  }

  render(activeBox, _map);
}

function rightMoveBox() {
  if (hitRightBoundary(activeBox)) return;
  activeBox.x++;
}

function leftMoveBox() {
  if (hitLeftBoundary(activeBox) || hitLeftBox(activeBox, _map)) return;
  activeBox.x--;
}

function bottomMoveBox() {
  // 碰到边界的时候不可以在移动了!!
  if (hitBottomBoundary(activeBox) || hitBottomBox(activeBox, _map)) {
    resetSpeed();

    addBoxToMap(activeBox, _map);
    eliminateLine(_map);

    if (activeBox.y < 0) {
      gameOver();
      return;
    }

    activeBox = addBox();
    return;
  }

  activeBox.y++;
}

function addBox() {
  // const box = new Box();
  // box.y = -1;
  // return box;
  return createBox();
}

function gameOver() {
  alert("game over");
  // 清理 ticker
  removeTicker(handleTicker);
}
