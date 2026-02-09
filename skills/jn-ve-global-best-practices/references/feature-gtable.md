---
name: feature-gtable
description: GTable 表格组件的使用，基于配置驱动 (Config-Driven)
---

# GTable 表格组件

`GTable` 是基于 Element Plus 封装的配置驱动表格组件，集成了分页功能。

## 基本用法

使用 `config` 属性传入表格配置。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TableProps, TableColumnProps } from 'jn-ve-global'

// 定义列配置
const columns = ref<TableColumnProps[]>([
  {
    prop: 'username',
    label: '用户名',
    width: '180'
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: '200'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '180'
  }
])

// 模拟数据
const tableData = [
  { username: 'user1', email: 'user1@example.com', createTime: '2023-01-01' }
]

// 定义表格配置
const tableConfig = ref<TableProps>({
  instance: null,
  columns: columns.value,
  data: tableData,
  pagination: {
    pageSize: 10,
    currentPage: 1,
    total: 50
  }
})
</script>

<template>
  <GTable :config="tableConfig" />
</template>
```

## 关键类型

- `TableProps`: 表格整体配置接口
- `TableColumnProps`: 表格列配置接口

## 常用配置项

- `columns`: 列定义数组
- `data`: 表格数据数组
- `pagination`: 分页配置对象
  - `pageSize`: 每页条数
  - `currentPage`: 当前页码
  - `total`: 总条数
