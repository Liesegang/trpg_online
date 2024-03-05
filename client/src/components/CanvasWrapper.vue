<script setup lang="ts">
import MainCanvas from "./MainCanvas.vue";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import FileBrowser from "s3-vuetify-file-browser";

const endpoints = {
  list: {
    url: "document/url",
    method: "get",
  },
  upload: {
    url: "document/uploadurl",
    method: "put",
  },
  download: {
    url: "document/downloadurl",
    method: "get",
  },
  delete: {
    url: "document",
    method: "delete",
  },
};
</script>

<template>
  <file-browser :endpoints="endpoints" />
  <vue-infinite-viewer
    id="canvas-wrapper"
    class="viewer"
    :useMouseDrag="true"
    :useAutoZoom="true"
    :zoomRange="[0.1, 10]"
    :maxPinchWheel="10"
  >
    <MainCanvas />
  </vue-infinite-viewer>
</template>

<style scoped>
#canvas-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1d1d1d;
  overflow: hidden;
}
</style>
