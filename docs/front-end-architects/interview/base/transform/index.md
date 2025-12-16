# 解决使用 transform:translate 属性时会出现闪烁现象

## 问题原因

在 Webkit 浏览器中，闪烁问题通常是由于硬件加速和重绘机制的互动引起的。当使用 CSS 转换或过渡时，浏览器会将元素标记为需要硬件加速，以便提高性能和动画的平滑度。然而，当使用一些特殊属性（如透明度和 z-index）以及其他 CSS 属性（如盒模型属性）时，浏览器可能会触发重绘机制，导致元素的闪烁现象。

## 解决方案

- 元素结构

```html
<div class="contain">
  <ul class="content test">
    <div class="name">1111</div>
    <div class="name">2222</div>
    <p class="name">1111</p>
    <p class="name">2222</p>
    <h1 class="name">1111</h1>
    <h1 class="name">2222</h1>
    <h2 class="name">1111</h2>
    <h2 class="name">2222</h2>
    <h3 class="name">1111</h3>
    <h3 class="name">2222</h3>
  </ul>
</div>
```

- CSS 样式

```css
.contain {
  width: 400px;
  height: 100px;
  overflow: hidden;
  position: relative;
}
.content {
  width: 1600px;
  height: 100px;
  position: absolute;
  display: flex;
  transition: transform 5s linear;
}
.name {
  flex: 1;
}
.content:hover {
  transform: translateX(-1200px);
}
```

- 解决方案

```css
/* 移动元素添加属性： backface-visibility */
/* backface-visibility属性用于定义元素在不面向屏幕时是否可见。当元素进行3D转换时，默认情况下会创建一个3D场景，元素被放置在其中并被旋转。这可能会导致闪烁问题。通过将backface-visibility属性设置为hidden，可以确保元素在进行转换时不被放置在3D场景中，从而解决闪烁问题。 */

.content {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* 移动元素的子元素添加属性：translate3d  */
/* translate3d是一种更有效的转换方式，它会将元素转换为3D坐标空间中的一个点。相比之下，使用translate属性时，元素仍然被认为是2D的，这可能会引起闪烁问题。 */
.name {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
```
