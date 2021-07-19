import { createApp } from "vue";
import App from "./App.vue";
import { initSocket } from "./game/socket";

initSocket()
createApp(App).mount("#app");
