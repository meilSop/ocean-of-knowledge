<!--
 * @Date: 2023-11-23 18:03:51
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-11-24 09:27:41
 * @FilePath: \ocean-of-knowledge\docs\work-code\css-question.md
-->

# CSS 样式问题及修复

## flex 布局时， width: 100% 或 overflow: hidden 不生效问题

##### flex 布局， width: 100% 不生效

- flex 布局， 第一层子元素，设置子元素的 width:100% 没有问题

- flex 布局，出现多层 flex 布局嵌套的时候， 设置其中子元素的 width:100% 不起作用。

  解决方案: 将设置 width 的元素，设置为绝对定位

##### flex 布局，overflow: hidden 不生效

- flex 布局， 第一层子元素，设置子元素的 flex: 1 与 overflow: hidden 没有问题

- flex 布局，出现多层 flex 布局嵌套的时候， 设置子元素的 flex: 1 与 overflow: hidden 不起作用

  解决方案: 给该元素设置 width: 0
