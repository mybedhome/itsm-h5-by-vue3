<script setup lang="ts">
import { utils } from '@/utils';
import { useRoute } from 'vue-router';
const query = useRoute().query,
  isMobile = utils.platform().isMobile;
window.location.href = isMobile ? '移动端地址' : 'pc';
</script>
