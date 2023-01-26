<script setup lang="ts">
import ImageItem from "./ImageItem.vue";
import createPanZoom, { PanZoom, PanZoomOptions } from "panzoom";
import { ref, onMounted, Ref } from "vue";
import axios from "axios";

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

interface Character {
  id: string;
  name: string;
}

const canvas: Ref<HTMLElement | undefined> = ref(undefined);
const instance: Ref<PanZoom | undefined> = ref(undefined);
const characters: Ref<Character[]> = ref([]);

onMounted(async () => {
  instance.value = createPanZoom(canvas.value!, options);
  characters.value = (await axios.get<Character[]>("http://localhost:3000/character")).data
});
</script>

<template>
  <div id="main-canvas" ref="canvas">
    <v-for character in characters></v-for>
    <ImageItem v-for="character in characters" :key="character.id" :name="character.name" :zoom="instance?.getTransform().scale"/>
  </div>
</template>

<style scoped>
#main-canvas {
  width: 100%;
  height: 100%;
}
</style>
