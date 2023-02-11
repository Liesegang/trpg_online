import { createApp } from "vue";
import * as Vue from "vue";
import axios from "axios";
import { enableVueBindings } from "@syncedstore/core";
import App from "./App.vue";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import ContextMenu from "@imengyu/vue3-context-menu";
import Keycloak, { KeycloakOnLoad } from "keycloak-js";

enableVueBindings(Vue);

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// eslint-disable-next-line @typescript-eslint/typedef
const vuetify = createVuetify({
  components,
  directives,
});

const initOptions = {
  url: "http://localhost:8080/",
  realm: "myrealm",
  clientId: "vueapp",
  onLoad: "login-required" as KeycloakOnLoad,
};

const keycloak = new Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log("Authenticated");
    console.log(keycloak);
    createApp(App, { keycloak }).use(vuetify).use(ContextMenu).mount("#app");
  }
  setInterval(() => {
    keycloak
      .updateToken(70)
      .then((refreshed) => {
        if (refreshed) {
          console.log("Token refreshed" + refreshed);
        } else {
          console.warn(
            "Token not refreshed, valid for " +
              Math.round(
                keycloak.tokenParsed?.exp! +
                  keycloak.timeSkew! -
                  new Date().getTime() / 1000
              ) +
              " seconds"
          );
        }
      })
      .catch(() => {
        console.error("Failed to refresh token");
      });
  }, 600);
});
