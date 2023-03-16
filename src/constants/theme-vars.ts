import type { ConfigProviderThemeVars } from 'vant';
import { utils } from '@/utils';
export const themeVars: ConfigProviderThemeVars = {
  searchInputHeight: utils.px2vw(32),
  buttonSmallHeight: utils.px2vw(32),
  gridItemTextFontSize: utils.px2vw(14),
  gridItemTextColor: '#666666',
  searchBackground: 'transparent',
  buttonPrimaryBackground: '#4b6eef',
  buttonPrimaryBorderColor: '#4b6eef',
  actionSheetMaxHeight: '90%',
};
