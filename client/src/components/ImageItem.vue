<script setup lang="ts">
import { defineProps, onMounted, Ref, ref } from "vue";

const props = defineProps({
  zoom: {
    type: Number,
    default: 1,
  },
  name: {
    type: String,
    required: true
  }
});

interface Position {
  top: number;
  left: number;
}

const position: Ref<Position> = ref({ top: 0, left: 0 });
const prevX: Ref<number> = ref(0);
const prevY: Ref<number> = ref(0);
const isDragging: Ref<boolean> = ref(false);

onMounted(() => {
  document.addEventListener("pointermove", handleDoDrag.bind(this));
  document.addEventListener("mouseup", handleStopDrag.bind(this));
});

const handleStartDrag = (e: MouseEvent) => {
  document.body.style.userSelect = 'none';
  isDragging.value = true;
  prevY.value = e.clientY;
  prevX.value = e.clientX;
  e.stopPropagation();
  e.preventDefault();
}

function handleStopDrag(e: MouseEvent) {
  document.body.style.userSelect = 'auto';
  isDragging.value = false;
  e.stopPropagation();
  e.preventDefault();
}

function handleDoDrag(e: MouseEvent) {
  if (!isDragging.value) {
    return;
  }
  const diffY: number = e.clientY - prevY.value;
  const diffX: number = e.clientX - prevX.value;
  prevY.value = e.clientY;
  prevX.value = e.clientX;
  position.value.top += diffY / props.zoom;
  position.value.left += diffX / props.zoom;
  e.stopPropagation();
  e.preventDefault();
}
</script>

<template>
  <div>
    {{ name }}
    <img
    src="@/assets/logo.png"
    :style="{ top: `${position.top}px`, left: `${position.left}px` }"
    @mousedown="handleStartDrag"
  />
  </div>
</template>

<style scoped>
img {
  position: absolute;
}
</style>
