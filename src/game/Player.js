import { randomCreateBox } from "./Box";
import { socket } from "../utils/socket";

export class Player {
  constructor() {
    this._game = null;
    socket.on("addLine", this.addLine.bind(this));
    socket.on("gameWon", this.gameWon.bind(this));
  }

  addGame(game) {
    this._game = game;
    this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
    this._game.emitter.on("eliminateLine", this.handleEliminateLine.bind(this));
    this._game.emitter.on("gameOver", this.gameOver.bind(this));
    this._game.emitter.on("autoMoveToDown", this.autoMoveToDown.bind(this));
  }

  init() {
    this.initKeyboard();
    // 初始化的时候，让 game 开始掉落 box
    this._game.addBox();
  }

  autoMoveToDown() {
    socket.emit("moveBoxToDown");
  }

  gameWon() {
    alert("You Won !!!");
    this._game.endGame();
  }

  gameOver() {
    alert("game over , You lose !!!");
    socket.emit("gameOver", "lose");
    this._game.endGame();
  }

  handleEliminateLine(num) {
    socket.emit("eliminateLine", num);
  }

  addLine(num) {
    // 别人消行了，这里就需要添加一行
    for (let i = 0; i < num; i++) {
      this._game.addOneLine();
    }
  }

  createBoxStrategy() {
    const box = randomCreateBox();

    socket.emit("createBox", {
      x: box.x,
      y: box.y,
      type: box.type,
    });

    return box;
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
        socket.emit("moveBoxToRight");
        break;
      case "ArrowLeft":
        this._game.moveBoxToLeft();
        socket.emit("moveBoxToLeft");
        break;
      case "ArrowDown":
        this._game.speedUp();
        break;
      case "Space":
        this._game.rotateBox();
        socket.emit("rotateBox");
        break;
    }
  }
}
