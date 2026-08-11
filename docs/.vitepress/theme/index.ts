/*
 * @fileName:
 * @Date: 2023-07-14 11:05:16
 * @Author: manYao.zhu
 */
import DefaultTheme from 'vitepress/theme';

import icon from '../../public/icon.png';

// import { createPinia } from 'pinia'
// import { useVxeTable } from './configs/vxe-table'
// import ElementPlus from 'element-plus'
// import { computed, watch } from 'vue'

// import * as VueTheme from '@styleofpicasso/vue-theme'
// import {
//   useThemeStore,
//   settingService,
//   initTheme,
//   changeI18n,
//   VueThemeComponent
// } from '@styleofpicasso/vue-theme'

// import * as VueCore from '@styleofpicasso/vue-core'
// import { changeTheme, watermark } from '@styleofpicasso/vue-core'

import CodeExchange from './configs/code-exchange.vue';
// import { THEME_CONFIG, ROUTER_CONFIG, MENUS } from './configs/theme.config'

import './style.scss';

export default {
  ...DefaultTheme,
  enhanceApp: async (ctx) => {
    const { app, router } = ctx;
    DefaultTheme.enhanceApp(ctx);
    // app.use(createPinia()).use(ElementPlus).use(useVxeTable)
    // app.mixin({
    //   async mounted() {
    //     import('@styleofpicasso/vue-theme').then((module: any) => {
    //       app.use(module.VueThemeComponent)
    //     })
    //     import('@styleofpicasso/vue-shared').then((module: any) => {
    //       app.use(module.VueBaseComponent)
    //     })
    //   }
    // })
    app.component('code-exchange', CodeExchange);
    app.mixin({
      mounted() {
        // 添加logo
        var linkd = document.querySelector('#link');
        if (linkd) document.head.removeChild(linkd);
        const link = document.createElement('link');
        link.setAttribute('rel', 'icon');
        link.setAttribute('id', 'link');
        link.setAttribute('href', icon);
        document.head.appendChild(link);
      }
    });

    // const themeStore = useThemeStore()
    // // 初始化配置信息到缓存里面
    // settingService.initThemeConfig(THEME_CONFIG)
    //  // 初始化路由配置信息
    // settingService.initRouterConfig(ROUTER_CONFIG)
    // // 设置路由信息
    // settingService.setRouterMenu(MENUS)
    // // 初始化路由相关配置 （这里的处理是让让路由能存到store里）
    // if (!themeStore.routerConfig) {
    //   themeStore.setRouterConfig({
    //     prop: 'menuWidth',
    //     value: ROUTER_CONFIG.menuWidth,
    //   })
    // }
    // // 主题配置
    // const config = computed(() => {
    //   return themeStore.themeConfig || THEME_CONFIG
    // })
    // // 初始化设置主题
    // const initTHemeColor = () => {
    //   changeTheme(
    //     config.value.themeColor,
    //     config.value.defaultThemeColor,
    //     config.value.defaultThemeColor
    //   ).then(() => {
    //     initTheme(config.value)
    //   })
    // }
    // initTHemeColor()
    // // 修改国际化语言
    // const changeEvent = (lang: string) => {
    //   changeI18n(lang)
    // }
    // watch(
    //   () => themeStore.themeConfig?.layoutComponent,
    //   (newV) => {
    //     // 设置水印
    //     const timer = watermark.set(
    //       themeStore.themeConfig?.hideWatermark ? '' : themeStore.userInfo?.account,
    //       themeStore.themeConfig?.headerHeight,
    //       themeStore.timer
    //     )
    //     themeStore.setTimer(timer)
    //   },
    //   {
    //     deep: true,
    //   }
    // )
  }
};
