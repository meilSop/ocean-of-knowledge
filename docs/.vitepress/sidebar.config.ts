/*
 * @fileName: 每个（模块）页面的左侧的侧边栏配置信息
 * @Date: 2023-03-13 14:05:02
 * @Author: manYao.zhu
 */

import { DefaultTheme } from 'vitepress';

const sidebar: DefaultTheme.Sidebar = {
  // 指南的侧边栏配置系信息
  '/guide/': [
    {
      text: '指南',
      items: [
        {
          text: '组件库介绍',
          link: '/guide/'
        },
        {
          text: '快速开始',
          link: '/guide/quickstart'
        },
        {
          text: '主题',
          link: '/guide/theme'
        },
        {
          text: '国际化',
          link: '/guide/i18n'
        },
        {
          text: 'icon图标库',
          link: '/guide/icon'
        }
      ]
      // collapsed: true  // 是否可以折叠
    }
  ],
  // vue相关插件的使用
  '/knowledge-module/vue/plugin/': [
    {
      text: '相关插件',
      items: [
        { text: 'markdown集成插件(.md文件)', link: '/knowledge-module/vue/plugin/markdown/' },
        { text: 'svg自定义icon组件插件', link: '/knowledge-module/vue/plugin/svg/' },
        {
          text: 'vue3.0 + vite 按需自动导入',
          link: '/knowledge-module/vue/plugin/vite/auto-import'
        },
        { text: 'vue3打包时生成*.d.ts文件', link: '/knowledge-module/vue/plugin/vite/dts' }
      ]
    }
  ],
  // vue相关知识库的配置
  '/knowledge-module/vue/library/': [
    {
      text: '相关技术库',
      items: [
        {
          text: 'vitePress（构建静态服务的步骤）',
          link: '/knowledge-module/vue/library/vitepress/'
        },
        { text: 'vitePress打包时的坑', link: '/knowledge-module/vue/library/vitepress/build' }
      ]
    }
  ],
  // vue的基础知识
  '/knowledge-module/vue/base/': [
    {
      text: '基础知识',
      items: [{ text: 'vue项目的创建', link: '/knowledge-module/vue/base/' }],
      collapsed: false
    }
  ],
  // 语法编译的路由配置
  '/knowledge-module/grammar-compile/': [
    {
      text: '语法编译',
      items: [{ text: 'markdown语法编译', link: '/knowledge-module/grammar-compile/markdown/' }]
    }
  ],
  // 组件的配置信息
  // '/components/': [
  //   { text: 'my-button 按钮', link: '/components/button/' },
  //   { text: 'my-icon 图标', link: '/components/icon/' },
  //   { text: 'my-drag 拖拽', link: '/components/drag/' },
  //   { text: 'my-img-shear 图片剪切', link: '/components/img-shear/' },
  //   { text: 'my-form-item Form表单', link: '/components/form-item/' },
  //   { text: 'my-chart 图表', link: '/components/chart/' },
  //   { text: 'my-table 表格', link: '/components/table/'}
  // ],
  // typescript配置
  '/knowledge-module/typescript/': [
    {
      text: '基础知识',
      items: [
        { text: '安装以及指令', link: '/knowledge-module/typescript/' },
        { text: '基础类型', link: '/knowledge-module/typescript/base' },
        { text: '任意类型', link: '/knowledge-module/typescript/any-type' },
        { text: '接口', link: '/knowledge-module/typescript/interface' },
        { text: '数组类型 + 元组类型', link: '/knowledge-module/typescript/array' },
        { text: '函数类型', link: '/knowledge-module/typescript/function' },
        { text: '联合类型|类型断言|交叉类型', link: '/knowledge-module/typescript/mixin' },
        { text: '内置对象', link: '/knowledge-module/typescript/inner' },
        { text: '类 + 抽象类', link: '/knowledge-module/typescript/class' },
        { text: '枚举', link: '/knowledge-module/typescript/enum' },
        { text: '类型推论 + 类型别名 type', link: '/knowledge-module/typescript/ratiocination' },
        { text: 'never', link: '/knowledge-module/typescript/never' },
        { text: 'Symbol类型', link: '/knowledge-module/typescript/symbol' },
        { text: '泛型', link: '/knowledge-module/typescript/generic' }
      ],
      collapsed: false
    },
    {
      text: '额外知识',
      items: [{ text: 'tsconfig.json', link: '/knowledge-module/typescript/tsconfig' }],
      collapsed: false
    },
    {
      text: '进阶知识',
      items: [],
      collapsed: false
    }
  ],
  // 基础知识模块
  '/knowledge-module/base/': [
    {
      text: '基础知识点',
      items: [{ text: 'js基础知识', link: '/knowledge-module/base/index/' }],
      collapsed: false
    },
    {
      text: '网络技术安全',
      items: [{ text: '前端加密技术', link: '/knowledge-module/base/safe/crypto' }],
      collapsed: false
    },
    {
      text: '浏览器',
      items: [{ text: '浏览器渲染 + 优化', link: '/knowledge-module/base/browser/' }],
      collapsed: false
    }
  ],
  // 有趣的代码片段
  '/code-snippet/amusing/code-ran': [
    {
      text: '基础代码片段',
      items: [
        { text: '代码雨', link: '/code-snippet/amusing/code-ran' },
        { text: '行为验证码', link: '/code-snippet/amusing/captcha' }
      ],
      collapsed: false
    },
    {
      text: 'Array数组代码片段',
      items: [{ text: '数组' }],
      collapsed: false
    }
  ],
  // canvas知识模块
  '/knowledge-module/canvas/': [
    { text: 'canvas 的创建', link: '/knowledge-module/canvas/' },
    { text: 'canvas API', link: '/knowledge-module/canvas/api' }
  ],
  // 工作中的问题解决
  '/work-code/': [
    {
      text: 'Vue相关问题',
      items: [
        { text: 'vue中指定页面缓存的思路', link: '/work-code/vue/cache-of-vue' },
        { text: 'vue路由添加自定义前缀', link: '/work-code/vue/vue-path' },
        { text: 'element-ui的按需加载的配置', link: '/work-code/vue/element-ui' },
        { text: 'vue项目中 .env 文件的作用', link: '/work-code/vue/env' },
        { text: 'vue的h 函数的作用', link: '/work-code/vue/h' },
        { text: 'vue在html中定义代码片段', link: '/work-code/vue/code-snippet' },
        { text: 'vue2.0中使用setup语法', link: '/work-code/vue/upgrade' },
        { text: 'vue中css的语法', link: '/work-code/vue/css' }
      ],
      collapsed: false
    },
    {
      text: '兼容类问题',
      items: [
        { text: '钉钉集成项目报错问题', link: '/work-code/compatible/dingding' },
        { text: '浏览器兼容问题', link: '/work-code/compatible/compatibility-issues' },
        { text: '' }
      ],
      collapsed: false
    },
    {
      text: '样式类问题',
      items: [{ text: 'CSS样式问题及修复', link: '/work-code/css/css-question' }],
      collapsed: false
    },
    {
      text: '表单类问题',
      items: [{ text: 'form表单相关问题', link: '/work-code/form/form' }],
      collapsed: false
    },
    {
      text: '网络相关的问题',
      items: [{ text: 'DNS(域名系统)相关问题', link: '/work-code/network/dns' }],
      collapsed: false
    },
    {
      text: 'JS相关的问题',
      items: [
        { text: 'JS原生代码中的细节问题', link: '/work-code/javascript/js' },
        { text: 'Iframe的相关知识', link: '/work-code/javascript/iframe' },
        { text: 'script标签详解', link: '/work-code/javascript/script' },
        { text: 'cookie详解', link: '/work-code/javascript/cookie' },
        { text: 'sessionStorage储存登录信息', link: '/work-code/javascript/sessionStorage' }
      ],
      collapsed: false
    },
    {
      text: '浏览器',
      items: [{ text: '当前浏览器的版本查询', link: '/work-code/browser/version' }],
      collapsed: false
    },
    {
      text: '插件类',
      items: [{ text: '富文本编辑器插件', link: '/work-code/plugin/editor.md' }]
    }
  ],
  // ES6的基本用法
  '/knowledge-module/es6/': [
    { text: '变量申明的命令', link: '/knowledge-module/es6/' },
    { text: '变量的解构赋值', link: '/knowledge-module/es6/construction' },
    { text: 'Map 和 Set 数据结构', link: '/knowledge-module/es6/mapset' }
  ],
  // nodejs的相关知识
  '/knowledge-module/node/': [
    {
      text: 'node基础信息',
      items: [{ text: 'node中文网 + API文档', link: '/knowledge-module/node/base' }],
      collapsed: false
    },
    {
      text: '基础知识',
      items: [
        { text: '.npmrc 配置文件的作用', link: '/knowledge-module/node/' },
        { text: 'package.json的配置详解', link: '/knowledge-module/node/package' },
        { text: '模块化的阶段概念', link: '/knowledge-module/node/standard' },
        { text: 'node 的内置模块', link: '/knowledge-module/node/inner-module' },
        { text: '前端代码风格自动化', link: '/knowledge-module/node/style' },
        { text: '私有源包的版本控制', link: '/knowledge-module/node/develop-version' }
      ],
      collapsed: false
    },
    {
      text: 'node版本控制',
      items: [
        { text: 'npm源管理器 nrm', link: '/knowledge-module/node/version/nrm' },
        { text: 'node的版本管理器 nvm', link: '/knowledge-module/node/nvm/' },
        { text: 'npm与yarn的常用指令', link: '/knowledge-module/node/command/' },
        { text: 'npm与yarn的镜像切换', link: '/knowledge-module/node/command/nrm' },
        { text: 'npm 登录 添加一次性密码操作', link: '/knowledge-module/node/once-password/' }
      ],
      collapsed: false
    },
    {
      text: 'pnpm新工具',
      items: [
        { text: 'pnpm 的使用', link: '/knowledge-module/node/pnpm/' },
        { text: '基于pnpm创建本地submodules', link: '/knowledge-module/node/pnpm/submodule' }
      ],
      collapsed: false
    },
    {
      text: '自定义npm包',
      items: [
        { text: '使用Verdaccio搭建私有npm仓库', link: '/knowledge-module/node/publish/verdaccio' },
        { text: 'npm 包发布流程', link: '/knowledge-module/node/publish/' },
        { text: '发布npm包常遇到的报错和解决', link: '/knowledge-module/node/publish/error' },
        { text: 'npm发布过滤部分文件', link: '/knowledge-module/node/publish/ignore' }
      ],
      collapsed: false
    },
    {
      text: '使用node开发服务接口',
      items: [
        { text: 'epxress前端框架教程', link: '/knowledge-module/node/server/express' },
        { text: 'fastify前端框架教程', link: '/knowledge-module/node/server/fastify' },
        { text: 'nestjs前端框架教程', link: '/knowledge-module/node/server/nestjs' },
        { text: 'express编译服务端的前提', link: '/knowledge-module/node/server/' },
        { text: 'express 开发服务的案例', link: '/knowledge-module/node/server/case' }
      ],
      collapsed: false
    },
    {
      text: '代码管理工具git',
      items: [
        { text: 'git 的基础操作指令', link: '/knowledge-module/node/git/' },
        { text: 'git 的提交规范', link: '/knowledge-module/node/git/rule' },
        { text: '', link: '' },
        { text: '.gitignore 文件的作用与设置', link: '/knowledge-module/node/git/ignore' },
        {
          text: '.gitmodules 文件作用 与 git子模块指令',
          link: '/knowledge-module/node/git/gitmodules'
        }
      ],
      collapsed: false
    },
    {
      text: '脚手架的搭建',
      items: [
        { text: '搭建脚手架需要用到的插件', link: '/knowledge-module/node/cli/plugin' },
        { text: '脚手架的搭建', link: '/knowledge-module/node/cli/' },
        { text: '我的脚手架', link: '/knowledge-module/node/cli/my_cli' }
      ],
      collapsed: false
    },
    {
      text: 'nginx代理工具',
      items: [
        { text: 'Nginx的概念、安装与配置', link: '/knowledge-module/node/nginx/' },
        { text: 'Nginx代理', link: '/knowledge-module/node/nginx/nginx' },
        { text: 'Nginx的指令', link: '/knowledge-module/node/nginx/run' },
        { text: 'Linux系统的指令', link: '/knowledge-module/node/nginx/linux' },
        { text: 'Shelljs 命令库', link: '/knowledge-module/node/nginx/shell' }
      ],
      collapsed: false
    },
    {
      text: 'Babel——代码转译工具',
      items: [
        { text: 'babel的基本使用方法', link: '/knowledge-module/node/babel/' },
        { text: 'rollup 与 babel 的配合使用', link: '/knowledge-module/node/babel/rollup' },
        { text: 'webpack 与 babel 的配合使用', link: '/knowledge-module/node/babel/webpack' },
        { text: 'vite 与 babel 的配合使用', link: '/knowledge-module/node/babel/vite' }
      ]
    }
  ],
  '/knowledge-module/wechat/': [
    { text: '微信分享的操作流程', link: '/knowledge-module/wechat/' },
    { text: '小程序的知识积累', link: '/knowledge-module/wechat/mini-program' }
  ],
  // 服务先关的知识点
  '/knowledge-module/serve': [
    {
      text: '云服务',
      items: [{ text: '阿里云服务的使用', link: '/knowledge-module/serve/clode/' }],
      collapsed: false
    },
    {
      text: '服务端技术',
      items: [
        { text: 'Linux系统的指令大全', link: '/knowledge-module/serve/util/linux' },
        { text: 'Mysql本地安装的步骤', link: '/knowledge-module/serve/util/install-mysql' }
      ],
      collapsed: false
    },
    {
      text: '数据库',
      items: [],
      collapsed: false
    }
  ],
  // 前端常用的一些有效插件
  '/knowledge-module/plugins': [
    {
      text: '基础插件',
      items: [{ text: 'Javascript 混淆插件', link: '/knowledge-module/plugins/base/js-ob' }]
    }
  ],
  // 前端架构师技能要点
  '/front-end-architects/': [
    {
      text: 'FEA_知识体系',
      items: [
        { text: '知识体系', link: '/front-end-architects/system/' }
        // {text: 'vue', link: '/front-end-architects/system/vue'}
      ],
      collapsed: false
    },
    {
      text: '前端工具',
      items: [{ text: 'vscode常用插件', link: '/front-end-architects/util/vscode' }],
      collapsed: false
    },
    {
      text: 'IDaas',
      items: [
        { text: 'iDaas的基础概念', link: '/front-end-architects/sso/' },
        { text: 'sso实现逻辑与集成', link: '/front-end-architects/sso/integration' }
      ],
      collapsed: false
    }
  ],
  // 前端架构师需要掌握的CSS技术
  '/front-end-architects/css/': [
    {
      text: 'CSS 预处理器',
      items: [{ text: 'SASS 预处理器知识', link: '/front-end-architects/css/preprocessor/' }],
      collapsed: false
    },
    {
      text: '手撸原子化CSS【雾化CSS】',
      items: [
        { text: '原子化CSS简介 + 开源包', link: '/front-end-architects/css/atomization/' },
        { text: '手撸原子化CSS用到的插件', link: '/front-end-architects/css/atomization/plugin' },
        { text: '手撸原子化CSS案例', link: '/front-end-architects/css/atomization/case' },
        { text: '我的原子化CSS', link: '/front-end-architects/css/atomization/mine' }
      ],
      collapsed: false
    },
    {
      text: '常用样式',
      items: [{ text: 'css/scss/less', link: '/front-end-architects/css/style/' }]
    }
  ],
  // 面试题
  '/front-end-architects/interview/': [
    {
      text: '目录',
      items: [{ text: '面试题目录', link: '/front-end-architects/interview/' }]
    },
    {
      text: '前端基础面试题',
      items: [
        { text: '1. css3有哪些新特性', link: '/front-end-architects/interview/base/css/' },
        {
          text: '2. nth-child与nth-of-type区别',
          link: '/front-end-architects/interview/base/nth/'
        },
        {
          text: '3. 解决使用transform:translate属性时会出现闪烁现象',
          link: '/front-end-architects/interview/base/transform/'
        },
        { text: '4. CSS实现文本换行', link: '/front-end-architects/interview/base/ellipse/' }
      ]
    }
  ],
  // 微前端
  '/front-end-architects/micro-front-end/': [
    {
      text: '微前端',
      items: [{ text: '微前端的相关概念', link: '/front-end-architects/micro-front-end/' }]
    },
    {
      text: 'Garfish 微前端框架',
      items: [
        { text: 'Garfish 相关概念与案例', link: '/front-end-architects/micro-front-end/garfish/' }
      ],
      collapsed: false
    }
  ],
  // core包内的服务类工具
  '/core/service/': [
    { text: 'indexedDB储存服务', link: '/core/service/indexed_db' },
    { text: 'websocket服务', link: '/core/service/websocket' },
    { text: 'Div 烟花服务', link: '/core/service/firework' },
    { text: 'Canvas 烟花服务', link: '/core/service/canvas_firework' }
  ],
  // core包内的工具类工具
  '/core/utils/': [
    // { text: '加密解密服务工具', link: '/core/service/' },
    // { text: '本地、session储存服务工具', link: '/core/service/cache' },
    // { text: '颜色转换服务工具', link: '/core/service/color' },
  ]
};

export default sidebar;
