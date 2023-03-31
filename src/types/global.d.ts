declare global {
  interface Window {
    g: {
      VUE_APP_BASE_API: string
      UM_URL: string
      CLIENT_ID: string
      OAUTH_MOBILE_URL: string
      OAUTH_PC_URL: string
    }
  }
}
export {}
