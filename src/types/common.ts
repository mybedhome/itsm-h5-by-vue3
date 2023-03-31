export enum OrderFilterKey {
  SERVICE = 'service',
  STATUS = 'status',
  CREATOR = 'creator',
  CREATE_TIME = 'createTime',
}
export interface Column {
  label: string
  key: 'service' | 'status' | 'creator' | 'createTime'
  data: any
}

export interface LoginInfo {
  token: string
  userName: string
  uuid: string
  rolePermissions: string[]
}

export interface TokenInfo {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
  jti: string
}
