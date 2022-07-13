import { createApp } from 'vue'
import App from './App.vue'
import "element-plus/dist/index.css";
import {locale, elements } from "./plugins/elements"
import * as ElementPlusIconsVue from "@element-plus/icons-vue";



const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
elements.forEach(El => app.use(El, locale))
app.mount('#app');
