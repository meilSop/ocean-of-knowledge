<!--
 * @fileName:
 * @Date: 2023-03-22 19:24:53
 * @Author: manYao.zhu
-->

# canvas 的创建

## 创建 canvas

- html

```html
<div class="box">
  <canvas id="canvas"></canvas>
</div>
```

## 获取上下文 + 设置宽高

- 设置宽高 （不能通过 css 设置。 css 设置的不正确，会导致画图失真）
- API
  1. getContext('2d') —— 获取上下文

```ts
const canvas = document.querySelector('#canvas')
const dom = document.querySelector('.box')
// 设置宽高
canvas.width = dom.clientWidth
canvas.height = dom.clientHeight

// 获取上下文
const ctx = canvas.getContext('2d')
```
