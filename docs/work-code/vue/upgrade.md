# vue2.0使用setup语法

## 使用 setup() 方法

只使用 setup() 方法， 仅需要安装 `@vue/composition-api` 依赖即可

- 安装依赖

```js
npm install @vue/composition-api -S
```

- 使用依赖

```js
<template>
  <div>
    <p>Count: {{ state.age }}</p>
    <div>{{ name }}</div>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
  import { defineComponent, reactive } from '@vue/composition-api'
  export default defineComponent({
    name: 'Demo',
    props: {
      name: {type: String, default: '1111'}
    },
    setup(props) {
      const state = reactive({
        age: 10
      })

      function increment() {
        console.log('222222')
      }

      return {
        state: state,
        name: props.name,
        increment
      }
    }
  })
</script>

```

## 使用 setup 语法糖

使用 setup语法糖， 需要将vue版本升级到 2.7.**版本及其以上， 3.xx以下； 同事也需要按照文档将必要的插件进行升级

[升级版本的教程文档](https://blog.vuejs.org/posts/vue-2-7-naruto)

- 使用 setup 语法糖 （2.7.*版本已经支持setup语法糖， 不需要安装而外的插件）

```js
<template>
  <div>
    <p>Count: {{ state.age }}</p>
    <div>{{ name }}</div>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
  export default {
    name: 'Demo'
  }
</script>

<script setup>
  const props = defineProps({
    name: {type: String, default: '1111'}
  }) 

  const state = reactive({
    age: 10
  })

  function increment() {
    console.log('222222')
  }
</script>

```

- 直接在vue2.0中使用该语法糖， 会导致部分API（eg: defineProps）的相关校验规则在 vscode中报错；  这个就需要我们在eslintrc.js中添加入下配置

```js
module.exports = {
  extends: [
    'eslint:recommended',
    + 'plugin:vue/vue3-recommended',  // 使用 Vue 3 规则
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'vue/script-setup-uses-vars': 'error', // 解决未使用变量报错
    'vue/no-setup-props-destructure': 'off' // 允许解构 props
  }
}
```
