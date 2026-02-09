---
name: best-practices
description: 最佳实践与注意事项，包括 Element Plus 属性透传规则
---

# 最佳实践与注意事项

## Element Plus 透传规则

`jn-ve-global` 基于 Element Plus 二次封装，部分组件支持将属性透传到底层 Element Plus 组件。

### 识别透传

在使用未在 `jn-ve-global` 类型定义中显式列出的属性时：

1.  **先确认**：该组件是否支持透传。查看业务代码中是否有 `v-bind="$attrs"` 或显式的 props 转发。
2.  **通用位置**：对于 `GForm` 的控件，透传属性通常放在 `controlConfig.props` 对象中。
3.  **不要臆造**：如果没有证据表明支持透传，不要直接使用 Element Plus 的 prop。

### 示例

在 `GForm` 中透传 `el-input` 的 `clearable` 属性：

```ts
{
  prop: 'username',
  label: '用户名',
  controlConfig: {
    type: 'input',
    props: {
      // 这里是透传给 el-input 的 props
      clearable: true,
      placeholder: '请输入用户名'
    }
  }
}
```

## 输出约束

- **API 准确性**：严格遵守 `FormProps`, `TableProps` 等接口定义。
- **命名规范**：组件名统一使用 `G` 前缀的大驼峰命名（`GForm`, `GTable` 等）。
- **类型安全**：始终导入并使用 TypeScript 类型定义。
