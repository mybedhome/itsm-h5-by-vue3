import { utils } from '@/utils';
import { ref, watch, isRef, isProxy } from 'vue';
import type { Ref } from 'vue';
import type { ApiErrorResult } from '@/utils/request';

type Fetcher<T> = (depends: any) => Promise<T>;
type RequestOptions = {
  // 当响应式ref依赖发生变化时是否自动运行fetcher函数
  refetch?: boolean;
  // 是否深度监听depends依赖
  deep?: boolean;
};

function useRequest<T>(
  fetcher: Fetcher<T>,
  depends?: any,
  options?: RequestOptions
) {
  const isLoading = ref(true);
  const error = ref<ApiErrorResult | null>(null);
  const data = ref<T | null>(null) as Ref<T>;
  const requestOptions = Object.assign(
    { refetch: true, deep: false },
    options || {}
  );

  const run = () => {
    isLoading.value = true;
    const result = fetcher(isRef(depends) ? depends.value : depends);
    if (utils.isPromise(result)) {
      result
        .then((res: T) => {
          data.value = res;
        })
        .catch((err) => {
          error.value = err;
        })
        .finally(() => {
          isLoading.value = false;
        });
    } else {
      isLoading.value = false;
      data.value = result as T;
      error.value = null;
    }
  };

  const isWatchSource =
    isRef(depends) ||
    isProxy(depends) ||
    utils.isFunction(depends) ||
    utils.isArray(depends);

  if (requestOptions.refetch && isWatchSource) {
    watch(depends, run, { immediate: true, deep: requestOptions.deep });
  } else {
    run();
  }

  return {
    isLoading,
    error,
    data,
  };
}

export { useRequest };
