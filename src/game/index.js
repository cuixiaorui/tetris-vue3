export * from "./map.js";
export * from "./config.js";
import { config } from "./config";
import { addBox, initMap, moveDown, render } from "./map.js";
import { add as addTicker } from "./ticker";

export function startGame(map) {
  initMap(map);

  // 需要一开始的时候先添加一个 box
  addBox();

  let n = 0;
  const handleTicker = (i) => {
    n += i;
    if (n >= config.game.speed) {
      n = 0;
      moveDown(map);
    }
    render(map);
  };
  addTicker(handleTicker);
}
