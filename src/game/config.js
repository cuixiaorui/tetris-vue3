export const config = {
  game: {
    row: 15,
    col: 10,
    speed: 1000,
    speedFactor: 0.6,
    speedMin: 30,
  },
  block: {
    width: 40,
    height: 40,
  },
};

// TODO 速度的逻辑可以单独抽离出去
export function speedUp() {
  config.game.speed = config.game.speed * config.game.speedFactor;
  if (config.game.speed <= config.game.speedMin) {
    config.game.speed = config.game.speedMin;
  }
}

export function resetSpeed() {
  config.game.speed = 1000;
}
