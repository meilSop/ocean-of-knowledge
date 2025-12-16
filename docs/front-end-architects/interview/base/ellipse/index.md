<!--
 * @Date: 2023-11-06 11:26:13
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-11-06 14:10:44
 * @FilePath: \ocean-of-knowledge\docs\front-end-architects\interview\base\ellipse\index.md
-->

# CSS 实现文本换行 (三种方法)

```html
<div class="content">
  换行是指在文字或者其他内容到达行末时，自动转到下一行的行为。在网页设计中，正确的换行可以使页面看起来更加舒适和自然。
</div>
<div class="content">
  Wrapping refers to the act of automatically moving to the next line when text or other content
  reaches the end of the line. In web design, correct line breaks can make the page look more
  comfortable and natural.
</div>
```

## 1. 使用 word-wrap

```css
.content {
  word-wrap: normal; /* 只在允许的断字点换行（浏览器保持默认处理） */
  word-wrap: break-word; /* 在长单词或 URL 地址内部进行换行 */
}
```

## 2. 使用 word-break (属性规定自动换行的处理方法)

```css
.content {
  word-break: normal; /* 使用浏览器默认的换行规则 */
  word-break: break-all; /* 允许在单词内换行 */
  word-break: keep-all; /* 只能在半角空格或连字符处换行 */
}
```

## 3. 使用 white-space (属性设置如何处理元素内的空白)

```css
.content {
  white-space: normal; /* 默认。空白会被浏览器忽略 */
  white-space: pre; /* 空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。 */
  white-space: nowrap; /* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
  white-space: pre-wrap; /* 保留空白符序列，但是正常地进行换行。 */
  white-space: pre-line; /* 合并空白符序列，但是保留换行符。 */
  white-space: inherit; /* 规定应该从父元素继承 white-space 属性的值。 */
}
```

## 单行换行

```css
.content {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

## 多行换行

```css
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; // 用于设置行数
}
```
