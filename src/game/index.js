import { config } from "./config";
import { Game } from "./Game";
import { Player } from "./Player";
import { Rival } from "./Rival";

export const gameRow = config.game.row;
export const gameCol = config.game.col;

let selfGame = null;

export function initSelfGame(map) {
  selfGame = new Game(map);
  selfGame.addPlayer(createPlayer("self"));
}

export function initRivalGame(map) {
  const game = new Game(map);
  game.addPlayer(createPlayer("rival"));
  game.start();
}

export function startGame() {
  selfGame.start();
}

function createPlayer(userType) {
  return userType === "self" ? new Player() : new Rival();
}
