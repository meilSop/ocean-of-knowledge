<!--
 * @fileName:
 * @Date: 2023-03-22 19:20:29
 * @Author: manYao.zhu
-->

# canvas API

## 颜色、样式和阴影的属性

```ts
ctx.fillStyle = color | gradient | pattern —— 填充区域的颜色
ctx.strokeStyle = color | gradient | pattern —— 填充路径的颜色
ctx.shadowColor = color —— 设置阴影的颜色
ctx.shadowBlur = number —— 设置阴影的模糊级数
ctx.shadowOffsetX = number —— 设置阴影与形状的水平距离
ctx.shadowOffsetY = number —— 设置阴影与形状的垂直距离
```

## 颜色、样式和阴影的方法

```ts
ctx.createLinearGradient(x, y, x1, y1) —— 线性渐变色 x: 开始的 x 坐标， x1：结束的 x 坐标
ctx.createPattern(image,'repeat|repeat-x|repeat-y|no-repeat') —— 在指定的方向内重复指定的元素
ctx.createRadialGradient(x, y, r, x0, y0, r0) —— 放射状/圆形渐变， x: 开始圆x坐标, x0：结束圆x坐标， r: 开始圆半径
gradient.addColorStop(stop, color) —— 规定 gradient 对象中的颜色和位置。
```

<span>用到的图片</span>
<img alt="" src="/img/beauty/girl13.jpg" id="m_canvas_img">
<span>canvas</span>

<div class='box1'>
  <canvas id="canvas1"></canvas>
</div>

<code-exchange></code-exchange>

```ts
const dom1 = document.querySelector('.box1')
const canvas1 = document.querySelector('#canvas1')
canvas1.width = dom1.clientWidth
canvas1.height = dom1.clientHeight
const ctx = canvas1.getContext('2d')

// 横向线性渐变
ctx.beginPath()
const gradient = ctx.createLinearGradient(0, 0, 100, 0)
gradient.addColorStop(0, '#f00')
gradient.addColorStop(1, '#0f0')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, 100, 100)

// 斜向线性渐变
ctx.beginPath()
const gradient1 = ctx.createLinearGradient(150, 0, 250, 100)
gradient1.addColorStop(0, '#f00')
gradient1.addColorStop(1, '#0f0')
ctx.fillStyle = gradient1
ctx.fillRect(150, 0, 100, 100)

// 横向圆形渐变
ctx.beginPath()
const gradient2 = ctx.createRadialGradient(50, 150, 45, 250, 150, 45)
gradient2.addColorStop(0, '#f00')
gradient2.addColorStop(1, '#0f0')
ctx.fillStyle = gradient2
ctx.fillRect(0, 110, 300, 90)

// 指定元素
ctx.beginPath()
const img = document.querySelector('#m_canvas_img')
img.style.width = 40 + 'px'
img.style.height = 64 + 'px'
const pattern = ctx.createPattern(img, 'repeat')
ctx.fillStyle = pattern
// ctx.rect(300,0, 460, 130)
// ctx.fill()
// 等价于下面
ctx.fillRect(300, 0, 460, 130)
```

## 线条样式 的属性

```ts
ctx.lineCap = 'butt（平直）|round（圆形）|square（方形）' —— 线条末端线帽的样式
ctx.lineJoin = 'bevel（斜角）|round（圆角）|miter（尖角）' —— 两条线交汇时，边角的类型
ctx.lineWidth = number —— 线条的宽度
ctx.miterLimit = number —— 最大斜接长度 (lineJoin 为 miter时生效)
```

## 矩形 的方法

```ts
ctx.rect(x, y, width, height) —— 创建矩形
ctx.fillRect(x, y, width, height) —— 方法绘制“已填色”的矩形
ctx.strokeRect(x, y, width, height) —— 绘制矩形（不填色）
ctx.clearRect(x, y, width, height) —— 清空给定矩形内的指定像素
```

<div class='box2'>
  <canvas id="canvas2"></canvas>
</div>

<code-exchange></code-exchange>

```ts
const canvas = document.querySelector('#canvas')
const dom = document.querySelector('.box')
canvas.width = dom.clientWidth
canvas.height = dom.clientHeight
const ctx = canvas.getContext('2d')

// 创建线条
ctx.beginPath()
ctx.lineWidth = 6
ctx.strokeStyle = '#f0f'
ctx.moveTo(220, 10)
ctx.lineTo(220, 100)
ctx.lineCap = 'round'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(240, 10)
ctx.lineTo(240, 100)
ctx.lineCap = 'square'
ctx.stroke()

// 创建已填充的矩形 + 清除给定矩形内的像素
ctx.beginPath()
ctx.fillStyle = '#f0f'
ctx.fillRect(0, 0, 200, 100)
ctx.clearRect(10, 10, 50, 50)

// 创建矩形
ctx.beginPath()
ctx.fillStyle = '#0f0'
ctx.lineWidth = 5
ctx.lineJoin = 'round'
ctx.strokeStyle = '#f00'
ctx.rect(10, 120, 100, 100)
ctx.stroke()
ctx.fill()

ctx.beginPath()
ctx.strokeStyle = '#0ff'
ctx.strokeRect(130, 120, 100, 100)
```

## 路径 的方法

```ts
ctx.fill() —— 填充当前的图像（路径）
ctx.stroke() —— 绘制已定义的路径
ctx.beginPath() —— 起始一条路径，或重置当前路径
ctx.moveTo(x, y) —— 把路径移动到画布中的指定点，不创建线条
ctx.lineTo(x, y) —— 加一个新点，然后在画布中创建从该点到最后指定点的线条
ctx.closePath() —— 创建从当前点回到起始点的路径

ctx.clip() —— 从原始画布中剪切任意形状和尺寸 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切
  的区域内（不能访问画布上的其他区域）。您也可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）
ctx.quadraticCurveTo(cpx, cpy, x, y) —— 创建二次贝塞尔曲线 cpx：控制点的x坐标，x: 结束点x坐标
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y) —— 创建三次贝塞尔曲线 cp1x: 控制点1的x坐标， cp2x: 控制点2的坐标，x：结束点的x坐标
ctx.arc(x, y, r, sAngle, eAngle, counterClockWise) —— 创建弧/曲线（用于创建圆或部分圆）r: 半径， sAngle: 起始角度， counterClockWise: 是否逆时针
ctx.arcTo(x, y, x1, y1, r) —— 创建介于两个切线之间的弧/曲线  x:起点的x坐标， y: 终点的x坐标， r: 半径

ctx.isPointInPath(x, y) —— 用于判定指定的点是否在在当前路径中 x,y为指定点的坐标
```

<div class='box3'>
  <canvas id="canvas3"></canvas>
</div>

<code-exchange></code-exchange>

```ts
const canvas = document.querySelector('#canvas')
const dom = document.querySelector('.box')
canvas.width = dom.clientWidth
canvas.height = dom.clientHeight
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgba(0,0,0, . 5)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// 画一个矩形
ctx.beginPath()
ctx.fillStyle = '#0ff'
ctx.fillRect(170, 40, 60, 60)

// 画一个支线和曲线
ctx.beginPath()
ctx.strokeStyle = '#0f0'
ctx.fillStyle = '#f00'
ctx.moveTo(300, 40)
ctx.lineTo(350, 40)
ctx.arcTo(400, 40, 400, 90, 50)
ctx.lineTo(400, 140)
// ctx.closePath()
ctx.stroke()
// ctx.fill()

// 二次贝塞尔曲线
ctx.beginPath()
ctx.moveTo(450, 40)
ctx.quadraticCurveTo(460, 120, 600, 40)
ctx.stroke()

// 三次贝塞尔曲线
ctx.beginPath()
ctx.moveTo(450, 180)
ctx.bezierCurveTo(460, 300, 560, 300, 600, 180)
ctx.stroke()

// 创建线条
ctx.strokeStyle = '#0f0'
ctx.rect(50, 50, 200, 200)
ctx.stroke()
// 剪切
ctx.clip()

// 创建被剪切的矩形
ctx.beginPath()
ctx.fillStyle = '#f00'
ctx.fillRect(40, 40, 100, 100)
```

## 转换 的方法

```ts
ctx.scale(scaleWidth, scaleHeight) —— 缩放当前绘图至更大或更小： 宽长的缩放
ctx.rotate(angle) —— 旋转当前的绘图
ctx.translate(x, y) —— 重新映射画布上的 (0,0) 位置
ctx.transform(a,b,c,d,e,f) —— transform() 方法的行为相对于由 rotate()、scale()、translate() 完成的变换
ctx.setTransform(a,b,c,d,e,f) —— 把当前的变换矩阵重置为单位矩阵，然后以相同的参数运行 transform()
```

## 文本 的属性

```ts
ctx.font = 'font-style font-variant font-weight font-size font-family' —— 字体样式：都有默认值 —— 其中前两个属性可以不管
ctx.textAlign = 'start|end|left|center|right' —— 文本对齐方式： start等效于left, end 等效于right
ctx.textBaseline = 'alphabetic|top|hanging|middle|ideographic|bottom' —— 绘制文本时的当前文本基线 （垂直方向）
```

## 文本 的方法

```ts
fillText(text, x, y, maxWidth) —— 画布上绘制填色的文本
strokeText(text, x, y, maxWidth) —— 在画布上绘制文本（没有填色）
measureText(text, x, y, maxWidth) —— 返回包含一个对象，该对象包含以像素计的指定字体宽度
```

<div class='box4'>
  <canvas id="canvas4"></canvas>
</div>

<code-exchange></code-exchange>

```ts
const canvas = document.querySelector('#canvas4')
const dom = document.querySelector('.box4')
canvas.width = dom.clientWidth
canvas.height = dom.clientHeight
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgba(0,0,0,.5)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#f0f'
ctx.fillStyle = '#0f0'

ctx.font = '30px Arial'
var txt = 'Hello World'
ctx.fillText('width:' + ctx.measureText(txt).width, 200, 30)
ctx.fillText(txt, 10, 30)

const textW = 30
const str = `本月活动： 1、一个月内订餐满十五次可参与次月5号晚上直播抽奖活动并送彩票一张。 2、群内每订一份餐可获一元积分，月累计积分可在新动力商城内兑换礼品。(每天帮您存一元，新年礼啦） 3、本群是一个综合服务群，不仅可以订餐任何需要我们做的都可以帮您完成，让我们成为您工作生活中的好助手！ 4、推荐奖励:若您有朋友公司需要这样的服务群可以推荐给我们，有神秘礼物哦。`
ctx.font = `${textW}px 宋体`
const len = new Array(Math.floor(canvas.width / textW)).length
let row = 0
let column = 1

for (let i = 0; i < str.length; i++) {
  if (i % (len - 1) === 0 || str[i] === '\n' || str[i] === ' ') {
    row += textW
    column = i % (len - 1)
  }
  const sum = (i % (len - 1)) - column
  if (sum % 2 === 0) {
    ctx.strokeText(str[i], sum * textW, row)
  } else {
    ctx.fillText(str[i], sum * textW, row)
  }
}
```

## 图像绘制 的方法

```ts
ctx.drawImage(img, x, y) —— 在画布上定位图像 img: 规定要使用的图像、画布或视频, x：开始的x坐标， y: 开始的y坐标
ctx.drawImage(img, x, y, width, height) —— 在画布上定位图像，并规定图像的宽度和高度
ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height) —— 剪切图像，并在画布上定位被剪切的部分 sx: 开始剪切的x坐标，sy: 开始剪切的y坐标，sWidth: 剪切的宽度， sHeight:剪切的高度
```

<span>使用的图片</span>
<img src="/img/beauty/girl13.jpg" class="m_img" alt="">
<span>canvas</span>

<div class='box5'>
  <canvas id="canvas5"></canvas>
</div>

<code-exchange></code-exchange>

```ts
const dom = document.querySelector('.box')
const canvas = document.querySelector('#canvas')
canvas.width = dom.clientWidth
canvas.height = dom.clientHeight
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'rgba(0,0,0,.8)'
ctx.fillRect(0, 0, dom.clientWidth, dom.clientHeight)
const img = document.querySelector('.m_img')
ctx.drawImage(img, 0, 0, 1080, 1441, 50, 0, 450, 700)
```

## 像素操作的属性

```ts
imgData.width —— 返回 ImageData 对象的宽度
imgData.height —— 返回 ImageData 对象的高度
imgData.data —— 返回一个对象，其包含指定的 ImageData 对象的图像数据
```

## 像素操作的方法

```ts
ctx.createImageData(width, height) —— 创建新的、空白的 ImageData 对象
ctx.getImageData(x, y, width, height) —— 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据
ctx.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) —— 把图像数据（从指定的 ImageData 对象）放回画布上
 // imgData: 规定要放到画布上的imageData对象， x、y: 要放的位置， dirtyX,dirtyY：剪切的起始位置，dirtyWidth,dirtyHeight: 剪切的宽高
```

<div class='box6'>
  <canvas id="canvas6"></canvas>
</div>

<code-exchange></code-exchange>

```ts
const canvas = document.querySelector('#canvas')
const dom = document.querySelector('.box')
canvas.width = dom.clientWidth
canvas.height = dom.clientHeight
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgba(0,0,0,.5)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const imgData = ctx.createImageData(100, 100)
console.log(imgData.width)
console.log(imgData.height)
console.log(imgData.data)
for (let i = 0; i < imgData.data.length; i += 4) {
  if ((i / 4) % 2 === 0) {
    imgData.data[i + 0] = 255
    imgData.data[i + 1] = 0
    imgData.data[i + 2] = 0
    imgData.data[i + 3] = 255
  } else {
    imgData.data[i + 0] = 0
    imgData.data[i + 1] = 255
    imgData.data[i + 2] = 0
    imgData.data[i + 3] = 255
  }
}
ctx.putImageData(imgData, 200, 200, 10, 10, 100, 100)

const newImage = ctx.getImageData(200, 200, 70, 90)
ctx.putImageData(newImage, 10, 10)
```

## 合成的属性

```ts
ctx.globalAlpha = number —— 设置或返回绘图的当前透明值
ctx.globalCompositeOperation = 'source-over|source-atop|source-in|source-out|destination-over|destination-atop|destination-in|destination-out|lighter|copy|xor' —— 设置或返回新图像如何绘制到已有的图像上
```

## 其他 方法

```ts
ctx.save() —— 保存当前环境的状态
ctx.restore() —— 返回之前保存过的路径状态和属性
canvas.createEvent(type) —— 创建事件对象
canvas.getContext('2d') —— 返回一个用于在画布上绘图的环境
canvas.toDataURL('image/png') —— 将canvas导出为base64格式的图片
```

<div class='box7'>
  <canvas id="canvas7"></canvas>
</div>
<div class="box8"></div>

<code-exchange></code-exchange>

```ts
const canvas = document.querySelector('#canvas7')
const dom = document.querySelector('.box7')
canvas.width = dom.clientWidth
canvas.height = dom.clientHeight
const ctx = canvas.getContext('2d')
ctx.fillStyle = '#f00'
ctx.fillRect(0, 0, 200, 100)
ctx.globalAlpha = 0.2
ctx.fillStyle = '#0f0'
ctx.fillRect(30, 80, 200, 100)
ctx.fillStyle = '#00f'
ctx.globalAlpha = 1
ctx.fillRect(270, 0, 200, 100)
ctx.fillStyle = '#f0f'
ctx.globalCompositeOperation = 'destination-over'
ctx.fillRect(300, 80, 200, 100)

const image = canvas.toDataURL('image/png')
const img = document.createElement('img')
img.style.width = canvas.width + 'px'
img.style.height = canvas.height + 'px'
img.src = image
const dom1 = document.querySelector('.box8')
dom1.appendChild(img)

canvas.onclick = (evt) => {
  const imgData = evt.target.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = imgData
  a.download = 'canvas.png'
  a.click()
}
```

<script lang="ts" setup>
  import {onMounted} from 'vue'
  onMounted(() => {
    events.render1()
    events.render2()
    events.render3()
    events.render4()
    events.render5()
    events.render6()
    events.render7()
  })

  const events = {
    render1() {
      const dom1 = document.querySelector('.box1')
      const canvas1 = document.querySelector('#canvas1')
      canvas1.width = dom1.clientWidth
      canvas1.height = dom1.clientHeight
      const ctx = canvas1.getContext('2d')
      
      // 横向线性渐变
      ctx.beginPath()
      const gradient = ctx.createLinearGradient(0,0,100, 0)
      gradient.addColorStop(0, '#f00')
      gradient.addColorStop(1, '#0f0')
      ctx.fillStyle = gradient
      ctx.fillRect(0,0,100,100)
      
      // 斜向线性渐变
      ctx.beginPath()
      const gradient1 = ctx.createLinearGradient(150,0, 250, 100)
      gradient1.addColorStop(0, '#f00')
      gradient1.addColorStop(1, '#0f0')
      ctx.fillStyle = gradient1
      ctx.fillRect(150, 0, 100, 100)
      
      // 横向圆形渐变
      ctx.beginPath()
      const gradient2 = ctx.createRadialGradient(50, 150, 45, 250, 150, 45)
      gradient2.addColorStop(0, '#f00')
      gradient2.addColorStop(1, '#0f0')
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 110, 300, 90)

      // 指定元素
      ctx.beginPath()
      const img = document.querySelector('#m_canvas_img')
      img.style.width = 40 + 'px'
      img.style.height = 64 + 'px'
      const pattern = ctx.createPattern(img, 'repeat')
      ctx.fillStyle = pattern
      // ctx.rect(300,0, 460, 130)
      // ctx.fill()
      // 等价于下面
      ctx.fillRect(300,0, 460, 130)
    },
    render2() {
      const dom2 = document.querySelector('.box2')
      const canvas2 = document.querySelector('#canvas2')
      canvas2.width = dom2.clientWidth
      canvas2.height = dom2.clientHeight
      const ctx2 = canvas2.getContext('2d')

      // 创建线条
      ctx2.beginPath()
      ctx2.lineWidth = 6
      ctx2.strokeStyle = '#f0f'
      ctx2.moveTo(220, 10)
      ctx2.lineTo(220, 100)
      ctx2.lineCap = 'round'
      ctx2.stroke()

      ctx2.beginPath()
      ctx2.moveTo(240, 10)
      ctx2.lineTo(240, 100)
      ctx2.lineCap = 'square'
      ctx2.stroke()

      // 创建已填充的矩形 + 清除给定矩形内的像素
      ctx2.beginPath()
      ctx2.fillStyle = '#f0f'
      ctx2.fillRect(0, 0, 200, 100)
      ctx2.clearRect(10, 10, 50, 50)
      
      // 创建矩形
      ctx2.beginPath()
      ctx2.fillStyle = '#0f0'
      ctx2.lineWidth = 5
      ctx2.lineJoin = 'round'
      ctx2.strokeStyle = '#f00'
      ctx2.rect(10, 120, 100, 100)
      ctx2.stroke()
      ctx2.fill()

      ctx2.beginPath()
      ctx2.strokeStyle = '#0ff'
      ctx2.strokeRect(130, 120, 100, 100)
    },
    render3() {
      const canvas3 = document.querySelector('#canvas3')
      const dom3 = document.querySelector('.box3')
      canvas3.width = dom3.clientWidth
      canvas3.height = dom3.clientHeight
      const ctx3 = canvas3.getContext('2d')

      ctx3.fillStyle = 'rgba(0,0,0, . 5)'
      ctx3.fillRect(0,0,canvas3.width, canvas3.height)
      
      // 画一个矩形
      ctx3.beginPath()
      ctx3.fillStyle = '#0ff'
      ctx3.fillRect(170, 40, 60, 60)
      
      // 画一个支线和曲线
      ctx3.beginPath()
      ctx3.strokeStyle = '#0f0'
      ctx3.fillStyle = '#f00'
      ctx3.moveTo(300, 40)
      ctx3.lineTo(350, 40)
      ctx3.arcTo(400, 40, 400, 90, 50)
      ctx3.lineTo(400, 140)
      // ctx3.closePath()
      ctx3.stroke()
      // ctx3.fill()
      
      // 二次贝塞尔曲线
      ctx3.beginPath()
      ctx3.moveTo(450, 40)
      ctx3.quadraticCurveTo(460, 120, 600, 40)
      ctx3.stroke()
      
      // 三次贝塞尔曲线
      ctx3.beginPath()
      ctx3.moveTo(450, 180)
      ctx3.bezierCurveTo(460, 300, 560, 300, 600, 180)
      ctx3.stroke()

      // 创建线条
      ctx3.strokeStyle = '#0f0'
      ctx3.rect(50, 50, 200, 200)
      ctx3.stroke()
      // 剪切
      ctx3.clip()
      
      // 创建被剪切的矩形
      ctx3.beginPath()
      ctx3.fillStyle = '#f00'
      ctx3.fillRect(40, 40, 100, 100)
    },
    render4() {
      const canvas = document.querySelector('#canvas4')
      const dom = document.querySelector('.box4')
      canvas.width = dom.clientWidth
      canvas.height = dom.clientHeight
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = 'rgba(0,0,0,.5)'
      ctx.fillRect(0,0,canvas.width, canvas.height)

      ctx.strokeStyle = '#f0f'
      ctx.fillStyle="#0f0"

      ctx.font="30px Arial";
      var txt="Hello World"
      ctx.fillText("width:" + ctx.measureText(txt).width,200,30)
      ctx.fillText(txt,10, 30);

      const textW = 30
      const str = `本月活动： 1、一个月内订餐满十五次可参与次月5号晚上直播抽奖活动并送彩票一张。 2、群内每订一份餐可获一元积分，月累计积分可在新动力商城内兑换礼品。(每天帮您存一元，新年礼啦） 3、本群是一个综合服务群，不仅可以订餐任何需要我们做的都可以帮您完成，让我们成为您工作生活中的好助手！ 4、推荐奖励:若您有朋友公司需要这样的服务群可以推荐给我们，有神秘礼物哦。`
      ctx.font = `${textW}px 宋体`
      const len = new Array(Math.floor(canvas.width / textW)).length
      let row = 30
      let column = 1
      
      for (let i = 0; i < str.length; i++) {
        if (i % (len - 1) === 0 || str[i] === '\n' || str[i] === ' ') {
          row += textW
          column = i % (len - 1)
        }
        const sum = i % (len - 1) - column
        if (sum % 2 === 0) {
          ctx.strokeText(str[i], sum * textW, row)
        } else {
          ctx.fillText(str[i], sum * textW, row)
        }
      }
    },
    render5() {
      const dom = document.querySelector('.box5')
      const canvas= document.querySelector('#canvas5')
      canvas.width = dom.clientWidth
      canvas.height = dom.clientHeight
      
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(0,0,0,.8)'
      ctx.fillRect(0, 0, dom.clientWidth, dom.clientHeight)
      
      const img = document.querySelector('.m_img')
      // ctx.drawImage(img, 0, 0)
      ctx.drawImage(img, 0, 0, 1080, 1441, 0, 0, 450, 700)
    },
    render6() {
      const canvas = document.querySelector('#canvas6')
      const dom = document.querySelector('.box6')
      canvas.width = dom.clientWidth
      canvas.height = dom.clientHeight
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = 'rgba(0,0,0,.5)'
      ctx.fillRect(0,0,canvas.width, canvas.height)
      
      const imgData = ctx.createImageData(100, 100)
      console.log(imgData.width);
      console.log(imgData.height);
      console.log(imgData.data);
      for (let i = 0; i <imgData.data.length ; i+=4) {
        if ( (i / 4 ) % 2 === 0) {
          imgData.data[i + 0] = 255
          imgData.data[i + 1] = 0
          imgData.data[i + 2] = 0
          imgData.data[i + 3] = 255 
        } else {
          imgData.data[i + 0] = 0
          imgData.data[i + 1] = 255
          imgData.data[i + 2] = 0
          imgData.data[i + 3] = 255 
        }
      }
      ctx.putImageData(imgData, 200, 200, 10, 10, 100, 100)

      const newImage = ctx.getImageData(200, 200, 70, 90)
      ctx.putImageData(newImage, 10, 10)
    },
    render7() {
      const canvas = document.querySelector('#canvas7')
      const dom = document.querySelector('.box7')
      canvas.width = dom.clientWidth
      canvas.height = dom.clientHeight
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#f00'
      ctx.fillRect(0,0,200,100)
      ctx.globalAlpha = 0.2
      ctx.fillStyle = '#0f0'
      ctx.fillRect(30, 80, 200, 100)
      ctx.fillStyle = '#00f'
      ctx.globalAlpha = 1
      ctx.fillRect(270, 0, 200, 100)
      ctx.fillStyle = '#f0f'
      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillRect(300, 80, 200, 100)

      const image = canvas.toDataURL('image/png')
      const img = document.createElement('img')
      img.style.width = canvas.width + 'px'
      img.style.height = canvas.height + 'px'
      img.src = image
      const dom1 = document.querySelector('.box8')
      dom1.appendChild(img)

      canvas.onclick = (evt) => {
        const imgData = evt.target.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = imgData
        a.download = 'canvas.png'
        a.click()
      }
    }
  }
</script>

<style scope>
  .box1 {
    width: 100%;
    height: 200px;
  }
  .box2 {
    width: 100%;
    height: 300px;
  }
  .box3 {
    width: 100%;
    height: 310px;
  }
  .box4 {
    width: 100%;
    height: 440px;
  }

  .box5 {
    width: 100%;
    height: 800px;
  }
  .box6 {
    width: 100%;
    height: 400px;
  }
  .box7, .box8 {
    width: 100%;
    height: 260px;
  }


  #m_canvas_img {
    width: 40px;
    height: 65px;
  }

  .vp-doc .exchange-code + div[class*='language-'] {
    margin: 0;
    height: 0;
  }
  .m_img {
    width: 450px;
    height: 700px;
  }
</style>
