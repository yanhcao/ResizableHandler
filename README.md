# ResizableHandler

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Run test,

```bash
$ npm test
```

Build library via `father-build`,

```bash
$ npm run build
```

## Usage

```jsx
import React, { useState } from 'react';
import { ResizeHandler } from './index.tsx';

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

## API

```js
{
  /** 改变div方向，横向/纵向 */
  resizingDirection?: 'row' | 'column';
  /** 第一个子级DOM */
  firstChildren: React.ReactNode;
  /** 第二个子级DOM，如果不存在，则不可拖拽 */
  secondChildren?: React.ReactNode;
  /** 第一个子级的默认大小，接受数字 or px or 40% 三种类型,方向为row时，作为宽度默认值，方向为column时，作为高度默认值 */
  defaultSize?: string | number;
  /** 类型与defaultSize相同，方向为row时，作为宽度最小值，方向为column时，作为高度最小值  */
  minSize?: string | number;
  /** 类型与defaultSize相同，方向为row时，作为宽度最大值，方向为column时，作为高度最大值  */
  maxSize?: string | number;
  className?: string;
  style?: any;
}
```
