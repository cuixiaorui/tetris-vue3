<template>
  <div>
    <div class="row" v-for="(row, rIndex) in gameRow" :key="rIndex">
      <div v-for="(col, cIndex) in gameCol" :key="cIndex">
        <Box :type="map[rIndex][cIndex]"></Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gameRow, gameCol } from "../game";
import Box from "./Box.vue";
import { initGame } from "../game";
import { reactive, ref } from "vue";

const map = reactive([]);
initGame(map);
</script>

<style scoped>
.row {
  display: flex;
}
</style>
