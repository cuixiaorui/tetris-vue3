import { config } from "./config";
export class Box {
  constructor(options = {}) {
    this._x = options.x || 0;
    this._y = options.y || 0;
    this._width = 0;
    this._height = 0;
    this.shape = options.shape || [
      [2, 0, 0],
      [2, 2, 0],
      [0, 2, 0],
    ];

    this.calculateWidth();
    this.calculateHeight();
    this.center();
  }

  center() {
    this._x = Math.floor((config.game.col - this._width) * 0.5);
  }

  calculateHeight() {
    const len = this.shape.length - 1;
    for (let i = len; i >= 0; i--) {
      const row = this.shape[i];

      const r = row.every((v) => v === 0);

      if (!r) {
        this._height = i + 1;
        return;
      }
    }
  }

  calculateWidth() {
    const row = this.shape.length;
    const col = this.shape[0].length;

    for (let i = col - 1; i >= 0; i--) {
      for (let j = 0; j < row; j++) {
        let val = this.shape[j][i];
        if (val) {
          this._width = i + 1;
          return;
        }
      }
    }

    // 推导公式
    // 需要从后向前检测
    // [row][col]
    //     this.shape[0][2] !== 0;
    //     this.shape[1][2] !== 0;
    //     this.shape[2][2] !== 0;

    //     this.shape[0][1] !== 0;
    //     this.shape[1][1] !== 0;
    //     this.shape[2][1] !== 0;

    //     this.shape[0][0] !== 0;
    //     this.shape[1][0] !== 0;
    //     this.shape[2][0] !== 0;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
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
    this.calculateWidth();
    this.calculateHeight();
  }

  getBottomPoints() {
    let result = [];
    for (let i = 0; i < this._width; i++) {
      for (let j = this._height - 1; j >= 0; j--) {
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
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
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
    for (let i = 0; i < this._height; i++) {
      for (let j = this._width - 1; j >= 0; j--) {
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

export function createBox({ x, y, shape }) {
  return new Box({ x, y, shape });
}
