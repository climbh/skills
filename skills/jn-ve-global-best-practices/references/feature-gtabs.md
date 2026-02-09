---
name: feature-gtabs
description: GTabs 标签页组件的使用，支持多种样式
---

# GTabs 标签页组件

`GTabs` 是基于 Element Plus Tabs 组件封装的标签页组件，提供了更简洁的配置方式。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GTabs } from 'jn-ve-global'

const tabList = ref([
  { label: '用户管理', value: 'user' },
  { label: '角色管理', value: 'role' },
  { label: '权限管理', value: 'permission', disabled: true }
])

const handleTabChange = (tabName: string | number) => {
  console.log('当前标签页:', tabName)
}
</script>

<template>
  <GTabs :list="tabList" @tabChange="handleTabChange">
    <div>标签页内容区域</div>
  </GTabs>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | `TabPaneProps[]` | `[]` | 标签页列表配置 |
| type | `'card' \| 'border-card' \| 'big-card' \| ''` | `''` | 标签页类型 |

### TabPaneProps

| 属性 | 类型 | 说明 |
|------|------|------|
| label | `string` | 标签页标题 |
| value | `string \| number` | 标签页唯一标识 |
| disabled | `boolean` | 是否禁用 |
| hide | `boolean \| (() => boolean)` | 是否隐藏 |

## 样式类型

- `''` (默认): 基础标签页
- `'card'`: 卡片标签页
- `'border-card'`: 边框卡片标签页
- `'big-card'`: 大卡片标签页（特殊定制样式）
