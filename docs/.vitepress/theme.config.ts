/*
 * @fileName: 主题的配置中的顶部菜单的配置信息
 * @Date: 2023-03-13 14:04:53
 * @Author: manYao.zhu
 */
import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  { text: '指南', link: '/guide/' },
  // { text: '组件', link: '/components/button/' },
  {
    text: '工具Core',
    items: [
      { text: '封装的服务类工具', link: '/core/service/indexed_db' },
      { text: '封装的工具类工具', link: '/core/utils/' }
    ]
  },
  {
    text: 'vue相关',
    items: [
      { text: '基础知识', link: '/knowledge-module/vue/base/' },
      { text: '相关插件', link: '/knowledge-module/vue/plugin/markdown/' },
      { text: '相关技术库', link: '/knowledge-module/vue/library/vitepress/' }
    ]
  },
  {
    text: '后端架构',
    items: [
      { text: '学习计划', link: '/backend/' },
      { text: '基础工具安装', link: '/backend/install/jdk8' }
    ]
  },
  {
    text: '技术要点',
    items: [
      { text: '语法编译', link: '/knowledge-module/grammar-compile/markdown/' },
      { text: 'AI知识', link: '/ai/base' }
    ]
  },
  {
    text: '知识模块',
    items: [
      { text: '基础知识', link: '/knowledge-module/base/index/' },
      { text: 'TypeScript', link: '/knowledge-module/typescript/' },
      { text: 'Nodejs', link: '/knowledge-module/node/base' },
      { text: 'THREEjs', link: '/knowledge-module/threejs/' },
      { text: 'Canvas', link: '/knowledge-module/canvas/' },
      { text: 'ES6', link: '/knowledge-module/es6/' },
      { text: 'WeChat', link: '/knowledge-module/wechat/' },
      { text: 'Serve——服务', link: '/knowledge-module/serve/cloud/' },
      { text: '插件库', link: '/knowledge-module/plugins/base/js-ob' }
    ]
  },
  {
    text: 'FEA_知识库',
    items: [
      { text: '前端机构师_知识库', link: '/front-end-architects/system/' },
      { text: 'CSS知识库', link: '/front-end-architects/css/preprocessor/' },
      { text: '前端面试题', link: '/front-end-architects/interview/' },
      { text: '微前端', link: '/front-end-architects/micro-front-end/' }
    ]
  },
  {
    text: '代码片段',
    items: [
      { text: '有趣的代码片段', link: '/code-snippet/amusing/code-ran' },
      { text: '工作问题解决', link: '/work-code/javascript/js' }
    ]
  },
  { text: '管理员', link: '/myself/' }
];

export default nav;
