<template>
  <div class="block" :style="blockStyleInfo">
    <div class="inBox" :style="styleInfo"></div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { config } from "../game";

const props = defineProps(["type"]);

const blockStyleInfo = computed(() => {
  return {
    borderColor: props.type === 0 ? "#879372" : "black"
  };
});
const styleInfo = computed(() => {
  return {
    // width: config.block.width + "px",
    // height: config.block.height + "px",
    background: props.type === 0 ? "#879372" : "black",
  };
});
</script>
<style scoped>
.block {
  width: 20px;
  height: 20px;
  border: 3px solid #879372;
  /* border-color: #879372; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px 2px 0;
  /* background-color: #a0ad8a; */
}
.inBox {
  width: 18px;
  height: 18px;
}
</style>
