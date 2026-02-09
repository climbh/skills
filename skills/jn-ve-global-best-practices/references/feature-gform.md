---
name: feature-gform
description: GForm 表单组件的使用，基于配置驱动 (Config-Driven)
---

# GForm 表单组件

`GForm` 是基于 Element Plus 封装的配置驱动表单组件。

## 基本用法

使用 `config` 属性传入表单配置。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormProps } from 'jn-ve-global'

// 定义表单配置
const formConfig = ref<FormProps>({
  instance: null, // 表单实例引用
  labelWidth: '120px',
  labelPosition: 'left',
  model: {
    username: '',
    password: '',
  },
  formItems: [
    {
      prop: 'username',
      label: '用户名',
      controlConfig: {
        type: 'input',
        props: {
          placeholder: '请输入用户名',
          clearable: true
        }
      }
    },
    {
      prop: 'password',
      label: '密码',
      controlConfig: {
        type: 'input',
        props: {
          type: 'password',
          placeholder: '请输入密码',
          showPassword: true
        }
      }
    }
  ]
})
</script>

<template>
  <GForm :config="formConfig" />
</template>
```

## 关键类型

- `FormProps`: 表单整体配置接口
- `FormItemProps`: 表单项配置接口（在 `formItems` 数组中使用）

## 常用配置项

- `model`: 表单数据对象
- `formItems`: 表单项数组
  - `prop`: 对应 `model` 中的字段名
  - `label`: 标签文本
  - `controlConfig`: 控件配置
    - `type`: 控件类型 (e.g., 'input', 'select', 'date-picker')
    - `props`: 透传给 Element Plus 组件的 props
