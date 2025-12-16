<!--
 * @Date: 2023-08-29 11:36:16
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-08-29 13:22:28
 * @FilePath: \ocean-of-knowledge\docs\work-code\cache-of-vue.md
-->

# vue 项目中解决指定哪些页面需要缓存，哪些页面不需要缓存的思路

## 该问题出现的背景

- 项目具有 nav 功能， 可以通过 nav 直接查看操作过过得页面
- 由于页面有二级头部 nav, 若直接使用 keep-alive 来实现缓存， 它会将所有的页面都进行缓存

## 解决方案

- 首先在路由中 针对 meta 属性中添加 cache 属性

```js
// route.ts
const route = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('./views/demo/index.vue'),
    meta: {
      title: '演示页面',
      cache: true
    }
  }
];
```

- 梳理 nav 的数据， 将路由中的配置信息也集成进去

- 在路由集成页面使用 keep-alive, 利用其 include 属性

```js
<keep-alive :include="cachePages">
  <router-view></router-view>
</keep-alive>

<script lang="ts" setup>
  const state = reactive(
    pages: [
      {path: '/demo', name: 'demo', meta: {cache: true, title: '演示页面'}},
      {path: '/case', name: 'case', meta: {title: '案例页面'}}
    ]
  )  // 这个是nav的数据
  const cachePages = computed(() => {
    return state.pages.filter( it => it.cache).map(it => it.path)
  })
</script>
```
