<script setup lang="ts">
import MainCanvas from "./MainCanvas.vue";
</script>

<template>
  <div id="canvas-wrapper">
    <MainCanvas />
  </div>
</template>

<style scoped>
#canvas-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: darkslategray;
  overflow: hidden;
}
</style>
