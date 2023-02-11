<script setup lang="ts">
import CharacterItem from "@/components/CharacterItem.vue";
import { ref, Ref } from "vue";
import { store } from "@/store";
import Moveable, { OnDrag, OnRotate, OnScale } from "vue3-moveable";
import { v4 as uuidv4 } from "uuid";
import { observeDeep } from "@syncedstore/core";

const canvas: Ref<HTMLElement | undefined> = ref(undefined);
const selected: Ref<HTMLElement | undefined> = ref(undefined);
const moveable: Ref<typeof Moveable | undefined> = ref(undefined);

function addCharacter() {
  const id: string = uuidv4();
  if (store.characters)
    store.characters[id] = { name: "hoge", id, transform: "" };
}

function onDrag(e: OnDrag) {
  const id = e.target.getAttribute("data-id");
  if (id) {
    store.characters[id].transform = e.transform;
  }
}

function onScale(e: OnScale) {
  const id = e.target.getAttribute("data-id");
  if (id) {
    store.characters[id].transform = e.drag.transform;
  }
}

function onRotate(e: OnRotate) {
  const id = e.target.getAttribute("data-id");
  if (id) {
    store.characters[id].transform = e.drag.transform;
  }
}

observeDeep(store.characters, () => {
  if (moveable.value != undefined) moveable.value.updateRect();
});
</script>

<template>
  <div id="main-canvas" ref="canvas" class="viewport">
    <v-btn @click="addCharacter()">Add Character</v-btn>
    <template v-for="(character, i) in store.characters" :key="i">
      <CharacterItem
        v-model:character="store.characters[i]"
        @selected="(elem: HTMLElement | undefined) => selected = elem"
        @delete="(id: string) => delete store.characters[id]"
      />
    </template>
    <div>不動点</div>
    <Moveable
      className="moveable"
      @drag="onDrag"
      @scale="onScale"
      @rotate="onRotate"
      :target="selected"
      :draggable="true"
      :scalable="true"
      :rotatable="true"
      :stopPropagation="true"
      ref="moveable"
    />
  </div>
</template>

<style scoped>
#main-canvas {
  width: 100%;
  height: 100%;
}
</style>
