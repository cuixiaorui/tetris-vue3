export * from "./map.js";
export * from "./config.js";
import { config, speedUp, resetSpeed } from "./config";
import { addBox, initMap, moveDown, render, activeBox, reset } from "./map.js";
import { add as addTicker } from "./ticker";
import {
  hitRightBox,
  hitLeftBox,
  hitRightBoundary,
  hitLeftBoundary,
  checkBoxLegal,
} from "./hit";
import { createBox } from "./Box.js";

export function startGame(map) {
  initMap(map);
  keyboard();

  // 需要一开始的时候先添加一个 box
  addBox();

  let n = 0;
  const handleTicker = (i) => {
    reset(map);
    n += i;
    if (n >= config.game.speed) {
      n = 0;
      moveDown(map);
    }
    render(map);
  };
  addTicker(handleTicker);

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
        if (hitLeftBoundary(activeBox, map) || hitLeftBox(activeBox, map)) {
          return;
        }

        activeBox.x--;
        break;
      case "ArrowRight":
        if (hitRightBoundary(activeBox, map) || hitRightBox(activeBox, map)) {
          return;
        }

        activeBox.x++;
        break;
      case "ArrowDown":
        speedUp();
        break;
      case "Space":
        // 需要先看看 旋转后的位置是不是没有障碍的
        // 其实我只需要检测 新的 shape 是不是合法的在 map 里面就可以了
        const box = createBox({
          x: activeBox.x,
          y: activeBox.y,
          shape: activeBox.peerNextRotateShape(),
        });

        console.log(box.x, box.y);
        console.log(box.getShape(), map);
        if (checkBoxLegal(box, map)) {
          return;
        }

        activeBox.rotate();
        break;
    }
  }
}
