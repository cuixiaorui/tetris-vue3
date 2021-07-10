// 游戏的状态管理
// 比如游戏的速度
// 游戏当前的积分等
import { config } from "./config";

export class StateManagement {
  constructor() {
    this._speed = 0;
    this.initSpeed();
  }

  initSpeed() {
    this._speed = config.game.speed;
  }

  speedUp() {
    this._speed = this._speed * config.game.speedFactor;
    if (this._speed <= config.game.speedMin) {
      this._speed = config.game.speedMin;
    }
  }

  resetSpeed() {
    this.initSpeed();
  }

  get speed() {
    return this._speed;
  }

  getState() {
    return {
      speed: this._speed,
    };
  }
}
