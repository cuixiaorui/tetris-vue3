<template>
  <div style="margin: 10px">
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
import { createSelfGame, createRivalGame } from "../game";
import { defineProps, reactive, ref } from "vue";

const props = defineProps(["type"]);

const map = reactive([]);

// 我自己 对手
if (props.type === "self") {
  createSelfGame(map)
} else if (props.type === "rival") {
  createRivalGame(map)
}
</script>

<style scoped>
.row {
  display: flex;
}
</style>
