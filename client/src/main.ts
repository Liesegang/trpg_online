import { createApp } from "vue";
import axios from 'axios'
import App from "./App.vue";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// eslint-disable-next-line @typescript-eslint/typedef
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
