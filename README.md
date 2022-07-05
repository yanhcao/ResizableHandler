# ResizableHandler

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm run start
```

Build documentation,

```bash
$ npm run docs:build
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
      <div>设置最大最小值</div>
      <div style={{ width: '100%', height: '300px', marginTop: 20 }}>
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
    </>
  );
};
```

![image](https://github.com/yanhcao/ResizableHandler/blob/main/src/imgs/basic.png)
![image](https://github.com/yanhcao/ResizableHandler/blob/main/src/imgs/min%26MaxSize.png)

## API

```js
{
  /** 改变div方向，横向/纵向 */
  resizingDirection?: 'row' | 'column';
  /** dom数组，如果长度为1则不可拖拽 */
  children: React.ReactNode[];
  /** 每个dom的默认大小，接受数字 or px or 40% 三种类型,方向为row时，作为宽度默认值，方向为column时，作为高度默认值 */
  defaultSize?: (string | number)[];
  /** 类型与defaultSize相同，方向为row时，作为宽度最小值，方向为column时，作为高度最小值  */
  minSize?: (string | number)[];
  /** 类型与defaultSize相同，方向为row时，作为宽度最大值，方向为column时，作为高度最大值  */
  maxSize?: (string | number)[];
  className?: string;
  style?: any;
}
```
