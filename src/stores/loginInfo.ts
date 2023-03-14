import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface LoginInfo {
  token: string;
  userName: string;
  uuid: string;
  rolePermissions: string[];
}

export const useLoginInfoStore = defineStore('loginInfo', () => {
  const loginInfo = ref<LoginInfo>({} as LoginInfo);
  const accessToken = ref('');
  function setLoginInfo(data: LoginInfo) {
    loginInfo.value = data;
    accessToken.value = JSON.parse(data.token).access_token;
  }
  return { loginInfo, accessToken, setLoginInfo };
});
