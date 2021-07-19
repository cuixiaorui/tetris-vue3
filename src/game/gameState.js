import { gameDownIntervalTime } from "./config";
// speed
// export const gameState = {
//   downIntervalTime: gameDownIntervalTime,
//   factor: 0.3,
// };

// export function upSpeed() {
//   gameState.downIntervalTime *= gameState.factor;
//   const minVal = 60;
//   if (gameState.downIntervalTime < minVal) {
//     gameState.downIntervalTime = minVal;
//   }
// }

// export function resetSpeed() {
//   gameState.downIntervalTime = gameDownIntervalTime;
// }

// export function superUpSpeed() {
//   gameState.downIntervalTime = 1;
// }

export class GameState {
  constructor() {
    this.gameState = {
      downIntervalTime: gameDownIntervalTime,
      factor: 0.3,
    };
  }

  get downIntervalTime(){
    return this.gameState.downIntervalTime
  }

  upSpeed() {
    this.gameState.downIntervalTime *= this.gameState.factor;
    const minVal = 60;
    if (this.gameState.downIntervalTime < minVal) {
      this.gameState.downIntervalTime = minVal;
    }
  }

  resetSpeed() {
    this.gameState.downIntervalTime = gameDownIntervalTime;
  }
  superUpSpeed() {
    this.gameState.downIntervalTime = 1;
  }
}
