import { createApp, type ComponentOptions } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Button, Tabbar, TabbarItem } from 'vant';
import './assets/base.css';
import 'vant/lib/index.css';
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Button).use(Tabbar).use(TabbarItem);

const registerGlobalComponent = () => {
  const components = import.meta.glob('./components/**/*.vue', { eager: true });
  Object.entries(components).forEach(([key, module]) => {
    const result = key.match(/\w+(?!\/)(?=\.)/g);
    if (result) {
      app.component(result[0], (module as ComponentOptions).default);
    }
  });
};
registerGlobalComponent();

app.mount('#app');
