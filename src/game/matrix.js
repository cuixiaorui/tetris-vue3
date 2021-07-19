export function getBottomPoints(matrix) {
  const row = matrix.length;
  const col = matrix[0].length;
  let r = [];
  for (let i = 0; i < col; i++) {
    // 倒着来，从后面往前面数
    for (let j = row - 1; j >= 0; j--) {
      const v = matrix[j][i];
      if (v > 0) {
        r.push({
          x: i,
          y: j,
        });
        break;
      }
    }
  }

  return r;
}

export function getLeftPoints(matrix) {
  const row = matrix.length;
  const col = matrix[0].length;

  let r = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const v = matrix[i][j];
      if (v > 0) {
        r.push({
          x: j,
          y: i,
        });
        break;
      }
    }
  }

  return r;
}

export function getRightPoints(matrix) {
  const row = matrix.length;
  const col = matrix[0].length;

  let r = [];
  for (let i = 0; i < row; i++) {
    for (let j = col - 1; j >= 0; j--) {
      if (matrix[i][j] > 0) {
        r.push({
          x: j,
          y: i,
        });
        break;
      }
    }
  }

  return r;
}

export function rotate(matrix) {
  // 列 = 行
  // 行 = n -1 - 列（j）; n 表示总行数
  const row = matrix.length;
  const col = matrix[0].length;

  const r = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      var k = row - 1 - j;
      if (!r[k]) {
        r[k] = [];
      }
      // 老的行变成列
      r[k][i] = matrix[i][j];
    }
  }

  return r;
}
