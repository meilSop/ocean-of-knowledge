# 原生js中常见问题的修复

## 1. dom元素的鼠标事件在绑定方法时，通过bind来绑定参数时，使用到的this, 在使用webpack/rollup/ES module构建时，会报错: 将this 转换成了 undefined

```js
export const createDom = (text: string) => {
    const dom = document.createElement('div')
    // dom.onclick = createPan.bind(this, text)  // 这个方法在构建包的时候就会报错

    dom.onclick = () => createPan(text)  // 使用这个箭头函数就能解决这个问题
}

const createPan = (name: string) => {
    const span = document.createElement('span')
    span.innerHTML = name
}
```