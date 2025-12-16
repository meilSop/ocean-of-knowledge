# h 函数的作用 以及 如何直接在元素上渲染

## h 函数的作用

创建虚拟 DOM 节点 (vnode)。

## h 函数的类型定义

```ts
// 完整参数签名
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
): VNode

// 省略 props
function h(type: string | Component, children?: Children | Slot): VNode

type Children = string | number | boolean | VNode | null | Children[]

type Slot = () => Children

type Slots = { [name: string]: Slot }
```

## h 函数的详解 与 案例

- 第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。第二个参数是要传递的 prop，第三个参数是子节点。

- 当创建一个组件的 vnode 时，子节点必须以插槽函数进行传递。如果组件只有默认槽，可以使用单个插槽函数进行传递。否则，必须以插槽函数的对象形式来传递。

- 为了方便阅读，当子节点不是插槽对象时，可以省略 prop 参数。

```ts
import { h } from 'vue'

// 除了 type 外，其他参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都可以用于 prop
// Vue 会自动选择正确的方式来分配它
h('div', { class: 'bar', innerHTML: 'hello' })

// class 与 style 可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 prop 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnode 和字符串
h('div', ['hello', h('span', 'hello')])
```

## 用 h 函数创建的虚拟dom 如何在dom标签中渲染出来

- 需要通过组件的方式转换下

- Vir2dom 组件
```ts
<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Vir2dom',
  props: {
    dom: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => props.dom
  },
})
</script>
```

- 组件里面使用

```ts
<template>
<Vir2dom :dom="virDom" /> 
</template>
<script setup lang="ts">
import Vir2dom from './Vir2dom.vue'
import { h } from 'vue'

const virDom = h('span', { style: { display: 'inline-block', width: '80px', height: '80px', background: 'red' } })
</script>
```