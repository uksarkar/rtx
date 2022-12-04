import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import axios from "axios";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

// axios setup
axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

app.mount("#app");
