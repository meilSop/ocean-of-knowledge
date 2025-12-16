# 代码雨

## html

```html
<body>
  <canvas id="canvas"></canvas>
</body>
```

## js

```ts
const canvas: HTMLCanvasElement | any = document.querySelector('canvas')
const textW: number = 14 // 字体的宽度
const ctx = canvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

const str: string = '朱满要真的帅'
const arr: any[] = new Array(Math.floor(canvas.width / textW)).fill(0)

const rain = () => {
  ctx.fillStyle = 'rgba(0,0,0,.4)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#FF7500'
  arr.forEach((item: any, idx: number) => {
    ctx.fillText(
      str[Math.floor(Math.random() * str.length)],
      idx * textW,
      item + textW
    )
    console.log(item)

    arr[idx] =
      item > canvas.length || item > Math.random() * 10000 ? 0 : item + textW
  })
}
setInterval(rain, 50)
```

## 效果图

![](/img/code-ran.png)
