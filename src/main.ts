import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub);

const app = createApp(App);

app.use(createPinia());

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
