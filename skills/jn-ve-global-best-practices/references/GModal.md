# GModal 弹窗组件

## 概述

`GModal` 是基于 Element Plus Dialog 和 Drawer 组件封装的通用弹窗组件，支持对话框和抽屉两种展示模式，提供了统一的 API 和丰富的配置选项。

## 基本用法

```vue
<template>
  <div>
    <el-button @click="dialogVisible = true">打开对话框</el-button>
    <el-button @click="drawerVisible = true">打开抽屉</el-button>
    
    <!-- 对话框模式 -->
    <GModal v-model="dialogVisible" type="dialog" width="600px">
      <p>这是对话框内容</p>
    </GModal>
    
    <!-- 抽屉模式 -->
    <GModal v-model="drawerVisible" type="drawer" width="400px">
      <p>这是抽屉内容</p>
    </GModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const drawerVisible = ref(false)
</script>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | 是否显示弹窗，支持 v-model |
| type | `'dialog' \| 'drawer'` | `'dialog'` | 弹窗类型 |
| btns | `BtnProps[]` | `[]` | 底部按钮组配置 |
| hideFooter | `boolean` | `false` | 是否隐藏底部区域 |
| width | `string \| number` | `'70%'`(dialog) / `'50%'`(drawer) | 弹窗宽度 |
| verticalCenter | `boolean` | `false` | 是否垂直居中（仅对 dialog 有效） |

### BtnProps 按钮配置

按钮配置继承自 `GButtonGroup` 组件的 `BtnProps` 类型，包含以下常用属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 按钮文本 |
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | - | 按钮类型 |
| size | `'large' \| 'default' \| 'small'` | - | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| onClick | `Function` | - | 点击事件回调 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 弹窗显示状态变化时触发 | `(visible: boolean)` |

## 插槽

| 插槽名 | 说明 | 作用域参数 |
|--------|------|-----------|
| default | 弹窗主体内容 | - |
| title | 自定义标题区域 | - |
| footer | 自定义底部区域 | - |

## 暴露的方法和属性

```typescript
// 通过 ref 访问
const modalRef = ref()

// 访问属性和方法
modalRef.value.localType    // 当前弹窗类型
modalRef.value.modalRef     // Element Plus 组件实例
modalRef.value.open()       // 打开弹窗
modalRef.value.close()      // 关闭弹窗
```

### 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开弹窗 | - |
| close | 关闭弹窗 | - |

## 使用示例

### 1. 基础对话框

```vue
<template>
  <div>
    <el-button @click="visible = true">打开对话框</el-button>
    
    <GModal v-model="visible" type="dialog" width="500px">
      <template #title>
        <span>自定义标题</span>
      </template>
      
      <div>
        <p>这是对话框的内容区域</p>
        <p>可以放置任何内容</p>
      </div>
      
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </GModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const handleConfirm = () => {
  // 处理确认逻辑
  visible.value = false
}
</script>
```

### 2. 带按钮组的对话框

```vue
<template>
  <div>
    <el-button @click="visible = true">打开对话框</el-button>
    
    <GModal 
      v-model="visible" 
      type="dialog" 
      width="600px"
      :btns="modalBtns"
    >
      <div>
        <p>使用配置的按钮组</p>
      </div>
    </GModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const modalBtns = [
  {
    label: '取消',
    onClick: () => {
      visible.value = false
    }
  },
  {
    label: '确定',
    type: 'primary',
    onClick: () => {
      // 处理确认逻辑
      console.log('确认操作')
      visible.value = false
    }
  }
]
</script>
```

### 3. 抽屉模式

```vue
<template>
  <div>
    <el-button @click="visible = true">打开抽屉</el-button>
    
    <GModal 
      v-model="visible" 
      type="drawer" 
      width="400px"
      :btns="drawerBtns"
    >
      <template #title>
        <span>抽屉标题</span>
      </template>
      
      <div>
        <p>抽屉内容区域</p>
        <p>支持滚动显示</p>
        <div v-for="i in 20" :key="i">
          <p>内容项 {{ i }}</p>
        </div>
      </div>
    </GModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const drawerBtns = [
  {
    label: '关闭',
    onClick: () => {
      visible.value = false
    }
  },
  {
    label: '保存',
    type: 'primary',
    onClick: () => {
      // 处理保存逻辑
      console.log('保存操作')
    }
  }
]
</script>
```

### 4. 垂直居中对话框

```vue
<template>
  <div>
    <el-button @click="visible = true">打开居中对话框</el-button>
    
    <GModal 
      v-model="visible" 
      type="dialog" 
      width="400px"
      :vertical-center="true"
    >
      <div style="text-align: center; padding: 40px;">
        <p>这是一个垂直居中的对话框</p>
      </div>
    </GModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

### 5. 通过实例方法控制

```vue
<template>
  <div>
    <el-button @click="openModal">打开弹窗</el-button>
    <el-button @click="closeModal">关闭弹窗</el-button>
    
    <GModal 
      ref="modalRef"
      type="dialog" 
      width="500px"
    >
      <div>
        <p>通过实例方法控制的弹窗</p>
      </div>
    </GModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modalRef = ref()

const openModal = () => {
  modalRef.value.open()
}

const closeModal = () => {
  modalRef.value.close()
}
</script>
```

### 6. 表单弹窗

```vue
<template>
  <div>
    <el-button @click="visible = true">编辑用户</el-button>
    
    <GModal 
      v-model="visible" 
      type="dialog" 
      width="600px"
      :btns="formBtns"
    >
      <template #title>
        <span>编辑用户信息</span>
      </template>
      
      <el-form :model="formData" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.phone" />
        </el-form-item>
      </el-form>
    </GModal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const visible = ref(false)
const formData = reactive({
  name: '',
  email: '',
  phone: ''
})

const formBtns = [
  {
    label: '取消',
    onClick: () => {
      visible.value = false
    }
  },
  {
    label: '保存',
    type: 'primary',
    onClick: () => {
      // 处理表单提交
      console.log('保存用户信息:', formData)
      visible.value = false
    }
  }
]
</script>
```

## Element Plus 原生属性

组件支持 Element Plus Dialog 和 Drawer 的所有原生属性，通过 `v-bind` 透传：

### Dialog 原生属性

- `title`: 对话框标题
- `modal`: 是否需要遮罩层
- `modal-class`: 遮罩的自定义类名
- `lock-scroll`: 是否在 Dialog 出现时将 body 滚动锁定
- `custom-class`: Dialog 的自定义类名
- `open-delay`: Dialog 打开的延时时间，单位毫秒
- `close-delay`: Dialog 关闭的延时时间，单位毫秒
- `close-on-click-modal`: 是否可以通过点击 modal 关闭 Dialog
- `close-on-press-escape`: 是否可以通过按下 ESC 关闭 Dialog
- `show-close`: 是否显示关闭按钮
- `before-close`: 关闭前的回调
- `draggable`: 为 Dialog 启用可拖拽功能
- `center`: 是否对头部和底部采用居中布局

### Drawer 原生属性

- `title`: 抽屉标题
- `direction`: 抽屉打开的方向
- `modal`: 是否需要遮罩层
- `modal-class`: 遮罩的自定义类名
- `lock-scroll`: 是否在 Drawer 出现时将 body 滚动锁定
- `custom-class`: Drawer 的自定义类名
- `open-delay`: Drawer 打开的延时时间，单位毫秒
- `close-delay`: Drawer 关闭的延时时间，单位毫秒
- `close-on-click-modal`: 是否可以通过点击 modal 关闭 Drawer
- `close-on-press-escape`: 是否可以通过按下 ESC 关闭 Drawer
- `show-close`: 是否显示关闭按钮
- `before-close`: 关闭前的回调
- `with-header`: 控制是否显示 header 栏

## 重要说明

1. **类型切换**: 支持 `dialog` 和 `drawer` 两种类型，可根据使用场景选择
2. **响应式宽度**: 宽度支持字符串和数字类型，自动适配不同屏幕尺寸
3. **按钮配置**: 支持通过 `btns` 属性配置底部按钮，也可以使用 `footer` 插槽自定义
4. **实例控制**: 提供 `open()` 和 `close()` 方法，适配低代码平台使用
5. **样式定制**: 支持通过 `custom-class` 属性自定义样式类名
6. **滚动处理**: 抽屉模式自动处理内容滚动，对话框模式继承 Element Plus 默认行为
7. **事件透传**: 支持 Element Plus 原生事件的透传
8. **销毁机制**: 默认开启 `destroy-on-close`，关闭时销毁内容以释放内存

## 版本信息

- 当前版本: 1.0.0
- 依赖: Element Plus Dialog、Drawer 组件
- Vue 版本: 3.x