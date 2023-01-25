<script setup lang="ts">
import { Ref, ref } from "vue";
import CanvasWrapper from "./components/CanvasWrapper.vue";

const drawer: Ref<boolean> = ref(false);
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app> </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <CanvasWrapper />
    </v-main>
  </v-app>
</template>
