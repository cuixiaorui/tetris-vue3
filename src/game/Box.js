import { config } from "./config";
export class Box {
  constructor(options = {}) {
    this._x = options.x || 0;
    this._y = options.y || 0;
    this.shape = options.shape || [
      [2, 0, 0],
      [2, 2, 0],
      [0, 2, 0],
    ];
  }

  center() {
    // TODO 以后在实现
    // this._x = Math.floor((config.game.col - this._width) * 0.5);
  }

  get x() {
    return this._x;
  }

  set x(val) {
    this._x = val;
  }

  get y() {
    return this._y;
  }

  set y(val) {
    this._y = val;
  }

  getShape() {
    return this.shape;
  }

  setShape(val) {
    this.shape = val;
  }

  getBottomPoints() {
    let result = [];
    const col = this.shape[0].length;
    const row = this.shape.length;
    for (let i = 0; i < col; i++) {
      for (let j = row - 1; j >= 0; j--) {
        const point = this.getShape()[j][i];
        if (point) {
          result.push({ x: i, y: j });
          break;
        }
      }
    }
    return result;
  }

  getLeftPoints() {
    let result = [];
    const col = this.shape[0].length;
    const row = this.shape.length;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (this.shape[i][j]) {
          result.push({
            x: j,
            y: i,
          });
          break;
        }
      }
    }
    return result;
  }

  getRightPoints() {
    let result = [];
    const col = this.shape[0].length;
    const row = this.shape.length;

    for (let i = 0; i < row; i++) {
      for (let j = col - 1; j >= 0; j--) {
        if (this.shape[i][j]) {
          result.push({
            x: j,
            y: i,
          });
          break;
        }
      }
    }
    return result;
  }
}

export function createBox({ x, y, shape } = {}) {
  return new Box({ x, y, shape });
}
