<script setup lang="ts">
import ImageItem from "./ImageItem.vue";
import createPanZoom, { PanZoom, PanZoomOptions } from "panzoom";
import { ref, onMounted, Ref } from "vue";

let options: PanZoomOptions = {
  autocenter: true,
  bounds: true,
  transformOrigin: {
    x: 0.5,
    y: 0.5,
  },
  maxZoom: 10,
  minZoom: 0.1,
  smoothScroll: false
};
const canvas: Ref<HTMLElement | undefined> = ref(undefined);
const instance: Ref<PanZoom | undefined> = ref(undefined);

onMounted(() => {
  instance.value = createPanZoom(canvas.value!, options);
});
</script>

<template>
  <div id="main-canvas" ref="canvas">
    <ImageItem :zoom="instance?.getTransform().scale"/>
    <ImageItem :zoom="instance?.getTransform().scale"/>
  </div>
</template>

<style scoped>
#main-canvas {
  width: 100%;
  height: 100%;
}
</style>
