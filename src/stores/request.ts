import { ref, reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
import type { AxiosRequestConfig } from 'axios';
import { utils } from '@/utils';
export const useRequestStore = defineStore('request', () => {
  const requestObject = ref<{ [propName: string]: AbortController }>({});
  const getRequestIdentifier = (config: AxiosRequestConfig) => {
    const data = utils.formDataToObject(config.data);
    return (
      (config.url as string) +
      (config.params ? '-' + JSON.stringify(config.params) : '') +
      (data ? '-' + JSON.stringify(data) : '') +
      '-' +
      config.method
    );
  };

  function addRequest(config: AxiosRequestConfig) {
    const identifier = getRequestIdentifier(config);

    console.log('identifier', identifier);
    if (requestObject.value[identifier]) {
      removeRequest(config, identifier);
    }
    const controller = new AbortController();
    config.signal = controller.signal;
    requestObject.value[identifier] = controller;
  }

  function removeRequest(
    config: AxiosRequestConfig,
    requestIdentifier: string = ''
  ) {
    const identifier = requestIdentifier || getRequestIdentifier(config);
    requestObject.value[identifier].abort('重复请求被取消');
    delete requestObject.value[identifier];
  }
  return { addRequest, removeRequest, requestObject };
});
