# GButtonGroup 按钮组组件

## 概述

GButtonGroup 是基于 Element Plus Button 组件封装的按钮组组件，支持批量配置按钮、权限控制、动态状态管理等功能。通过配置数组的方式快速生成多个按钮，适用于工具栏、操作栏等场景。

## 基础用法

```vue
<template>
  <GButtonGroup :btns="buttonList" />
</template>

<script setup>
import { ref } from 'vue'

const buttonList = ref([
  {
    label: '新增',
    type: 'primary',
    onClick: () => {
      console.log('新增操作')
    }
  },
  {
    label: '编辑',
    type: 'success',
    onClick: () => {
      console.log('编辑操作')
    }
  },
  {
    label: '删除',
    type: 'danger',
    onClick: () => {
      console.log('删除操作')
    }
  }
])
</script>
```

## Props

### GButtonGroup Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| btns | `BtnProps[]` | `[]` | 按钮配置数组 |

### BtnProps 接口

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 按钮文本（必填） |
| authCode | `string` | - | 权限标识，用于权限控制 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | 按钮类型 |
| text | `boolean` | `false` | 是否为文字按钮 |
| bg | `boolean` | `false` | 是否显示文字按钮背景颜色 |
| disabled | `boolean \| ((row?: any, index?: number) => boolean)` | `false` | 是否禁用，支持函数动态控制 |
| onClick | `(row?: any, index?: number) => void` | - | 点击事件回调 |
| size | `'large' \| 'default' \| 'small'` | `'default'` | 按钮尺寸 |
| loading | `boolean \| ((row?: any, index?: number) => boolean)` | `false` | 加载状态，支持函数动态控制 |
| plain | `boolean` | `false` | 是否为朴素按钮 |
| round | `boolean` | `false` | 是否为圆角按钮 |
| circle | `boolean` | `false` | 是否为圆形按钮 |
| hide | `boolean \| ((row?: any, index?: number) => boolean)` | `false` | 是否隐藏，支持函数动态控制 |
| class | `string` | - | 自定义类名 |
| style | `{ [k: string]: any } \| string` | - | 自定义样式 |
| icon | `string` | - | 按钮图标 |
| group | `string \| string[]` | - | 按钮分组标识 |

## 使用示例

### 带图标的按钮组

```vue
<template>
  <GButtonGroup :btns="iconButtonList" />
</template>

<script setup>
import { ref } from 'vue'

const iconButtonList = ref([
  {
    label: '新增',
    type: 'primary',
    icon: 'plus',
    onClick: () => {
      console.log('新增操作')
    }
  },
  {
    label: '编辑',
    type: 'success',
    icon: 'edit',
    onClick: () => {
      console.log('编辑操作')
    }
  },
  {
    label: '删除',
    type: 'danger',
    icon: 'delete',
    onClick: () => {
      console.log('删除操作')
    }
  }
])
</script>
```

### 权限控制按钮组

```vue
<template>
  <GButtonGroup :btns="authButtonList" />
</template>

<script setup>
import { ref } from 'vue'

const authButtonList = ref([
  {
    label: '新增用户',
    type: 'primary',
    authCode: 'user:add',
    onClick: () => {
      console.log('新增用户')
    }
  },
  {
    label: '删除用户',
    type: 'danger',
    authCode: 'user:delete',
    onClick: () => {
      console.log('删除用户')
    }
  },
  {
    label: '导出数据',
    type: 'info',
    authCode: 'data:export',
    onClick: () => {
      console.log('导出数据')
    }
  }
])
</script>
```

### 动态状态控制

```vue
<template>
  <GButtonGroup :btns="dynamicButtonList" />
</template>

<script setup>
import { ref } from 'vue'

const selectedItems = ref([])
const isLoading = ref(false)

const dynamicButtonList = ref([
  {
    label: '批量删除',
    type: 'danger',
    disabled: () => selectedItems.value.length === 0,
    onClick: () => {
      console.log('批量删除选中项')
    }
  },
  {
    label: '刷新数据',
    type: 'primary',
    loading: () => isLoading.value,
    onClick: async () => {
      isLoading.value = true
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 2000))
      isLoading.value = false
      console.log('数据刷新完成')
    }
  },
  {
    label: '高级功能',
    type: 'info',
    hide: () => !hasAdvancedPermission(),
    onClick: () => {
      console.log('执行高级功能')
    }
  }
])

const hasAdvancedPermission = () => {
  // 权限检查逻辑
  return true
}
</script>
```

### 不同尺寸的按钮组

```vue
<template>
  <div>
    <h3>大尺寸按钮组</h3>
    <GButtonGroup :btns="largeButtonList" />
    
    <h3>默认尺寸按钮组</h3>
    <GButtonGroup :btns="defaultButtonList" />
    
    <h3>小尺寸按钮组</h3>
    <GButtonGroup :btns="smallButtonList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const largeButtonList = ref([
  { label: '大按钮1', size: 'large', onClick: () => {} },
  { label: '大按钮2', size: 'large', onClick: () => {} }
])

const defaultButtonList = ref([
  { label: '默认按钮1', size: 'default', onClick: () => {} },
  { label: '默认按钮2', size: 'default', onClick: () => {} }
])

const smallButtonList = ref([
  { label: '小按钮1', size: 'small', onClick: () => {} },
  { label: '小按钮2', size: 'small', onClick: () => {} }
])
</script>
```

### 文字按钮组

```vue
<template>
  <GButtonGroup :btns="textButtonList" />
</template>

<script setup>
import { ref } from 'vue'

const textButtonList = ref([
  {
    label: '查看详情',
    type: 'primary',
    text: true,
    onClick: () => {
      console.log('查看详情')
    }
  },
  {
    label: '编辑',
    type: 'success',
    text: true,
    bg: true,
    onClick: () => {
      console.log('编辑')
    }
  },
  {
    label: '删除',
    type: 'danger',
    text: true,
    onClick: () => {
      console.log('删除')
    }
  }
])
</script>
```

### 自定义样式按钮组

```vue
<template>
  <GButtonGroup :btns="customStyleButtonList" />
</template>

<script setup>
import { ref } from 'vue'

const customStyleButtonList = ref([
  {
    label: '自定义样式1',
    type: 'primary',
    class: 'custom-button-1',
    style: { marginRight: '20px' },
    onClick: () => {
      console.log('自定义样式1')
    }
  },
  {
    label: '自定义样式2',
    type: 'success',
    style: {
      backgroundColor: '#67c23a',
      borderColor: '#67c23a',
      borderRadius: '20px'
    },
    onClick: () => {
      console.log('自定义样式2')
    }
  }
])
</script>

<style>
.custom-button-1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
```

### 按钮分组

```vue
<template>
  <GButtonGroup :btns="groupedButtonList" />
</template>

<script setup>
import { ref } from 'vue'

const groupedButtonList = ref([
  {
    label: '基础操作1',
    type: 'primary',
    group: 'basic',
    onClick: () => {}
  },
  {
    label: '基础操作2',
    type: 'success',
    group: 'basic',
    onClick: () => {}
  },
  {
    label: '高级操作1',
    type: 'warning',
    group: 'advanced',
    onClick: () => {}
  },
  {
    label: '高级操作2',
    type: 'danger',
    group: 'advanced',
    onClick: () => {}
  }
])
</script>
```

## 核心功能

### 1. 权限控制
- 通过 `authCode` 属性进行权限验证
- 使用 `v-auth` 指令控制按钮显示

### 2. 动态状态管理
- 支持函数形式的 `disabled`、`loading`、`hide` 属性
- 实现按钮状态的动态控制

### 3. 图标支持
- 集成 GIcon 组件
- 支持自定义图标显示

### 4. 样式定制
- 支持自定义类名和样式
- 兼容 Element Plus Button 的所有样式属性

## Element Plus 原生属性支持

GButtonGroup 组件通过 `v-bind="getElButtonProps(btn)"` 支持所有 Element Plus Button 组件的原生属性，包括但不限于：

- `autofocus`: 是否默认聚焦
- `native-type`: 原生 type 属性
- `auto-insert-space`: 自动在两个中文字符之间插入空格
- `color`: 自定义按钮颜色
- `dark`: 暗黑模式
- `link`: 是否为链接按钮

## 重要说明

### 权限控制

1. **权限指令**: 使用 `v-auth` 指令进行权限控制
2. **条件渲染**: 有 `authCode` 的按钮会进行权限验证
3. **无权限隐藏**: 无权限的按钮会被隐藏

### 动态状态

1. **函数支持**: `disabled`、`loading`、`hide` 支持函数形式
2. **参数传递**: 函数接收 `(btnConfig, index)` 参数
3. **实时更新**: 状态变化会实时反映到按钮上

### 事件处理

1. **点击事件**: 通过 `onClick` 属性定义点击处理函数
2. **参数传递**: 点击事件接收 `(btnConfig, index)` 参数
3. **事件绑定**: 自动绑定到按钮的点击事件

### 图标显示

1. **图标组件**: 使用 GIcon 组件渲染图标
2. **自定义颜色**: 图标支持自定义颜色
3. **间距控制**: 图标与文字间有固定间距

### 样式定制

1. **CSS 变量**: 支持通过 CSS 变量定制样式
2. **自定义类**: 支持添加自定义 CSS 类
3. **内联样式**: 支持对象或字符串形式的内联样式

### 性能优化

1. **条件渲染**: 隐藏的按钮不会渲染到 DOM
2. **事件优化**: 避免不必要的事件绑定
3. **状态缓存**: 合理缓存动态状态计算结果

### 无障碍访问

1. **键盘导航**: 继承 Element Plus Button 的键盘导航
2. **屏幕阅读器**: 支持屏幕阅读器访问按钮文本
3. **焦点管理**: 正确的焦点管理和指示

### 兼容性

1. **Element Plus**: 基于 Element Plus Button 组件
2. **Vue 3**: 使用 Composition API，支持 Vue 3
3. **TypeScript**: 完整的 TypeScript 类型支持
4. **响应式**: 支持响应式数据更新