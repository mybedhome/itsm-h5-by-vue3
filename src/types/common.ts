export enum OrderFilterKey {
  SERVICE = 'service',
  STATUS = 'status',
  CREATOR = 'creator',
  CREATE_TIME = 'createTime',
}
export interface Column {
  label: string;
  key: 'service' | 'status' | 'creator' | 'createTime';
  data: any;
}
