export class Box {
  constructor(options = {}) {
    this._x = options.x || 0;
    this._y = options.y || 0;
    this.shape = options.shape || [
      [2, 0, 0],
      [2, 2, 0],
      [0, 2, 0],
    ];
    this._rotateIndex = 0;
    this._rotateStrategy = [];
  }

  setRotateStrategy(strategy) {
    if (strategy) {
      this._rotateStrategy = strategy;
    }
  }

  rotate() {
    const rotateFn = this._rotateStrategy[this._rotateIndex];
    this.shape = rotateFn(this.shape);
    this._rotateIndex = this.nextRotateIndex();
  }

  nextRotateIndex() {
    let index = this._rotateIndex;

    index++;
    if (index >= this._rotateStrategy.length) index = 0;

    return index;
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

  peerNextRotateShape() {
    const rotateFn = this._rotateStrategy[this.nextRotateIndex()];
    return rotateFn(this.shape);
  }
}

export function createBox({ x, y, shape } = {}) {
  return new Box({ x, y, shape });
}
