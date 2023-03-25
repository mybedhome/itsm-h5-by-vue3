window.g = {
  VUE_APP_BASE_API: '/',
  /** 下面是关于钉钉或微信免登陆集成的配置 */
  // 统一认证服务器地址
  UM_URL: '',
  // 应用ID标识
  CLIENT_ID: '',
  // 移动端地址，默认是根路径, 如果部署在非根路径要加上二级路径地址 如: http://192.168.0.1:8000/itsm
  OAUTH_MOBILE_URL: location.origin, // 二级路径地址 location.origin + '/itsm'
  // PC页面地址（可选），如果部署在非根路径要加上二级路径地址，如: http://192.168.0.1:8001/itsm
  OAUTH_PC_URL: '',
};
