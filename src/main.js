import { createApp } from "vue";
import Toast, { toastInjectionKey } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/style.css";

import App from "./App.vue";

const app = createApp(App);
app.use(Toast);
app.mount("#app");

//createApp(App).mount("#app");
