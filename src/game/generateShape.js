const shapes = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [2, 0, 0],
    [2, 2, 0],
    [0, 2, 0],
  ],
  [
    [0, 3],
    [3, 3],
    [3, 0],
  ],
  [
    [4, 0, 0],
    [4, 0, 0],
    [4, 4, 0],
  ],
  [
    [5, 5, 5],
    [0, 5, 0],
    [0, 0, 0],
  ],
  [
    [0, 6],
    [0, 6],
    [6, 6],
  ],
  [
    [7, 0, 0],
    [7, 0, 0],
    [7, 0, 0],
    [7, 0, 0],
  ],
];

export function randomGenerateShape() {
  const len = shapes.length - 1;
  const index = Math.ceil(Math.random() * len);
  return shapes[index];
}
