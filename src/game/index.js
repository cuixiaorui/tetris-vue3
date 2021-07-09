// TODO 这里有些逻辑可以放到 box 里面
// addBox  nextBox 可以放到 box 里面
// 需要考虑 activeBox 的逻辑处理
import { config } from "./config";
import { Game } from "./Game";
import { Player } from "./Player";
import { Rival } from "./Rival";

export const gameRow = config.game.row;
export const gameCol = config.game.col;

const games = [];
export function initGame({ map, userType }) {
  const game = new Game(map);
  game.addPlayer(createPlayer(userType));
  games.push(game);
}

export function startGame() {
  games.forEach((game) => {
    game.start();
  });
}

function createPlayer(userType) {
  return userType === "self" ? new Player() : new Rival();
}
