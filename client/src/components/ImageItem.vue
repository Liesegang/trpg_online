<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { Character } from "@/types";
import { defineProps, PropType, Ref, ref } from "vue";
// eslint-disable-next-line no-unused-vars
import Moveable, { OnDrag, OnRotate, OnScale } from "vue3-moveable";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const target: Ref<HTMLElement | undefined> = ref(undefined);

function onDrag(e: OnDrag) {
  props.character.transform = e.transform;
}

function onScale(e: OnScale) {
  props.character.transform = e.drag.transform;
}

function onRotate(e: OnRotate) {
  props.character.transform = e.drag.transform;
}
</script>

<template>
  <div class="container">
    <div class="image-wrapper" ref="target" :style="{transform: props.character.transform}">
      <img src="@/assets/logo.png" />
    </div>
    <Moveable
      className="moveable"
      :target="target"
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
.image-wrapper {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
}

img {
  display: block;
}
</style>
