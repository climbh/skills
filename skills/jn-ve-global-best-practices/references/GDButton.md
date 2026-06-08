# GDButton - 防抖按钮组件

## 概述

GDButton 是基于 Element Plus Button 组件封装的防抖按钮组件，通过内置的防抖机制防止用户快速重复点击，提升用户体验和系统稳定性。

## 基本用法

```vue
<template>
  <GDButton @click="handleClick">
    点击按钮
  </GDButton>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| debounce | 是否开启防抖 | boolean | true / false | true |
| wait | 防抖延迟时间（毫秒） | number | — | 1000 |
| onClick | 点击事件处理函数 | Function | — | null |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件（经过防抖处理） | event |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

## 使用示例

### 基础防抖按钮

```vue
<template>
  <GDButton @click="submitForm">
    提交表单
  </GDButton>
</template>

<script setup>
const submitForm = () => {
  // 提交表单逻辑
  console.log('表单提交中...')
}
</script>
```

### 自定义防抖延迟

```vue
<template>
  <GDButton :wait="2000" @click="handleSave">
    保存数据
  </GDButton>
</template>

<script setup>
const handleSave = () => {
  console.log('保存数据...')
}
</script>
```

### 禁用防抖

```vue
<template>
  <GDButton :debounce="false" @click="handleClick">
    普通按钮
  </GDButton>
</template>

<script setup>
const handleClick = () => {
  console.log('立即执行，无防抖')
}
</script>
```

### 不同按钮类型

```vue
<template>
  <div>
    <GDButton type="primary" @click="handlePrimary">
      主要按钮
    </GDButton>
    
    <GDButton type="success" @click="handleSuccess">
      成功按钮
    </GDButton>
    
    <GDButton type="warning" @click="handleWarning">
      警告按钮
    </GDButton>
    
    <GDButton type="danger" @click="handleDanger">
      危险按钮
    </GDButton>
  </div>
</template>

<script setup>
const handlePrimary = () => console.log('主要操作')
const handleSuccess = () => console.log('成功操作')
const handleWarning = () => console.log('警告操作')
const handleDanger = () => console.log('危险操作')
</script>
```

### 带图标的防抖按钮

```vue
<template>
  <div>
    <GDButton @click="handleEdit">
      <GIcon name="el-Edit" />
      编辑
    </GDButton>
    
    <GDButton type="danger" @click="handleDelete">
      <GIcon name="el-Delete" />
      删除
    </GDButton>
  </div>
</template>

<script setup>
const handleEdit = () => {
  console.log('编辑操作')
}

const handleDelete = () => {
  console.log('删除操作')
}
</script>
```

### 加载状态

```vue
<template>
  <GDButton 
    :loading="loading" 
    @click="handleAsyncOperation"
  >
    异步操作
  </GDButton>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleAsyncOperation = async () => {
  loading.value = true
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('操作完成')
  } finally {
    loading.value = false
  }
}
</script>
```

## 核心特性

### 1. 防抖机制
- 默认开启防抖功能，防止重复点击
- 可自定义防抖延迟时间
- 支持禁用防抖功能

### 2. Element Plus 兼容
- 完全兼容 Element Plus Button 的所有属性
- 支持所有 Button 的样式和状态
- 保持原有的 API 设计

### 3. 事件处理
- 智能防抖处理，首次点击立即执行
- 在延迟时间内的后续点击被忽略
- 支持异步操作的防抖处理

## Element Plus Button 属性支持

GDButton 支持所有 Element Plus Button 组件的原生属性：

- `type` - 按钮类型
- `size` - 按钮尺寸
- `plain` - 朴素按钮
- `round` - 圆角按钮
- `circle` - 圆形按钮
- `loading` - 加载状态
- `disabled` - 禁用状态
- `icon` - 图标
- `autofocus` - 自动聚焦
- `native-type` - 原生 type 属性

## 重要说明

1. **防抖策略**: 使用 lodash 的 debounce 函数，配置为 `leading: true, trailing: false`，即首次点击立即执行，后续点击在延迟时间内被忽略

2. **事件绑定**: 推荐使用 `@click` 事件绑定，组件会自动应用防抖处理

3. **异步操作**: 适合用于表单提交、数据保存等可能触发重复操作的场景

4. **性能优化**: 防抖函数会被缓存，避免重复创建

5. **样式继承**: 完全继承 Element Plus Button 的样式系统

6. **无障碍**: 保持 Element Plus Button 的无障碍特性

7. **兼容性**: 与 Element Plus Button 完全兼容，可作为直接替换使用

## 版本信息

- 当前版本: 1.0.0
- 依赖: Element Plus Button、lodash
- Vue 版本: 3.x