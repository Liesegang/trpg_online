<script setup lang="ts">
import { ref } from "vue";
const position = ref({top: 0, left: 0});
</script>

<template>
  <img src="@/assets/logo.png" :style="{top: `${position.top}px`, left: `${position.left}px`}"/>
</template>

<style scoped>
img {
  position: absolute;
}
</style>
