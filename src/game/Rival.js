// 对手
// 需要实现以下几个接口
//
// 1. 向下移动
// 2. 向左移动
// 3. 向右移动
// 4. 旋转
// 5. 创建 box
import { createBox } from "./Box";
import { getBoxsInfoByKey } from "./Box";
import { socket } from "../utils/socket";
export class Rival {
  constructor() {
    this._game = null;
    this._boxInfo = null;
    this._isMounted = false;
    this.initSocketEvents();
  }

  addGame(game) {
    this._game = game;
    this._game.autoMoveToDown = false;
    this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
  }

  init() {
    console.log("Rival");
  }

  initSocketEvents() {
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
      // 主动触发 addBox 逻辑
      // 触发 addBox 的时候 game 会调用 createBoxStrategy 方法
      // 这样才会把 box 添加到 game 内
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
