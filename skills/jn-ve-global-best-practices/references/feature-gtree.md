---
name: feature-gtree
description: GTree 树形组件的使用，基于 TreeV2，支持虚拟滚动和搜索
---

# GTree 树形组件

`GTree` 是基于 Element Plus TreeV2 组件封装的高性能树形组件，支持虚拟滚动、搜索过滤、展开收起缓存等功能。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GTree } from 'jn-ve-global'

const treeData = ref([
  {
    id: 1,
    name: '一级节点',
    children: [
      { id: 11, name: '二级节点 1-1' }
    ]
  }
])

const handleGetTreeRef = (treeRef: any) => {
  console.log('树实例:', treeRef)
}
</script>

<template>
  <GTree 
    :data="treeData" 
    @getTreeRef="handleGetTreeRef"
  />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `TreeData[]` | `[]` | 树形数据 |
| mode | `'institution' \| 'default' \| 'other'` | `'default'` | 显示模式 |
| btns | `BtnProps[]` | `[]` | 顶部按钮组配置 |
| showBtnArea | `boolean` | `true` | 是否显示顶部按钮区域 |
| hideSearch | `boolean` | `false` | 是否隐藏搜索框 |
| defaultExpandAll | `boolean` | `false` | 是否默认展开所有节点 |
| defaultCheckedKeys | `string[] \| number[]` | `[]` | 默认勾选的节点 key 数组 |

## 核心功能

1.  **虚拟滚动**: 适合大数据量展示。
2.  **搜索过滤**: 内置搜索框，支持节点名称过滤。
3.  **状态缓存**: 自动缓存节点展开状态到 sessionStorage。
4.  **显示模式**: 支持 `institution` (机构模式) 等特殊展示样式。
