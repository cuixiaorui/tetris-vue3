import { createApp } from "vue";
import App from "./App.vue";
import { initSocket } from "./utils/socket";

initSocket();
createApp(App).mount("#app");
