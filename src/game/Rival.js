import { socket } from "./socket";
import { createBoxByType } from "./Box";
export class Rival {
  constructor() {
    this._game = null;
    socket.on("moveBoxToDown", this.moveBoxToDown.bind(this));
    socket.on("moveBoxToLeft", this.moveBoxToLeft.bind(this));
    socket.on("moveBoxToRight", this.moveBoxToRight.bind(this));
    socket.on("rotateBox", this.rotateBox.bind(this));
    socket.on("createBox", this.createBox.bind(this));
  }

  init(game) {
    this._game = game;
    this._game.autoDownMove = false;
    this._game.startAddBox = false;
    this._game.createBoxStrategy(this.createBoxStrategy.bind(this));

    // 基于发过来的事件来对 game 调用
  }
  createBoxStrategy() {
    // 当 game 创建 box 的时候会调用
    console.log("rival createBox");
    // 必须要返回 box 的
    return createBoxByType(this._createBoxInfo.type);
  }

  _createBoxInfo = null;
  _isGameStarted = false;
  createBox(info) {
    // 当 player 调用 createBox 的时候会调用
    console.log("player 调用 createBox");
    this._createBoxInfo = info;

    // 第一次收到 createBox 的时候 就是开始 game 的时机
    if (!this._isGameStarted) {
      this._isGameStarted = true;
      this._game.start();
    }
  }

  moveBoxToDown() {
    this._game.bottomMoveBox();
  }
  moveBoxToLeft() {
    this._game.leftMoveBox();
  }
  moveBoxToRight() {
    this._game.rightMoveBox();
  }
  rotateBox() {
    this._game.boxRotate();
  }
}
