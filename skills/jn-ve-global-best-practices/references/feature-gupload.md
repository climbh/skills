---
name: feature-gupload
description: GUpload 上传组件的使用，支持 v-model
---

# GUpload 上传组件

`GUpload` 封装了文件上传功能，支持 `v-model` 双向绑定文件列表。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GUpload } from 'jn-ve-global'

// 文件列表
const fileList = ref<any[]>([])

const handleUploadSuccess = (response: any) => {
  console.log('Upload success:', response)
}
</script>

<template>
  <GUpload 
    v-model="fileList"
    action="/api/upload"
    :on-success="handleUploadSuccess"
  />
</template>
```

## 特性

- **v-model 支持**: 直接绑定文件列表数组。
- **Element Plus 透传**: 支持 Element Plus Upload 组件的大部分属性（需遵循透传规则）。
