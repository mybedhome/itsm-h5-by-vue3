<script setup lang="ts">
import { utils } from '@/utils';
import { useRoute } from 'vue-router';

const isMobile = utils.platform().isMobile;

// 接收后端传过来的参数
const query = new URLSearchParams(
  useRoute().query as unknown as string
).toString();

// TODO: 免登陆后在钉钉或微信打开的移动端页面地址, 例如: /#/mobile/orderDetail
const mobileUrl = '';
// TODO: 免登陆后在钉钉或微信打开的PC端页面地址, 例如: /#/pc/orderDetail
const webUrl = '';

const OAUTH_MOBILE_URL = window.g.OAUTH_MOBILE_URL.replace(/\/$/, '');
const OAUTH_PC_URL = window.g.OAUTH_PC_URL.replace(/\/$/, '');
if (isMobile) {
  location.href = `${OAUTH_MOBILE_URL}${mobileUrl}?${query}`;
  return;
}
if (OAUTH_PC_URL) {
  location.href = `${OAUTH_PC_URL}${webUrl}?${query}`;
}
</script>
