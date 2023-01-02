import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface LoginInfo {
  token: string;
  name: string;
  userName: string;
  uid: string;
  uuid: string;
  rolePermissions: string[];
}

export const useLoginInfoStore = defineStore('loginInfo', () => {
  const loginInfo = ref<LoginInfo>({} as LoginInfo);

  function setLoginInfo(data: LoginInfo) {
    loginInfo.value = data;
  }

  return { loginInfo, setLoginInfo };
});
