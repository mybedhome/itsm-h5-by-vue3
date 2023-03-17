import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Root from './App.vue';
import router from './router';
import './assets/base.css';
import '@vant/touch-emulator';
import type { VueModuleNamespace } from './types/VueModuleNamespace';
import { login } from './services/app';
import type { App } from 'vue';

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
  registerGlobalComponent(app);
  app.use(router);
  app.mount('#app');
};

(async () => {
  const query = window.location.search;

  if (query.includes('code') && query.includes('state')) {
    localStorage.setItem(location.origin, location.href);
    window.location.href = location.href.replace(query, '');
  } else {
    // 由于每个项目的后端返回的接口数据结构可能不一致，这个地方可能需要稍作修改
    const { error, data, responseHeaders } = await login({
      url: localStorage.getItem(location.origin) || location.href,
    });

    if (!error) {
      localStorage.removeItem(location.origin);
      localStorage.setItem('loginInfo', JSON.stringify(data));
      localStorage.setItem(
        'tokenInfo',
        responseHeaders.get('fulltoken') as string
      );
      mount();
    }
  }
})();
