<script setup lang="ts">
import { PropType, Ref, ref, defineProps } from "vue";
import CanvasWrapper from "./components/CanvasWrapper.vue";
// import FileBrowser from "s3-vuetify-file-browser";
import Keycloak from "keycloak-js";

const drawer: Ref<boolean> = ref(false);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  keycloak: {
    type: Object as PropType<Keycloak>
  }
})

// const endpoints: Ref<any> = ref();

// endpoints.value = {
//   list: {
//     url: "document/url",

//     method: "get",
//   },

//   upload: {
//     url: "document/uploadurl",

//     method: "put",
//   },

//   download: {
//     url: "document/downloadurl",

//     method: "get",
//   },

//   delete: {
//     url: "document",

//     method: "delete",
//   },
// };
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app> </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ keycloak?.token }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- <file-browser :axiosConfig="{baseURL: 'http://localhost:9000'}" /> -->
      <CanvasWrapper />
    </v-main>
  </v-app>
</template>
