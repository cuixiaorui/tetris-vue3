import { rotate } from "./matrix";
export class Box {
  constructor() {
    this.x = 0;
    this.y = 0;
    // this.shape = [
    //   [1, 1],
    //   [1, 1],
    // ];
    this.shape = [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ];

    this._rotateStrategys = [];
  }
  rotateStrategys(strategy) {
    if (!strategy) return;
    this._rotateStrategys = strategy;
  }

  _rotateIndex = 0;
  rotate() {
    const rotate = this._rotateStrategys[this._rotateIndex];
    if(!rotate) return


    this.shape = rotate(this.shape);

    this._rotateIndex++;
    if (this._rotateIndex >= this._rotateStrategys.length) {
      this._rotateIndex = 0;
    }
  }
}

const boxInfos = {
  1: {
    shape: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    // 90 -> 270
    rotateStrategy: [rotate, (v) => rotate(rotate(rotate(v)))],
  },
  2: {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
};

// 利用继承的方式来处理
// shape 是不一样的

// 组合的方式来处理

// 随机创建box
export function createBox() {
  // 获取索引值
  const len = Object.keys(boxInfos).length;
  const key = Math.floor(Math.random() * len) + 1;

  const boxInfo = boxInfos[key];

  const box = new Box();
  box.y = -1;
  box.rotateStrategys(boxInfo.rotateStrategy);
  box.shape = boxInfo.shape;

  return box;
}
