import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
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
const app = createApp(App);

app.use(createPinia());
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

const registerGlobalComponent = () => {
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
registerGlobalComponent();

app.mount('#app');
