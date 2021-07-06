export function rotate(matrix) {
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
