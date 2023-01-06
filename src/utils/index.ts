const isNull = (arg: unknown): boolean => arg == null;

const isUndefined = (arg: unknown): boolean => typeof arg === 'undefined';

const isNil = (arg: unknown): boolean => isNull(arg) || isUndefined(arg);

const isInt = (arg: unknown): boolean => Number.isInteger(arg);

const isNaN = (arg: unknown): boolean => Number.isNaN(arg);

const isWhatType = (type: string) => (arg: any) =>
  !isNil(arg) && arg.constructor.name === type;

const isFunction = isWhatType('Function');
const isAsyncFunction = isWhatType('AsyncFunction');
const isArray = isWhatType('Array');
const isFile = isWhatType('File');
const isBlob = isWhatType('Blob');
const isFormData = isWhatType('FormData');
const isRegExp = isWhatType('RegExp');
const isNumber = isWhatType('Number');
const isString = isWhatType('String');
const isBoolean = isWhatType('Boolean');
const isDate = isWhatType('Date');
const isSymbol = isWhatType('Symbol');
const isMap = isWhatType('Map');
const isWeakMap = isWhatType('WeakMap');
const isSet = isWhatType('Set');
const isWeakSet = isWhatType('WeakSet');
const isPromise = isWhatType('Promise');

const isPlainObject = (arg: { constructor?: Function }): boolean =>
  !isNil(arg) && arg.constructor === Object;

// 解析json字符串为json对象
const parseJSONString = (arg: string, failResult = {}) => {
  try {
    return JSON.parse(arg);
  } catch (error: any) {
    console.error('解析json失败: ' + error.message);
    return failResult;
  }
};

// 生成guid随机数
const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 生成指定长度的随机数
function getRandom(len: number) {
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const arrs = letters.concat(nums);
  let str = '';
  for (let i = 0; i < len; i++) {
    str += arrs[parseInt((Math.random() * arrs.length).toString())];
  }
  return str;
}

// 将formData转换为纯文本对象
const formDataToObject = (fd: FormData) => {
  if (!(fd instanceof FormData)) return fd;
  const uniqueArray = Array.from(new Set(Array.from(fd.keys())));
  return uniqueArray.reduce((acc: { [propName: string]: any }, key) => {
    const values = fd.getAll(key);
    acc[key] = values.length > 1 ? values : values[0];
    return acc;
  }, {});
};

const delay = <D>(timeout: number, data?: D) => {
  return new Promise<D | undefined>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
};

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
  isPlainObject,
  parseJSONString,
  formDataToObject,
  delay,
  guid,
  getRandom,
};
