import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Root from './App.vue';
import router from './router';
import {
  ConfigProvider,
  Button,
  Tabbar,
  TabbarItem,
  Search,
  Grid,
  GridItem,
  Icon,
  Popup,
  Calendar,
  ActionSheet,
  Form,
  Field,
  Picker,
  List,
  Cell,
} from 'vant';
import './assets/base.css';
import 'vant/lib/index.css';
import '@vant/touch-emulator';
import type { VueModuleNamespace } from './types/VueModuleNamespace';
import { login } from './services/app';
import { utils } from '@/utils/index';
import type { App } from 'vue';
import { http } from './utils/request';

const registerGlobalComponent = (app: App<Element>) => {
  const components = import.meta.glob('./components/**/*.vue', {
    eager: true,
  }) as { [propName: string]: VueModuleNamespace };
  Object.entries(components).forEach(([path, module]) => {
    const result = path.match(/\w+(?!\/)(?=\.)/g);
    if (result) {
      app.component(result[0], module.default);
    }
  });
};

const app = createApp(Root);
app.use(createPinia());
const mount = () => {
  app.use(router);

  app
    .use(ConfigProvider)
    .use(Popup)
    .use(Calendar)
    .use(ActionSheet)
    .use(Form)
    .use(Field)
    .use(Picker)
    .use(Button)
    .use(Icon)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Search)
    .use(List)
    .use(Cell)
    .use(Grid)
    .use(GridItem);
  registerGlobalComponent(app);
  app.mount('#app');
};

const authorize = () => {
  const query = window.location.search;
  if (query.includes('code') && query.includes('state')) {
    sessionStorage.setItem('redirect', location.href);
    window.location.href = window.location.href.replace(query, '');
  } else {
    login({
      url: sessionStorage.getItem('redirect') || location.href,
    }).then((res) => {
      if (!res.error) {
        sessionStorage.removeItem('redirect');
        localStorage.setItem('loginInfo', JSON.stringify(res));
        localStorage.setItem('tokenInfo', res.data.token);
        mount();
      }
    });
  }
};

authorize();
