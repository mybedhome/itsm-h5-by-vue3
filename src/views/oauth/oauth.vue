<script setup lang="ts">
import { utils } from '@/utils';
import { useRoute } from 'vue-router';

// 接收后端传过来的参数
const query = new URLSearchParams(
  useRoute().query as unknown as string
).toString();
const queryParams = utils.isEmptyObject(query) ? '' : '?' + query;

// TODO: 免登陆后在钉钉或微信打开的移动端页面地址, 例如: /#/mobile/orderDetail
const mobileUrl = '/#/bes/orders/add';
// TODO: 免登陆后在钉钉或微信打开的PC端页面地址, 例如: /#/pc/orderDetail
const webUrl = '';

const OAUTH_MOBILE_URL = window.g.OAUTH_MOBILE_URL.replace(/\/$/, '');
const OAUTH_PC_URL = window.g.OAUTH_PC_URL.replace(/\/$/, '');

const prefix = `${window.g.UM_URL}?clientId=${window.g.CLIENT_ID}&redirectUrl=`;

if (utils.platform().isMobile) {
  window.location.href = `${prefix}${encodeURIComponent(
    OAUTH_MOBILE_URL + mobileUrl + queryParams
  )}`;
} else if (OAUTH_PC_URL) {
  window.location.href = `${prefix}${encodeURIComponent(
    OAUTH_PC_URL + webUrl + queryParams
  )}`;
}
</script>
