<template>
  <div style="display: flex; marge: 10px">
    <Game user-type="self"></Game>
    <Game user-type="rival"></Game>

    <button @click="handleStartGame">startGame</button>
  </div>
</template>

<script setup>
import Game from "./components/Game.vue";

import { startGame } from "./game/index.js";

function handleStartGame() {
  startGame();
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
