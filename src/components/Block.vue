<template>
  <div class="block" :style="styleInfo"></div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { config } from "../game";

const props = defineProps(["type"]);
const styleInfo = computed(() => {
  return {
    width: config.block.width + "px",
    height: config.block.height + "px",
    background: props.type === 0 ? "black" : "red",
  };
});
</script>
<style scoped>
.block {
  /* background: black; */
  color: white;
}
</style>
