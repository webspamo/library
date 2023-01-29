import {createApp} from "vue";
import {createPinia} from "pinia";
import LibraryApp from "./App.vue";

const pinia = createPinia();

createApp(LibraryApp).use(pinia).mount("#app");
