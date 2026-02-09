---
name: feature-gdbutton
description: GDButton 防抖按钮组件的使用
---

# GDButton 防抖按钮

`GDButton` 是内置防抖机制的按钮组件，防止重复点击。

## 基本用法

```vue
<template>
  <GDButton type="primary" @click="handleSubmit">
    提交表单
  </GDButton>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| debounce | `boolean` | `true` | 是否开启防抖 |
| wait | `number` | `1000` | 防抖延迟时间 (ms) |

## 说明

- 默认开启 1000ms 防抖。
- 支持所有 Element Plus Button 的 Props (type, size, plain 等)。
- 首次点击立即执行，后续点击在 `wait` 时间内被忽略。
