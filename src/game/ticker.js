const tickers = new Set();

// ticker
let startTime = Date.now();
function animation() {
  const interval = Date.now() - startTime;
  for (const ticker of tickers) {
    ticker(interval);
  }

  startTime = Date.now();
  requestAnimationFrame(animation);
}

requestAnimationFrame(animation);

export function add(fn) {
  tickers.add(fn);
}

export function remove(fn) {
  tickers.delete(fn);
}
