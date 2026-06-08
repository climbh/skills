# GTabs 标签页组件

## 概述

GTabs 是基于 Element Plus Tabs 组件封装的标签页组件，提供了更简洁的配置方式和自定义样式。支持多种标签页类型，包括基础标签页、卡片标签页和大卡片标签页。

## 基础用法

```vue
<template>
  <GTabs 
    :list="tabList" 
    @tabChange="handleTabChange"
  >
    <div>标签页内容区域</div>
  </GTabs>
</template>

<script setup>
import { ref } from 'vue'

const tabList = ref([
  { label: '用户管理', value: 'user' },
  { label: '角色管理', value: 'role' },
  { label: '权限管理', value: 'permission' }
])

const handleTabChange = (tabName) => {
  console.log('当前标签页:', tabName)
}
</script>
```

## Props

### GTabs Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | `TabPaneProps[]` | `[]` | 标签页列表配置 |
| type | `'card' \| 'border-card' \| 'big-card' \| ''` | `''` | 标签页类型 |

### TabPaneProps 接口

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 标签页标题 |
| value | `string \| number` | - | 标签页的唯一标识 |
| disabled | `boolean` | `false` | 是否禁用该标签页 |
| hide | `boolean \| (() => boolean)` | `false` | 是否隐藏该标签页，支持函数动态控制 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| tabChange | `(tabName: string \| number) => void` | 标签页切换时触发 |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 标签页内容区域 |

## 标签页类型

### 基础标签页

```vue
<template>
  <GTabs :list="tabList" @tabChange="handleTabChange">
    <div>基础标签页内容</div>
  </GTabs>
</template>
```

### 卡片标签页

```vue
<template>
  <GTabs 
    :list="tabList" 
    type="card"
    @tabChange="handleTabChange"
  >
    <div>卡片标签页内容</div>
  </GTabs>
</template>
```

### 边框卡片标签页

```vue
<template>
  <GTabs 
    :list="tabList" 
    type="border-card"
    @tabChange="handleTabChange"
  >
    <div>边框卡片标签页内容</div>
  </GTabs>
</template>
```

### 大卡片标签页

```vue
<template>
  <GTabs 
    :list="tabList" 
    type="big-card"
    @tabChange="handleTabChange"
  >
    <div>大卡片标签页内容</div>
  </GTabs>
</template>
```

## 使用示例

### 动态隐藏标签页

```vue
<template>
  <GTabs :list="dynamicTabList" @tabChange="handleTabChange">
    <div>动态标签页内容</div>
  </GTabs>
</template>

<script setup>
import { ref } from 'vue'

const showAdvanced = ref(false)

const dynamicTabList = ref([
  { label: '基础设置', value: 'basic' },
  { label: '高级设置', value: 'advanced', hide: () => !showAdvanced.value },
  { label: '系统设置', value: 'system' }
])

const handleTabChange = (tabName) => {
  console.log('当前标签页:', tabName)
}
</script>
```

### 禁用标签页

```vue
<template>
  <GTabs :list="tabListWithDisabled" @tabChange="handleTabChange">
    <div>包含禁用标签页的内容</div>
  </GTabs>
</template>

<script setup>
import { ref } from 'vue'

const tabListWithDisabled = ref([
  { label: '可用标签', value: 'enabled' },
  { label: '禁用标签', value: 'disabled', disabled: true },
  { label: '另一个标签', value: 'another' }
])

const handleTabChange = (tabName) => {
  console.log('当前标签页:', tabName)
}
</script>
```

### 结合路由使用

```vue
<template>
  <GTabs :list="routeTabList" @tabChange="handleRouteChange">
    <router-view />
  </GTabs>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const routeTabList = ref([
  { label: '首页', value: 'home' },
  { label: '用户', value: 'user' },
  { label: '设置', value: 'settings' }
])

const handleRouteChange = (tabName) => {
  router.push(`/${tabName}`)
}
</script>
```

## Element Plus 原生属性支持

GTabs 组件通过 `v-bind="$attrs"` 支持所有 Element Plus Tabs 组件的原生属性，包括但不限于：

- `model-value` / `v-model`: 绑定值，选中选项卡的 name
- `closable`: 标签是否可关闭
- `addable`: 标签是否可增加
- `editable`: 标签是否同时可增加和关闭
- `tab-position`: 选项卡所在位置
- `stretch`: 标签的宽度是否自撑开
- `before-leave`: 切换标签之前的钩子函数

## 重要说明

### 样式定制

1. **CSS 变量**: 组件使用 CSS 变量进行样式定制
   - `--jn-ve-g-tabs-item-font-size`: 标签页字体大小
   - `--jn-ve-g-tabs-item-base-height`: 标签页基础高度

2. **大卡片样式**: `big-card` 类型提供特殊的大尺寸卡片样式
   - 高度: 62px
   - 字体大小: 18px
   - 背景色: #f4fbff

### 内容区域

1. **内容显示**: 只有当存在默认插槽时才显示内容区域
2. **内容样式**: 内容区域有默认的 `padding: 20px 0 8px`

### 事件处理

1. **标签切换**: 通过 `tabChange` 事件处理标签页切换
2. **原生事件**: 支持所有 Element Plus Tabs 的原生事件

### 动态控制

1. **动态隐藏**: `hide` 属性支持函数形式，可实现动态显示/隐藏
2. **响应式**: 标签页列表支持响应式更新

### 性能优化

1. **条件渲染**: 隐藏的标签页不会渲染到 DOM 中
2. **事件优化**: 使用单一事件处理函数处理所有标签页切换

### 无障碍访问

1. **键盘导航**: 继承 Element Plus Tabs 的键盘导航功能
2. **屏幕阅读器**: 支持屏幕阅读器访问标签页标题

### 兼容性

1. **Element Plus**: 基于 Element Plus Tabs 组件
2. **Vue 3**: 使用 Composition API，支持 Vue 3
3. **TypeScript**: 完整的 TypeScript 类型支持