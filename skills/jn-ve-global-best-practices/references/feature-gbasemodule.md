---
name: feature-gbasemodule
description: GBaseModule 基础模块组件，集成搜索、表格、分页和操作按钮
---

# GBaseModule 基础模块

`GBaseModule` 是一个集成了搜索表单、操作按钮、数据表格和分页的完整 CRUD 模块组件。

## 基本用法

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { GBaseModule, type FormProps, type TableColumnProps } from 'jn-ve-global'

// 1. 搜索表单配置
const searchFormProps = reactive<FormProps>({
  model: { name: '' },
  formItems: [
    { prop: 'name', label: '姓名', controlConfig: { type: 'input' } }
  ]
})

// 2. 表格列配置
const tableColumns = reactive<TableColumnProps[]>([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' }
])

// 3. 数据加载方法
const loadTable = (page: number) => {
  // 调用 API 获取数据，并更新 tableData 和 pagination
  console.log('Load page:', page)
}

// 4. 表格数据与分页
const tableData = ref([])
const pagination = reactive({ currentPage: 1, pageSize: 10, total: 0 })
</script>

<template>
  <GBaseModule
    :search-form-props="searchFormProps"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-pagination="pagination"
    :load-table-methods="loadTable"
    search-btn-horizontal
  />
</template>
```

## 核心 Props

| 属性 | 说明 |
|------|------|
| `searchFormProps` | 搜索表单配置 (`FormProps`) |
| `tableColumns` | 表格列配置 (`TableColumnProps[]`) |
| `tableData` | 表格数据 |
| `tablePagination` | 分页配置 (`PaginationProps`) |
| `loadTableMethods` | 数据加载回调函数 `(page: number) => void` |
| `btns` | 顶部操作按钮组 (`BtnProps[]`) |
| `searchBtnHorizontal` | 搜索按钮是否独占一行 |
| `moreSearchMode` | 更多查询模式 `'pull-down' \| 'popup'` |

## 常用功能

- **搜索**: 自动处理搜索按钮点击，调用 `loadTableMethods`。
- **分页**: 自动处理页码/页大小改变，调用 `loadTableMethods`。
- **布局**: 支持 `classic` (分离) 和 `tabular` (紧凑) 两种模式。
