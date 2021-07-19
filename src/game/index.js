// 游戏
export * from "./config";
import { Rival } from "./Rival";
import { Player } from "./Player";
import { Game } from "./Game";


let selfGame = null;
export function createSelfGame(map) {
  selfGame = new Game(map);
  selfGame.addPlayer(new Player());
}

let rivalGame = null;
export function createRivalGame(map) {
  rivalGame = new Game(map);
  rivalGame.addPlayer(new Rival());
}

export function startGame() {
  selfGame.start();
}
