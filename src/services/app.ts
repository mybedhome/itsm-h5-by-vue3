import { http } from '@/utils/request';

interface UpdateTokenData {
  token?: string;
  sid?: string;
  url: string;
}

export const login = (data: UpdateTokenData) => {
  return http.post('/authorize/token', data);
};
