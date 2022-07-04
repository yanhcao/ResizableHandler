---
group:
  title: 布局
  order: 1
---

# 分栏拖拽 - ResizeHandler

## 介绍

## 使用场景

## 代码演示

### 基础例子

```jsx
import React, { useState } from 'react';
import ResizeHandler from './index.tsx';

export default () => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResizeHandler
        style={{ border: '1px solid' }}
        resizingDirection="row"
        firstChildren="左侧的内容，左侧的内容，左侧的内容，左侧的内容"
        secondChildren="右侧的内容，右侧的内容，右侧的内容，右侧的内容"
      />
    </div>
  );
};
```

### 设置最大最小值

```jsx
import React from 'react';
import ResizeHandler from './index.tsx';

export default () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <ResizeHandler
        style={{ border: '1px solid' }}
        resizingDirection="column"
        minSize="60px"
        maxSize="80%"
        defaultSize="50px"
        firstChildren="左侧的内容，左侧的内容，左侧的内容，左侧的内容"
        secondChildren="右侧的内容，右侧的内容，右侧的内容，右侧的内容"
      />
    </div>
  );
};
```

<API />
