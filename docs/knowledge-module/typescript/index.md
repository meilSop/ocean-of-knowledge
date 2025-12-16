<!--
 * @fileName: 安装依赖
 * @Date: 2023-03-13 13:47:30
 * @Author: manYao.zhu
-->

# 安装

## 全局安装

```ts
npm install typescript -g
```

## 运行指定文件，生成 js 文件

```ts
tsc **/*.ts
```

## 初始化 ts 生成 tsconfig.json 文件

```ts
tsc --init
```

## 监听指定文件变更， 实时更新生成 js 文件

```ts
tsc -w index.ts

// 就会自动生成index.js文件， 并实时更新
```

## 全局暗转 ts-node

- 作用： 可以通过 ts-node 指令直接运行 .ts 文件

```ts
npm install ts-node -g
```

```ts
ts-node index.ts
```

## 局部安装 @types/node

```ts
npm install @types/node -D
```
