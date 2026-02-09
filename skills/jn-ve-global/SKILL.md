---
name: jn-ve-global-best-practices
description: jn-ve-global（Vue 3 + Element Plus + TypeScript 二次封装）组件与工具函数。当实现表单/表格/弹窗/上传等业务 UI，或代码中出现 GForm/GTable/GModal/GUpload 等组件时使用。
metadata: 
  author: ClimnH
  version: "2026.2.9"
  source: Manual
---

> jn-ve-global v3.8.2（Vue 3 + Element Plus + TypeScript），支持 ESM/CJS。

## 核心设置

| 主题 | 描述 | 参考 |
|------|------|------|
| 引入与配置 | 样式引入、全量/按需注册、组件命名规范 | [core-setup](references/core-setup.md) |
| 最佳实践 | Element Plus 属性透传规则、输出约束 | [best-practices](references/best-practices.md) |

## 功能组件

### 基础模块与布局

| 主题 | 描述 | 参考 |
|------|------|------|
| GBaseModule | 集成搜索、表格、分页、按钮的完整 CRUD 模块 | [feature-gbasemodule](references/feature-gbasemodule.md) |
| GModal | 弹窗组件，支持 Dialog 和 Drawer 模式 | [feature-gmodal](references/feature-gmodal.md) |
| GTabs | 标签页组件，支持多种样式配置 | [feature-gtabs](references/feature-gtabs.md) |

### 表单与数据录入

| 主题 | 描述 | 参考 |
|------|------|------|
| GForm 表单 | 基于配置驱动的表单组件使用方法 | [feature-gform](references/feature-gform.md) |
| GFigureInput | 数字输入组件，支持千分位和格式化 | [feature-gfigureinput](references/feature-gfigureinput.md) |
| GIconPicker | 图标选择器组件 | [feature-giconpicker](references/feature-giconpicker.md) |
| GUpload 上传 | 支持 v-model 的文件上传组件 | [feature-gupload](references/feature-gupload.md) |

### 数据展示

| 主题 | 描述 | 参考 |
|------|------|------|
| GTable 表格 | 基于配置驱动的表格组件使用方法，包含分页 | [feature-gtable](references/feature-gtable.md) |
| GTree 树形 | 支持虚拟滚动、搜索和展开缓存的树组件 | [feature-gtree](references/feature-gtree.md) |
| GIcon 图标 | 通用图标组件，自动识别阿里/El/SVG 图标 | [feature-gicon](references/feature-gicon.md) |

### 按钮与交互

| 主题 | 描述 | 参考 |
|------|------|------|
| GButtonGroup | 按钮组组件，支持权限和动态状态 | [feature-gbuttongroup](references/feature-gbuttongroup.md) |
| GDButton | 防抖按钮组件 | [feature-gdbutton](references/feature-gdbutton.md) |
