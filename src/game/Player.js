import { randomCreateBox } from "./Box";
import { socket } from "../utils/socket";

// TODO 
// 抽离出 BasePlayer
// 把 player  和 dival 公共的逻辑都抽离过来
// export default class BasePlayer {
//   constructor() {
//     this._game = null;
//   }
// }

export class Player {
  constructor() {
    this._game = null;
    socket.on("addLine", this.addLine.bind(this));
    socket.on("gameWon", this.gameWon.bind(this));
  }

  init() {
    this._game.addBox();
    this.initKeyboard();
  }

  addGame(game) {
    this._game = game;
    this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
    this._game.emitter.on("eliminateLine", this.handleEliminateLine.bind(this));
    this._game.emitter.on("gameOver", this.gameOver.bind(this));
    this._game.emitter.on("rerender", this.gameRerender.call(this));
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
    // console.log(`消除了 ${num} 行`);
    socket.emit("eliminateLine", num);
  }

  addLine(num) {
    // 别人消行了，这里就需要添加一行
    for (let i = 0; i < num; i++) {
      this._game.addOneLine();
    }
    // 同步当前的自己的数据给别人展示
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

  gameRerender() {
    let n = 0;
    return (i) => {
      n += i;
      if (n >= this._game.getSpeed()) {
        n = 0;
        this._game.moveBoxToDown();
        socket.emit("moveBoxToDown");
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
