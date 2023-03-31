const isNull = (arg: unknown): boolean => arg == null

const isUndefined = (arg: unknown): boolean => typeof arg === 'undefined'

const isNil = (arg: unknown): boolean => isNull(arg) || isUndefined(arg)

const isInt = (arg: unknown): boolean => Number.isInteger(arg)

const isNaN = (arg: unknown): boolean => Number.isNaN(arg)

const isWhatType = (type: string) => (arg: any) =>
  !isNil(arg) && arg.constructor.name === type

const isFunction = isWhatType('Function')
const isAsyncFunction = isWhatType('AsyncFunction')
const isArray = isWhatType('Array')
const isFile = isWhatType('File')
const isBlob = isWhatType('Blob')
const isFormData = isWhatType('FormData')
const isRegExp = isWhatType('RegExp')
const isNumber = isWhatType('Number')
const isString = isWhatType('String')
const isBoolean = isWhatType('Boolean')
const isDate = isWhatType('Date')
const isSymbol = isWhatType('Symbol')
const isMap = isWhatType('Map')
const isWeakMap = isWhatType('WeakMap')
const isSet = isWhatType('Set')
const isWeakSet = isWhatType('WeakSet')
const isPromise = isWhatType('Promise')

const isEmptyArray = (arg: any) => !arg || !isArray(arg) || arg.length === 0
const isValidArray = (arg: any) => isArray(arg) && arg.length > 0

const isPlainObject = (arg: { constructor?: Function }): boolean =>
  !isNil(arg) && arg.constructor === Object

const isEmptyObject = (arg: any) => {
  return !isPlainObject(arg) || Object.keys(arg).length === 0
}

const isEmpty = (arg: any) => {
  if (
    typeof arg === 'undefined' ||
    arg === null ||
    Number.isNaN(arg) ||
    arg === '' ||
    Object.keys(arg).length === 0 ||
    (Array.isArray(arg) && arg.length === 0)
  ) {
    return true
  }
  return false
}

// 解析json字符串为json对象
const parseJSON = <V = Record<string, unknown>>(
  arg: any,
  failResult = {} as V
): V => {
  try {
    return JSON.parse(arg)
  } catch (error: any) {
    console.error('解析json失败: ' + error.message)
    return failResult
  }
}

/**
 * @param { boolean } hasHyphen 是否有连字符号
 * @returns 唯一的guid
 */
const guid = (hasHyphen?: boolean) => {
  const id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/x/g, function () {
    return (~~(Math.random() * 16)).toString(16)
  })
  return hasHyphen !== false ? id : id.replaceAll('-', '')
}

// 查找对象属性的值，支持路径嵌套查询
const find = (obj: Record<string, unknown>, ...paths: any[]) => {
  return paths.reduce((acc, path) => {
    return acc?.[path]
  }, obj)
}

const delay = <D>(timeout: number, data?: D) => {
  return new Promise<D | undefined>((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, timeout)
  })
}

const px2vw = (
  px: number,
  options = {} as { hasUnit: boolean; baseWidth: number }
): string => {
  const opt = Object.assign({ hasUnit: true, baseWidth: 375 }, options)
  const value = ((px / opt.baseWidth) * 100).toString()
  return opt.hasUnit ? value + 'vw' : value
}

// 将formData转换为json
const formDataToJson = (fd: FormData) => {
  if (!(fd instanceof FormData)) return fd
  return Array.from(new Set(Array.from(fd.keys()))).reduce(
    (acc: { [propName: string]: any }, key) => {
      const values = fd.getAll(key)
      acc[key] = values.length > 1 ? values : values[0]
      return acc
    },
    {}
  )
}

// 将json转换为FormData
const jsonToFormData = (data: Record<string, unknown>) => {
  const fd = new FormData()
  if (!isEmptyObject(data)) {
    for (const key of Object.keys(data)) {
      const value = data[key]
      if (value instanceof Blob) {
        fd.append(key, value)
      } else if (value && typeof value === 'object') {
        fd.append(key, JSON.stringify(value))
      } else {
        fd.append(key, String(data[key]))
      }
    }
  }
  return fd
}

const platform = () => {
  const ua = navigator.userAgent
  const isWindowsPhone = / (?:Windows Phone)/.test(ua)
  const isSymbian = / (?:Symbian0S)/.test(ua) || isWindowsPhone
  const isAndroid = / (?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/ (?:Mobile)/.test(ua)) ||
    (isFireFox && / (?:Tablet)/.test(ua))
  const isPhone = / (?:iPhone)/.test(ua) && !isTablet
  const isMobile = isPhone || isAndroid || isSymbian || isTablet
  const isPc = !isMobile
  return {
    isMobile,
    isPc,
    isAndroid,
    isPhone,
    isTablet,
  }
}

export const utils = {
  isNull,
  isUndefined,
  isNil,
  isInt,
  isNaN,
  isFunction,
  isAsyncFunction,
  isArray,
  isFile,
  isBlob,
  isFormData,
  isRegExp,
  isNumber,
  isString,
  isBoolean,
  isDate,
  isSymbol,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isPromise,
  isEmptyArray,
  isValidArray,
  isPlainObject,
  isEmptyObject,
  isEmpty,
  parseJSON,
  formDataToJson,
  jsonToFormData,
  delay,
  guid,
  px2vw,
  find,
  platform,
}
