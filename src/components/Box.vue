<template>
  <div class="box">{{type}}</div>
</template>

<script setup>
// type
import { computed } from "vue";

const props = defineProps(["type"]);

const mapToColor = {
  [-1]: "red",
  [0]: "#879372",
  [1]: "red",
};

const color = computed(() => mapToColor[props.type]);
</script>

<style scoped>
.box {
  width: 20px;
  height: 20px;
  margin: 0 2px 2px 0;
  background: v-bind(color);
}
</style>
