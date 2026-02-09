---
name: feature-gicon
description: GIcon 图标组件的使用，自动识别多种图标源
---

# GIcon 图标组件

`GIcon` 是一个通用图标组件，支持自动识别阿里图标、Element Plus 图标和本地 SVG 图标。

## 基本用法

```vue
<template>
  <!-- 阿里图标 (icon- 或 ali- 开头) -->
  <GIcon icon="icon-home" />
  
  <!-- Element Plus 图标 (el- 开头) -->
  <GIcon icon="el-Search" />
  
  <!-- 本地 SVG 图标 (其他命名) -->
  <GIcon icon="custom-logo" />
</template>
```

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| **icon** | `string` | **必传** - 图标名称 |
| customColor | `boolean` | 是否启用自定义颜色（仅对本地 SVG 有效，默认 false） |

## 样式定制

支持直接通过 `style` 和 `class` 设置大小和颜色。

```vue
<GIcon icon="el-Search" style="font-size: 20px; color: #409eff;" />
```
