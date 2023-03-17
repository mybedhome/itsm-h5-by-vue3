import { login } from './services/app';

/** 统一认证 */
export async function authorize() {
  const query = window.location.search;
  if (query.includes('code') && query.includes('state')) {
    sessionStorage.setItem('url', location.href);
    window.location.href = window.location.href.replace(query, '');
  } else {
    login({
      url: sessionStorage.getItem('url') || location.href,
    }).then((res) => {
      console.log('login res', res);
      if (res) {
        sessionStorage.removeItem('url');
        localStorage.setItem('loginInfo', JSON.stringify(res));
        localStorage.setItem('tokenInfo', res.data.token);
      }
    });
  }
}
