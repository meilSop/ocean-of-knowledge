<!--
 * @Date: 2024-11-06 17:02:28
-->
# 常用的样式

## css样式中固定列表列样式

```css
// 父节点
.parent {
  overflow: auto;
}
// 子节点（需要固定的列【行同理， 需要将left改成top】）
.child {
  position: sticky;
  left: 0;
  background-color: white; /* 防止滚动时背景变透明 */
  z-index: 1; /* 确保固定列在其他内容之上 */
}
```

## 父元素的宽度由子元素撑开

- 可以为父元素添加那些属性: display: inline-block、inline-flex;  width: fit-content 、max-content  

```css
.parent {
  display: inline-block;
  display: inline-flex;
  width: fit-content;
  width: max-content;  
}
```

## scss与less设置动态类名

```less
// less定义变量类
@namespace: zmy;
@prefix-cls: ~'@{namespace}-flow_node_info';
.@{prefix-cls} {
  width: 100%;
}
```

```scss
// scss定义变量类
$namespace: zmy;
$prefix-cls: '#{$namespace}_flow_node_info';
.#{prefix-cls} {
  width: 100%;
}
```

## 动态类名下，如何给动态类名的hover时，给其动态类名的子元素添加样式

```html
<div :class="prefixCls">
  <div :class="`${prefixCls}_item`">
    <span :class="`${prefixCls}_item_title`">{{ menu.text }}</span>
    <span :class="`${prefixCls}_item_keyboard`">{{ menu.keyboard }}</span>
  </div>
</div>
```

```ts
const { prefixCls } = usePrefix('name')
```

```scss
$namespace: zmy;
$prefix-cls: '#{$namespace}_name';

.#{prefix-cls} {
  width: 100%;
  &_item {
    width: 100%;
    height: 32px;
    &_title {
      font-size: 16px;
    }
    /* hover事件时， 内部变量类的样式的处理 */
    &:hover [class$='_title'] {
      color: $themeColor;
    }
    &_keyboard {
      font-size: 14px;
    }
  }
}
```

## 如何给动态类添加伪类元素

```scss
$prefix-cls: '#{$namespace}_flow_node';

.#{$prefix-cls} {
  width: calc(100% - 10px);
  height: 100%;
  margin-right: 10px;
  overflow: auto;
  // 滚动条样式
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 10px 10px 0;
}
```
