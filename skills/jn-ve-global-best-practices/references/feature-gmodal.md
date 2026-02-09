---
name: feature-gmodal
description: GModal 弹窗组件的使用，支持 Dialog 和 Drawer 模式
---

# GModal 弹窗组件

`GModal` 是基于 Element Plus Dialog 和 Drawer 组件封装的通用弹窗组件，支持对话框和抽屉两种展示模式。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GModal } from 'jn-ve-global'

const dialogVisible = ref(false)
const drawerVisible = ref(false)
</script>

<template>
  <!-- 对话框模式 -->
  <GModal v-model="dialogVisible" type="dialog" width="600px" title="对话框标题">
    <p>这是对话框内容</p>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确定</el-button>
    </template>
  </GModal>
  
  <!-- 抽屉模式 -->
  <GModal v-model="drawerVisible" type="drawer" width="400px" title="抽屉标题">
    <p>这是抽屉内容</p>
  </GModal>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | 是否显示弹窗，支持 v-model |
| type | `'dialog' \| 'drawer'` | `'dialog'` | 弹窗类型 |
| btns | `BtnProps[]` | `[]` | 底部按钮组配置（基于 GButtonGroup） |
| hideFooter | `boolean` | `false` | 是否隐藏底部区域 |
| width | `string \| number` | `'70%'`(dialog) / `'50%'`(drawer) | 弹窗宽度 |
| verticalCenter | `boolean` | `false` | 是否垂直居中（仅对 dialog 有效） |

## 按钮配置 (btns)

可以直接通过 `btns` 属性配置底部按钮，无需手动写 slot。

```vue
<script setup lang="ts">
const modalBtns = [
  {
    label: '取消',
    onClick: () => { visible.value = false }
  },
  {
    label: '确定',
    type: 'primary',
    onClick: () => { console.log('Confirm') }
  }
]
</script>

<template>
  <GModal :btns="modalBtns" ... />
</template>
```

## 插槽

- `default`: 弹窗主体内容
- `title`: 自定义标题区域
- `footer`: 自定义底部区域

## 实例方法

通过 `ref` 可以调用实例方法：

- `open()`: 打开弹窗
- `close()`: 关闭弹窗
