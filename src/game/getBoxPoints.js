export function getBottomPoints(matrix) {
  let result = [];
  const col = matrix[0].length;
  const row = matrix.length;
  for (let i = 0; i < col; i++) {
    for (let j = row - 1; j >= 0; j--) {
      const point = matrix[j][i];
      if (point) {
        result.push({ x: i, y: j });
        break;
      }
    }
  }
  return result;
}

export function getLeftPoints(matrix) {
  let result = [];
  const col = matrix[0].length;
  const row = matrix.length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j]) {
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

export function getRightPoints(matrix) {
  let result = [];
  const col = matrix[0].length;
  const row = matrix.length;

  for (let i = 0; i < row; i++) {
    for (let j = col - 1; j >= 0; j--) {
      if (matrix[i][j]) {
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

const mapFn = {
  left: getLeftPoints,
  right: getRightPoints,
  bottom: getBottomPoints,
};

export function getPointsHandler(direction) {
  return mapFn[direction];
}
