# GIconPicker - 图标选择器

## 概述

GIconPicker 是一个图标选择器组件，提供可视化的图标选择界面。支持项目本地图标、Element Plus 图标和 IconFont 图标三种图标库，用户可以通过弹窗界面直观地选择所需图标。

## 基本用法

```vue
<template>
  <GIconPicker 
    v-model="selectedIcon" 
    placeholder="请选择图标"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedIcon = ref('')
</script>
```

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 双向绑定的图标值 | string | — | '' |
| disabled | 是否禁用 | boolean | true / false | false |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 图标选择变化时触发 | (iconName: string) |

## 使用示例

### 基础图标选择

```vue
<template>
  <div>
    <GIconPicker 
      v-model="icon" 
      placeholder="请选择图标"
    />
    <p>选中的图标: {{ icon }}</p>
    <GIcon v-if="icon" :name="icon" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const icon = ref('')
</script>
```

### 禁用状态

```vue
<template>
  <GIconPicker 
    v-model="disabledIcon" 
    :disabled="true"
    placeholder="禁用状态"
  />
</template>

<script setup>
import { ref } from 'vue'

const disabledIcon = ref('el-Star')
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
  menuIcon: '',
  buttonIcon: '',
  statusIcon: ''
})

const formConfig = {
  model: formData.value,
  formItems: [
    {
      type: 'iconPicker',
      prop: 'menuIcon',
      label: '菜单图标',
      controlConfig: {
        placeholder: '请选择菜单图标'
      }
    },
    {
      type: 'iconPicker',
      prop: 'buttonIcon',
      label: '按钮图标',
      controlConfig: {
        placeholder: '请选择按钮图标'
      }
    },
    {
      type: 'iconPicker',
      prop: 'statusIcon',
      label: '状态图标',
      controlConfig: {
        placeholder: '请选择状态图标',
        disabled: false
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
  { id: 1, name: '首页', icon: 'el-House', path: '/home' },
  { id: 2, name: '用户管理', icon: 'el-User', path: '/user' },
  { id: 3, name: '设置', icon: 'el-Setting', path: '/setting' }
])

const tableConfig = {
  data: tableData.value,
  columns: [
    { label: 'ID', prop: 'id' },
    { label: '菜单名称', prop: 'name' },
    {
      label: '图标',
      prop: 'icon',
      editable: true,
      controlConfig: {
        type: 'iconPicker',
        placeholder: '请选择图标'
      },
      render: (row) => {
        return row.icon ? h(GIcon, { name: row.icon }) : '未设置'
      }
    },
    { label: '路径', prop: 'path' }
  ]
}
</script>
```

### 动态图标预览

```vue
<template>
  <div class="icon-demo">
    <div class="icon-selector">
      <GIconPicker 
        v-model="currentIcon" 
        placeholder="选择图标查看效果"
      />
    </div>
    
    <div class="icon-preview" v-if="currentIcon">
      <h3>图标预览</h3>
      <div class="preview-sizes">
        <div class="size-item">
          <span>小号 (16px)</span>
          <GIcon :name="currentIcon" style="font-size: 16px;" />
        </div>
        <div class="size-item">
          <span>中号 (24px)</span>
          <GIcon :name="currentIcon" style="font-size: 24px;" />
        </div>
        <div class="size-item">
          <span>大号 (32px)</span>
          <GIcon :name="currentIcon" style="font-size: 32px;" />
        </div>
        <div class="size-item">
          <span>超大 (48px)</span>
          <GIcon :name="currentIcon" style="font-size: 48px;" />
        </div>
      </div>
      
      <div class="icon-info">
        <p><strong>图标名称:</strong> {{ currentIcon }}</p>
        <p><strong>图标类型:</strong> {{ getIconType(currentIcon) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIcon = ref('')

const getIconType = (iconName) => {
  if (iconName.startsWith('el-')) return 'Element Plus 图标'
  if (iconName.startsWith('icon-')) return 'IconFont 图标'
  return '本地 SVG 图标'
}
</script>

<style scoped>
.icon-demo {
  padding: 20px;
}

.icon-selector {
  margin-bottom: 20px;
}

.preview-sizes {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.icon-info {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
```

### 图标分类展示

```vue
<template>
  <div class="icon-categories">
    <h2>图标选择器演示</h2>
    
    <div class="category-section">
      <h3>常用图标</h3>
      <div class="icon-grid">
        <div 
          v-for="icon in commonIcons" 
          :key="icon.name"
          class="icon-card"
          @click="selectIcon(icon.name)"
        >
          <GIcon :name="icon.name" />
          <span>{{ icon.label }}</span>
        </div>
      </div>
    </div>
    
    <div class="selected-section">
      <h3>当前选择</h3>
      <GIconPicker v-model="selectedIcon" />
      <div v-if="selectedIcon" class="selected-display">
        <GIcon :name="selectedIcon" />
        <span>{{ selectedIcon }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedIcon = ref('')

const commonIcons = [
  { name: 'el-House', label: '首页' },
  { name: 'el-User', label: '用户' },
  { name: 'el-Setting', label: '设置' },
  { name: 'el-Search', label: '搜索' },
  { name: 'el-Edit', label: '编辑' },
  { name: 'el-Delete', label: '删除' },
  { name: 'el-Plus', label: '添加' },
  { name: 'el-Star', label: '收藏' }
]

const selectIcon = (iconName) => {
  selectedIcon.value = iconName
}
</script>

<style scoped>
.icon-categories {
  padding: 20px;
}

.category-section {
  margin-bottom: 30px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-card:hover {
  border-color: #409eff;
  background-color: #f0f9ff;
}

.icon-card .g-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.selected-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.selected-display {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.selected-display .g-icon {
  font-size: 20px;
}
</style>
```

## 图标库支持

### 1. 本地 SVG 图标
- 来源：`@jsjn/icons-vue` 包
- 特点：项目自定义图标，支持多色彩
- 命名：直接使用图标名称

### 2. Element Plus 图标
- 来源：`@element-plus/icons-vue` 包
- 特点：Element Plus 官方图标库
- 命名：以 `el-` 前缀开头

### 3. IconFont 图标
- 来源：阿里巴巴 IconFont 平台
- 特点：丰富的图标资源
- 命名：以 `icon-` 前缀开头

## 核心特性

### 1. 可视化选择
- 弹窗式图标选择界面
- 分类展示不同图标库
- 实时预览选中效果

### 2. 输入支持
- 支持直接输入图标名称
- 输入框左侧实时预览图标
- 支持清空功能

### 3. 交互体验
- 点击右侧按钮打开选择器
- 鼠标悬停高亮效果
- 选中状态明确标识

### 4. 表单集成
- 完美适配 GForm 组件
- 支持表格编辑模式
- 提供验证和错误提示

## Element Plus Input 属性支持

GIconPicker 支持所有 Element Plus Input 组件的原生属性：

- `placeholder` - 占位文本
- `disabled` - 禁用状态
- `readonly` - 只读状态
- `size` - 输入框尺寸
- `clearable` - 可清空（默认开启）
- `maxlength` - 最大长度
- `minlength` - 最小长度
- `show-word-limit` - 显示字数统计

## 重要说明

1. **图标识别**: 组件会根据图标名称自动识别图标类型并正确渲染

2. **图标预览**: 输入框左侧会实时显示当前选中的图标

3. **弹窗管理**: 选择器弹窗会自动管理焦点状态

4. **图标分类**: 选择器按图标来源分为三个区域展示

5. **响应式**: 选择器界面支持滚动，适配不同屏幕尺寸

6. **性能优化**: 图标列表使用虚拟滚动，支持大量图标展示

7. **样式定制**: 支持通过 CSS 变量自定义样式

8. **无障碍**: 保持原生 Input 的无障碍特性

9. **兼容性**: 与 Element Plus 生态完全兼容

10. **图标更新**: 图标库更新时会自动同步到选择器中

## 版本信息

- 当前版本: 1.0.0
- 依赖: Element Plus Input、GIcon、GModal
- Vue 版本: 3.x