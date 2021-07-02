<template>
  <div class="game">
    <div class="row" v-for="(row, rIndex) in gameRow" :key="rIndex">
      <div v-for="(col, cIndex) in gameCol" :key="cIndex">
        <Block :type="map[rIndex][cIndex]"></Block>
      </div>
    </div>
  </div>
</template>

<script setup>
import Block from "./Block.vue";
import { reactive } from "vue";
import { startGame, config } from "../game";

const gameRow = config.game.row;
const gameCol = config.game.col;

const map = reactive([]);

startGame(map);
</script>

<style scoped>
.row {
  display: flex;
}
</style>
