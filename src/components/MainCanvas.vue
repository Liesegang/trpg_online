<script setup lang="ts">
import ImageItem from "./ImageItem.vue";
import createPanZoom, { PanZoomOptions } from "panzoom";
import { ref, onMounted, Ref } from "vue";

let options: PanZoomOptions = {
  autocenter: true,
  bounds: true,
  transformOrigin: {
    x: 0.5,
    y: 0.5,
  },
};
const canvas: Ref<HTMLElement | undefined> = ref(undefined);

onMounted(() => {
  createPanZoom(canvas.value!, options);
});
</script>

<template>
  <div id="main-canvas" ref="canvas">
    <ImageItem />
  </div>
</template>

<style scoped>
#main-canvas {
  width: 100%;
  height: 100%;
}
</style>
