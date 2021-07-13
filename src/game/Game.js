// 游戏场景
import { addTicker, removeTicker } from "./ticker";
import {
  hitRightBox,
  hitLeftBox,
  hitRightBoundary,
  hitLeftBoundary,
  hitBottomBox,
  hitBottomBoundary,
} from "./hit";
import { createBox } from "./Box";
import { lineElimination } from "./eliminate";
import { render } from "./renderer";
import { addToMap, initMap, addOneLineToMap, checkLegalBoxInMap } from "./map";
import { StateManagement } from "./StateManagement.js";
import mitt from "mitt";
export class Game {
  constructor(map) {
    this._map = map;
    this._activeBox = null;
    this._player = null;
    this._emitter = mitt();
    this._autoMoveToDown = true;
    this._stateManagement = new StateManagement();
    initMap(this._map);
  }

  start() {
    this._player.init();
    addTicker(this.handleTicker, this);
  }

  addPlayer(player) {
    this._player = player;
    this._player.addGame(this);
  }

  setCreateBoxStrategy(strategy) {
    this._createBoxStrategy = strategy;
  }

  set autoMoveToDown(val) {
    this._autoMoveToDown = val;
  }

  handleTicker(i) {
    this.handleAutoMoveToDown(i);
    render(this._activeBox, this._map);
  }

  _n = 0;
  handleAutoMoveToDown(i) {
    if (!this._autoMoveToDown) return;
    this._n += i;
    if (this._n >= this.getSpeed()) {
      this._n = 0;
      this.moveBoxToDown();
      this._emitter.emit("autoMoveToDown");
    }
  }

  nextBox(activeBox) {
    addToMap(activeBox, this._map);
    const num = lineElimination(this._map);
    // 通知消除的行数
    this._emitter.emit("eliminateLine", num);
    // 检测是不是游戏结束了
    if (this.checkGameOver()) {
      this._emitter.emit("gameOver");
      return;
    }
    this.addBox();
  }

  endGame() {
    removeTicker(this.handleTicker, this);
    this._emitter.all.clear();
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
    if (!this._activeBox) return;
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

    if (checkLegalBoxInMap(box, this._map)) {
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

  get emitter() {
    return this._emitter;
  }
}
