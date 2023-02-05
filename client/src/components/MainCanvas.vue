<script setup lang="ts">
import CharacterItem from "./CharacterItem.vue";
import { ref, onMounted, Ref } from "vue";
import axios from "axios";
import { Character } from "../types";
import { store } from "../store";
import Moveable, { OnDrag, OnRotate, OnScale } from "vue3-moveable";
import { uuidv4 } from "lib0/random";

const canvas: Ref<HTMLElement | undefined> = ref(undefined);
const characters: Ref<Character[]> = ref([]);
const selected: Ref<HTMLElement | null> = ref(null);

onMounted(async () => {
  characters.value = (
    await axios.get<Character[]>("http://localhost:3000/character")
  ).data;
});

function addCharacter() {
  const id: string = uuidv4();
  if(store.characters)
    store.characters[id] = { name: "hoge", id, transform: "" };
}

function onDrag(e: OnDrag) {
  const key = e.target.getAttribute("data-id");
  if (key) {
    store.characters[key].transform = e.transform;
  }
}

function onScale(e: OnScale) {
  const key = e.target.getAttribute("data-id");
  if (key) {
    store.characters[key].transform = e.drag.transform;
  }
}

function onRotate(e: OnRotate) {
  const key = e.target.getAttribute("data-id");
  if (key) {
    store.characters[key].transform = e.drag.transform;
  }
}
</script>

<template>
  <div id="main-canvas" ref="canvas" class="viewport">
    <v-btn @click="addCharacter()">Add Character</v-btn>
    <template v-for="(character, i) in store.characters" :key="i">
      <CharacterItem
        v-model:character="store.characters[i]"
        @selected="(elem) => selected = elem as HTMLElement"
      />
    </template>
    />
    <div>不動点</div>
    <Moveable
      className="moveable"
      :target="selected"
      @drag="onDrag"
      @scale="onScale"
      @rotate="onRotate"
      :draggable="true"
      :scalable="true"
      :rotatable="true"
      :stopPropagation="true"
    />
  </div>
</template>

<style scoped>
#main-canvas {
  width: 100%;
  height: 100%;
}
</style>
