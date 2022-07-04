import React, { useEffect, useMemo, useState } from 'react';
import { Rnd } from 'react-rnd';

import './index.less';

interface Props {
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
const ResizeHandler: React.FC<Props> = ({
  firstChildren,
  secondChildren,
  style,
  minSize,
  maxSize,
  className = '',
  resizingDirection = 'row',
  defaultSize = '50%',
}) => {
  const [size, setSize] = useState<string | number>(defaultSize); // 默认宽/高为50%

  useEffect(() => {
    if (!secondChildren) {
      setSize('100%');
      return;
    }
    if (defaultSize) setSize(defaultSize);
  }, [secondChildren, defaultSize]);

  // 获取rnd的style配置
  const localStyle = useMemo(() => {
    if (resizingDirection === 'row') {
      return {
        width: size,
        height: '100%',
      };
    }
    return {
      width: '100%',
      height: size,
    };
  }, [size, resizingDirection]);

  const otherConfig = useMemo(() => {
    let rangeConfig = {};
    let tempStyle = {};
    if (resizingDirection === 'row') {
      rangeConfig = {
        minWidth: minSize,
        maxWidth: maxSize,
      };
      tempStyle = {
        borderRight: '1px solid #e5e5e5',
        paddingRight: '12px',
        position: 'relative',
      };
    } else {
      rangeConfig = {
        minHeight: minSize,
        maxHeight: maxSize,
      };
      tempStyle = {
        borderBottom: '1px solid #e5e5e5',
        paddingBottom: '12px',
        position: 'relative',
      };
    }
    return {
      ...rangeConfig,
      style: tempStyle,
    };
  }, [minSize, maxSize, resizingDirection]);
  const rightSize = useMemo(() => {
    if (typeof size === 'number') {
      return `calc(100% - ${size}px)`;
    } else {
      return `calc(100% - ${size})`;
    }
  }, [size]);

  return (
    <div className={`resize-handler ${className}`} style={style}>
      <Rnd
        disableDragging={true}
        enableResizing={{
          right: !!secondChildren && resizingDirection === 'row',
          bottom: !!secondChildren && resizingDirection === 'column',
        }}
        size={localStyle}
        onResize={(e, direction, ref) => {
          setSize(resizingDirection === 'column' ? ref.style.height : ref.style.width);
        }}
        {...otherConfig}
      >
        {firstChildren}
      </Rnd>
      <div
        className={`resize-handler-right resize-handler-${resizingDirection}`}
        style={
          resizingDirection === 'row'
            ? { paddingLeft: '12px', width: rightSize }
            : { paddingTop: '12px', height: rightSize }
        }
      >
        {secondChildren}
      </div>
    </div>
  );
};
export { ResizeHandler };
