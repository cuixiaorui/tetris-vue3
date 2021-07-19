let startTime = Date.now();
const tickerHandler = () => {
  tickers.forEach((ticker) => {
    ticker(Date.now() - startTime);
  });
  startTime = Date.now();
  requestAnimationFrame(tickerHandler);
};

requestAnimationFrame(tickerHandler);

const tickers = [];
export function addTicker(fn) {
  tickers.push(fn);
}

export function removeTicker(fn) {
  const index = tickers.indexOf(fn);
  if (index !== -1) {
    tickers.splice(index, 1);
  }
}
