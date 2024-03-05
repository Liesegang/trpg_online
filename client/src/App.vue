<script setup lang="ts">
import { Ref, ref } from "vue";
import CanvasWrapper from "./components/CanvasWrapper.vue";
import { inject } from "vue";
import { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";
import KeyCloak from "@dsb-norge/vue-keycloak-js";

const drawer: Ref<boolean> = ref(false);

const keycloak: VueKeycloakInstance = inject(KeyCloak.KeycloakSymbol)!;
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item
          link
          prepend-icon="mdi-login"
          title="Login"
          @click="keycloak.login"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            @click="keycloak.logoutFn"
            color="primary"
            prepend-icon="mdi-logout"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>TRPG</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <CanvasWrapper />
    </v-main>
  </v-app>
</template>
