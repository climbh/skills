---
name: jn-ve-global
description: 指导 AI 正确使用 jn-ve-global（Vue 3 + Element Plus + TypeScript 二次封装）组件与工具函数。当实现表单/表格/弹窗/上传等业务 UI，或代码中出现 GForm/GTable/GModal/GUpload 时使用。
metadata:
  author: ClimnH
  version: "2026.2.9"
---

# jn-ve-global

> 基于知识库：jn-ve-global v3.8.2（Vue 3 + Element Plus + TypeScript），支持 ESM/CJS。

## 触发条件

- 用户要求“用 jn-ve-global 实现”或项目依赖 `jn-ve-global`
- 你需要实现/改造表单、表格、弹窗、上传、图标、树、标签页等 UI
- 代码中出现 `GForm`、`GTable`、`GModal`、`GUpload`、`GIcon` 等组件名

## 必须遵守的用法（高优先级）

### 样式引入必不可少

只要使用了组件库组件，就必须确保样式已被引入：

```ts
import 'jn-ve-global/dist/style.css'
```

### 两种引入方式

全量引入（适用于需要统一注册、快速接入的场景）：

```ts
import { createApp } from 'vue'
import JnVeGlobal from 'jn-ve-global'
import 'jn-ve-global/dist/style.css'

import App from './App.vue'

const app = createApp(App)
app.use(JnVeGlobal)
app.mount('#app')
```

按需引入（优先推荐，用到什么引什么）：

```ts
import { GForm, GTable, GIcon } from 'jn-ve-global'
```

## 组件选型与使用模式

### 配置驱动组件（常见）

`GForm`、`GTable` 以 `config` 驱动的用法优先：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GForm, GTable } from 'jn-ve-global'

const formConfig = ref({})
const tableConfig = ref({})
</script>

<template>
  <GForm :config="formConfig" />
  <GTable :config="tableConfig" />
</template>
```

### v-model 组件（上传等）

上传等组件支持 `v-model` 绑定：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GUpload } from 'jn-ve-global'

const fileList = ref<any[]>([])
</script>

<template>
  <GUpload v-model="fileList" />
</template>
```

## 工具类与常量（可直接从包入口导入）

全局常量与模式/路径工具函数从 `jn-ve-global` 入口导入：

```ts
import { getAppMode, setAppMode, getBase, setBase, getBaseModuleMode, setBaseModuleMode } from 'jn-ve-global'
```

## 输出约束（避免臆造 API）

- 组件名只使用知识库已出现的命名（例如 `GForm/GTable/GModal/GUpload/GIcon`），不要自创近似名
- props/事件/v-model 细节不确定时：先在项目里搜索现有用法，再补全代码
- 优先按需引入；只有在项目已采用 `app.use(JnVeGlobal)` 的情况下，才继续沿用全量注册

## Element Plus 透传 props（避免“没写在文档里就不敢用”）

`jn-ve-global` 基于 Element Plus 二次封装，部分组件可能会把 Element Plus 的 props/attrs 透传到底层组件（知识库未完整列出所有 props 属于正常情况）。

使用规则：

- 先确认该组件是否“支持透传”
  - 在业务项目里搜索该组件的实现/类型/现有用法，看是否存在 `v-bind="$attrs"`、`inheritAttrs`、或显式 `...attrs` 透传
  - 如果没有证据表明透传存在，不要直接把 Element Plus 的 prop 名硬塞进去
- 一旦确认支持透传
  - 可以使用对应 Element Plus 组件的同名 props（例如分页、表格、表单项等常见配置）
  - 仍然遵守“以现有项目用法为准”，优先抄已有代码里的写法与命名
- 任何不确定的 prop
  - 不要猜，先在项目里搜（组件封装层 + 现有页面），再决定是“组件库自定义 prop”还是“Element Plus 透传 prop”

<!--
Source references:
- file:///Users/Ai/TRAE/%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A1%A3/jn-ve-global/README.md
- file:///Users/Ai/TRAE/%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A1%A3/jn-ve-global/JN-VE-GLOBAL%E7%BB%84%E4%BB%B6%E5%BA%93%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.md
-->
