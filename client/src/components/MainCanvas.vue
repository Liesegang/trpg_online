<script setup lang="ts">
import ImageItem from "./ImageItem.vue";
import { ref, onMounted, Ref } from "vue";
import axios from "axios";

interface Character {
  id: string;
  name: string;
}

const canvas: Ref<HTMLElement | undefined> = ref(undefined);
const characters: Ref<Character[]> = ref([]);

onMounted(async () => {
  characters.value = (
    await axios.get<Character[]>("http://localhost:3000/character")
  ).data;
});
</script>

<template>
  <div id="main-canvas" ref="canvas" class="viewport">
    <ImageItem
      v-for="character in characters"
      :key="character.id"
      :name="character.name"
    />
    <div>不動点</div>
  </div>
</template>

<style scoped>
#main-canvas {
  width: 100%;
  height: 100%;
}
</style>
