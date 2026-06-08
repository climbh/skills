# GBaseModule - 基础模块组件

## 概述

GBaseModule 是一个集成了搜索表单、操作按钮、数据表格和分页的完整模块组件。适用于标准的列表页面开发，提供开箱即用的CRUD界面。

## 基本用法

```vue
<template>
  <div class="base-module-demo">
    <GBaseModule
      search-btn-horizontal
      :search-form-props="searchFormProps"
      :load-table-methods="loadTable"
      :btns="btns"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-pagination="tablePagination"
      :table-loading="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { BtnProps, FormProps, TableColumnProps, PaginationProps } from 'jn-ve-global'

// 搜索表单配置
const searchFormProps = reactive<FormProps>({
  instance: null,
  model: {
    name: '',
    sex: ''
  },
  formItems: [
    {
      prop: 'name',
      label: '姓名',
      span: 12,
      controlConfig: {
        type: 'input'
      }
    }
  ]
})

// 表格列配置
const tableColumns = reactive<TableColumnProps[]>([
  {
    prop: 'component',
    label: '组件',
    width: 300
  },
  {
    prop: 'url',
    label: '功能路径',
    width: 800
  }
])

// 表格数据
const tableData = reactive<any[]>([])

// 分页配置
const tablePagination = reactive<PaginationProps>({
  currentPage: 1,
  pageSize: 10,
  total: 50
})

// 操作按钮配置
const btns: BtnProps[] = [
  {
    label: '添加',
    onClick: () => {
      console.log('添加操作')
    }
  }
]

// 加载表格数据的方法
const loadTable = (page: number) => {
  const params = {
    page: tablePagination.currentPage,
    size: tablePagination.pageSize,
    ...searchFormProps.model
  }
  
  console.log('加载数据参数:', params)
  // 这里调用API获取数据
}
</script>
```

## Props

### 必传属性

无必传属性，所有属性都是可选的。

### 可选属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `tableColumns` | `TableColumnProps[]` | `[]` | 表格列配置 |
| `tableData` | `BaseTableDataItem[]` | `[]` | 表格数据 |
| `searchFormProps` | `FormProps` | `undefined` | 搜索条件表单配置 |
| `tablePagination` | `PaginationProps` | `null` | 分页数据 |
| `btns` | `BtnProps[]` | `[]` | 按钮组 |
| `searchBtnHorizontal` | `boolean` | `false` | 搜索按钮是否独占一行 |
| `columnsConfigurable` | `boolean` | 根据全局配置 | 是否支持设置显示列和冻结列 |
| `sortable` | `boolean` | `false` | 是否支持排序 |
| `loadTableMethods` | `(page?: number) => void` | `undefined` | 核心加载 table 数据的方法 |
| `tableLoading` | `boolean` | `false` | 表格 loading 状态 |
| `noSearchLabel` | `boolean` | `false` | 是否隐藏搜索标签（"查询条件"、"查询结果"） |
| `searchBtnAuthCode` | `string` | `''` | 搜索按钮的鉴权 code |
| `moreSearchMode` | `'pull-down' \| 'popup'` | `undefined` | 更多查询展示方式 |
| `rowBtnConfig` | `TableRowBtnConfig` | `null` | 表格操作列配置 |
| `tabs` | `Array<{label: string, value: string}>` | `[]` | Tab 切换配置 |
| `activeTab` | `string` | `''` | 激活的 tab |
| `selectedRows` | `any[]` | `null` | 选中行的维护数组 |
| `mode` | `BaseModuleMode` | `undefined` | 布局模式，支持 'classic' 和 'tabular' |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `getTableInstance` | `(instance: TableInstance) => void` | 获取表格实例 |
| `update:activeTab` | `(tab: string) => void` | Tab切换事件 |
| `update:selectedRows` | `(rows: any[]) => void` | 选中行变更事件 |
| `sort` | `(order: OrderProps, sortOptions: RuleOption[]) => void` | 排序确认事件 |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义内容区域，会替换默认的表格区域 |

## 暴露的方法和属性

通过 `ref` 可以访问以下属性和方法：

```typescript
interface ExposedMethods {
  tableConfig: TableConfig          // 表格配置对象
  tableInstance: TableInstance      // 表格实例
  exportedColumns: Ref<BaseModuleColumnProps[]>  // 导出列配置
  tableSearchRef: Ref<any>         // 搜索组件引用
}
```

## 核心特性

### 1. 搜索区域
- 支持动态表单配置
- 可配置搜索按钮布局（独占一行或内联）
- 支持更多查询的展开/收起（下拉或弹窗模式）

### 2. 操作区域
- 支持自定义操作按钮组
- 支持列显示/隐藏配置
- 支持表格排序功能

### 3. 表格区域
- 集成GTable组件的所有功能
- 支持分页
- 支持行操作按钮
- 支持Tab切换

### 4. 布局模式
- `classic`: 经典模式，搜索条件和结果分离
- `tabular`: 表格模式，更紧凑的布局

## 使用示例

### 基础用法
```vue
<template>
  <GBaseModule
    :table-columns="columns"
    :table-data="data"
    :table-pagination="pagination"
    :load-table-methods="loadData"
  />
</template>
```

### 带搜索表单
```vue
<template>
  <GBaseModule
    :search-form-props="searchForm"
    :table-columns="columns"
    :table-data="data"
    :load-table-methods="loadData"
    search-btn-horizontal
  />
</template>
```

### 带操作按钮
```vue
<template>
  <GBaseModule
    :btns="buttons"
    :table-columns="columns"
    :table-data="data"
  />
</template>

<script setup>
const buttons = [
  {
    label: '新增',
    type: 'primary',
    onClick: () => handleAdd()
  },
  {
    label: '批量删除',
    type: 'danger',
    onClick: () => handleBatchDelete()
  }
]
</script>
```

### 更多查询模式
```vue
<template>
  <GBaseModule
    :search-form-props="searchForm"
    more-search-mode="pull-down"
    :table-columns="columns"
    :table-data="data"
  />
</template>
```

### Tab切换模式
```vue
<template>
  <GBaseModule
    :tabs="tabs"
    v-model:active-tab="activeTab"
    :table-columns="columns"
    :table-data="data"
  />
</template>

<script setup>
const tabs = [
  { label: '全部', value: 'all' },
  { label: '已启用', value: 'enabled' },
  { label: '已禁用', value: 'disabled' }
]

const activeTab = ref('all')
</script>
```

## 注意事项

1. **数据加载**: 建议使用 `loadTableMethods` 属性来处理数据加载逻辑
2. **分页处理**: 分页变更会自动调用 `loadTableMethods` 方法
3. **搜索功能**: 搜索按钮会触发表单验证，验证通过后调用 `loadTableMethods`
4. **布局模式**: 不同模式下的样式和交互会有所不同
5. **权限控制**: 可通过 `searchBtnAuthCode` 控制搜索按钮的权限