# GTable 表格组件

## 概述

`GTable` 是基于 Element Plus Table 组件封装的高级表格组件，提供了丰富的功能包括可编辑单元格、分页、多选、操作列、数据粘贴等特性。

## 基本用法

```vue
<template>
  <GTable :config="tableConfig" />
</template>

<script setup>
import { ref } from 'vue'

const tableConfig = ref({
  data: [
    { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 30, email: 'lisi@example.com' }
  ],
  columns: [
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', width: 80 },
    { prop: 'email', label: '邮箱', minWidth: 200 }
  ],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 100,
    onChange: (page, size) => {
      console.log('分页变化:', page, size)
    }
  }
})
</script>
```

## Props

### config (必传)

- **类型**: `TableConfig`
- **默认值**: `null`
- **说明**: 表格配置对象，包含表格的所有配置信息

#### TableConfig 配置项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **data** | `Array` | `[]` | **必传** - 表格数据 |
| **columns** | `TableColumnProps[]` | `[]` | **必传** - 列配置 |
| instance | `TableInstance \| null` | `null` | 表格实例，用于调用表格方法 |
| pagination | `PaginationProps` | - | 分页配置 |
| showSelection | `boolean` | `false` | 是否显示多选列 |
| selectedRows | `Array` | `[]` | 选中的行数据 |
| rowBtnConfig | `TableRowBtnConfig` | - | 操作列配置 |
| onCellEdited | `Function` | - | 单元格编辑完成回调 |
| onRefresh | `Function` | - | 刷新数据回调 |
| pastable | `boolean` | `false` | 是否支持粘贴功能 |
| height | `string \| number \| false` | `'100%'` | 表格高度 |
| maxHeight | `string \| number` | - | 表格最大高度 |
| stripe | `boolean` | `false` | 是否为斑马纹表格 |
| border | `boolean` | `false` | 是否带有纵向边框 |
| size | `'large' \| 'default' \| 'small'` | `'default'` | 表格尺寸 |
| fit | `boolean` | `true` | 列的宽度是否自撑开 |
| showHeader | `boolean` | `true` | 是否显示表头 |
| highlightCurrentRow | `boolean` | `false` | 是否要高亮当前行 |
| currentRowKey | `string \| number` | - | 当前行的 key |
| rowClassName | `string \| Function` | - | 行的 className |
| rowStyle | `object \| Function` | - | 行的 style |
| cellClassName | `string \| Function` | - | 单元格的 className |
| cellStyle | `object \| Function` | - | 单元格的 style |
| headerRowClassName | `string \| Function` | - | 表头行的 className |
| headerRowStyle | `object \| Function` | - | 表头行的 style |
| headerCellClassName | `string \| Function` | - | 表头单元格的 className |
| headerCellStyle | `object \| Function` | - | 表头单元格的 style |
| rowKey | `string \| Function` | - | 行数据的 Key |
| emptyText | `string` | `'暂无数据'` | 空数据时显示的文本 |
| defaultExpandAll | `boolean` | `false` | 是否默认展开所有行 |
| expandRowKeys | `string[] \| number[]` | - | 展开行的 keys 数组 |
| defaultSort | `object` | - | 默认的排序列 |
| tooltipEffect | `'dark' \| 'light'` | `'dark'` | tooltip effect 属性 |
| showSummary | `boolean` | `false` | 是否在表尾显示合计行 |
| sumText | `string` | `'合计'` | 合计行第一列的文本 |
| summaryMethod | `Function` | - | 自定义的合计计算方法 |
| spanMethod | `Function` | - | 合并行或列的计算方法 |
| selectOnIndeterminate | `boolean` | `true` | 多选表格中点击表头多选框的行为 |
| indent | `number` | `16` | 树形数据时节点的缩进 |
| lazy | `boolean` | `false` | 是否懒加载子节点数据 |
| load | `Function` | - | 加载子节点数据的函数 |
| treeProps | `object` | - | 渲染嵌套数据的配置选项 |
| tableLayout | `'fixed' \| 'auto'` | - | 表格单元、行和列的布局方式 |
| scrollbarAlwaysOn | `boolean` | `false` | 总是显示滚动条 |

#### TableColumnProps 列配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **label** | `string` | - | **必传** - 显示的标题 |
| prop | `string` | - | 对应列内容的字段名 |
| type | `'selection' \| 'index' \| 'expand'` | - | 对应列的类型 |
| index | `number \| Function` | - | 自定义索引 |
| columnKey | `string` | - | column 的 key |
| width | `string \| number` | - | 对应列的宽度 |
| minWidth | `string \| number` | - | 对应列的最小宽度 |
| fixed | `boolean \| 'left' \| 'right'` | - | 列是否固定 |
| renderHeader | `Function` | - | 列标题 Label 区域渲染函数 |
| sortable | `boolean \| 'custom'` | - | 对应列是否可以排序 |
| sortMethod | `Function` | - | 数据排序的方法 |
| sortBy | `string \| Array \| Function` | - | 指定数据按照哪个属性进行排序 |
| sortOrders | `Array` | - | 数据排序时所使用排序策略的轮转顺序 |
| resizable | `boolean` | `true` | 是否可以通过拖动改变宽度 |
| formatter | `Function` | - | 用来格式化内容 |
| showOverflowTooltip | `boolean` | `false` | 当内容过长被隐藏时显示 tooltip |
| align | `'left' \| 'center' \| 'right'` | - | 对齐方式 |
| headerAlign | `'left' \| 'center' \| 'right'` | - | 表头对齐方式 |
| className | `string` | - | 列的 className |
| labelClassName | `string` | - | 当前列标题的自定义类名 |
| selectable | `Function` | - | 仅对 type=selection 的列有效 |
| reserveSelection | `boolean` | `false` | 是否在数据更新之后保留之前选中的数据 |
| filters | `Array` | - | 数据过滤的选项 |
| filterPlacement | `string` | - | 过滤弹出框的定位 |
| filterMultiple | `boolean` | `true` | 数据过滤的选项是否多选 |
| filterMethod | `Function` | - | 数据过滤使用的方法 |
| filteredValue | `Array` | - | 选中的数据过滤项 |
| **render** | `Function` | - | 自定义渲染函数 |
| **children** | `TableColumnProps[]` | - | 多级嵌套表头 |
| **editable** | `boolean \| Function` | `false` | 是否可编辑 |
| **controlConfig** | `TableEditCellControlConfig` | - | 编辑控件类型 |
| **controlRender** | `Function` | - | 自定义渲染编辑控件 |
| **rules** | `Rule` | - | 控件验证规则 |
| **excelValueFormat** | `Function` | - | 粘贴数据的格式化 |
| **hide** | `boolean` | `false` | 隐藏列 |
| **openDB** | `boolean` | `false` | 是否开启双击编辑 |
| **openSC** | `boolean` | `false` | 是否开启单击编辑 |
| **group** | `string \| string[]` | - | 列分组（筛选） |

#### PaginationProps 分页配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | `boolean` | `true` | 是否显示分页 |
| **pageSize** | `number` | - | **必传** - 每页显示条目个数 |
| **currentPage** | `number` | - | **必传** - 当前页数 |
| **total** | `number` | - | **必传** - 总条目数 |
| pageSizes | `number[]` | `[10, 20, 50]` | 每页显示个数选择器的选项 |
| **onChange** | `Function` | - | **必传** - 页码或每页条数改变时的回调 |

#### TableRowBtnConfig 操作列配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **btns** | `TableRowBtnProps[]` | - | **必传** - 按钮组 |
| maxCount | `number` | - | 最多显示几个按钮 |
| width | `string \| number` | - | 列的宽度 |
| align | `'left' \| 'center' \| 'right'` | - | 操作列的对齐方式 |
| hide | `boolean` | `false` | 是否隐藏操作按钮列 |
| fixed | `true \| 'left' \| 'right'` | - | 固定位置 |
| label | `string` | `'操作'` | 列标题 |

## 事件

组件本身不直接暴露事件，所有事件通过 `config` 配置对象中的回调函数处理：

- `onCellEdited`: 单元格编辑完成回调
- `onRefresh`: 刷新数据回调
- `pagination.onChange`: 分页变化回调
- 其他 Element Plus Table 原生事件通过 `config` 配置

## 插槽

- `empty`: 自定义空数据显示内容

## 暴露的方法和属性

```typescript
// 通过 ref 访问
const tableRef = ref()

// 访问表格实例
tableRef.value.instance // Element Plus Table 实例
tableRef.value.config   // 表格配置对象
```

## 核心特性

### 1. 可编辑表格

```vue
<template>
  <GTable :config="editableTableConfig" />
</template>

<script setup>
const editableTableConfig = ref({
  data: tableData,
  columns: [
    {
      prop: 'name',
      label: '姓名',
      editable: true,
      controlConfig: {
        type: 'input',
        props: {
          placeholder: '请输入姓名'
        }
      },
      rules: {
        required: true,
        message: '姓名不能为空'
      }
    }
  ],
  onCellEdited: (row, prop, value) => {
    console.log('单元格编辑完成:', row, prop, value)
  }
})
</script>
```

### 2. 多选表格

```vue
<template>
  <GTable :config="selectionTableConfig" />
</template>

<script setup>
const selectionTableConfig = ref({
  data: tableData,
  columns: columns,
  showSelection: true,
  selectedRows: []
})
</script>
```

### 3. 操作列

```vue
<template>
  <GTable :config="actionTableConfig" />
</template>

<script setup>
const actionTableConfig = ref({
  data: tableData,
  columns: columns,
  rowBtnConfig: {
    btns: [
      {
        label: '编辑',
        type: 'primary',
        onClick: (row, index) => {
          console.log('编辑行:', row, index)
        }
      },
      {
        label: '删除',
        type: 'danger',
        onClick: (row, index) => {
          console.log('删除行:', row, index)
        }
      }
    ],
    maxCount: 2,
    width: 150
  }
})
</script>
```

### 4. 分页表格

```vue
<template>
  <GTable :config="paginationTableConfig" />
</template>

<script setup>
const paginationTableConfig = ref({
  data: tableData,
  columns: columns,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 100,
    pageSizes: [10, 20, 50, 100],
    onChange: (page, size) => {
      // 处理分页变化
      loadTableData(page, size)
    }
  }
})
</script>
```

### 5. 树形表格

```vue
<template>
  <GTable :config="treeTableConfig" />
</template>

<script setup>
const treeTableConfig = ref({
  data: treeData,
  columns: columns,
  rowKey: 'id',
  treeProps: {
    children: 'children',
    hasChildren: 'hasChildren'
  }
})
</script>
```

### 6. 自定义渲染

```vue
<template>
  <GTable :config="customRenderConfig" />
</template>

<script setup>
const customRenderConfig = ref({
  data: tableData,
  columns: [
    {
      prop: 'status',
      label: '状态',
      render: (row, index) => {
        return h('el-tag', {
          type: row.status === 1 ? 'success' : 'danger'
        }, row.status === 1 ? '启用' : '禁用')
      }
    }
  ]
})
</script>
```

## 重要说明

1. **数据结构**: 表格数据项需要包含 `id` 字段作为唯一标识
2. **实例管理**: 表格实例会自动赋值给 `config.instance`，可用于调用表格方法
3. **可编辑功能**: 支持单击和双击编辑模式，可配置验证规则
4. **分页处理**: 分页变化通过 `onChange` 回调处理，需要手动更新数据
5. **性能优化**: 大数据量时建议使用虚拟滚动或分页加载
6. **样式定制**: 支持通过 className 和 style 配置自定义样式
7. **数据粘贴**: 支持从 Excel 等表格软件粘贴数据到可编辑表格
8. **响应式**: 表格会根据容器大小自动调整布局

## 版本信息

- 当前版本: 1.0.0
- 依赖: Element Plus Table 组件
- Vue 版本: 3.x