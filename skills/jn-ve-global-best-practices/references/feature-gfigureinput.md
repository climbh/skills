---
name: feature-gfigureinput
description: GFigureInput 数字输入组件的使用，支持千分位和格式化
---

# GFigureInput 数字输入组件

`GFigureInput` 专门用于数字输入，支持千分位展示、小数位控制、单位提示。采用双输入框设计（输入时显示纯数字，失焦时显示格式化文本）。

## 基本用法

```vue
<template>
  <GFigureInput 
    v-model="amount" 
    placeholder="请输入金额"
    :toThousands="true"
    :showDecimalsLength="2"
  />
</template>
```

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| modelValue | `string \| number` | 绑定值 |
| toThousands | `boolean` | 是否显示千分位 (默认 true) |
| showDecimalsLength | `number` | 展示时保留的小数位数 |
| valDecimalsLength | `number` | 输入时限制的小数位数 |
| showUnitTip | `boolean` | 是否显示单位提示 (如：1万) |
| unitNumeralSystem | `number` | 单位进制 (如 10000) |

## 特性

- **双模式**: 输入时为普通 Input，展示时为格式化文本。
- **表格集成**: 完美适配 `GTable` 的可编辑列。
