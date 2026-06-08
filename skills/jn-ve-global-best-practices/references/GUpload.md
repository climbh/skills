# GUpload 文件上传组件

## 概述

`GUpload` 是基于 Element Plus Upload 组件封装的高级文件上传组件，提供了丰富的文件上传、预览、下载功能，支持多种上传模式和文件类型。

## 基本用法

```vue
<template>
  <GUpload
    v-model="fileIds"
    v-model:file-list="fileList"
    action="/api/upload"
    :limit="5"
    accept=".jpg,.png,.pdf,.doc,.docx"
    list-type="text"
  />
</template>

<script setup>
import { ref } from 'vue'

const fileIds = ref('')
const fileList = ref([])
</script>
```

## Props

### UploadCustomProps

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `instance` | `any` | `null` | 组件实例 |
| `modelValue` | `string \| Array<string>` | `''` | 抛出的值（文件ID或URL） |
| `fileList` | `UploadFile[]` | `[]` | 文件列表（双向绑定） |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `size` | `number` | `5` | 单个文件上传最大大小(单位：MB) |
| `imgUrl` | `string \| object` | `null` | 上传头像回显的 img url |
| `downloadHide` | `boolean` | `false` | 隐藏下载按钮 |
| `delHide` | `boolean` | `false` | 隐藏删除按钮 |
| `successNoMsg` | `boolean` | `false` | 上传成功后不显示消息 |
| `onDownload` | `(file: UploadFile) => void` | `null` | 下载的钩子，将会覆盖本地操作 |
| `onMagnify` | `(file: UploadFile) => void` | `null` | 预览的钩子，将会覆盖本地操作 |
| `onDelete` | `(file: UploadFile) => void` | `null` | 删除按钮的钩子 |
| `downloadUrl` | `string` | `'/kinso-basic-open-server/v1/document/file/download'` | 下载 & 预览文件的 url |
| `timeout` | `number` | `20000` | 下载的请求超时时间 |
| `getWpsEditLinkApi` | `string` | `'/supervision-publicuse-server/v1/wps/preview'` | 使用 wps 预览的接口 url |
| `previewMode` | `PreviewMode` | - | 预览模式 |
| `fileListBtnType` | `FileListBtnType` | - | 文件列表的按钮展示形式 |
| `chunkUpload` | `boolean` | `false` | 是否采用分片上传 |

### UploadFile 接口

| 参数 | 类型 | 说明 |
|------|------|------|
| `isLoading` | `boolean` | 预览 or 下载时的 loading |
| `name` | `string` | 文件名称 |
| `url` | `string` | 文件地址（预览、下载） |
| `thumb` | `string` | 图片文件缩略图 |
| `fileId` | `string` | 业务中的文件服务器的文件 id |
| `percentage` | `number` | 上传进度 |
| `status` | `UploadStatus` | 上传状态 |
| `size` | `number` | 文件大小 |
| `response` | `unknown` | 响应数据 |
| `uid` | `number` | 文件唯一标识 |
| `raw` | `ElFile` | 原始文件对象 |
| `type` | `string` | 文件类型 |
| `wpsPreviewUrl` | `string` | 监管的 wps 预览地址 |

### 枚举类型

#### ListType
- `'text'` - 文本列表
- `'picture'` - 图片列表
- `'picture-card'` - 卡片式图片列表

#### UploadStatus
- `'ready'` - 准备就绪
- `'uploading'` - 上传中
- `'success'` - 上传成功
- `'fail'` - 上传失败

#### FileListBtnType
- `'text'` - 文本按钮
- `'icon'` - 图标按钮

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `value: string \| Array<string>` | 文件ID或URL值更新 |
| `update:fileList` | `fileList: UploadFile[]` | 文件列表更新 |
| `getUploadRef` | `ref: any` | 获取上传组件引用 |
| `update:instance` | `instance: any` | 实例更新 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 上传按钮内容 |
| `trigger` | 触发文件选择框的内容 |
| `tip` | 提示说明文字 |

## 使用示例

### 基本文件上传

```vue
<template>
  <GUpload
    v-model="fileIds"
    v-model:file-list="fileList"
    action="/api/upload"
    :limit="3"
    accept=".jpg,.png,.pdf"
    list-type="text"
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        只能上传jpg/png/pdf文件，且不超过5MB
      </div>
    </template>
  </GUpload>
</template>

<script setup>
import { ref } from 'vue'

const fileIds = ref('')
const fileList = ref([])
</script>
```

### 头像上传

```vue
<template>
  <GUpload
    v-model="avatarUrl"
    :img-url="avatarUrl"
    action="/api/upload/avatar"
    list-type="avatar"
    accept="image/*"
    :limit="1"
  />
</template>

<script setup>
import { ref } from 'vue'

const avatarUrl = ref('')
</script>
```

### 图片卡片上传

```vue
<template>
  <GUpload
    v-model:file-list="imageList"
    action="/api/upload/images"
    list-type="picture-card"
    accept="image/*"
    :limit="9"
  />
</template>

<script setup>
import { ref } from 'vue'

const imageList = ref([])
</script>
```

### 自定义预览和下载

```vue
<template>
  <GUpload
    v-model:file-list="fileList"
    action="/api/upload"
    :on-magnify="handlePreview"
    :on-download="handleDownload"
    :on-delete="handleDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const fileList = ref([])

const handlePreview = (file) => {
  console.log('预览文件:', file)
  // 自定义预览逻辑
}

const handleDownload = (file) => {
  console.log('下载文件:', file)
  // 自定义下载逻辑
}

const handleDelete = (file) => {
  console.log('删除文件:', file)
  // 自定义删除逻辑
}
</script>
```

### 分片上传

```vue
<template>
  <GUpload
    v-model:file-list="fileList"
    action="/api/upload/chunk"
    :chunk-upload="true"
    :size="100"
  />
</template>

<script setup>
import { ref } from 'vue'

const fileList = ref([])
</script>
```

### 禁用状态

```vue
<template>
  <GUpload
    v-model:file-list="fileList"
    action="/api/upload"
    :disabled="true"
  />
</template>

<script setup>
import { ref } from 'vue'

const fileList = ref([])
</script>
```

## 核心功能

### 文件上传
- 支持单文件和多文件上传
- 支持拖拽上传
- 支持分片上传大文件
- 自动文件类型和大小验证

### 文件预览
- 支持图片预览
- 支持Office文档WPS在线预览
- 支持本地Office文档预览
- 连续预览功能

### 文件管理
- 文件列表展示
- 文件下载功能
- 文件删除功能
- 上传进度显示

### 权限控制
- 支持文件类型限制
- 支持文件大小限制
- 支持上传数量限制
- 支持禁用状态

## Element Plus 兼容性

`GUpload` 完全兼容 Element Plus Upload 组件的所有原生属性和事件，包括：

- `action` - 上传地址
- `headers` - 请求头
- `multiple` - 是否支持多选
- `data` - 上传时附带的额外参数
- `name` - 上传的文件字段名
- `with-credentials` - 支持发送 cookie 凭证信息
- `show-file-list` - 是否显示已上传文件列表
- `drag` - 是否启用拖拽上传
- `accept` - 接受上传的文件类型
- `before-upload` - 上传文件之前的钩子
- `before-remove` - 删除文件之前的钩子
- `list-type` - 文件列表的类型
- `auto-upload` - 是否在选取文件后立即进行上传
- `file-list` - 上传的文件列表
- `http-request` - 覆盖默认的上传行为
- `disabled` - 是否禁用
- `limit` - 最大允许上传个数

## 重要说明

### 文件存储
- 组件支持通过 `modelValue` 绑定文件ID或URL
- 通过 `fileList` 双向绑定完整的文件列表信息
- 上传成功后自动更新文件的 `fileId` 和 `url` 属性

### 预览模式
- 图片文件：直接在浏览器中预览
- Office文档：支持WPS在线预览和本地预览
- 其他文件：提供下载功能

### 权限验证
- 自动携带Authorization请求头
- 支持自定义请求头配置
- 兼容无界微前端环境

### 性能优化
- 图片文件自动生成缩略图
- 大文件支持分片上传
- 异步加载文件预览URL

### 样式定制
- 支持自定义CSS类名
- 提供完整的SCSS样式文件
- 响应式设计适配

### 事件处理
- 完整的上传生命周期事件
- 自定义预览、下载、删除钩子
- 错误处理和用户提示

### 无障碍访问
- 支持键盘导航
- 提供适当的ARIA标签
- 屏幕阅读器友好

### 兼容性
- 兼容Element Plus所有版本
- 支持Vue 3 Composition API
- 兼容现代浏览器

## 最佳实践

1. **文件类型限制**：根据业务需求设置合适的 `accept` 属性
2. **文件大小控制**：设置合理的 `size` 限制，避免上传过大文件
3. **上传数量限制**：使用 `limit` 属性控制上传文件数量
4. **错误处理**：监听上传失败事件，提供用户友好的错误提示
5. **性能优化**：对于大文件上传，启用分片上传功能
6. **安全考虑**：在服务端进行文件类型和内容验证
7. **用户体验**：提供清晰的上传进度和状态反馈
8. **移动端适配**：在移动设备上测试上传功能的可用性