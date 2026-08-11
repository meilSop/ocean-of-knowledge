---
title: Ocean of Knowledge 项目整体架构
category: architecture
priority: high
tags: [vitepress, vue3, documentation, architecture]
createdAt: 2026-06-05T08:50:03.148Z
updatedAt: 2026-06-05T08:50:03.148Z
---

# Ocean of Knowledge 项目架构

## 项目概述
基于 VitePress 的前端知识库站点，用于积累和分享前端技术知识。

## 技术栈
- **框架**: VitePress 1.0.0-beta.5
- **语言**: Vue 3.3.4 + TypeScript
- **包管理**: pnpm
- **部署**: GitHub Pages (通过 GitHub Actions CI/CD)
- **仓库**: https://gitee.com/stylepicasso/ocean-of-knowledge

## 目录结构

```
ocean-of-knowledge/
├── .github/workflows/deploy.yml   # GitHub Actions 部署配置
├── .vitepress/                    # VitePress 配置（根级，可能未使用）
├── docs/                          # 文档源码目录
│   ├── .vitepress/
│   │   ├── config.ts              # VitePress 主配置（title, base, themeConfig）
│   │   ├── theme.config.ts        # 顶部导航栏配置
│   │   ├── sidebar.config.ts      # 侧边栏配置
│   │   └── theme/
│   │       ├── index.ts           # 主题入口（注册全局组件、mixin）
│   │       ├── style.scss         # 全局样式
│   │       └── configs/
│   │           ├── theme.config.ts # 主题配置
│   │           ├── vxe-table.ts   # vxe-table 配置
│   │           └── code-exchange.vue # 代码交换组件
│   ├── index.md                   # 首页
│   ├── ai/                        # AI 知识模块
│   ├── backend/                   # 后端架构学习模块
│   ├── code-snippet/              # 代码片段
│   ├── common-config/             # 公共配置
│   ├── core/                      # 核心工具（服务类、工具类）
│   ├── front-end-architects/      # 前端架构师知识库
│   ├── guide/                     # 指南
│   ├── knowledge-module/          # 知识模块（主体内容）
│   ├── myself/                    # 管理员页面
│   ├── public/                    # 静态资源
│   └── work-code/                 # 工作中的问题解决
├── deploy.sh                      # 手动部署脚本
├── package.json                   # 项目依赖
└── README.md                      # 操作手册
```

## 核心配置文件

### docs/.vitepress/config.ts
- 项目标题: "My-Ocean-Of-Knowledge"
- base: `/ocean-of-knowledge/`
- 本地搜索启用
- Markdown 行号显示

### docs/.vitepress/theme.config.ts（导航栏）
顶部分为 8 个导航菜单：
1. **指南** - 组件库介绍、快速开始、主题、国际化、icon
2. **工具Core** - 封装的服务类工具、工具类工具
3. **vue相关** - 基础知识、插件、技术库
4. **后端架构** - 学习计划、基础工具安装
5. **技术要点** - 语法编译、AI知识
6. **知识模块** - 基础知识、TypeScript、Nodejs、THREEjs、Canvas、ES6、WeChat、服务、插件库
7. **FEA_知识库** - 前端架构师知识库、CSS、面试题、微前端
8. **代码片段** - 有趣的代码片段、工作问题解决

### docs/.vitepress/sidebar.config.ts（侧边栏）
按路径前缀配置，主要模块：
- `/guide/` - 指南
- `/knowledge-module/vue/` - Vue 相关（插件、技术库、基础）
- `/knowledge-module/typescript/` - TypeScript 基础知识
- `/knowledge-module/base/` - JS 基础、网络安全、浏览器
- `/knowledge-module/node/` - Node.js 全套（版本控制、pnpm、npm包发布、服务接口、git、脚手架、nginx、babel）
- `/knowledge-module/es6/` - ES6 语法
- `/knowledge-module/canvas/` - Canvas
- `/knowledge-module/wechat/` - 微信开发
- `/knowledge-module/serve/` - 云服务、Linux
- `/knowledge-module/plugins/` - 插件
- `/front-end-architects/` - 架构师知识体系、CSS、面试题、微前端
- `/work-code/` - 工作问题（Vue、兼容性、样式、表单、网络、JS）
- `/core/service/` - 工具服务（indexedDB、websocket、烟花）
- `/backend/` - 后端架构（JDK、Maven、MySQL、Redis、Nginx、Docker、Java）
- `/ai/` - AI 基础知识

## 部署方式
1. **GitHub Actions**: push 到 main 分支自动构建部署到 GitHub Pages
2. **手动部署**: 执行 `deploy.sh`，构建后 force push 到 `master:dist`

## 已安装的依赖
- vitepress, vue, pinia, vue-i18n
- element-plus, vxe-table, xe-utils
- echarts, echarts-liquidfill
- @styleofpicasso/vue-core, vue-pages, vue-shared, vue-theme
- sass, node-sass

