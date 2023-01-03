import { ref } from 'vue';
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
    let identifier = requestIdentifier || getRequestIdentifier(config);
    identifier = identifier.replaceAll(/\\/g, '');
    console.log('identifier', identifier);
    if (requestObject.value[identifier]) {
      requestObject.value[identifier].abort('重复请求被取消');
    }

    console.log('requestObject', requestObject.value);
    console.log('keys', Object.keys(requestObject.value));
    Object.keys(requestObject.value).forEach((v) => {
      console.log('v==' + v);
      console.log('identifier==', identifier);
      console.log('------');
      console.log(v === identifier);
    });
    delete requestObject.value[identifier];
  }
  return { addRequest, removeRequest, requestObject };
});
