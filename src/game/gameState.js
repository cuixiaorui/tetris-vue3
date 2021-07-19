import { gameDownIntervalTime } from "./config";
// speed
export const gameState = {
  downIntervalTime: gameDownIntervalTime,
  factor: 0.3,
};

export function upSpeed() {
  gameState.downIntervalTime *= gameState.factor;
  const minVal = 60;
  if (gameState.downIntervalTime < minVal) {
    gameState.downIntervalTime = minVal;
  }
}

export function resetSpeed() {
  gameState.downIntervalTime = gameDownIntervalTime;
}

export function superUpSpeed() {
  gameState.downIntervalTime = 1;
}

