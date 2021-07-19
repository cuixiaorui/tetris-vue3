import { initMap, addBoxToMap } from "./Map";
import { createBox } from "./Box";
import { render } from "./renderer";
import { addTicker, removeTicker } from "./ticker";
import { intervalTimer } from "./utils";
import { eliminateLine } from "./eliminateLine";
import { GameState } from "./gameState";
import {
  hitBottomBoundary,
  hitLeftBoundary,
  hitRightBoundary,
  hitBottomBox,
  hitLeftBox,
} from "./hit";
import mitt from "mitt";

export class Game {
  constructor(map) {
    this._activeBox = null;
    this._map = map;
    this._emitter = mitt();
    this._state = new GameState();
    initMap(map);
  }

  addPlayer(player) {
    player.init(this);
  }

  start() {
    this._activeBox = this.addBox();
    addTicker(this.handleTicker.bind(this));
  }

  rightMoveBox() {
    if (hitRightBoundary(this._activeBox)) return;
    this._activeBox.x++;
  }

  leftMoveBox() {
    if (
      hitLeftBoundary(this._activeBox) ||
      hitLeftBox(this._activeBox, this._map)
    )
      return;
    this._activeBox.x--;
  }

  bottomMoveBox() {
    // 碰到边界的时候不可以在移动了!!
    if (
      hitBottomBoundary(this._activeBox) ||
      hitBottomBox(this._activeBox, this._map)
    ) {
      this._state.resetSpeed();

      addBoxToMap(this._activeBox, this._map);
      eliminateLine(this._map);

      if (this._activeBox.y < 0) {
        this.gameOver();
        return;
      }

      this._activeBox = this.addBox();
      return;
    }

    this._activeBox.y++;
  }

  get emitter() {
    return this._emitter;
  }

  handleKeyup(e) {
    if (e.code === "ArrowDown") {
      this._state.resetSpeed();
    }
  }

  gameOver() {
    alert("game over");
    // 清理 ticker
    removeTicker(handleTicker);
  }

  addBox() {
    return this._createBox();
  }

  _createBox = null;
  createBoxStrategy(fn) {
    this._createBox = fn;
  }

  // 就近原则
  _needDownMove = intervalTimer();
  _autoDownMove = true;
  handleTicker(n) {
    if (this._autoDownMove) {
      if (this._needDownMove(n, this._state.downIntervalTime)) {
        this.bottomMoveBox();
        this._emitter.emit("moveBoxToDown");
      }
    }

    render(this._activeBox, this._map);
  }

  get autoDownMove() {
    return this._autoDownMove;
  }
  set autoDownMove(val) {
    this._autoDownMove = val;
  }

  resetSpeed() {
    this._state.resetSpeed();
  }

  upSpeed() {
    this._state.upSpeed();
  }

  boxRotate() {
    this._activeBox.rotate();
  }

  superUpSpeed() {
    this._state.superUpSpeed();
  }
}
