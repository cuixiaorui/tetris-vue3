export function rotate(matrix) {
  //逆时针旋转 90 度
  //列 = 行
  //行 = n - 1 - 列(j);  n表示总行数
  var temp = [];
  var len = matrix.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      var k = len - 1 - j;
      if (!temp[k]) {
        temp[k] = [];
      }
      temp[k][i] = matrix[i][j];
    }
  }

  return temp;
}

export function rotate180(matrix) {
  //逆时针旋转 180 度
  //行 = h - 1 - 行(i);  h表示总行数
  //列 = n - 1 - 列(j);  n表示总列数
  var temp = [];
  var len = matrix.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      var k = len - 1 - i;
      if (!temp[k]) {
        temp[k] = [];
      }
      temp[k][len - 1 - j] = matrix[i][j];
    }
  }

  return temp;
}

export function rotate270(matrix) {
  //逆时针旋转 270 度
  //行 = 列
  //列 = n - 1 - 行(i);  n表示总列数
  var temp = [];
  var len = matrix.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      var k = len - 1 - i;
      if (!temp[j]) {
        temp[j] = [];
      }
      temp[j][k] = matrix[i][j];
    }
  }

  return temp;
}
