# GTree 树形组件

## 概述

GTree 是基于 Element Plus TreeV2 组件封装的高性能树形组件，支持虚拟滚动、搜索过滤、展开收起缓存等功能。适用于大数据量的树形结构展示，提供了丰富的自定义选项和操作功能。

## 基础用法

```vue
<template>
  <GTree 
    :data="treeData" 
    @getTreeRef="handleGetTreeRef"
  />
</template>

<script setup>
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    name: '一级节点',
    children: [
      {
        id: 11,
        name: '二级节点 1-1',
        children: [
          { id: 111, name: '三级节点 1-1-1' },
          { id: 112, name: '三级节点 1-1-2' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '一级节点 2',
    children: [
      { id: 21, name: '二级节点 2-1' }
    ]
  }
])

const handleGetTreeRef = (treeRef) => {
  console.log('树实例:', treeRef)
}
</script>
```

## Props

### GTree Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `TreeData[]` | `[]` | 树形数据 |
| mode | `'institution' \| 'default' \| 'other'` | `'default'` | 树的显示模式 |
| defaultProps | `TreeV2Props` | - | 树节点配置选项（历史依赖，建议使用 sourceMapping） |
| btns | `BtnProps[]` | `[]` | 顶部按钮组配置 |
| showBtnArea | `boolean` | `true` | 是否显示顶部按钮区域 |
| defaultCheckedKeys | `string[] \| number[]` | `[]` | 默认勾选的节点 key 数组 |
| filterParentCheckedKeysFlag | `boolean` | `false` | 是否过滤默认勾选中的父节点 |
| hideSearch | `boolean` | `false` | 是否隐藏搜索框 |
| defaultExpandAll | `boolean` | `false` | 是否默认展开所有节点 |
| nodeClass | `string \| ((node: any) => string)` | - | 节点的 class 名称 |

### TreeData 接口

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| id | `number \| string` | - | 节点唯一标识 |
| name | `string` | - | 节点显示名称 |
| children | `TreeData[]` | - | 子节点数组 |
| value | `string` | - | 节点值（可选） |
| label | `string` | - | 节点标签（可选） |
| disabled | `boolean` | `false` | 是否禁用节点 |
| checked | `boolean` | `false` | 是否选中节点 |
| industryId | `string \| number` | - | 机构ID（用于机构模式） |

### TreeV2Props 接口

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `string` | `'id'` | 节点唯一标识字段名 |
| label | `string` | `'name'` | 节点标签字段名 |
| children | `string` | `'children'` | 子节点字段名 |
| disabled | `string` | `'disabled'` | 禁用状态字段名 |

### BtnProps 接口

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 按钮文本 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | - | 按钮类型 |
| onClick | `(row?: any, index?: number) => void` | - | 点击事件 |
| disabled | `boolean \| ((row?: any, index?: number) => boolean)` | `false` | 是否禁用 |
| loading | `boolean \| ((row?: any, index?: number) => boolean)` | `false` | 加载状态 |
| hide | `boolean \| ((row?: any, index?: number) => boolean)` | `false` | 是否隐藏 |
| icon | `string` | - | 按钮图标 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| getTreeRef | `(treeRef: TreeInstance) => void` | 获取树实例的回调 |

## 插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| tree-node | `{ node: TreeNode, data: TreeData }` | 自定义树节点内容 |

## 暴露的方法和属性

| 名称 | 类型 | 说明 |
|------|------|------|
| treeRef | `Ref<TreeInstance>` | 树组件实例引用 |

## 核心功能

### 1. 虚拟滚动
- 基于 Element Plus TreeV2，支持大数据量渲染
- 自动计算容器高度和节点尺寸

### 2. 搜索过滤
- 内置搜索框，支持节点名称过滤
- 可通过 `hideSearch` 属性隐藏搜索功能

### 3. 展开收起缓存
- 自动缓存节点展开状态到 sessionStorage
- 页面刷新后保持展开状态

### 4. 多种显示模式
- `default`: 默认模式
- `institution`: 机构模式，显示特殊图标
- `other`: 其他模式

### 5. 按钮操作区
- 支持自定义按钮组
- 内置展开全部/收起全部功能

## 使用示例

### 带按钮组的树

```vue
<template>
  <GTree 
    :data="treeData"
    :btns="buttonConfig"
    @getTreeRef="handleGetTreeRef"
  />
</template>

<script setup>
import { ref } from 'vue'

const treeData = ref([
  // 树数据...
])

const buttonConfig = ref([
  {
    label: '新增',
    type: 'primary',
    onClick: () => {
      console.log('新增节点')
    }
  },
  {
    label: '删除',
    type: 'danger',
    onClick: () => {
      console.log('删除节点')
    }
  }
])

const handleGetTreeRef = (treeRef) => {
  // 可以调用树的方法
  // treeRef.setCheckedKeys([1, 2, 3])
}
</script>
```

### 机构模式树

```vue
<template>
  <GTree 
    :data="institutionData"
    mode="institution"
    :default-expand-all="true"
  />
</template>

<script setup>
import { ref } from 'vue'

const institutionData = ref([
  {
    id: 1,
    name: '总公司',
    children: [
      {
        id: 11,
        name: '分公司A',
        industryId: 'industry_1',
        children: [
          { id: 111, name: '部门1', industryId: 'dept_1' }
        ]
      }
    ]
  }
])
</script>
```

### 自定义节点内容

```vue
<template>
  <GTree :data="treeData">
    <template #tree-node="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span class="node-count" v-if="data.children?.length">
          ({{ data.children.length }})
        </span>
      </span>
    </template>
  </GTree>
</template>

<style>
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.node-count {
  color: #999;
  font-size: 12px;
}
</style>
```

### 可选择的树

```vue
<template>
  <GTree 
    :data="treeData"
    :default-checked-keys="checkedKeys"
    :filter-parent-checked-keys-flag="true"
    show-checkbox
    @getTreeRef="handleGetTreeRef"
  />
</template>

<script setup>
import { ref } from 'vue'

const treeData = ref([
  // 树数据...
])

const checkedKeys = ref([111, 112, 21])

const handleGetTreeRef = (treeRef) => {
  // 获取选中的节点
  const getCheckedNodes = () => {
    return treeRef.getCheckedNodes()
  }
  
  // 设置选中的节点
  const setCheckedKeys = (keys) => {
    treeRef.setCheckedKeys(keys)
  }
}
</script>
```

### 隐藏搜索框的简洁树

```vue
<template>
  <GTree 
    :data="treeData"
    :hide-search="true"
    :show-btn-area="false"
  />
</template>
```

### 动态节点样式

```vue
<template>
  <GTree 
    :data="treeData"
    :node-class="getNodeClass"
  />
</template>

<script setup>
import { ref } from 'vue'

const treeData = ref([
  // 树数据...
])

const getNodeClass = (data) => {
  if (data.type === 'important') {
    return 'important-node'
  }
  if (data.disabled) {
    return 'disabled-node'
  }
  return ''
}
</script>

<style>
.important-node {
  color: #f56c6c;
  font-weight: bold;
}

.disabled-node {
  color: #c0c4cc;
}
</style>
```

## Element Plus 原生属性支持

GTree 组件通过 `v-bind="$attrs"` 支持所有 Element Plus TreeV2 组件的原生属性，包括但不限于：

- `show-checkbox`: 是否显示复选框
- `check-strictly`: 是否严格的遵循父子不互相关联的做法
- `default-expanded-keys`: 默认展开的节点的 key 的数组
- `node-key`: 每个树节点用来作为唯一标识的属性
- `check-on-click-node`: 是否在点击节点的时候选中节点
- `expand-on-click-node`: 是否在点击节点的时候展开或者收缩节点
- `indent`: 相邻级节点间的水平缩进，单位为像素

## 重要说明

### 数据结构

1. **标准格式**: 树数据应遵循 `TreeData` 接口规范
2. **字段映射**: 可通过 `defaultProps` 自定义字段映射
3. **唯一标识**: 每个节点的 `id` 字段必须唯一

### 性能优化

1. **虚拟滚动**: 基于 TreeV2，支持大数据量渲染
2. **展开缓存**: 自动缓存展开状态，避免重复计算
3. **按需渲染**: 只渲染可见区域的节点

### 搜索功能

1. **实时过滤**: 输入关键字实时过滤节点
2. **模糊匹配**: 支持节点名称的模糊匹配
3. **可禁用**: 通过 `hideSearch` 属性控制显示

### 展开控制

1. **默认展开**: 支持初始化时展开所有节点
2. **手动控制**: 提供展开全部/收起全部按钮
3. **状态持久**: 展开状态自动缓存到 sessionStorage

### 选择功能

1. **父子关联**: 支持父子节点选择关联
2. **过滤父节点**: 可过滤默认选中的父节点
3. **批量操作**: 支持批量设置选中状态

### 样式定制

1. **CSS 变量**: 使用 CSS 变量进行主题定制
   - `--jn-ve-g-tree-padding-lr`: 左右内边距
   - `--jn-ve-g-btn-height`: 按钮高度
   - `--jn-ve-g-btn-padding-lr3`: 按钮内边距

2. **模式样式**: 不同模式有不同的图标和样式
3. **自定义类**: 支持动态添加节点样式类

### 事件处理

1. **树实例**: 通过 `getTreeRef` 事件获取树实例
2. **节点事件**: 支持所有 TreeV2 的节点事件
3. **按钮事件**: 按钮组支持自定义点击事件

### 无障碍访问

1. **键盘导航**: 继承 TreeV2 的键盘导航功能
2. **屏幕阅读器**: 支持屏幕阅读器访问
3. **焦点管理**: 正确的焦点管理和指示

### 兼容性

1. **Element Plus**: 基于 Element Plus TreeV2 组件
2. **Vue 3**: 使用 Composition API，支持 Vue 3
3. **TypeScript**: 完整的 TypeScript 类型支持
4. **响应式**: 支持响应式数据更新