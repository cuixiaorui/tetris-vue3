const tickers = new Set();

// ticker
let startTime = Date.now();
function animate() {
  const interval = Date.now() - startTime;

  for (const ticker of tickers) {
    ticker(interval);
  }

  startTime = Date.now();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

export function add(fn) {
  tickers.add(fn);
}

export function remove(fn) {
  tickers.delete(fn);
}
