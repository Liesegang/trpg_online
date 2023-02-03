<script setup lang="ts">
import ImageItem from "./ImageItem.vue";
import { ref, onMounted, Ref } from "vue";
import axios from "axios";
import { Character } from "../types";
import { store } from "../store";

const canvas: Ref<HTMLElement | undefined> = ref(undefined);
const characters: Ref<Character[]> = ref([]);

onMounted(async () => {
  characters.value = (
    await axios.get<Character[]>("http://localhost:3000/character")
  ).data;
});

function addCharacter() {
  store.characters.push({ name: "hoge", id: "fuga", transform: "" });
}
</script>

<template>
  <div id="main-canvas" ref="canvas" class="viewport">
    <ImageItem
      v-for="character in store.characters"
      :key="character.id"
      :character="character"
    />
    <v-btn @click="addCharacter()">Add Character</v-btn>
    <div>不動点</div>
  </div>
</template>

<style scoped>
#main-canvas {
  width: 100%;
  height: 100%;
}
</style>
