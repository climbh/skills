---
name: feature-giconpicker
description: GIconPicker 图标选择器组件的使用
---

# GIconPicker 图标选择器

`GIconPicker` 提供可视化的图标选择界面，支持 Element Plus、IconFont 和本地图标。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GIconPicker } from 'jn-ve-global'

const selectedIcon = ref('')
</script>

<template>
  <GIconPicker 
    v-model="selectedIcon" 
    placeholder="请选择图标"
  />
</template>
```

## 在 GForm 中使用

```ts
{
  type: 'iconPicker', // 也可以是 input，但推荐封装好的 iconPicker 类型如果存在，或者使用 slot/render
  prop: 'icon',
  label: '图标',
  controlConfig: {
    // 如果是自定义组件，通常需要在 component 中指定，或者通过 slot
    // 注意：GForm 的具体实现可能需要查看 formItems 的 type 支持
    // 这里假设 GForm 支持 type: 'iconPicker' 或者通过 render 使用
    type: 'iconPicker',
    props: {
      placeholder: '请选择图标'
    }
  }
}
```

> 注意：如果 `GForm` 原生不支持 `iconPicker` 类型，需要使用插槽或 `render` 函数来实现。
