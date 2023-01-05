import { createApp } from 'vue';
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

app.mount('#app');
