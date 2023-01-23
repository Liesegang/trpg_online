import { createApp } from "vue";
import App from "./App.vue";

import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// eslint-disable-next-line @typescript-eslint/typedef
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
