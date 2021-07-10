<template>
  <div class="game">
    <div class="row" v-for="(row, rIndex) in gameRow" :key="rIndex">
      <div v-for="(col, cIndex) in gameCol" :key="cIndex">
        <Box :type="map[rIndex][cIndex]"></Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import Box from "./Box.vue";
import { reactive, defineProps } from "vue";
import { gameRow, gameCol, initSelfGame, initRivalGame } from "../game";

const props = defineProps(["userType"]);
const map = reactive([]);

if (props.userType === "self") {
  initSelfGame(map);
} else {
  initRivalGame(map);
}
</script>

<style scoped>
.game {
  margin: 0 20px;
}
.row {
  /* background: #a0ad8a; */
  display: flex;
}
</style>
