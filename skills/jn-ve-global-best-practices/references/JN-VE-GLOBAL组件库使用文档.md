# JN-VE-GLOBAL 组件库说明文档

## 概述

JN-VE-GLOBAL 是基于 Vue 3 + Element Plus + TypeScript 的二次封装的全局vue组件库，专为江苏金农内部项目开发。该组件库提供了丰富的业务组件，简化了常见业务场景的开发工作。

## 组件分类

### 独立组件（Template 直接使用）
这些组件可以直接在 template 中定义和使用，具有完整的独立功能：

- **GTree**: 树形控件，支持多选、懒加载等功能
- **GModal**: 模态框组件，支持拖拽、自定义内容等
- **GForm**: 表单组件，支持动态表单项、验证等功能
- **GBaseModule**: 基础模块组件，集成搜索、表格、操作等功能
- **GTable**: 表格组件，支持排序、分页、选择等功能
- **GTabs**: 标签页组件，支持动态显示/隐藏
- **GIcon**: 图标组件，支持多种图标库
- **GUpload**: 文件上传组件，支持多种上传模式和预览

### 配置型组件（配合其他组件使用）
这些组件通常作为配置项在其他组件中使用，特别是在 GForm 的 formItems 配置和可编辑表格中：

- **figureInput**: 数字输入组件，支持格式化和验证
- **iconPicker**: 图标选择器，用于选择图标
- **upload**: 上传组件（配置型）
- **uploadFolder**: 文件夹上传组件
- **infoSelect**: 信息选择组件，支持下拉选择
- **infoSelectAll**: 全选信息组件
- **infoAutocomplete**: 自动完成组件
- **selectTree**: 树形选择器
- **selectTreeV2**: 树形选择器V2版本
- **address**: 地址选择组件

### 使用方式区别

#### 独立组件使用示例：
```vue
<template>
  <!-- 直接在template中使用 -->
  <GForm :config="formConfig" />
  <GTable :config="tableConfig" />
  <GUpload v-model="fileList" />
</template>
```

#### 配置型组件使用示例：
```vue
<template>
  <!-- 通过GForm的formItems配置使用 -->
  <GForm :config="formConfig" />
</template>

<script setup>
const formConfig = {
  formItems: [
    {
      type: 'figureInput',  // 配置型组件
      prop: 'amount',
      label: '金额'
    },
    {
      type: 'iconPicker',   // 配置型组件
      prop: 'icon',
      label: '图标'
    },
    {
      type: 'selectTree',   // 配置型组件
      prop: 'department',
      label: '部门'
    }
  ]
}
</script>
```

### 基本信息
- **版本**: 3.8.2
- **作者**: zyc
- **技术栈**: Vue 3 + Element Plus + TypeScript
- **构建工具**: Vite + Gulp
- **包管理**: 支持 ES Module 和 CommonJS

### 安装使用

```bash
npm install jn-ve-global
```

```typescript
// 完整引入
import JnVeGlobal from 'jn-ve-global'
import 'jn-ve-global/dist/style.css'

app.use(JnVeGlobal)

// 按需引入
import { GIcon, GForm, GTable } from 'jn-ve-global'
```

## 核心组件

### 1. GIcon - 图标组件

**功能**: 统一的图标组件，支持阿里图标、Element Plus 图标和本地 SVG 图标。

**Props**:
```typescript
interface Props {
  icon: string                    // 图标名称
  customColor?: boolean          // 是否启用自定义颜色，默认 false
}
```

**使用示例**:
```vue
<template>
  <!-- 阿里图标 -->
  <GIcon icon="icon-home" />
  <GIcon icon="ali-user" />
  
  <!-- Element Plus 图标 -->
  <GIcon icon="el-Plus" />
  <GIcon icon="el-Delete" />
  
  <!-- 本地 SVG 图标 -->
  <GIcon icon="custom-logo" :custom-color="true" />
</template>
```

**特性**:
- 自动识别图标类型（阿里图标、Element Plus 图标、本地 SVG）
- 支持自定义颜色控制
- 统一的样式处理

---

### 2. GBaseModule - 基础模块组件

**功能**: 集成了搜索表单、操作按钮、数据表格和分页的完整模块组件。适用于标准的列表页面开发，提供开箱即用的CRUD界面。

**主要 Props**:
```typescript
interface BaseModuleProps {
  searchFormProps?: FormProps           // 搜索表单配置
  tableColumns?: TableColumnProps[]     // 表格列配置
  tableData?: BaseTableDataItem[]       // 表格数据
  tablePagination?: PaginationProps     // 分页配置
  btns?: BtnProps[]                     // 操作按钮组
  loadTableMethods?: (page?: number) => void  // 加载数据的方法
  tableLoading?: boolean                // 表格加载状态
  searchBtnHorizontal?: boolean         // 搜索按钮是否独占一行
  columnsConfigurable?: boolean         // 是否支持列配置
  sortable?: boolean                    // 是否支持排序
  noSearchLabel?: boolean               // 是否隐藏搜索标签
  moreSearchMode?: 'pull-down' | 'popup'  // 更多查询展示方式
  rowBtnConfig?: TableRowBtnConfig      // 表格行操作配置
  tabs?: Array<{label: string, value: string}>  // Tab切换配置
  activeTab?: string                    // 当前激活的Tab
  selectedRows?: any[]                  // 选中的行数据
  mode?: 'classic' | 'tabular'          // 布局模式
}
```

**使用示例**:
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
    },
    {
      prop: 'sex',
      label: '性别',
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
  },
  {
    prop: 'sortNo',
    label: '排序',
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
      tablePagination.total += 10
    }
  },
  {
    label: '授权',
    type: 'success',
    onClick: () => {
      console.log('授权操作')
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
  // fetchTableData(params).then(res => {
  //   tableData.splice(0, tableData.length, ...res.data)
  //   tablePagination.total = res.total
  // })
}
</script>

<style lang="scss" scoped>
.base-module-demo {
  height: 800px;
}
</style>
```

**核心特性**:

1. **搜索区域**: 
   - 支持动态表单配置
   - 可配置搜索按钮布局（独占一行或内联）
   - 支持更多查询的展开/收起

2. **操作区域**:
   - 支持自定义操作按钮组
   - 支持列显示/隐藏配置
   - 支持表格排序功能

3. **表格区域**:
   - 集成GTable组件的所有功能
   - 支持分页
   - 支持行操作按钮
   - 支持Tab切换

4. **布局模式**:
   - `classic`: 经典模式，搜索条件和结果分离
   - `tabular`: 表格模式，更紧凑的布局

**事件**:
```typescript
// 获取表格实例
@getTableInstance: (instance: TableInstance) => void

// Tab切换
@update:activeTab: (tab: string) => void

// 选中行变更
@update:selectedRows: (rows: any[]) => void

// 排序确认
@sort: (sortConfig: any) => void
```

---

### 3. GDButton - 防抖按钮组件

**功能**: 带防抖功能的按钮组件，防止用户重复点击。

**Props**:
```typescript
interface Props {
  debounce?: boolean             // 是否开启防抖，默认 true
  wait?: number                  // 延迟时间，默认 1000ms
  onClick?: Function             // 事件处理函数
}
```

**使用示例**:
```vue
<template>
  <GDButton 
    :debounce="true" 
    :wait="1000" 
    :onClick="handleClick"
  >
    提交
  </GDButton>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

**特性**:
- 内置防抖机制，防止重复提交
- 可配置防抖延迟时间
- 基于 Element Plus Button 组件

---

### 3. GForm - 动态表单组件

**功能**: 强大的动态表单组件，支持多种表单控件和布局模式。通过配置化的方式快速构建复杂表单。

**主要 Props**:
```typescript
interface FormProps {
  config: {
    model: { [k: string]: any }           // 表单数据对象
    formItems?: FormItemProps[]           // 表单项配置
    rules?: { [k: string]: ExtendRuleItem | ExtendRuleItem[] }  // 校验规则
    instance: FormInstance | null         // 表单实例
    labelPosition?: 'left' | 'right' | 'top'  // 标签位置
    labelWidth?: string                   // 标签宽度
    gutter?: number                       // 栅格间隔
    colon?: boolean                       // 是否显示冒号
    collapseMode?: 'card' | 'panel'       // 折叠模式
    showNavBars?: boolean                 // 是否显示导航栏
  }
}
```

**表单项配置**:
```typescript
interface FormItemProps {
  prop: string                          // 字段名
  label: string                         // 标签文本
  span?: number                         // 栅格占位（24栅格系统）
  required?: boolean                    // 是否必填
  disabled?: boolean                    // 是否禁用
  controlConfig: {                      // 控件配置
    type: string                        // 控件类型
    options?: Array<{label: string, value: any}>  // 选项列表（select、radio、checkbox等）
    props?: any                         // 控件属性
    treeData?: any[]                    // 树形数据（selectTree）
  }
  render?: (prop: any) => JSX.Element   // 自定义渲染函数
}
```

**使用示例**:
```vue
<template>
  <div class="wrapper">
    <GForm :config="formConfig" />
  </div>
</template>

<script setup lang="ts">
import { FormProps } from 'jn-ve-global'
import { reactive } from 'vue'

// 基本表单数据模型都要发生变化的，所以在生成对象时，要定义成响应式对象
let formConfig = reactive<FormProps>({
  // 第一层：配置 Form 组件
  instance: null,
  labelPosition: 'right',
  labelWidth: '180px',
  
  // model 是控件双向绑定数据的依赖对象，其里面的字段是自定义的
  // 也是发送给后台的参数列表
  model: {
    input: '',
    select: '',
    radio: 'f',
    switch: '2',
    time1: new Date(),
    date1: new Date(),
    color: '#ff3040',
    food: ['0', '2'],
    rate: 3,
    slider: 50,
    selectTreeActive: '1425374958969872386',
    money: ''
  },
  
  // formItems 是第二层配置，每一个 item 的配置属性
  formItems: [
    {
      prop: 'input',
      label: 'Input',
      span: 24,
      controlConfig: {
        type: 'input'
      }
    },
    {
      prop: 'select',
      label: 'Select',
      span: 24,
      controlConfig: {
        type: 'select',
        options: [
          { label: '全部', value: '0' },
          { label: '正常', value: '1' },
          { label: '禁用', value: '2' }
        ],
        props: {
          onChange: (value: any) => {
            console.log('select value changed:', value)
          }
        }
      }
    },
    {
      prop: 'radio',
      label: 'Radio',
      span: 24,
      controlConfig: {
        type: 'radio',
        options: [
          { label: '男', value: 'm' },
          { label: '女', value: 'f' }
        ]
      }
    },
    {
      prop: 'switch',
      label: 'Switch',
      span: 24,
      controlConfig: {
        type: 'switch',
        props: {
          activeText: '是',
          inactiveText: '否',
          activeValue: '1',
          inactiveValue: '2'
        }
      }
    },
    {
      prop: 'date1',
      label: 'DatePicker',
      span: 24,
      controlConfig: {
        type: 'datePicker',
        props: {
          type: 'datetime'
        }
      }
    },
    {
      prop: 'food',
      label: 'CheckBox',
      span: 24,
      controlConfig: {
        type: 'checkBox',
        options: [
          { label: '肯德基', value: '0' },
          { label: '麦当劳', value: '1' },
          { label: '必胜客', value: '2' },
          { label: '华莱士', value: '3' }
        ]
      }
    },
    {
      prop: 'rate',
      label: 'Rate',
      span: 24,
      controlConfig: {
        type: 'rate',
        props: {
          max: 10
        }
      }
    },
    {
      prop: 'slider',
      label: 'Slider',
      span: 24,
      controlConfig: {
        type: 'slider',
        props: {
          showStops: true,
          step: 10
        }
      }
    },
    // 数字输入框示例
    {
      prop: 'money',
      label: '千分位格式',
      span: 24,
      controlConfig: {
        type: 'figureInput',
        props: {
          format: (val: any) => {
            return val ? val.toLocaleString() : val
          }
        }
      }
    }
  ]
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 700px;
}
</style>
```

**支持的控件类型**:

**基础控件**:
- `input` - 输入框
- `inputNumber` - 数字输入框
- `figureInput` - 数字格式化输入框（支持千分位、小数位控制）
- `select` - 选择器
- `radio` - 单选框
- `radioButton` - 单选按钮
- `checkbox` - 多选框
- `checkBoxButton` - 多选按钮
- `switch` - 开关

**时间日期控件**:
- `timePicker` - 时间选择器
- `timeSelect` - 时间选择
- `datePicker` - 日期选择器

**高级控件**:
- `colorPicker` - 颜色选择器
- `rate` - 评分
- `slider` - 滑块
- `selectTree` - 树形选择器
- `upload` - 文件上传
- `address` - 地址选择器
- `iconPicker` - 图标选择器
- `jnEditor` - 富文本编辑器

**表单实例方法**:
```typescript
interface FormInstance {
  validate: () => Promise<boolean>        // 全量校验
  resetFields: () => void                 // 重置字段
  clearValidate: () => void               // 清理校验
  validateField: (props: string | string[]) => void  // 校验单个字段
  initModel: () => void                   // 初始化模型
  init: () => void                        // 初始化表单
  cacheModel: () => void                  // 缓存模型
  isChangeByCache: () => boolean          // 是否有变更
}
```

**自定义渲染**:
```typescript
// 支持使用 render 函数进行自定义渲染
{
  prop: 'custom',
  span: 24,
  render(prop: any) {
    return <h4 class="custom-title">{prop.value}</h4>
  }
}
```

---

### 4. GTable - 数据表格组件

**功能**: 基于Element Plus Table封装的高级表格组件，支持分页、选择、排序、编辑等功能。

**主要 Props**:
```typescript
interface TableConfig<T = BaseTableDataItem> {
  instance?: any                        // 表格实例
  columns: TableColumnProps[]           // 列配置
  data: T[]                            // 表格数据
  rowKey?: string                      // 行数据的Key，用于优化Table的渲染
  stripe?: boolean                     // 是否为斑马纹表格
  border?: boolean                     // 是否带有纵向边框
  size?: 'large' | 'default' | 'small' // 表格尺寸
  fit?: boolean                        // 列的宽度是否自撑开
  showHeader?: boolean                 // 是否显示表头
  highlightCurrentRow?: boolean        // 是否要高亮当前行
  currentRowKey?: string | number      // 当前行的key
  showSelection?: boolean              // 是否显示多选列
  selectedRows?: T[]                   // 已选中的行数据
  pagination?: PaginationProps         // 分页配置
  height?: string | number             // 表格高度
  maxHeight?: string | number          // 表格最大高度
}
```

**列配置**:
```typescript
interface TableColumnProps {
  prop?: string                        // 对应列内容的字段名
  label: string                        // 显示的标题
  width?: string | number              // 对应列的宽度
  minWidth?: string | number           // 对应列的最小宽度
  fixed?: boolean | 'left' | 'right'   // 列是否固定
  sortable?: boolean | 'custom'        // 对应列是否可以排序
  align?: 'left' | 'center' | 'right' // 对齐方式
  headerAlign?: 'left' | 'center' | 'right'  // 表头对齐方式
  showOverflowTooltip?: boolean        // 当内容过长被隐藏时显示tooltip
  type?: 'selection' | 'index' | 'expand'  // 对应列的类型
  formatter?: (row: any, column: any, cellValue: any, index: number) => any  // 格式化函数
  render?: (scope: any) => JSX.Element // 自定义渲染函数
}
```

**分页配置**:
```typescript
interface PaginationProps {
  currentPage: number                  // 当前页数
  pageSize: number                     // 每页显示条目个数
  total: number                        // 总条目数
  pageSizes?: number[]                 // 每页显示个数选择器的选项设置
  layout?: string                      // 组件布局，子组件名用逗号分隔
  background?: boolean                 // 是否为分页按钮添加背景色
  small?: boolean                      // 是否使用小型分页样式
  hideOnSinglePage?: boolean           // 只有一页时是否隐藏
  onChange?: (page: number, pageSize: number) => void  // 页码改变的回调
}
```

**使用示例**:
```vue
<template>
  <div>
    <el-button type="primary" @click="addSelection">
      添加勾选项
    </el-button>
    <el-button type="primary" @click="clearSelection">
      清空勾选项
    </el-button>
    <el-button type="success" @click="getSelectRows">
      获取勾选项
    </el-button>
    
    <div class="table-demo">
      <GTable :config="tableConfig" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { TableConfig, TableColumnProps, BaseTableDataItem } from 'jn-ve-global'

// 列配置
const columns = reactive<TableColumnProps[]>([
  {
    prop: 'date',
    label: '日期',
    width: 180
  },
  {
    prop: 'name',
    label: '姓名',
    width: 180
  },
  {
    prop: 'address',
    label: '地址'
  }
])

// 模拟数据
const mockData = {
  data1: [
    { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
    { date: '2016-05-04', name: '张小刚', address: '上海市普陀区金沙江路 1517 弄' },
    { date: '2016-05-01', name: '李小红', address: '上海市普陀区金沙江路 1519 弄' }
  ],
  data2: [
    { date: '2016-05-03', name: '赵小明', address: '上海市普陀区金沙江路 1520 弄' },
    { date: '2016-05-05', name: '钱小丽', address: '上海市普陀区金沙江路 1521 弄' }
  ]
}

// 表格配置
const tableConfig = reactive<TableConfig<any>>({
  instance: null,
  columns: columns,
  data: mockData.data1,
  showSelection: true,
  // 维护已选列表，不传递将被认为不维护列表
  selectedRows: [mockData.data1[0], mockData.data1[1], mockData.data1[2]],
  pagination: {
    pageSize: 10,
    currentPage: 1,
    total: 30,
    onChange(page, pageSize) {
      // 切换页码时的回调
      tableConfig.data = mockData[`data${page}`] || []
    }
  }
})

let index = ref(3)

// 添加选中项
const addSelection = () => {
  if (index.value < mockData.data1.length) {
    tableConfig.selectedRows.push(mockData.data1[index.value++])
  }
}

// 清空选中项
const clearSelection = () => {
  tableConfig.selectedRows = []
  index.value = 0
}

// 获取选中项
const getSelectRows = () => {
  console.log('当前选中的行:', tableConfig.selectedRows)
}
</script>

<style lang="scss" scoped>
.table-demo {
  height: 600px;
  margin-top: 10px;
}
</style>
```

**高级功能**:

1. **行选择**:
   - 支持单选和多选
   - 可维护选中状态
   - 跨页保持选中状态

2. **分页**:
   - 支持前端分页和后端分页
   - 可自定义分页器布局
   - 支持页码变更回调

3. **列配置**:
   - 支持固定列
   - 支持列宽调整
   - 支持列排序
   - 支持自定义渲染

4. **数据格式化**:
   - 支持formatter函数
   - 支持render函数自定义渲染
   - 支持插槽自定义内容

**事件**:
```typescript
// 选择项发生变化时的回调
@selection-change: (selection: any[]) => void

// 当某一行被点击时会触发该事件
@row-click: (row: any, column: any, event: Event) => void

// 当某个单元格被点击时会触发该事件
@cell-click: (row: any, column: any, cell: any, event: Event) => void

// 当表格的排序条件发生变化的时候会触发该事件
@sort-change: (data: { column: any, prop: string, order: string }) => void
```

---

### 6. GUpload - 文件上传组件

**功能**: 功能强大的文件上传组件，支持多种上传模式、文件预览、下载和删除功能。支持分片上传、WPS预览等高级特性。

**主要 Props**:
```typescript
interface UploadCustomProps {
  modelValue: string | Array<string>  // 抛出的文件ID值
  fileList: UploadFile[]              // 文件列表（双向绑定）
  action?: string                     // 上传地址
  listType?: 'text' | 'picture' | 'picture-card'  // 文件列表的类型
  disabled?: boolean                  // 是否禁用
  size?: number                       // 单个文件上传最大大小(MB)
  imgUrl?: string | object            // 上传头像回显的 img url
  downloadHide?: boolean              // 隐藏下载按钮
  delHide?: boolean                   // 隐藏删除按钮
  successNoMsg?: boolean              // 上传成功后不显示消息
  downloadUrl?: string                // 下载 & 预览文件的 url
  timeout?: number                    // 下载的请求超时时间(ms)
  getWpsEditLinkApi?: string          // 使用 wps 预览的接口 url
  previewMode?: PreviewMode           // 预览模式
  fileListBtnType?: FileListBtnType   // 文件列表的按钮展示形式
  chunkUpload?: boolean               // 是否采用分片上传
  onDownload?: (file: UploadFile) => void     // 下载的钩子
  onMagnify?: (file: UploadFile) => void      // 预览的钩子
  onDelete?: (file: UploadFile) => void       // 删除按钮的钩子
}

interface UploadFile {
  name: string                        // 文件名称
  url: string                         // 文件地址（预览/下载）
  thumb?: string                      // 图片文件缩略图
  fileId: string                      // 业务中的文件服务器的文件 id
  percentage?: number                 // 上传进度
  status: UploadStatus                // 上传状态
  size?: number                       // 文件大小
  uid: number                         // 文件唯一标识
  type?: string                       // 文件类型
  wpsPreviewUrl?: string              // 监管的 wps 预览地址
  isLoading?: boolean                 // 预览 or 下载时的 loading
}
```

**使用示例**:
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <GUpload
      v-model="fileIds"
      v-model:fileList="fileList"
      :action="uploadAction"
      list-type="picture"
    />
    
    <!-- 显示文件ID和文件列表 -->
    <div>
      <p>文件IDs: {{ fileIds }}</p>
      <p>文件列表: {{ fileList }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UploadFile } from 'jn-ve-global'

// 响应式数据
const fileIds = ref<string>('')
const fileList = ref<UploadFile[]>([
  {
    id: '1',
    name: '示例文件1.pdf',
    fileId: 'file_001',
    url: 'https://example.com/files/file1.pdf'
  },
  {
    id: '2', 
    name: '示例图片.jpg',
    fileId: 'file_002',
    url: 'https://example.com/images/image1.jpg'
  }
])

// 上传地址
const uploadAction = '/api/upload'

// 监听文件ID变化
watch(fileIds, (newVal) => {
  console.log('文件IDs变化:', newVal)
})

// 监听文件列表变化
watch(fileList, (newVal) => {
  console.log('文件列表变化:', newVal)
}, { deep: true })
</script>
```

**高级特性**:

1. **自定义钩子函数**:
```vue
<template>
  <GUpload
    v-model="fileIds"
    v-model:fileList="fileList"
    :action="uploadAction"
    :on-download="handleDownload"
    :on-magnify="handlePreview"
    :on-delete="handleDelete"
  />
</template>

<script setup>
const handleDownload = (file) => {
  console.log('自定义下载:', file)
  // 自定义下载逻辑
}

const handlePreview = (file) => {
  console.log('自定义预览:', file)
  // 自定义预览逻辑
}

const handleDelete = (file) => {
  console.log('自定义删除:', file)
  // 自定义删除逻辑
}
</script>
```

2. **分片上传**:
```vue
<template>
  <GUpload
    v-model="fileIds"
    v-model:fileList="fileList"
    :action="uploadAction"
    :chunk-upload="true"
    :size="100"
  />
</template>
```

3. **WPS预览模式**:
```vue
<template>
  <GUpload
    v-model="fileIds"
    v-model:fileList="fileList"
    :action="uploadAction"
    preview-mode="wps"
    :get-wps-edit-link-api="/api/wps/preview"
  />
</template>
```

**事件**:
- `@update:modelValue`: 文件ID值更新时触发
- `@update:fileList`: 文件列表更新时触发
- `@getUploadRef`: 获取上传组件实例时触发

---

### 7. GModal - 模态框组件

**功能**: 统一的模态框组件，支持对话框和抽屉两种模式。

**Props**:
```typescript
interface ModalProps {
  modelValue: boolean            // 是否显示
  type?: 'dialog' | 'drawer'     // 模态框类型
  width?: string | number        // 宽度
  title?: string                 // 标题
  hideFooter?: boolean           // 是否隐藏底部
  verticalCenter?: boolean       // 是否垂直居中
  btns?: ButtonConfig[]          // 按钮配置
}
```

**使用示例**:
```vue
<template>
  <GModal
    v-model="visible"
    type="dialog"
    width="600px"
    title="编辑用户"
    :btns="buttons"
  >
    <div>模态框内容</div>
  </GModal>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const buttons = [
  {
    text: '取消',
    type: 'default',
    onClick: () => {
      visible.value = false
    }
  },
  {
    text: '确定',
    type: 'primary',
    onClick: () => {
      // 处理确定逻辑
      visible.value = false
    }
  }
]
</script>
```

---

### 8. GTree - 树形组件

**功能**: 增强的树形组件，支持多选、搜索、拖拽等功能。

**使用示例**:
```vue
<template>
  <GTree
    :data="treeData"
    :props="treeProps"
    show-checkbox
    node-key="id"
    @check="handleCheck"
  />
</template>

<script setup>
const treeData = [
  {
    id: 1,
    label: '一级节点',
    children: [
      { id: 2, label: '二级节点1' },
      { id: 3, label: '二级节点2' }
    ]
  }
]

const treeProps = {
  children: 'children',
  label: 'label'
}

const handleCheck = (data, checked) => {
  console.log('节点选中状态变化', data, checked)
}
</script>
```

---

### 9. GSelectTree - 树形选择器

**功能**: 结合选择器和树形结构的组件，支持树形数据的选择。

**使用示例**:
```vue
<template>
  <GSelectTree
    v-model="selectedValue"
    :data="treeData"
    :props="treeProps"
    placeholder="请选择"
    clearable
  />
</template>
```

---

### 10. GTransfer - 穿梭框组件

**功能**: 双栏穿梭选择组件，支持数据在两个列表间移动。

**使用示例**:
```vue
<template>
  <GTransfer
    v-model="selectedKeys"
    :data="transferData"
    :titles="['源列表', '目标列表']"
    filterable
  />
</template>
```

---

### 11. GCollapse - 折叠面板组件

**功能**: 可折叠的内容面板，支持手风琴模式。

**使用示例**:
```vue
<template>
  <GCollapse v-model="activeNames">
    <GCollapseItem title="面板1" name="1">
      <div>面板1的内容</div>
    </GCollapseItem>
    <GCollapseItem title="面板2" name="2">
      <div>面板2的内容</div>
    </GCollapseItem>
  </GCollapse>
</template>
```

---

### 12. GTabs - 标签页组件

**功能**: 基于Element Plus Tabs封装的标签页组件，支持多种样式和动态显示隐藏。

**主要 Props**:
```typescript
interface TabsProps {
  list: TabPaneProps[]                    // 标签页列表
  type?: 'card' | 'border-card' | 'big-card' | ''  // 标签页类型
}
```

**标签页配置**:
```typescript
interface TabPaneProps {
  label: string                           // 标签页标题
  value: string | number                  // 标签页值，用于v-model绑定
  disabled?: boolean                      // 是否禁用
  hide?: boolean | (() => boolean)        // 是否隐藏，支持函数动态控制
}
```

**使用示例**:
```vue
<template>
  <g-tabs v-model="activeName" :list="tabList">
    <div v-if="[TabVal.BASE_INFO].includes(activeName)" class="item">
      基本信息内容
    </div>
    <div v-if="[TabVal.USER_INFO].includes(activeName)" class="item">
      用户信息内容
    </div>
    <div v-if="[TabVal.ROLE_INFO].includes(activeName)" class="item">
      角色信息内容
    </div>
  </g-tabs>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { TabPaneProps } from 'jn-ve-global'

/**
 * 注意：
 * 对于一些需要字符串来定义的状态，我们应该使用常量或枚举来定义
 * 以用来消除 "魔法字符串"
 */
enum TabVal {
  BASE_INFO = 'base_info',
  USER_INFO = 'user_info',
  ROLE_INFO = 'role_info'
}

/**
 * 对于一些可能不需要改变的数据模型，可以不定义为响应式数据
 * 如同 vue2 中的冻结 data 中的某个字段，来拒绝数据的监听
 */
const tabList: TabPaneProps[] = [
  {
    label: '基本信息',
    value: TabVal.BASE_INFO
  },
  {
    label: '用户信息',
    value: TabVal.USER_INFO
  },
  {
    label: '角色信息',
    value: TabVal.ROLE_INFO
  }
]

const activeName = ref<string>(TabVal.BASE_INFO)

watch(
  () => activeName.value,
  (val) => {
    console.log(`%c new activeName == `, 'color: #67c23a;', val)
  }
)
</script>

<style lang="scss" scoped>
.item {
  padding: 20px;
}
</style>
```

**标签页类型**:

1. **默认类型** (`type=""` 或不设置):
   - 标准的下划线样式标签页

2. **卡片类型** (`type="card"`):
   - 卡片样式的标签页

3. **边框卡片类型** (`type="border-card"`):
   - 带边框的卡片样式标签页

4. **大卡片类型** (`type="big-card"`):
   - 大尺寸的卡片样式标签页

**高级功能**:

1. **动态显示隐藏**:
   ```typescript
   const tabList: TabPaneProps[] = [
     {
       label: '基本信息',
       value: 'base_info',
       hide: () => !hasPermission('base_info')  // 动态控制显示
     },
     {
       label: '用户信息',
       value: 'user_info',
       disabled: true  // 禁用状态
     }
   ]
   ```

2. **内容区域**:
   - 支持插槽内容，可以根据当前激活的标签页显示不同内容
   - 使用 `v-if` 条件渲染不同标签页的内容

3. **事件处理**:
   ```typescript
   // 标签页切换事件
   @tabChange: (tabPane: any) => void
   ```

**最佳实践**:

1. **使用枚举定义标签值**:
   ```typescript
   enum TabVal {
     BASE_INFO = 'base_info',
     USER_INFO = 'user_info'
   }
   ```

2. **非响应式数据优化**:
   ```typescript
   // 对于不需要改变的配置，不定义为响应式数据
   const tabList: TabPaneProps[] = [...]
   ```

3. **条件渲染内容**:
   ```vue
   <template>
     <g-tabs v-model="activeName" :list="tabList">
       <component :is="currentComponent" />
     </g-tabs>
   </template>
   ```

---

### 13. JnEditor - 富文本编辑器

**功能**: 基于现代富文本编辑器的组件，支持丰富的文本编辑功能。

**使用示例**:
```vue
<template>
  <JnEditor
    v-model="content"
    :height="400"
    :toolbar="toolbarConfig"
    @change="handleChange"
  />
</template>
```

---

## 工具类和常量

### 全局常量

```typescript
// 应用模式管理
import { getAppMode, setAppMode } from 'jn-ve-global'

// 基础路径管理
import { getBase, setBase } from 'jn-ve-global'

// BaseModule 模式管理
import { getBaseModuleMode, setBaseModuleMode } from 'jn-ve-global'
```

### HTTP 工具

```typescript
// HTTP 实例
import http from 'jn-ve-global/packages/_http/http'

// 设置拦截器
import { 
  setIterceptorsReqHandle, 
  setIterceptorsResHandle 
} from 'jn-ve-global/packages/_http/httpInterceptors'

// 使用示例
const response = await http.get('/api/users')
const result = await http.post('/api/users', userData)
```

## 最佳实践

### 1. 组件引入方式

```typescript
// 推荐：按需引入
import { GForm, GTable, GIcon } from 'jn-ve-global'

// 避免：全量引入（除非确实需要所有组件）
import JnVeGlobal from 'jn-ve-global'
```

### 2. 类型定义

```typescript
// 使用组件提供的类型定义
import type { FormProps, TableColumnProps } from 'jn-ve-global'

const formConfig: FormProps = {
  model: {},
  formItems: [],
  instance: null
}
```

### 3. 样式覆盖

```scss
// 使用深度选择器覆盖组件样式
.my-form {
  :deep(.g-form) {
    .el-form-item__label {
      color: #333;
    }
  }
}
```

### 4. 事件处理

```vue
<template>
  <GTable
    :data="tableData"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
  />
</template>

<script setup>
// 使用具体的事件处理函数
const handleSelectionChange = (selection) => {
  console.log('选中项变化', selection)
}

const handleSortChange = ({ column, prop, order }) => {
  console.log('排序变化', { column, prop, order })
}
</script>
```

## 注意事项

1. **版本兼容性**: 确保 Vue 版本 >= 3.0，Element Plus 版本兼容
2. **样式引入**: 记得引入组件库的样式文件
3. **类型支持**: 在 TypeScript 项目中充分利用类型定义
4. **性能优化**: 大数据量场景下注意虚拟滚动和分页处理
5. **浏览器兼容**: 支持现代浏览器，IE 需要额外的 polyfill

## 更新日志

### v3.8.2
- 优化组件性能
- 修复已知问题
- 增强类型定义

---

*本文档基于 jn-ve-global v3.8.2 版本编写，如有疑问请联系开发团队。*