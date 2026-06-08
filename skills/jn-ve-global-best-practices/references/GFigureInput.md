# GFigureInput - 数字输入组件

## 概述

GFigureInput 是专门用于数字输入的组件，支持数字格式化、千分位显示、小数位控制、单位提示等功能。组件采用双输入框设计，分别用于数据收集和格式化显示，提供更好的用户体验。

## 基本用法

```vue
<template>
  <GFigureInput 
    v-model="amount" 
    placeholder="请输入金额"
  />
</template>

<script setup>
import { ref } from 'vue'

const amount = ref('')
</script>
```

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 双向绑定的值 | string / number | — | — |
| format | 展示格式化函数 | Function | — | null |
| valueFormat | 搜集值格式化函数（影响输入行为） | Function | — | null |
| showUnitTip | 是否显示单位提示 | boolean | true / false | true |
| toThousands | 是否格式化成千分位（仅展示） | boolean | true / false | true |
| showDecimalsLength | 展示时小数位长度 | number | — | — |
| valDecimalsLength | 输入时小数位长度 | number | — | — |
| unitNumeralSystem | 单位进制（如万元为10000） | number | — | — |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | (value: string \| number) |
| tableEditHide | 表格编辑隐藏时触发 | — |

## 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 使输入框获取焦点 | — |

## 使用示例

### 基础数字输入

```vue
<template>
  <div>
    <GFigureInput 
      v-model="basicAmount" 
      placeholder="请输入数字"
    />
    <p>输入值: {{ basicAmount }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const basicAmount = ref('')
</script>
```

### 千分位格式化

```vue
<template>
  <div>
    <GFigureInput 
      v-model="thousandsAmount" 
      :toThousands="true"
      placeholder="请输入金额"
    />
    <p>原始值: {{ thousandsAmount }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const thousandsAmount = ref('1234567.89')
</script>
```

### 小数位控制

```vue
<template>
  <div>
    <!-- 输入时最多2位小数，显示时保留2位小数 -->
    <GFigureInput 
      v-model="decimalAmount" 
      :valDecimalsLength="2"
      :showDecimalsLength="2"
      placeholder="请输入金额（最多2位小数）"
    />
    <p>值: {{ decimalAmount }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const decimalAmount = ref('')
</script>
```

### 单位提示

```vue
<template>
  <div>
    <GFigureInput 
      v-model="unitAmount" 
      :unitNumeralSystem="10000"
      :showUnitTip="true"
      placeholder="请输入金额"
    />
    <p>值: {{ unitAmount }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const unitAmount = ref('50000') // 显示为 5万
</script>
```

### 自定义格式化

```vue
<template>
  <div>
    <GFigureInput 
      v-model="customAmount" 
      :format="formatDisplay"
      :valueFormat="formatValue"
      placeholder="请输入百分比"
    />
    <p>原始值: {{ customAmount }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customAmount = ref('')

// 显示格式化：添加%符号
const formatDisplay = (value) => {
  return value ? `${value}%` : ''
}

// 输入格式化：限制0-100
const formatValue = (value) => {
  const num = parseFloat(value)
  if (isNaN(num)) return ''
  return Math.min(100, Math.max(0, num)).toString()
}
</script>
```

### 禁用千分位和单位提示

```vue
<template>
  <div>
    <GFigureInput 
      v-model="simpleAmount" 
      :toThousands="false"
      :showUnitTip="false"
      placeholder="简单数字输入"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const simpleAmount = ref('')
</script>
```

### 在表单中使用

```vue
<template>
  <GForm :config="formConfig" />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  price: '',
  discount: '',
  total: ''
})

const formConfig = {
  model: formData.value,
  formItems: [
    {
      type: 'figureInput',
      prop: 'price',
      label: '单价',
      controlConfig: {
        placeholder: '请输入单价',
        toThousands: true,
        showDecimalsLength: 2,
        valDecimalsLength: 2
      }
    },
    {
      type: 'figureInput',
      prop: 'discount',
      label: '折扣',
      controlConfig: {
        placeholder: '请输入折扣',
        format: (value) => value ? `${value}%` : '',
        valueFormat: (value) => {
          const num = parseFloat(value)
          return isNaN(num) ? '' : Math.min(100, Math.max(0, num)).toString()
        }
      }
    },
    {
      type: 'figureInput',
      prop: 'total',
      label: '总金额',
      controlConfig: {
        placeholder: '请输入总金额',
        unitNumeralSystem: 10000,
        toThousands: true
      }
    }
  ]
}
</script>
```

### 在可编辑表格中使用

```vue
<template>
  <GTable :config="tableConfig" />
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '商品A', price: '1000', quantity: '10' },
  { id: 2, name: '商品B', price: '2000', quantity: '5' }
])

const tableConfig = {
  data: tableData.value,
  columns: [
    { label: 'ID', prop: 'id' },
    { label: '商品名称', prop: 'name' },
    {
      label: '单价',
      prop: 'price',
      editable: true,
      controlConfig: {
        type: 'figureInput',
        toThousands: true,
        showDecimalsLength: 2,
        valDecimalsLength: 2
      }
    },
    {
      label: '数量',
      prop: 'quantity',
      editable: true,
      controlConfig: {
        type: 'figureInput',
        showUnitTip: false,
        toThousands: false
      }
    }
  ]
}
</script>
```

## 核心特性

### 1. 双输入框设计
- 数据收集框：负责用户输入和数据验证
- 展示框：负责格式化显示
- 焦点切换时自动切换显示状态

### 2. 数字格式化
- 支持千分位格式化显示
- 可控制小数位数
- 支持自定义格式化函数

### 3. 输入限制
- 自动过滤非数字字符
- 可限制输入时的小数位数
- 支持自定义输入格式化

### 4. 单位提示
- 自动计算并显示数字单位（万、千万等）
- 支持自定义单位进制
- 可控制是否显示单位提示

### 5. 表格集成
- 完美适配可编辑表格
- 支持表格编辑状态管理
- 提供专用的表格编辑事件

## Element Plus Input 属性支持

GFigureInput 支持所有 Element Plus Input 组件的原生属性：

- `placeholder` - 占位文本
- `disabled` - 禁用状态
- `readonly` - 只读状态
- `size` - 输入框尺寸
- `clearable` - 可清空
- `show-password` - 显示密码
- `prefix-icon` - 前缀图标
- `suffix-icon` - 后缀图标
- `maxlength` - 最大长度
- `minlength` - 最小长度
- `show-word-limit` - 显示字数统计

## 重要说明

1. **格式化优先级**: `valueFormat` > `valDecimalsLength` > 默认数字过滤

2. **显示优先级**: `format` > `showDecimalsLength` + `toThousands` > 原值显示

3. **数据类型**: 组件接受 string 或 number 类型的值，内部统一处理

4. **单位计算**: 基于 `unitNumeralSystem` 和当前值自动计算显示单位

5. **表格编辑**: 在表格中使用时会自动处理编辑状态

6. **焦点管理**: 提供 `focus` 方法，可在任何状态下正确聚焦

7. **性能优化**: 使用计算属性缓存格式化结果

8. **样式定制**: 支持通过 CSS 变量自定义样式

9. **无障碍**: 保持原生 Input 的无障碍特性

10. **兼容性**: 与 Element Plus 生态完全兼容

## 版本信息

- 当前版本: 1.0.0
- 依赖: Element Plus Input、@jsjn/utils
- Vue 版本: 3.x