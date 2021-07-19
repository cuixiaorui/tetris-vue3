// 1. box 是随机创建的
// 2. 帧循环
import { socket } from "./socket";
import { createBox } from "./box";
export class Player {
  constructor() {
    this._game = null;
  }

  init(game) {
    this._game = game;
    this._game.emitter.on("moveBoxToDown", this.moveBoxToDown.bind(this));
    this._game.createBoxStrategy(this.createBox.bind(this));

    window.addEventListener("keyup", this.handleKeyup.bind(this));
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  createBox() {
    const box = createBox();
    socket.emit("createBox", { type: box.type });
    console.log("player createBox")
    return box;
  }

  moveBoxToDown() {
    socket.emit("moveBoxToDown");
  }

  handleKeyup(e) {
    if (e.code === "ArrowDown") {
      this._game.resetSpeed();
    }
  }

  handleKeyDown(e) {
    switch (e.code) {
      case "ArrowLeft":
        this._game.leftMoveBox();
        socket.emit("moveBoxToLeft");
        break;
      case "ArrowRight":
        this._game.rightMoveBox();
        socket.emit("moveBoxToRight");
        break;
      case "ArrowDown":
        this._game.upSpeed();
        break;
      case "ArrowUp":
        this._game.boxRotate();
        socket.emit("rotateBox");
        break;
      case "Space":
        this._game.superUpSpeed();
        break;
    }
  }
}
