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

enableVueBindings(Vue);

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// eslint-disable-next-line @typescript-eslint/typedef
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(ContextMenu).mount("#app");
