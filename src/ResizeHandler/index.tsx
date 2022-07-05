import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Rnd } from 'react-rnd';

import './index.less';

interface Props {
  /** 改变div方向，横向/纵向 */
  resizingDirection?: 'row' | 'column';
  /** dom数组，如果长度为1则不可拖拽 */
  children: React.ReactNode[];
  /** 每个dom的默认大小，接受数字 or px or 40% 三种类型,方向为row时，作为宽度默认值，方向为column时，作为高度默认值，不传递时默认平均分配宽度/高度 */
  defaultSize?: (string | number)[];
  /** 类型与defaultSize相同，方向为row时，作为宽度最小值，方向为column时，作为高度最小值  */
  minSize?: (string | number)[];
  /** 类型与defaultSize相同，方向为row时，作为宽度最大值，方向为column时，作为高度最大值  */
  maxSize?: (string | number)[];
  className?: string;
  style?: any;
}
const ResizeHandler: React.FC<Props> = ({
  defaultSize,
  minSize = [],
  maxSize = [],
  children = [],
  className = '',
  style = {},
  resizingDirection = 'row'
}) => {
  const [size, setSize] = useState<(string | number)[]>(defaultSize || []); // 默认宽/高为50%
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]); // 默认位置

  // 计算位置，整体的size数组，目前计算第几个拖拽块的位置，整个区域的宽度/高度
  const caculatePosition = (tempSize: (string | number)[], index: number, totalSize: number) => {
    return tempSize.slice(0, index).reduce((acc: number, cur: number | string) => {
      if (typeof cur === 'number') return acc + cur;
      if (typeof cur === 'string' && cur.indexOf('%') > -1)
        return acc + parseFloat(cur) * 0.01 * totalSize;
      return acc;
    }, 0);
  };
  useEffect(() => {
    if (children.length < 2) {
      setSize(['100%']);
      return;
    }
    let tempSize = defaultSize || [];
    if (!defaultSize) {
      let tempEverySize = `${100 / children.length}%`;
      tempSize = new Array(children.length).fill(tempEverySize);
    }
    setSize(tempSize);
    // 设置每个可拖拽内容的默认的位置
    const totalSize =
      document.getElementsByClassName('resize-handler')[0][
        resizingDirection === 'column' ? 'clientHeight' : 'clientWidth'
      ];
    const tempPositions = tempSize.slice(0, children.length - 1).map((item, index) => {
      // 计算位置
      if (resizingDirection === 'column') {
        return { x: 0, y: caculatePosition(tempSize, index, totalSize) };
      } else {
        return { x: caculatePosition(tempSize, index, totalSize), y: 0 };
      }
    });
    setPositions(tempPositions);
  }, [children, defaultSize, resizingDirection]);

  // 获取rnd的style配置
  const localStyle = useCallback(
    (index: number) => {
      if (resizingDirection === 'row') {
        return {
          width: size[index],
          height: '100%'
        };
      }
      return {
        width: '100%',
        height: size[index]
      };
    },
    [size, resizingDirection]
  );

  const otherConfig = useCallback(
    (index: number) => {
      let rangeConfig = {};
      let tempStyle = {};
      if (resizingDirection === 'row') {
        rangeConfig = {
          minWidth: minSize[index],
          maxWidth: maxSize[index]
        };
        tempStyle = {
          borderRight: '1px solid #e5e5e5',
          paddingRight: '12px',
          position: 'relative'
        };
      } else {
        rangeConfig = {
          minHeight: minSize[index],
          maxHeight: maxSize[index]
        };
        tempStyle = {
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: '12px',
          position: 'relative'
        };
      }
      return {
        ...rangeConfig,
        style: tempStyle
      };
    },
    [minSize, maxSize, resizingDirection]
  );
  const rightSize = useMemo(() => {
    let subStr = '';
    size.slice(0, size.length - 1).forEach((item) => {
      if (typeof item === 'number') {
        subStr += ` - ${item}px`;
      } else {
        subStr += ` - ${item}`;
      }
    });
    return `calc(100%${subStr})`;
  }, [size]);

  return (
    <div
      className={`resize-handler ${className}`}
      style={
        resizingDirection === 'column'
          ? { ...style, flexDirection: 'column', overflowY: 'auto' }
          : { ...style, flexDirection: 'row', overflowX: 'auto' }
      }>
      {children.length === 1 && children[0]}
      {children.length > 1 && (
        <>
          {children.slice(0, children.length - 1).map((item, index) => (
            <Rnd
              disableDragging={true}
              enableResizing={{
                right: resizingDirection === 'row',
                bottom: resizingDirection === 'column'
              }}
              default={{ ...positions[index], ...localStyle(index) }}
              size={localStyle(index)}
              onResize={(e, direction, ref, delta, position) => {
                const newSize = size.concat([]);
                newSize.splice(
                  index,
                  1,
                  resizingDirection === 'column' ? ref.style.height : ref.style.width
                );
                setSize(newSize);
              }}
              {...otherConfig(index)}>
              {item}
            </Rnd>
          ))}
          <div
            className={`resize-handler-right resize-handler-${resizingDirection}`}
            style={
              resizingDirection === 'row'
                ? { paddingLeft: '12px', width: rightSize }
                : { paddingTop: '12px', height: rightSize }
            }>
            {children[children.length - 1]}
          </div>
        </>
      )}
    </div>
  );
};
export default ResizeHandler;
