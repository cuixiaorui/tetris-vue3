import { rotate, rotate180, rotate270 } from "./rotate";
const boxsInfo = {
  0: {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },

  1: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotateStrategy: [rotate, rotate270],
  },

  2: {
    shape: [
      [5, 5, 5],
      [0, 5, 0],
      [0, 0, 0],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },

  3: {
    shape: [
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
    ],
    rotateStrategy: [rotate, rotate270],
  },
  4: {
    shape: [
      [4, 0, 0],
      [4, 0, 0],
      [4, 4, 0],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },

  5: {
    shape: [
      [0, 0, 6],
      [0, 0, 6],
      [0, 6, 6],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },
};

export function randomGenerateShape() {
  const len = Object.keys(boxsInfo).length - 1;
  const index = Math.ceil(Math.random() * len);

  return boxsInfo[index];
}
