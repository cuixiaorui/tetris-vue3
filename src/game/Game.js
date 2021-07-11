// 游戏场景
import { addTicker, removeTicker } from "./ticker";
import {
  hitRightBox,
  hitLeftBox,
  hitRightBoundary,
  hitLeftBoundary,
  checkBoxLegal,
  hitBottomBox,
  hitBottomBoundary,
} from "./hit";
import { createBox } from "./Box";
import { lineElimination } from "./eliminate";
import { render } from "./renderer";
import { addToMap, initMap, addOneLineToMap } from "./map";
import { StateManagement } from "./StateManagement.js";
import mitt from "mitt";
export class Game {
  constructor(map) {
    this._map = map;
    this._activeBox = null;
    this._gameTicker = null;
    this._player = null;
    this.emitter = mitt();
    this._stateManagement = new StateManagement();
    initMap(this._map);
  }

  addPlayer(player) {
    this._player = player;
    this._player.addGame(this);
  }

  start() {
    this._player.init();

    addTicker(this.handleTicker, this);
  }

  setGameTicker(fn) {
    this._gameTicker = fn;
  }

  setCreateBoxStrategy(strategy) {
    this._createBoxStrategy = strategy;
  }

  handleTicker(i) {
    if (this._gameTicker) this._gameTicker(i);
    render(this._activeBox, this._map);
  }

  nextBox(activeBox) {
    addToMap(activeBox, this._map);
    const num = lineElimination(this._map);
    // 通知消除的行数
    this.emitter.emit("eliminateLine", num);
    // 检测是不是游戏结束了
    if (this.checkGameOver()) {
      this.emitter.emit("gameOver");
      return;
    }
    this.addBox();
  }

  endGame() {
    removeTicker(this.handleTicker, this);
  }

  checkGameOver() {
    // 需要在新的 box 来之前检测
    return this._activeBox.y < 0;
  }

  addBox() {
    this._activeBox = this._createBoxStrategy();
  }

  resetSpeed() {
    this._stateManagement.resetSpeed();
  }

  speedUp() {
    this._stateManagement.speedUp();
  }

  moveBoxToDown() {
    // 到底有2种情况
    // 1. 真的到底
    // 2. 下面是不是有其他的 box
    if (
      hitBottomBoundary(this._activeBox, this._map) ||
      hitBottomBox(this._activeBox, this._map)
    ) {
      this.nextBox(this._activeBox);
      return;
    }
    this._activeBox.y++;
  }

  moveBoxToLeft() {
    if (
      hitLeftBoundary(this._activeBox, this._map) ||
      hitLeftBox(this._activeBox, this._map)
    ) {
      return;
    }

    this._activeBox.x--;
  }

  moveBoxToRight() {
    if (
      hitRightBoundary(this._activeBox, this._map) ||
      hitRightBox(this._activeBox, this._map)
    ) {
      return;
    }

    this._activeBox.x++;
  }

  rotateBox() {
    const box = createBox({
      x: this._activeBox.x,
      y: this._activeBox.y,
      shape: this._activeBox.peerNextRotateShape(),
    });

    if (checkBoxLegal(box, this._map)) {
      return;
    }

    this._activeBox.rotate();
  }

  getSpeed() {
    return this._stateManagement.speed;
  }

  addOneLine() {
    addOneLineToMap(this._map);
  }
}
