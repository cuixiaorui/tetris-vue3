const tickers = [];

// ticker
let startTime = Date.now();
function animate() {
  const interval = Date.now() - startTime;

  for (const ticker of tickers) {
    ticker.fn.call(ticker.listener, interval);
  }

  startTime = Date.now();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

export function addTicker(fn, listener) {
  for (let i = 0; i < tickers.length; i++) {
    if (tickers[i].fn == fn && tickers[i].listener == listener) {
      return;
    }
  }

  tickers.push({
    fn,
    listener,
  });
}

export function removeTicker(fn, listener) {
  for (let i = 0; i < tickers.length; i++) {
    if (tickers[i].fn == fn && tickers[i].listener == listener) {
      tickers.splice(i, 1);
    }
  }
}

