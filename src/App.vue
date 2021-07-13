<template>
  <div style="display: flex; marge: 10px">
    <Game user-type="self"></Game>
    <Game user-type="rival"></Game>

    <button v-show="started" @click="handleStartGame">startGame</button>
  </div>
</template>

<script setup>
import Game from "./components/Game.vue";
import { startGame } from "./game/index.js";
import { ref } from "vue";

const started = ref(true);

function handleStartGame() {
  startGame();
  started.value = false;
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
