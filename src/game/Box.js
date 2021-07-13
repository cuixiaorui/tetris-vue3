import { rotate, rotate270 } from "./matrix";
export class Box {
  constructor(options = {}) {
    this._x = options.x || 0;
    this._y = options.y || 0;
    this._type = options.type || "";
    this._shape = options.shape || [
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

  peerNextRotateShape() {
    const rotateFn = this._rotateStrategy[this.nextRotateIndex()];
    return rotateFn(this.shape);
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

  get type() {
    return this._type;
  }

  get shape() {
    return this._shape;
  }

  set shape(val) {
    this._shape = val;
  }
}

export function createBox({ x, y, shape, type } = {}) {
  return new Box({ x, y, shape, type });
}

export function randomCreateBox() {
  const { shape, rotateStrategy, type } = randomGenerateShape();

  const box = createBox({ shape, type, y: -1 });
  box.setRotateStrategy(rotateStrategy);

  return box;
}

const boxsInfo = {
  0: {
    type: 0,
    shape: [
      [1, 1],
      [1, 1],
    ],
  },

  1: {
    type: 1,
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotateStrategy: [rotate, rotate270],
  },

  2: {
    type: 2,
    shape: [
      [5, 5, 5],
      [0, 5, 0],
      [0, 0, 0],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },

  3: {
    type: 3,
    shape: [
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
    ],
    rotateStrategy: [rotate, rotate270],
  },
  4: {
    type: 4,
    shape: [
      [4, 0, 0],
      [4, 0, 0],
      [4, 4, 0],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },

  5: {
    type: 5,
    shape: [
      [0, 0, 6],
      [0, 0, 6],
      [0, 6, 6],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },
};

function randomGenerateShape() {
  const len = Object.keys(boxsInfo).length - 1;
  const index = Math.ceil(Math.random() * len);

  return boxsInfo[index];
}

export function getBoxsInfoByKey(key) {
  return boxsInfo[key];
}
