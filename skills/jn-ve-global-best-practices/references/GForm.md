# GForm - 表单组件

## 概述

GForm 是一个功能强大的表单组件，支持多种控件类型、表单验证、响应式布局、折叠面板等功能。基于 Element Plus 的 ElForm 组件进行扩展，提供了更丰富的配置选项和控件类型。

## 基本用法

```vue
<template>
  <div class="form-demo">
    <GForm :config="formConfig" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { FormProps, FormInstance } from 'jn-ve-global'

// 表单实例
const formInstance = ref<FormInstance | null>(null)

// 表单配置
const formConfig = reactive<FormProps>({
  instance: formInstance,
  model: {
    name: '',
    age: 0,
    email: '',
    gender: '',
    isActive: false
  },
  formItems: [
    {
      prop: 'name',
      label: '姓名',
      span: 12,
      required: true,
      rules: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ],
      controlConfig: {
        type: 'input',
        props: {
          placeholder: '请输入姓名'
        }
      }
    },
    {
      prop: 'age',
      label: '年龄',
      span: 12,
      controlConfig: {
        type: 'inputNumber',
        props: {
          min: 0,
          max: 120
        }
      }
    },
    {
      prop: 'email',
      label: '邮箱',
      span: 24,
      rules: [
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
      ],
      controlConfig: {
        type: 'input',
        props: {
          placeholder: '请输入邮箱'
        }
      }
    },
    {
      prop: 'gender',
      label: '性别',
      span: 12,
      controlConfig: {
        type: 'radio',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }
    },
    {
      prop: 'isActive',
      label: '是否激活',
      span: 12,
      controlConfig: {
        type: 'switch'
      }
    }
  ]
})
</script>
```

## Props

### 必传属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `config` | `FormProps` | 表单配置对象 |

### FormProps 配置

#### 必传属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `instance` | `FormInstance \| null` | 表单实例引用 |
| `model` | `Record<string, any>` | 表单数据对象 |

#### 可选属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `formItems` | `FormItemProps[]` | `[]` | 表单项配置列表 |
| `rules` | `Record<string, ExtendRuleItem \| ExtendRuleItem[]>` | `{}` | 表单验证规则 |
| `labelPosition` | `'right' \| 'left' \| 'top'` | `'right'` | 标签位置 |
| `labelWidth` | `string` | `'auto'` | 标签宽度 |
| `gutter` | `number` | `20` | 栅格间隔 |
| `colon` | `boolean` | `true` | 是否显示标签后的冒号 |
| `hideRequiredAsterisk` | `boolean` | `false` | 是否隐藏必填字段的红色星号 |
| `showMessage` | `boolean` | `true` | 是否显示校验错误信息 |
| `inlineMessage` | `boolean` | `false` | 是否以行内形式展示校验信息 |
| `statusIcon` | `boolean` | `false` | 是否在输入框中显示校验结果反馈图标 |
| `disabled` | `boolean` | `false` | 是否禁用表单内所有组件 |
| `validateOnRuleChange` | `boolean` | `true` | 是否在规则改变后立即触发验证 |
| `collapseMode` | `'card' \| 'panel'` | `'card'` | 折叠面板模式 |
| `showNavBars` | `boolean` | `false` | 是否显示折叠导航条 |
| `historyLog` | `string \| Record<string, FieldHistoryLog>` | `undefined` | 数据修改历史记录 |
| `id` | `string` | `undefined` | 多个表单的主键 |

## FormItemProps 配置

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `prop` | `string` | **必填** | 表单域 model 字段 |
| `label` | `string \| Function \| JSX.Element` | `''` | 标签文本 |
| `span` | `number` | `6` | 栅格占位（1-24） |
| `offset` | `number` | `0` | 栅格左侧间隔 |
| `labelWidth` | `string` | `'auto'` | 标签宽度 |
| `required` | `boolean` | `false` | 是否必填 |
| `rules` | `ExtendRuleItem \| ExtendRuleItem[]` | `[]` | 验证规则 |
| `hide` | `boolean \| Function` | `false` | 是否隐藏 |
| `class` | `string` | `''` | 自定义类名 |

### 响应式属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `xs` | `number \| {span: number, offset: number}` | <768px 响应式配置 |
| `sm` | `number \| {span: number, offset: number}` | ≥768px 响应式配置 |
| `md` | `number \| {span: number, offset: number}` | ≥992px 响应式配置 |
| `lg` | `number \| {span: number, offset: number}` | ≥1200px 响应式配置 |
| `xl` | `number \| {span: number, offset: number}` | ≥1920px 响应式配置 |

### 提示信息属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `tip` | `string \| VNode \| JSX.Element \| Function` | `undefined` | 提示信息 |
| `tipPosition` | `'label' \| 'append'` | `'append'` | 提示图标位置 |
| `tipIcon` | `string` | `undefined` | 提示图标 |
| `tipPopperClass` | `string` | `undefined` | 提示弹窗类名 |
| `tipPlacement` | `string` | `'top'` | 提示出现位置 |

### 控件配置

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `controlConfig` | `ControlConfig` | 单控件配置 |
| `controlConfigs` | `ExtendControlConfig[]` | 多控件组配置 |
| `render` | `Function` | 自定义渲染函数 |

## 支持的控件类型

### 基础输入控件

| 控件类型 | 说明 | 配置类型 |
|----------|------|----------|
| `input` | 输入框 | `InputControlConfig` |
| `inputNumber` | 数字输入框 | `InputNumberControlConfig` |
| `figureInput` | 数字输入框（带单位） | `FigureInputControlConfig` |
| `select` | 下拉选择 | `SelectControlConfig` |
| `radio` | 单选框 | `RadioControlConfig` |
| `radioButton` | 单选按钮 | `RadioButtonControlConfig` |
| `checkbox` | 多选框 | `CheckboxControlConfig` |
| `checkboxButton` | 多选按钮 | `CheckboxButtonControlConfig` |
| `switch` | 开关 | `SwitchControlConfig` |

### 时间日期控件

| 控件类型 | 说明 | 配置类型 |
|----------|------|----------|
| `timePicker` | 时间选择器 | `TimePickerControlConfig` |
| `timeSelect` | 时间选择 | `TimeSelectControlConfig` |
| `datePicker` | 日期选择器 | `DatePickerControlConfig` |
| `dateTimePicker` | 日期时间选择器 | `DateTimePickerControlConfig` |

### 高级控件

| 控件类型 | 说明 | 配置类型 |
|----------|------|----------|
| `colorPicker` | 颜色选择器 | `ColorPickerControlConfig` |
| `rate` | 评分 | `RateControlConfig` |
| `slider` | 滑块 | `SliderControlConfig` |
| `selectTree` | 下拉树 | `SelectTreeControlConfig` |
| `selectTreeV2` | 下拉树V2 | `SelectTreeV2ControlConfig` |
| `upload` | 文件上传 | `UploadControlConfig` |
| `iconPicker` | 图标选择器 | `IconPickerControlConfig` |
| `infoSelect` | 信息选择表格 | `InfoSelectControlConfig` |
| `infoAutocomplete` | 信息自动完成 | `InfoAutocompleteControlConfig` |
| `address` | 地址选择 | `AddressControlConfig` |
| `jnEditor` | 富文本编辑器 | `JnEditorControlConfig` |
| `table` | 表格 | `FormItemTableTableConfig` |
| `collapseItem` | 折叠项 | `CollapseItemControlConfig` |
| `placeholder` | 占位符 | `PlaceholderControlConfig` |

## FormInstance 方法

通过表单实例可以调用以下方法：

```typescript
interface FormInstance {
  // Element Plus 原生方法
  validate: (callback?: Callback) => Promise<boolean>     // 全量校验
  resetFields: () => void                                 // 重置字段
  clearValidate: (props?: string | string[]) => void     // 清理校验消息
  validateField: (props: string | string[], cb: Function) => void  // 校验单个字段
  
  // 扩展方法
  initModel: () => void                                   // 重置表单模型
  init: () => void                                        // 重置表单并清理校验
  cacheModel: () => void                                  // 缓存当前模型
  isChangeByCache: () => boolean                          // 检查是否有变更
}
```

## 插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `default` | `{ formItems: FormItemProps[] }` | 自定义表单内容，可配合拖拽平台使用 |

## 暴露的属性和方法

```typescript
interface ExposedMethods {
  instance: Ref<FormInstance>    // 表单实例
  config: Ref<FormProps>         // 表单配置
}
```

## 使用示例

### 基础表单
```vue
<template>
  <GForm :config="basicForm" />
</template>

<script setup>
const basicForm = reactive({
  instance: ref(null),
  model: { name: '', email: '' },
  formItems: [
    {
      prop: 'name',
      label: '姓名',
      controlConfig: { type: 'input' }
    },
    {
      prop: 'email',
      label: '邮箱',
      controlConfig: { type: 'input' }
    }
  ]
})
</script>
```

### 带验证的表单
```vue
<template>
  <GForm :config="validatedForm" />
  <el-button @click="handleSubmit">提交</el-button>
</template>

<script setup>
const formInstance = ref(null)

const validatedForm = reactive({
  instance: formInstance,
  model: { username: '', password: '' },
  formItems: [
    {
      prop: 'username',
      label: '用户名',
      required: true,
      rules: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      ],
      controlConfig: { type: 'input' }
    },
    {
      prop: 'password',
      label: '密码',
      required: true,
      rules: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
      ],
      controlConfig: { type: 'input', showPassword: true }
    }
  ]
})

const handleSubmit = async () => {
  try {
    const valid = await formInstance.value?.validate()
    if (valid) {
      console.log('表单数据:', validatedForm.model)
    }
  } catch (error) {
    console.log('验证失败:', error)
  }
}
</script>
```

### 折叠面板表单
```vue
<template>
  <GForm :config="collapseForm" />
</template>

<script setup>
const collapseForm = reactive({
  instance: ref(null),
  model: { name: '', age: 0, address: '', phone: '' },
  collapseMode: 'card',
  showNavBars: true,
  formItems: [
    {
      prop: 'name',
      label: '姓名',
      controlConfig: { type: 'input' }
    },
    {
      prop: 'collapseItem1',
      label: '',
      controlConfig: {
        type: 'collapseItem',
        title: '基本信息',
        name: 'basic'
      }
    },
    {
      prop: 'age',
      label: '年龄',
      controlConfig: { type: 'inputNumber' }
    },
    {
      prop: 'collapseItem2',
      label: '',
      controlConfig: {
        type: 'collapseItem',
        title: '联系信息',
        name: 'contact'
      }
    },
    {
      prop: 'address',
      label: '地址',
      controlConfig: { type: 'input' }
    },
    {
      prop: 'phone',
      label: '电话',
      controlConfig: { type: 'input' }
    }
  ]
})
</script>
```

### 响应式布局
```vue
<template>
  <GForm :config="responsiveForm" />
</template>

<script setup>
const responsiveForm = reactive({
  instance: ref(null),
  model: { field1: '', field2: '', field3: '', field4: '' },
  formItems: [
    {
      prop: 'field1',
      label: '字段1',
      span: 24,
      sm: 12,
      md: 8,
      lg: 6,
      controlConfig: { type: 'input' }
    },
    {
      prop: 'field2',
      label: '字段2',
      span: 24,
      sm: 12,
      md: 8,
      lg: 6,
      controlConfig: { type: 'input' }
    }
  ]
})
</script>
```

### 自定义渲染
```vue
<template>
  <GForm :config="customForm">
    <template #default="{ formItems }">
      <div class="custom-layout">
        <div v-for="item in formItems" :key="item.prop">
          <GFormItem :form-item-config="item" />
        </div>
      </div>
    </template>
  </GForm>
</template>
```

## 注意事项

1. **实例管理**: `instance` 属性必须传入，用于获取表单实例和调用方法
2. **数据绑定**: `model` 对象的属性需要与 `formItems` 中的 `prop` 对应
3. **验证规则**: 支持 async-validator 的所有验证规则，并扩展了 `trigger` 属性
4. **响应式布局**: 使用 `span`、`xs`、`sm`、`md`、`lg`、`xl` 属性实现响应式布局
5. **控件配置**: 不同控件类型需要对应的配置对象，详见各控件的配置文档
6. **折叠布局**: 使用 `collapseItem` 控件类型可以创建折叠面板布局
7. **性能优化**: 大型表单建议使用 `hide` 属性动态显示/隐藏字段