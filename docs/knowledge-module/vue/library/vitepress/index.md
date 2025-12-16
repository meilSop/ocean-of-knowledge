<!--
 * @fileName: vitePress 构建静态文件服务的步骤
 * @Date: 2023-03-13 17:40:16
 * @Author: manYao.zhu
-->

# vitePress (构建静态服务的步骤）

[VitePress 搭建静态网站并在 GitHub/Gitee Pages 部署](https://agangdundan.cn/origin/)

## 快速上手

- 创建并进入一个目录

```ts
mkdir my-vite-press && cd my-vite-press
```

- 初始化

```ts
yarn init
```

- 安装 vitePress

```ts
yarn add vitepress --dev
```

- 创件第一个文档

```ts
mkdir docs && echo '# Hello VitePress' > docs/index.md
```

- 在 package.json 里面添加配置信息

```ts
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

- 在本地服务器上启动文档站点

```ts
yarn docs:dev
```

## 添加全局布局、导航、侧边栏配置文件

- 添加全局配置文件 docs/.vitepress 下创建 config.ts / nav.config.ts / sidebar.config.ts
  1. config.ts

```ts
import { defineConfig } from 'vitepress';
import nav from './nav.config';
import sidebar from './sidebar.config';

export default defineConfig({
  title: 'My-Ocean-Of-Knowledge', // 项目标题
  titleTemplate: '我的知识海洋', // 标题后缀模板
  lang: 'cn-ZH',
  description: '主要值基于vue3.0 + vite + pinia + vue-i18n 封装的前端管理平台的框架', // 项目描述
  base: '/', // 项目文件路径的， 可以通过 $withBase 进行操作
  outDir: 'dist',
  appearance: true, // 是否展示皮肤切换按钮
  lastUpdated: true, // 热替换
  themeConfig: {
    // 主题配置   （设置主题将会覆盖上面的title）
    siteTitle: '知识海洋', // 主题的标题
    logo: '/img/logo.png', // logo
    nav,
    sidebar,
    outline: 2,
    socialLinks: [{ icon: 'github', link: 'https://gitee.com/stylepicasso' }] // 右侧关于代码仓库地址的菜单
  },
  markdown: {
    //  关于markdown 的配置信息
    lineNumbers: true
  }
});
```

2. nav.config.ts

```ts
import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  { text: '指南', link: '/guide/' },
  { text: '组件', link: '/components/icon/' },
  {
    text: 'vue相关',
    items: [
      { text: '相关插件', link: '/knowledge-module/vue/plugin/markdown/' },
      { text: '相关技术库', link: '/knowledge-module/vue/library/vitepress/' }
    ]
  },
  {
    text: '技术要点',
    items: [{ text: '语法编译', link: '/knowledge-module/grammar-compile/markdown/' }]
  },
  {
    text: '知识模块',
    items: [
      { text: 'TypeScript', link: '/knowledge-module/typescript/' },
      { text: 'Nodejs', link: '/knowledge-module/node/' },
      { text: 'THREEjs', link: '/knowledge-module/threejs/' }
    ]
  }
];

export default nav;
```

3. sidebar.config.ts

```ts
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
        {
          text: 'markdown集成插件(.md文件)',
          link: '/knowledge-module/vue/plugin/markdown/'
        }
      ]
    }
  ],
  // vue相关知识库的配置
  '/knowledge-module/vue/library/': [
    {
      text: '相关插件',
      items: [
        {
          text: 'vitePress构建静态服务的步骤',
          link: '/knowledge-module/vue/library/vitepress/'
        }
      ]
    }
  ],
  // 语法编译的路由配置
  '/knowledge-module/grammar-compile/': [
    {
      text: '语法编译',
      items: [
        {
          text: 'markdown语法编译',
          link: '/knowledge-module/grammar-compile/markdown/'
        }
      ]
    }
  ]
};
export default sidebar;
```

## 运行环境的配置

- 关于运行环境的配置， 在 vitePress 抛出的 defineConfig 方法中的配置项中是由 vue 以及 vite 等的相关配置，若在需要添加相关插件或者配置， 可以直接在这个里面添加即可

- config 的配置项

```ts
interface Config {
  lang?: string;
  dir?: string;
  title?: string;
  titleTemplate?: string | boolean;
  description?: string;
  head?: HeadConfig[];
  themeConfig?: ThemeConfig;

  extends?: RawConfigExports<ThemeConfig>;
  base?: string;
  srcDir?: string;
  srcExclude?: string[];
  outDir?: string;
  cacheDir?: string;
  shouldPreload?: (link: string, page: string) => boolean;
  locales?: LocaleConfig<ThemeConfig>;
  appearance?: boolean | 'dark';
  lastUpdated?: boolean;
  /**
   * MarkdownIt options
   */
  markdown?: MarkdownOptions;
  /**
   * Options to pass on to `@vitejs/plugin-vue`
   */
  vue?: Options;
  /**
   * Vite config
   */
  vite?: UserConfig$1;
  /**
   * Configure the scroll offset when the theme has a sticky header.
   * Can be a number or a selector element to get the offset from.
   */
  scrollOffset?: number | string;
  /**
   * Enable MPA / zero-JS mode.
   * @experimental
   */
  mpa?: boolean;
  /**
   * Don't fail builds due to dead links.
   *
   * @default false
   */
  ignoreDeadLinks?: boolean | 'localhostLinks';
  /**
   * Don't force `.html` on URLs.
   *
   * @default false
   */
  cleanUrls?: boolean;
  /**
   * Use web fonts instead of emitting font files to dist.
   * The used theme should import a file named `fonts.(s)css` for this to work.
   * If you are a theme author, to support this, place your web font import
   * between `webfont-marker-begin` and `webfont-marker-end` comments.
   *
   * @default true in webcontainers, else false
   */
  useWebFonts?: boolean;
  /**
   * @experimental
   *
   * source -> destination
   */
  rewrites?: Record<string, string>;
  /**
   * Build end hook: called when SSG finish.
   * @param siteConfig The resolved configuration.
   */
  buildEnd?: (siteConfig: SiteConfig) => Awaitable<void>;
  /**
   * Render end hook: called when SSR rendering is done.
   */
  postRender?: (context: SSGContext) => Awaitable<SSGContext | void>;
  /**
   * Head transform hook: runs before writing HTML to dist.
   *
   * This build hook will allow you to modify the head adding new entries that cannot be statically added.
   */
  transformHead?: (context: TransformContext) => Awaitable<HeadConfig[]>;
  /**
   * HTML transform hook: runs before writing HTML to dist.
   */
  transformHtml?: (code: string, id: string, ctx: TransformContext) => Awaitable<string | void>;
  /**
   * PageData transform hook: runs when rendering markdown to vue
   */
  transformPageData?: (pageData: PageData) => Awaitable<
    | Partial<PageData>
    | {
        [key: string]: any;
      }
    | void
  >;
}
```

- config 中的 vite 配置

```ts
interface ViteConfig {
  /**
   * Project root directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   * @default process.cwd()
   */
  root?: string;
  /**
   * Base public path when served in development or production.
   * @default '/'
   */
  base?: string;
  /**
   * Directory to serve as plain static assets. Files in this directory are
   * served and copied to build dist dir as-is without transform. The value
   * can be either an absolute file system path or a path relative to project root.
   *
   * Set to `false` or an empty string to disable copied static assets to build dist dir.
   * @default 'public'
   */
  publicDir?: string | false;
  /**
   * Directory to save cache files. Files in this directory are pre-bundled
   * deps or some other cache files that generated by vite, which can improve
   * the performance. You can use `--force` flag or manually delete the directory
   * to regenerate the cache files. The value can be either an absolute file
   * system path or a path relative to project root.
   * Default to `.vite` when no `package.json` is detected.
   * @default 'node_modules/.vite'
   */
  cacheDir?: string;
  /**
   * Explicitly set a mode to run in. This will override the default mode for
   * each command, and can be overridden by the command line --mode option.
   */
  mode?: string;
  /**
   * Define global variable replacements.
   * Entries will be defined on `window` during dev and replaced during build.
   */
  define?: Record<string, any>;
  /**
   * Array of vite plugins to use.
   */
  plugins?: PluginOption[];
  /**
   * Configure resolver
   */
  resolve?: ResolveOptions & {
      alias?: AliasOptions;
  };
  /**
   * CSS related options (preprocessors and CSS modules)
   */
  css?: CSSOptions;
  /**
   * JSON loading options
   */
  json?: JsonOptions;
  /**
   * Transform options to pass to esbuild.
   * Or set to `false` to disable esbuild.
   */
  esbuild?: ESBuildOptions | false;
  /**
   * Specify additional picomatch patterns to be treated as static assets.
   */
  assetsInclude?: string | RegExp | (string | RegExp)[];
  /**
   * Server specific options, e.g. host, port, https...
   */
  server?: ServerOptions;
  /**
   * Build specific options
   */
  build?: BuildOptions;
  /**
   * Preview specific options, e.g. host, port, https...
   */
  preview?: PreviewOptions;
  /**
   * Dep optimization options
   */
  optimizeDeps?: DepOptimizationOptions;
  /**
   * SSR specific options
   */
  ssr?: SSROptions;
  /**
   * Experimental features
   *
   * Features under this field could change in the future and might NOT follow semver.
   * Please be careful and always pin Vite's version when using them.
   * @experimental
   */
  experimental?: ExperimentalOptions;
  /**
   * Legacy options
   *
   * Features under this field only follow semver for patches, they could be removed in a
   * future minor version. Please always pin Vite's version to a minor when using them.
   */
  legacy?: LegacyOptions;
  /**
   * Log level.
   * @default 'info'
   */
  logLevel?: LogLevel;
  /**
   * Custom logger.
   */
  customLogger?: Logger;
  /**
   * @default true
   */
  clearScreen?: boolean;
  /**
   * Environment files directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   * @default root
   */
  envDir?: string;
  /**
   * Env variables starts with `envPrefix` will be exposed to your client source code via import.meta.env.
   * @default 'VITE_'
   */
  envPrefix?: string | string[];
  /**
   * Worker bundle options
   */
  worker?: {
      /**
       * Output format for worker bundle
       * @default 'iife'
       */
      format?: 'es' | 'iife';
      /**
       * Vite plugins that apply to worker bundle
       */
      plugins?: PluginOption[];
      /**
       * Rollup options to build worker bundle
       */
      rollupOptions?: Omit<RollupOptions, 'plugins' | 'input' | 'onwarn' | 'preserveEntrySignatures'>;
  };
  /**
   * Whether your application is a Single Page Application (SPA),
   * a Multi-Page Application (MPA), or Custom Application (SSR
   * and frameworks with custom HTML handling)
   * @default 'spa'
   */
  appType?: AppType;
```

- 若想查看具体的配置项， 可以安装运行， 到里面的 \*.d.ts 文件中查看

## vitePress 文档配置较好的网址

[VitePress 配置](https://xxy5.com/vitepress-cn/config-introduction.html)
