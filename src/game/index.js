export * from "./map.js";
export * from "./config.js";
import { config, speedUp, resetSpeed } from "./config";
import { addBox, initMap, moveDown, render, activeBox, reset } from "./map.js";
import { add as addTicker } from "./ticker";
import { collisionDetection, boundaryDetection } from "./collisionDetection";
import { rotate } from "./rotate";

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
        if (
          boundaryDetection({ box: activeBox, map, type: "left", offsetX: -1 })
        ) {
          return;
        }
        if (
          collisionDetection({
            box: activeBox,
            map,
            type: "left",
            offsetX: -1,
          })
        ) {
          return;
        }

        activeBox.x--;
        break;
      case "ArrowRight":
        if (
          boundaryDetection({ box: activeBox, map, type: "right", offsetX: 1 })
        ) {
          return;
        }

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
      case "Space":
        activeBox.setShape(rotate(activeBox.getShape()));
        break;
    }
  }
}
