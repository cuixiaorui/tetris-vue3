export * from "./map.js";
export * from "./config.js";
import { config, speedUp, resetSpeed } from "./config";
import { addBox, initMap, moveDown, render, activeBox, reset } from "./map.js";
import { add as addTicker } from "./ticker";
import { collisionDetection } from "./collisionDetection";

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
        // 超出边界的话，不可以出去
        if (activeBox.x <= 0) {
          console.log("!!!!");
          return;
        }
        // 碰撞到其他的 box 的话，那么也不可以在移动了
        if (
          collisionDetection({ box: activeBox, map, type: "left", offsetX: -1 })
        ) {
          console.log("?????????????");
          return;
        }

        activeBox.x--;
        break;
      case "ArrowRight":
        if (activeBox.x + activeBox.width >= config.game.col) return;

        if (
          collisionDetection({ box: activeBox, map, type: "right", offsetX: 1 })
        ) {
          return;
        }
        activeBox.x++;
        break;
      case "ArrowDown":
        speedUp();
        break;
    }
  }
}
