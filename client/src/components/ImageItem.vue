<script setup lang="ts">
import { defineProps, Ref, ref } from "vue";
// eslint-disable-next-line no-unused-vars
import Moveable, { OnDrag, OnRotate, OnScale } from "vue3-moveable";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const target: Ref<HTMLElement | undefined> = ref(undefined);

function onDrag(e: OnDrag) {
  e.target.style.transform = e.transform;
}

function onScale(e: OnScale) {
  e.target.style.transform = e.drag.transform;
}

function onRotate(e: OnRotate) {
  e.target.style.transform = e.drag.transform;
}
</script>

<template>
  <div class="container">
    <div class="image-wrapper" ref="target">
      <img src="@/assets/logo.png"/>
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
