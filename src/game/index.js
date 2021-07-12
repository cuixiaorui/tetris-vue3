import { config } from "./config";
import { Game } from "./Game";
import { Player } from "./Player";
import { Rival } from "./Rival";

export const gameRow = config.game.row;
export const gameCol = config.game.col;

let selfGame = null;

// TODO 
// 自己的游戏需要 start ，别人的不需要 start
// 因为 dival 初始化要在 self 之前

export function initSelfGame(map) {
  selfGame = new Game(map);
  selfGame.addPlayer(new Player());
}

export function initRivalGame(map) {
  const game = new Game(map);
  game.addPlayer(new Rival());
  // 初始化的时候就需要 start 
  game.start();
}

export function startGame() {
  selfGame.start();
}
