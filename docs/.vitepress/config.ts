/*
 * @fileName:
 * @Date: 2023-03-13 10:18:07
 * @Author: manYao.zhu
 */
import { defineConfig } from 'vitepress';
import nav from './theme.config';
import sidebar from './sidebar.config';

export default () => {
  return defineConfig({
    title: 'My-Ocean-Of-Knowledge', // 项目标题
    titleTemplate: '我的知识海洋', // 标题后缀模板
    lang: 'cn-ZH',
    description: '主要值基于vue3.0 + vite + pinia + vue-i18n 封装的前端管理平台的框架', // 项目描述
    base: '/ocean-of-knowledge/', // 项目文件路径的， 可以通过 $withBase 进行操作
    outDir: '.vitepress/dist',
    appearance: true, // 是否展示皮肤切换按钮
    // lastUpdated: true,  // 显示最新更新时间
    themeConfig: {
      search: {
        provider: 'local'
      },
      // 主题配置   （设置主题将会覆盖上面的title）
      siteTitle: '知识海洋', // 主题的标题
      logo: '/icon.png?url', // logo
      nav,
      sidebar,
      outline: 2,
      socialLinks: [{ icon: 'github', link: 'https://gitee.com/stylepicasso' }] // 右侧关于代码仓库地址的菜单
    },
    markdown: {
      //  关于markdown 的配置信息
      lineNumbers: true
    }
    // vue: { // vue 的配置项
    //   include: [/\.vue$/, /\.md$/]
    // },
    // vite: {  // vite的配置项
    //   resolve: {
    //     alias: {
    //       // vue: resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
    //       vue: 'vue/dist/vue.esm-bundler.js'
    //     }
    //   }
    // }
  });
};
