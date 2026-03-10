# sessionStorage储存登录信息，实现session-cookie的方式

## 1. 功能描述

- 使用sessionStorage储存用户的登录信息token
- 要求：当前标签在初始化的时候可以获取，其他已经打开表单内的登录信息
- 原因：session-cookie 前端储存的话，httpOnly设置无效；必须要后端去储存， 这样的话前端无法获取储存的token信息；在导航守卫中无法去做登录判断

## 2. 功能实现

### 1. 用户登录时，将用户信息储存在 sessionStorage

- pinia/user.ts

```ts
import { defineStore } from 'pinia';

interface UserState {
  token: string;
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    token: sessionStorage.getItem('token') || '';
  }),
  getters: {
    getToken: (state: UserState) => {
      return state.token;
    }
  },
  actions: {
    setToken(token?: string) {
      if (token) {
        this.token = token;
        sessionStorage.setItem('token', token);
      }
      {
        this.token = '';
        sessionStorage.removeItem('token');
      }
    }
  }
});
```

### 2. 从其他标签获取用户信息的异步方案

- utils/tabSync.ts

```ts
import { useUserStore } from './pinia/user'

export const getTokenFormOtherTab() {
  const userStore = useUserStore()
  return Promise((resolve) => {
    const channel = new BroadcastChannel('auth_channel')
    let resolved = false

    // 监听其他标签的响应
    channel.onmessage((event) => {
      const { type, token } = event.data
      if (type === 'TOKEN_RESPONSE' && token) {
        resolved = true
        channel.close()
        resolve(token)
      }
    })

    // 广播查询
    channel.postMessage({ type: 'QUERY_TOKEN' })

    // 清理函数
    setTimeout(() => {
      if (!resolved) {
        channel.close()
        resolve(null)
      }
    }, 200)
  })
}
```

### 3. 在路由导航守卫中处理token

- router/routerGuard.ts

```ts
import { getTokenFormOtherTab } from './utils/tabSync';
import { useUSerStore } from './pinia/user';

export const createRouteGuard = () => {
  const userStore = useUserStore();
  router.beforeEach(async (to, from, next) => {
    let token = userStore.getToken;
    // 2. 如果没有，尝试从其他标签页获取
    if (!token) {
      // 设置超时（避免无限等待）
      token = await Promise.race([
        getTokenFromOtherTab(),
        new Promise((resolve) => setTimeout(() => resolve(null), 300)) // 300ms 超时
      ]);
      if (token) {
        userStore.setToken(token);
      }
    }

    // 最终判断, 当所在界面没有权限或权限失效
    if (!token) {
      ...
    }
    next()
  });
};
```

### 4. 在项目的app.vue中实现其他标签页的监听代码

- app.vue

```ts
import { onMounted } from 'vue';
import { useUserStore } from './pinia/user';

const userStore = useUserStore();

onMounted(() => {
  initBroadcastChannel();
});

// 初始化时监听广播
function initBroadcastChannel() {
  const channel = new BroadcastChannel('auth_channel');
  channel.onmessage = (event) => {
    const { type } = event.data;
    if (type === 'QUERY_TOKEN') {
      const token = useStore.getAccessToken;
      if (token) {
        channel.postMessage({
          type: 'TOKEN_RESPONSE',
          token
        });
      }
    }
  };
}
```
