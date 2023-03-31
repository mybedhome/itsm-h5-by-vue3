import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosRequestConfig } from 'axios'
import { utils } from '@/utils'

export const useRequestStore = defineStore('request', () => {
  const request = ref<{ [propName: string]: AbortController }>({})
  const getRequestIdentifier = (config: AxiosRequestConfig) => {
    const data = utils.formDataToJson(config.data)
    return (
      (config.url as string) +
      (config.params ? '-' + JSON.stringify(config.params) : '') +
      (data ? '-' + JSON.stringify(data) : '') +
      '-' +
      config.method
    )
  }

  function addRequest(config: AxiosRequestConfig) {
    const identifier = getRequestIdentifier(config)
    if (request.value[identifier]) {
      removeRequest(config, identifier)
    }
    const controller = new AbortController()
    config.signal = controller.signal
    request.value[identifier] = controller
  }

  function removeRequest(
    config: AxiosRequestConfig,
    requestIdentifier: string = ''
  ) {
    if (utils.isString(config.data)) {
      config.data = JSON.parse(config.data)
    }
    const identifier = requestIdentifier || getRequestIdentifier(config)
    if (request.value[identifier]) {
      request.value[identifier].abort('重复请求被取消')
      delete request.value[identifier]
    }
  }

  function clearPendingRequest() {
    Object.keys(request.value).forEach((identifier) => {
      request.value[identifier].abort('路由跳转前取消pending状态的请求')
    })
  }
  return { addRequest, removeRequest, clearPendingRequest, request }
})
