---
name: feature-gbuttongroup
description: GButtonGroup 按钮组组件的使用，支持权限控制和动态状态
---

# GButtonGroup 按钮组组件

`GButtonGroup` 用于通过配置数组快速生成一组按钮，支持权限控制、动态状态管理。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GButtonGroup } from 'jn-ve-global'

const btns = ref([
  {
    label: '新增',
    type: 'primary',
    onClick: () => console.log('Add')
  },
  {
    label: '删除',
    type: 'danger',
    // 动态禁用
    disabled: () => selectedRows.value.length === 0,
    onClick: () => console.log('Delete')
  }
])
</script>

<template>
  <GButtonGroup :btns="btns" />
</template>
```

## BtnProps 配置

| 属性 | 类型 | 说明 |
|------|------|------|
| label | `string` | 按钮文本 |
| type | `string` | Element Plus 按钮类型 (primary, danger 等) |
| onClick | `Function` | 点击回调 |
| authCode | `string` | 权限标识，用于 `v-auth` 控制 |
| disabled | `boolean \| Function` | 是否禁用，支持函数动态计算 |
| hide | `boolean \| Function` | 是否隐藏，支持函数动态计算 |
| icon | `string` | 图标名称 |

## 特性

- **动态状态**: `disabled`, `loading`, `hide` 均支持传入函数，实时计算状态。
- **权限集成**: 通过 `authCode` 自动对接权限系统。
