import type { ComponentOptions } from 'vue';
export type VueModuleNamespace = {
  [Symbol.toStringTag]: 'Module';
  default: ComponentOptions;
};
