---
name: core-setup
description: jn-ve-global 组件库的引入、安装与基本配置
---

# 核心设置 (Core Setup)

## 引入方式

### 1. 样式引入（必须）

只要使用了组件库组件，就必须确保样式在 `main.ts` 中已被引入：

```ts
import 'jn-ve-global/dist/style.css'
```

### 2. 组件注册

#### 全量引入（推荐）

适用于需要统一注册、快速接入的场景。

```ts
import { createApp } from 'vue'
import JnVeGlobal from 'jn-ve-global'
import 'jn-ve-global/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(JnVeGlobal)
app.mount('#app')
```

#### 按需引入

适用于只使用少量组件的场景。

```ts
import { GForm, GTable, GIcon } from 'jn-ve-global'
```

## 使用原则

- **组件命名**：只使用知识库已出现的命名（例如 `GForm`, `GTable`, `GModal`, `GUpload`, `GIcon`），严禁自创近似名。
- **优先按需**：只有在项目已采用 `app.use(JnVeGlobal)` 的情况下，才继续沿用全量注册。否则优先按需引入。
