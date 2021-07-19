export function intervalTimer() {
  let t = 0;
  return (n, intervalTime) => {
    t += n;
    if (t >= intervalTime) {
      t = 0;
      return true;
    }
    return false;
  };
}
