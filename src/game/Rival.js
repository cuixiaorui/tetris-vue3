// 对手
// 需要实现以下几个接口
//
// 1. 向下移动
// 2. 向左移动
// 3. 向右移动
// 4. 旋转
// 5. 创建 box
import { createBox } from "./Box";
import { getBoxsInfoByKey } from "./generateShape";
import { socket } from "../utils/socket";
export class Rival {
  constructor() {
    this._game = null;
    this._boxInfo = null;
    this._isMounted = false;
    this.initEvents();
  }
  init() {
    console.log("Rival");
  }

  initEvents() {
    socket.on("moveBoxToDown", this.moveBoxToDown.bind(this));
    socket.on("moveBoxToLeft", this.moveBoxToLeft.bind(this));
    socket.on("moveBoxToRight", this.moveBoxToRight.bind(this));
    socket.on("rotateBox", this.rotateBox.bind(this));
    socket.on("createBox", this.createBox.bind(this));
    socket.on("syncAddLine", this.syncAddLine.bind(this));
  }

  syncAddLine(num) {
    for (let i = 0; i < num; i++) {
      this._game.addOneLine();
    }
  }

  createBox(info) {
    this._boxInfo = info;
    if (!this._isMounted) {
      this._isMounted = true;
      this._game.addBox();
    }
  }

  moveBoxToLeft() {
    this._game.moveBoxToLeft();
  }

  moveBoxToRight() {
    this._game.moveBoxToRight();
  }

  rotateBox() {
    this._game.rotateBox();
  }

  moveBoxToDown() {
    this._game.moveBoxToDown();
  }

  addGame(game) {
    this._game = game;
    this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
  }

  createBoxStrategy() {
    const { shape, rotateStrategy } = getBoxsInfoByKey(this._boxInfo.type);
    const box = createBox({
      x: this._boxInfo.x,
      y: this._boxInfo.y,
      type: this._boxInfo.type,
      shape,
    });

    box.setRotateStrategy(rotateStrategy);
    return box;
  }
}
