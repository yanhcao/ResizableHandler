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
    <>
      <div>横向</div>
      <div style={{ width: '100%', height: '300px', marginBottom: 20 }}>
        <ResizeHandler
          style={{ border: '1px solid rgba(0,0,0,.1)' }}
          resizingDirection="row"
          children={[
            '左侧的内容，左侧的内容，左侧的内容，左侧的内容',
            '中间的内容',
            <div style={{ backgroundColor: 'pink' }}>你好hello</div>,
            '右侧的内容，右侧的内容，右侧的内容，右侧的内'
          ]}
        />
      </div>
      <div>纵向，带默认size</div>
      <div style={{ width: '100%', height: '500px' }}>
        <ResizeHandler
          style={{ border: '1px solid rgba(0,0,0,.1)' }}
          resizingDirection="column"
          defaultSize={[80, '10%', 50]}
          children={[
            '左侧的内容，左侧的内容，左侧的内容，左侧的内容',
            '中间的内容',
            <div style={{ backgroundColor: 'pink' }}>你好hello</div>,
            '右侧的内容，右侧的内容，右侧的内容，右侧的内'
          ]}
        />
      </div>
    </>
  );
};
```

### 设置最大最小值

```jsx
import React from 'react';
import ResizeHandler from './index.tsx';

export default () => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResizeHandler
        style={{ border: '1px solid rgba(0,0,0,.1)' }}
        resizingDirection="row"
        minSize={[100, '10%']}
        maxSize={['50%', 300, 500]}
        children={[
          '左侧的内容，左侧的内容，左侧的内容，左侧的内容',
          '中间的内容',
          <div style={{ backgroundColor: 'pink' }}>你好hello</div>,
          '右侧的内容，右侧的内容，右侧的内容，右侧的内'
        ]}
      />
    </div>
  );
};
```

<API />
