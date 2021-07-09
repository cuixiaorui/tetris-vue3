import { randomCreateBox } from "./Box";

// export default class BasePlayer {
//   constructor() {
//     this._game = null;
//   }
// }

import { emitter } from "./events";
export class Player {
  constructor() {
    this._game = null;
  }

  init() {
    this._game.addBox();
    this.initKeyboard();
  }

  addGame(game) {
    this._game = game;
    this._game.setGameTicker(this.handleGameTicker.call(this));
    this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
  }

  createBoxStrategy() {
    const box = randomCreateBox();

    emitter.emit("createBox", {
      x: box.x,
      y: box.y,
      type: box.type,
    });

    return box;
  }

  handleGameTicker() {
    let n = 0;
    return (i) => {
      n += i;
      if (n >= this._game.getSpeed()) {
        n = 0;
        this._game.moveBoxToDown();
        emitter.emit("moveBoxToDown");
      }
    };
  }

  initKeyboard() {
    window.addEventListener("keyup", this.handleKeyup.bind(this));
    window.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  handleKeyup(e) {
    if (e.code === "ArrowDown") {
      this._game.resetSpeed();
    }
  }

  handleKeydown(e) {
    switch (e.code) {
      case "ArrowRight":
        this._game.moveBoxToRight();
        emitter.emit("moveBoxToRight");
        break;
      case "ArrowLeft":
        this._game.moveBoxToLeft();
        emitter.emit("moveBoxToLeft");
        break;
      case "ArrowDown":
        this._game.speedUp();
        break;
      case "Space":
        this._game.rotateBox();
        emitter.emit("rotateBox");
        break;
    }
  }
}
