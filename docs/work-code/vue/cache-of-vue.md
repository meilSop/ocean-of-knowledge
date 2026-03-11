<!--
 * @Date: 2023-08-29 11:36:16
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-08-29 13:22:28
 * @FilePath: \ocean-of-knowledge\docs\work-code\cache-of-vue.md
-->

# vue 项目中解决指定哪些页面需要缓存，哪些页面不需要缓存的思路

## 该问题出现的背景

- 项目具有 tabs 功能， 可以通过 tabs 直接查看操作过过得页面
- 由于页面有二级头部 tabs, 若直接使用 keep-alive 来实现缓存， 它会将所有的页面都进行缓存

## 解决方案

- 首先在路由中 针对 meta 属性中添加 keepAlive 属性

```js
// route.ts
const route = [
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('./views/demo/index.vue'),
    meta: {
      title: '演示页面',
      keepAlive: true
    }
  }
];
```

- 需要添加缓存的界面需要必须有name属性 【Vue3】

```ts
<template>
  <div class="m_demo">
    {{ state.desc }}
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

defineOptions({
  name: 'Demo'
})

const state = reactive({
  desc: '缓存案例描述'
})

</script>

<style lang="scss" scoped></style>
```

- pinia/app.ts  项目的app状态管理

```ts
import { defineStore } from 'pinia'

interface AppStore {
  cacheComponents: any
  appConfig: any
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStore => {
    cacheComponents: {},
    appConfig: {}
  },
  getters: {
    getCacheComponent(state): string[] {
      return Object.values(state.cacheComponents)
    },
    getAppConfig(state): any {
      return state.appConfig
    }
  },
  actions: {
    addCachedComponents(componentName, path) {
      this.cachedComponents[path] = componentName
    },
    removeCachedComponents(path) {
      delete this.cachedComponents[path]
    },
    removeCachedComponentsAll() {
      this.cachedComponents = {}
    },
    setAppConfig(config) {
      this.appConfig = config
    }
  }
})
```

- 页面菜单的跳转事件

```ts
import { useAppStore } from '@/store'
const appStore = useAppStore()

function menuClick(node) {
  const { path, name } = node
  if (!appStore.getCacheComponents.some((it: any) => it === name )) {
    appStore.addCachedComponents(name, path)
  }
}
```

- tabs 组件切换 与  关闭

```ts
// 切换时，不处理缓存

// 当关闭tabs时，处理
import { useAppStore } from '@/store'
const appStore = useAppStore()

function closeTab(node) {
  const { path, name } = node
  if (appStore.getCacheComponents.some((it: any) => it === name )) {
    appStore.removeCachedComponents(path)
  }
}
```

- 在路由集成页面使用 keep-alive, 利用其 include 属性

```html
<router-view>
  <template #default="{ Component, route }">
    <!-- 启动界面缓存 -->
    <template v-if="appStore.getAppConfig.enableKeepAlive">
      <keep-alive :include="appStore.getCachedComponents">
        <component
          :is="Component"
          :key="route.fullPath"
        />
      </keep-alive>
    </template>
    <template v-else>
      <component
        :is="Component"
        :key="route.fullPath"
      />
    </template>
  </template>
</router-view>
```

```ts
<script lang="ts" setup>
import { useAppStore } from '@/store'
const appStore = useAppStore()
</script>
```
