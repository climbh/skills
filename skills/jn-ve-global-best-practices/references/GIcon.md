# GIcon 图标组件

## 概述

`GIcon` 是一个通用图标组件，支持多种图标类型包括阿里图标库、Element Plus 图标和本地 SVG 图标。组件会根据图标名称自动识别图标类型并进行相应的渲染。

## 基本用法

```vue
<template>
  <div>
    <!-- 阿里图标 -->
    <GIcon icon="icon-home" />
    <GIcon icon="ali-icon-user" />
    
    <!-- Element Plus 图标 -->
    <GIcon icon="el-Search" />
    <GIcon icon="el-Edit" />
    
    <!-- 本地 SVG 图标 -->
    <GIcon icon="custom-logo" />
  </div>
</template>

<script setup>
// 无需额外导入，组件会自动识别图标类型
</script>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **icon** | `string` | - | **必传** - 图标名称 |
| customColor | `boolean` | `false` | 是否启用自定义颜色（仅对本地 SVG 有效） |

### icon 图标名称规则

组件根据图标名称的前缀自动识别图标类型：

1. **阿里图标**: 以 `icon-` 或 `ali-` 开头
   - 示例: `icon-home`、`ali-icon-user`

2. **Element Plus 图标**: 以 `el-` 开头
   - 示例: `el-Search`、`el-Edit`、`el-Delete`

3. **本地 SVG 图标**: 其他命名方式
   - 示例: `custom-logo`、`my-icon`

## 事件

组件继承所有原生 HTML 元素事件，如 `click`、`mouseenter` 等。

## 样式定制

### 基础样式

```vue
<template>
  <!-- 设置大小 -->
  <GIcon icon="el-Search" style="font-size: 20px;" />
  
  <!-- 设置颜色 -->
  <GIcon icon="icon-home" style="color: #409eff;" />
  
  <!-- 设置多个样式 -->
  <GIcon 
    icon="el-Edit" 
    style="font-size: 24px; color: #67c23a; cursor: pointer;" 
  />
</template>
```

### CSS 类名

```vue
<template>
  <GIcon icon="el-Search" class="my-icon" />
</template>

<style>
.my-icon {
  font-size: 18px;
  color: #409eff;
  transition: color 0.3s;
}

.my-icon:hover {
  color: #66b1ff;
}
</style>
```

## 使用示例

### 1. 基础图标展示

```vue
<template>
  <div class="icon-demo">
    <div class="icon-group">
      <h3>阿里图标</h3>
      <GIcon icon="icon-home" />
      <GIcon icon="icon-user" />
      <GIcon icon="ali-icon-setting" />
    </div>
    
    <div class="icon-group">
      <h3>Element Plus 图标</h3>
      <GIcon icon="el-Search" />
      <GIcon icon="el-Edit" />
      <GIcon icon="el-Delete" />
      <GIcon icon="el-Plus" />
    </div>
    
    <div class="icon-group">
      <h3>本地 SVG 图标</h3>
      <GIcon icon="custom-logo" />
      <GIcon icon="my-icon" :custom-color="true" />
    </div>
  </div>
</template>

<style>
.icon-demo {
  display: flex;
  gap: 40px;
}

.icon-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.icon-group h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
}

.icon-group .g-icon,
.icon-group .iconfont {
  font-size: 24px;
  margin-right: 10px;
}
</style>
```

### 2. 按钮中的图标

```vue
<template>
  <div class="button-demo">
    <el-button type="primary">
      <GIcon icon="el-Search" style="margin-right: 5px;" />
      搜索
    </el-button>
    
    <el-button type="success">
      <GIcon icon="el-Plus" style="margin-right: 5px;" />
      新增
    </el-button>
    
    <el-button type="warning">
      <GIcon icon="el-Edit" style="margin-right: 5px;" />
      编辑
    </el-button>
    
    <el-button type="danger">
      <GIcon icon="el-Delete" style="margin-right: 5px;" />
      删除
    </el-button>
  </div>
</template>

<style>
.button-demo {
  display: flex;
  gap: 10px;
}
</style>
```

### 3. 可点击图标

```vue
<template>
  <div class="clickable-demo">
    <GIcon 
      icon="el-Search" 
      class="clickable-icon"
      @click="handleSearch"
    />
    
    <GIcon 
      icon="el-Refresh" 
      class="clickable-icon"
      :class="{ 'is-loading': loading }"
      @click="handleRefresh"
    />
    
    <GIcon 
      icon="el-Setting" 
      class="clickable-icon"
      @click="handleSetting"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleSearch = () => {
  console.log('搜索')
}

const handleRefresh = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const handleSetting = () => {
  console.log('设置')
}
</script>

<style>
.clickable-demo {
  display: flex;
  gap: 20px;
}

.clickable-icon {
  font-size: 20px;
  color: #606266;
  cursor: pointer;
  transition: color 0.3s;
}

.clickable-icon:hover {
  color: #409eff;
}

.clickable-icon.is-loading {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
```

### 4. 不同尺寸的图标

```vue
<template>
  <div class="size-demo">
    <div class="size-group">
      <span>小尺寸:</span>
      <GIcon icon="el-Star" style="font-size: 14px;" />
    </div>
    
    <div class="size-group">
      <span>默认尺寸:</span>
      <GIcon icon="el-Star" style="font-size: 16px;" />
    </div>
    
    <div class="size-group">
      <span>大尺寸:</span>
      <GIcon icon="el-Star" style="font-size: 20px;" />
    </div>
    
    <div class="size-group">
      <span>超大尺寸:</span>
      <GIcon icon="el-Star" style="font-size: 24px;" />
    </div>
  </div>
</template>

<style>
.size-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.size-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.size-group span {
  width: 80px;
  font-size: 14px;
}
</style>
```

### 5. 彩色图标

```vue
<template>
  <div class="color-demo">
    <GIcon icon="el-SuccessFilled" style="color: #67c23a; font-size: 24px;" />
    <GIcon icon="el-InfoFilled" style="color: #909399; font-size: 24px;" />
    <GIcon icon="el-WarningFilled" style="color: #e6a23c; font-size: 24px;" />
    <GIcon icon="el-CircleCloseFilled" style="color: #f56c6c; font-size: 24px;" />
  </div>
</template>

<style>
.color-demo {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
```

### 6. 本地 SVG 图标自定义颜色

```vue
<template>
  <div class="svg-demo">
    <div class="svg-group">
      <span>保持原色:</span>
      <GIcon icon="custom-logo" />
    </div>
    
    <div class="svg-group">
      <span>自定义颜色:</span>
      <GIcon 
        icon="custom-logo" 
        :custom-color="true" 
        style="color: #409eff;" 
      />
    </div>
  </div>
</template>

<style>
.svg-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.svg-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.svg-group span {
  width: 100px;
  font-size: 14px;
}
</style>
```

### 7. 图标列表

```vue
<template>
  <div class="icon-list">
    <div 
      v-for="iconName in iconList" 
      :key="iconName"
      class="icon-item"
      @click="copyIconName(iconName)"
    >
      <GIcon :icon="iconName" />
      <span>{{ iconName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const iconList = ref([
  'el-Search',
  'el-Edit',
  'el-Delete',
  'el-Plus',
  'el-Minus',
  'el-Star',
  'el-Setting',
  'el-User',
  'el-Lock',
  'el-Unlock'
])

const copyIconName = (iconName) => {
  navigator.clipboard.writeText(iconName)
  console.log(`已复制: ${iconName}`)
}
</script>

<style>
.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.icon-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-item:hover {
  border-color: #409eff;
  background-color: #f0f9ff;
}

.icon-item span {
  font-size: 12px;
  color: #606266;
}
</style>
```

## 图标类型说明

### 1. 阿里图标库

使用阿里巴巴矢量图标库的图标，需要确保项目中已引入相应的字体文件和 CSS 样式。

```css
/* 需要在项目中引入阿里图标的 CSS */
@import '//at.alicdn.com/t/font_xxx.css';
```

### 2. Element Plus 图标

使用 Element Plus 官方提供的图标集，组件会自动从 `@element-plus/icons-vue` 中加载对应的图标组件。

常用图标名称：
- `el-Search` - 搜索
- `el-Edit` - 编辑
- `el-Delete` - 删除
- `el-Plus` - 加号
- `el-Minus` - 减号
- `el-Star` - 星星
- `el-Setting` - 设置
- `el-User` - 用户
- `el-Lock` - 锁定
- `el-Unlock` - 解锁

### 3. 本地 SVG 图标

使用项目中自定义的 SVG 图标，需要确保图标已在 `@jsjn/icons-vue` 包中注册。

图标命名会自动转换为 PascalCase 格式进行匹配。

## 重要说明

1. **图标识别**: 组件根据图标名称前缀自动识别图标类型，无需手动指定
2. **样式继承**: 组件支持通过 `style` 和 `class` 属性设置样式
3. **事件透传**: 支持所有原生 HTML 事件的透传
4. **自定义颜色**: 本地 SVG 图标默认保持原有颜色，需要自定义颜色时设置 `customColor` 为 `true`
5. **响应式**: 图标大小通过 `font-size` 控制，支持响应式设计
6. **无障碍**: 建议为图标添加适当的 `aria-label` 或 `title` 属性
7. **性能**: 组件会自动判断图标是否存在，避免渲染无效图标

## 版本信息

- 当前版本: 1.0.0
- 依赖: Element Plus Icon、@jsjn/icons-vue
- Vue 版本: 3.x